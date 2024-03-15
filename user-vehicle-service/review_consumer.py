# This will consume the message from the queue and add or update the rating data inside dataset
import pika
import os
import ssl
from data.constants import Constant
# 'BlockingChannel' if you just want to run this connection without running other servers
# from pika.adapters.blocking_connection import BlockingChannel
import json
import pandas as pd
import config.settings  # Need to import to load environment variables
from train_model import train_model


class PikaClient:
    def __init__(self):
        try:
            # rabbitmq connection
            parameters = pika.URLParameters(
                os.environ.get("CLOUD_AMQP_INSTANCE_URL"))

            # Enable SSL/TLS connection
            # ssl_options = {
            #     'ssl_version': ssl.PROTOCOL_TLS
            # }

            connection = pika.BlockingConnection(parameters=parameters)
            channel = connection.channel()
            self.connection = connection
            self.channel = channel
            # print(channel)
            channel.exchange_declare(
                exchange=Constant.RABBIT_MQ_EXCHANGE_NAME, exchange_type='direct')
            print("Connected to MessageBroker")
            self.consume()

        except KeyboardInterrupt:
            # Close the connection when done
            connection.close()
        except Exception as e:
            print(e)

    def consume(self):
        # Declare the queue
        try:
            self.channel.queue_declare(
                queue=Constant.ADD_OR_UPDATE_REVIEW_QUEUE)
            # Bind the queue to the exchange with the binding key
            self.channel.queue_bind(exchange=Constant.RABBIT_MQ_EXCHANGE_NAME, queue=Constant.ADD_OR_UPDATE_REVIEW_QUEUE,
                                    routing_key=Constant.USER_VEHICLE_REVIEW_SERVICE_RABBIT_MQ_BINDING_KEY)

            # Set prefetch count to 1 to ensure that RabbitMQ sends only one message at a time
            self.channel.basic_qos(prefetch_count=1)

            # # now we need to create a configuration to consume our messages from our 'video' queue
            self.channel.basic_consume(
                queue=Constant.ADD_OR_UPDATE_REVIEW_QUEUE, on_message_callback=self.add_or_update_review
                # whenever the message get pulls off from the queue then 'callback' function will get execute
            )
            # print('Waiting for messages. To exit, press CTRL+C')
            # this function will run our consumer and listen on our Queue channel
            self.channel.start_consuming()
            # Keep consuming messages until KeyboardInterrupt is received
        except Exception as e:
            print(e)

    def add_or_update_review(self, ch, method, properties, body):
        try:

            review = body.decode()
            # convert string to dictionary
            review: dict = json.loads(review)
            if review.get('id') and review.get('vehicle_id') and review.get('rating') and review.get('user_id'):
                # Create a DataFrame with the desired order of columns
                dfReview = pd.DataFrame(
                    [review], columns=['id', 'vehicle_id', 'user_id', 'rating'])
                # print(dfReview)
                reviews_df = pd.read_csv('data/dataset/reviews.csv')
                # check whether review already exist or not
                checked_review_df = reviews_df[reviews_df['id']
                                               == review['id']]
                if review['id'] in reviews_df['id'].values and review['user_id'] in reviews_df['user_id'].values and review['vehicle_id'] in reviews_df['vehicle_id'].values:
                    # Review already exist update it
                    if (review['rating']
                            in checked_review_df['rating'].values) == False:
                        # Save new rating only if rating is different
                        print("User rated different rating")
                        reviews_df.loc[reviews_df['id']
                                       == review['id'], 'rating'] = review['rating']
                        reviews_df.to_csv(
                            "data/dataset/reviews.csv", index=False)
                        # Now again train model with the updated rating data
                        train_model()
                else:
                    # Review doesn't exist add it
                    # Append the new review data to the existing CSV file
                    with open('data/dataset/reviews.csv', 'a') as f:
                        dfReview.to_csv(f, header=f.tell() == 0,
                                        index=False, lineterminator='\n')
                    # Now again train model with the new data
                    train_model()
            # acknowledge the message so that it will get remove from the queue
            ch.basic_ack(delivery_tag=method.delivery_tag)
        except Exception as e:
            print(e)


if __name__ == "__main__":
    PikaClient()
