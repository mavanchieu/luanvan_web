import createApiClient from "./api.service";
class ReceivingAddressService {
  constructor(baseUrl = "/api/receivingAddress") {
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

  async deleteAll(userId) {
    return (await this.api.delete(`/deleteAll/${userId}`)).data;
    }

    async update(id, data) {
        return (await this.api.put(`/updateAddress/${id}`, data)).data;
      }
}

export default new ReceivingAddressService();
