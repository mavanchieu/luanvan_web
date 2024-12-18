import createApiClient from "./api.service";
class TypeDetailService {
  constructor(baseUrl = "/api/typeDetails") {
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
    return (await this.api.put(`/updateTypeDetail/${id}`, data)).data;
  }
}

export default new TypeDetailService();
