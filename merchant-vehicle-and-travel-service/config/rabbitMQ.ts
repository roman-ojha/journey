import amqplib from "amqplib";
import constants from "../data/constants";

export async function createChannel() {
  try {
    const connection = await amqplib.connect(
      process.env.CLOUD_AMQP_INSTANCE_URL as string
    );
    console.log("Connected to RabbitMQ");
    const channel = await connection.createChannel();
    await channel.assertExchange(
      constants.RABBIT_MQ_EXCHANGE_NAME as string,
      "direct",
      {
        durable: true,
      }
    );
    return channel;
  } catch (err) {
    throw err;
  }
}

// export async function SubscribeMessage(channel: amqplib.Channel, service) {
//   // for the customer service we are listing to only one binding key which is 'CUSTOMER_BINDING_KEY'

//   try {
//     const appQueue = await channel.assertQueue(constants.QUEUE_NAME);
//     channel.bindQueue(
//       appQueue.queue,
//       constants.RABBIT_MQ_EXCHANGE_NAME,
//       constants.MERCHANT_VEHICLE_AND_TRAVEL_SERVICE_RABBIT_MQ_BINDING_KEY
//     );
//     channel.consume(appQueue.queue, (data) => {
//       console.log("received data");
//       console.log(data);
//       // when whenever we will going to get the message from other message broker published from other services we will going to send that payload data into the 'SubscribeEvents' method on '../services/customer-service.js' which will trigger the right Service according to the payload data
//       //   service.SubscribeEvents(data.content.toString());
//       //   channel.ack(data);
//     });
//   } catch (err) {
//     throw err;
//   }
// }
