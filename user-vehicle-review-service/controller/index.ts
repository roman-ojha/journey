import Database from "../database/index";
import Repository from "../database/repository";
import amqplib from "amqplib";

class Controller {
  public db: Database;
  public repository: Repository;
  public rabbitMQChannel: amqplib.Channel;
  constructor(channel: amqplib.Channel) {
    this.db = new Database();
    this.repository = new Repository();
    this.rabbitMQChannel = channel;
  }
}

export default Controller;
