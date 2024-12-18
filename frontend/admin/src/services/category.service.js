import createApiClient from "./api.service";
class CategoryService {
  constructor(baseUrl = "/api/categories") {
    this.api = createApiClient(baseUrl);
  } 
  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }

  async getAllId(id){
    return (await this.api.get(`/${id}`)).data;
  }
  
}
export default new CategoryService();
