import createApiClient from "./api.service";
class ProductService {
  constructor(baseUrl = "/api/products") {
    this.api = createApiClient(baseUrl);
  } 

  async getAll() {
    return (await this.api.get("/findAllNotHiddenProducts")).data;
  }


  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  async deleteOne(id) {
    return (await this.api.delete(`/deleteOne/${id}`)).data;
  }

  async hiddenProduct(id){
    return (await this.api.put(`/hiddenProduct/${id}`)).data;
  }

}
export default new ProductService();
