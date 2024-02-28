# This will consume the message from the queue and add the new travel to the dataset
import pika
import os
import ssl
from data.constants import Constant
# 'BlockingChannel' if you just want to run this connection without running other servers
# from pika.adapters.blocking_connection import BlockingChannel
import json
import pandas as pd
import config.settings  # Need to import to load environment variables


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
            self.channel.queue_declare(queue=Constant.ADD_TRAVEL_QUEUE)
            # Bind the queue to the exchange with the binding key
            self.channel.queue_bind(exchange=Constant.RABBIT_MQ_EXCHANGE_NAME, queue=Constant.ADD_TRAVEL_QUEUE,
                                    routing_key=Constant.USER_VEHICLE_SERVICE_RABBIT_MQ_BINDING_KEY)

            # Set prefetch count to 1 to ensure that RabbitMQ sends only one message at a time
            self.channel.basic_qos(prefetch_count=1)

            # # now we need to create a configuration to consume our messages from our 'video' queue
            self.channel.basic_consume(
                queue=Constant.ADD_TRAVEL_QUEUE, on_message_callback=self.add_new_travel_to_dataset
                # whenever the message get pulls off from the queue then 'callback' function will get execute
            )
            # print('Waiting for messages. To exit, press CTRL+C')
            # this function will run our consumer and listen on our Queue channel
            self.channel.start_consuming()
            # Keep consuming messages until KeyboardInterrupt is received
        except Exception as e:
            print(e)

    def add_new_travel_to_dataset(self, ch, method, properties, body):
        try:

            travel = body.decode()
            # convert string to dictionary
            travel: dict = json.loads(travel)
            if travel.get('vehicle_id') and travel.get('travel_id') and travel.get('departure_at') and travel.get('from') and travel.get('to'):
                travel['departure_at'] = pd.to_datetime(
                    travel['departure_at'])
                # Create a DataFrame with the desired order of columns
                dfTravel = pd.DataFrame(
                    [travel], columns=['vehicle_id', 'travel_id', 'departure_at', 'from', 'to'])
                # Append the new travel data to the existing CSV file
                with open('./data/dataset/travels.csv', 'a') as f:
                    dfTravel.to_csv(f, header=f.tell() == 0, index=False)
            # acknowledge the message so that it will get remove from the queue
            ch.basic_ack(delivery_tag=method.delivery_tag)
        except Exception as e:
            print(e)


if __name__ == "__main__":
    PikaClient()
