import Database from "../database/index";
import Repository from "../database/repository";

class Controller {
  public db: Database;
  public repository: Repository;
  constructor() {
    this.db = new Database();
    this.repository = new Repository();
  }
}

export default Controller;
