import createApiClient from "./api.service";
class SizeService {
  constructor(baseUrl = "/api/size") {
    this.api = createApiClient(baseUrl);
  } 
  async getAll() {
    return (await this.api.get("/getAll")).data;
  }
}

export default new  SizeService();
