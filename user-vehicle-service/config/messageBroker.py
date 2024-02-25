import pika
import os
import ssl
from data.constants import Constant
from pika.adapters.blocking_connection import BlockingChannel


def consume_message(channel: BlockingChannel):
    # Declare the queue
    channel.queue_declare(queue=Constant.ADD_TRAVEL_QUEUE, durable=True)
    # Bind the queue to the exchange with the binding key
    channel.queue_bind(exchange=Constant.RABBIT_MQ_EXCHANGE_NAME, queue=Constant.ADD_TRAVEL_QUEUE,
                       routing_key=Constant.USER_VEHICLE_SERVICE_RABBIT_MQ_BINDING_KEY)

    def callback(ch, method, properties, body):
        print(f"Received {body.decode()}")

    # # now we need to create a configuration to consume our messages from our 'video' queue
    channel.basic_consume(
        queue=Constant.ADD_TRAVEL_QUEUE, on_message_callback=callback
        # whenever the message get pulls off from the queue then 'callback' function will get execute
    )
    try:
        print('Waiting for messages. To exit, press CTRL+C')
    # this function will run our consumer and listen on our Queue channel
        channel.start_consuming()
    # Keep consuming messages until KeyboardInterrupt is received
    except Exception as e:
        print(e)


def setup():
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
        channel.exchange_declare(
            exchange=Constant.RABBIT_MQ_EXCHANGE_NAME, exchange_type='direct', durable=True)
        print("Connected to MessageBroker")
        consume_message(channel=channel)

    except KeyboardInterrupt:
        # Close the connection when done
        connection.close()
    except Exception as e:
        print(e)
