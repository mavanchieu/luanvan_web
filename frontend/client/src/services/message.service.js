import createApiClient from "./api.service";
class MessageService {
  constructor(baseUrl = "/api/message") {
    this.api = createApiClient(baseUrl);
  } 

  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }
}

export default new MessageService();
