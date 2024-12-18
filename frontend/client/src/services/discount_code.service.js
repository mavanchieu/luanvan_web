import createApiClient from "./api.service";
class DiscountCodeService {
  constructor(baseUrl = "/api/discountCodes") {
    this.api = createApiClient(baseUrl);
  } 

  async getAll() {
    return (await this.api.get("/")).data;
  }

}

export default new DiscountCodeService();
