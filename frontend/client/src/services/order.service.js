import createApiClient from "./api.service";
class OrderService {
  constructor(baseUrl = "/api/orders") {
    this.api = createApiClient(baseUrl);
  } 

  async getAllByUserId(userId) {
    return (await this.api.get(`/findByUserId/${userId}`)).data;
  }
  
  async getAll() {
    return (await this.api.get("/")).data;
  }

  async payment(totalPrice){
    return (await this.api.post("/payment", {totalPrice})).data;
  }

  async orderStatus(app_trans_id){
    return (await this.api.post(`/orderStatus/${app_trans_id}`)).data;
  }

  async deleteOne(id) {
    return (await this.api.delete(`/${id}`)).data;
  }


//   async create(data) {
//     return (
//       await this.api.post("/", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })
//     ).data;
//   }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }

}
export default new OrderService();
