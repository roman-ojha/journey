import amqplib from "amqplib";
import constants from "../data/constants";

export const publishMessage = async (
  channel: amqplib.Channel,
  binding_key: string,
  message: {}
) => {
  try {
    // so here now we will going to publish the specific message using created 'channel' with the help of the 'EXCHANGE_NAME' and the 'binding_key'
    const res = channel.publish(
      constants.RABBIT_MQ_EXCHANGE_NAME,
      binding_key,
      Buffer.from(JSON.stringify(message))
    );
    console.log("Message hand been sent:" + message);
  } catch (err) {
    throw err;
  }
};
