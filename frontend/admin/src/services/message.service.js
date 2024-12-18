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

//   async delete(id) {
//     return (await this.api.delete(`/${id}`)).data;
//   }

//   async deleteAll(userId) {
//     return (await this.api.delete(`/deleteAll/${userId}`)).data;
//     }
}

export default new MessageService();