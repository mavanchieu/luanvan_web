import createApiClient from "./api.service";
class TypeService {
  constructor(baseUrl = "/api/types") {
    this.api = createApiClient(baseUrl);
  } 

  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }

  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  async update(id, data) {
    return (await this.api.put(`/updateType/${id}`, data)).data;
  }
}

export default new TypeService();
