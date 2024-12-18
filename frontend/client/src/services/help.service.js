import createApiClient from "./api.service";
class HelpService {
  constructor(baseUrl = "/api/helps") {
    this.api = createApiClient(baseUrl);
  } 

  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }

  async getByUserId(userId) {
    return (await this.api.get(`/findByUserId/${userId}`)).data;
  }

//   async delete(id) {
//     return (await this.api.delete(`/${id}`)).data;
//   }

//   async update(id, data) {
//     return (await this.api.put(`/updateHelp/${id}`, data)).data;
//   }
}

export default new HelpService();
