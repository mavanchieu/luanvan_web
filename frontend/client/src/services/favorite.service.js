import createApiClient from "./api.service";
class FavoriteService {
  constructor(baseUrl = "/api/favorites") {
    this.api = createApiClient(baseUrl);
  } 
  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }

  async deleteOne(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  async deleteAllFavorites(userId) {
    return (await this.api.delete(`/deleteAll/${userId}`)).data;
  }
    
}
export default new FavoriteService();
