import createApiClient from "./api.service";
class OrderService {
  constructor(baseUrl = "/api/orders") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }

  // tìm đơn hàng theo id
  async getOneById(id) {
    return (await this.api.get(`/findOneById/${id}`)).data;
  }

  async getAllByUserId(userId) {
    return (await this.api.get(`/findByUserId/${userId}`)).data;
  }

  async confirmOrder(id, info) {
    return (await this.api.put(`/confirmOrder/${id}`, info)).data;
  }

  async confirmCompletedOrder(id) {
    return (await this.api.put(`/confirmCompletedOrder/${id}`)).data;
  }

  async confirmShipping(id) {
    return (await this.api.put(`/confirmShipping/${id}`)).data;
  }

  async create(data) {
    return (
      await this.api.post("/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  }
  // async create(data) {
  //   return (await this.api.post("/")).data;
  // }
}
export default new OrderService();
