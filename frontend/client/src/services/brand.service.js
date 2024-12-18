import createApiClient from "./api.service";
class BrandService {
  constructor(baseUrl = "/api/brands") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }
}
export default new BrandService();
