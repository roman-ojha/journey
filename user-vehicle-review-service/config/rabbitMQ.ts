import amqplib from "amqplib";
import constants from "../data/constants";

// export async function SubscribeMessage(channel: amqplib.Channel) {
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
//       console.log(data?.content.toString());
//       channel.ack(data as amqplib.ConsumeMessage);
//     });
//   } catch (err) {
//     throw err;
//   }
// }

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
        durable: false,
      }
    );
    // SubscribeMessage(channel);
    return channel;
  } catch (err) {
    throw err;
  }
}
