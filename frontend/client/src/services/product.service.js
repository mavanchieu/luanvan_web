import createApiClient from "./api.service";
class ProductService {
  constructor(baseUrl = "/api/products") {
    this.api = createApiClient(baseUrl);
  } 
  async getAll() {
    return (await this.api.get("/")).data;
  }

  async getAllHidden() { // lấy cả sản phẩm hidden
    return (await this.api.get("/findAllNotHiddenProducts")).data;
  }

}
export default new ProductService();
