import createApiClient from "./api.service";
class CartService {
  constructor(baseUrl = "/api/carts") {
    this.api = createApiClient(baseUrl);
  } 

  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  async getAllByUserId(userId) {
    return (await this.api.get(`/findByUserId/${userId}`)).data;
  }

  async deleteOne(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  async deleteAll(userId) {
    return (await this.api.delete(`/deleteAll/${userId}`)).data;
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }



  async update(id, data) {
    return (await this.api.put(`/updateCart/${id}`, data)).data;
  }
}

export default new CartService();
