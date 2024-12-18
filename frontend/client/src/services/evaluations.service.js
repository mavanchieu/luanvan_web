import createApiClient from "./api.service";
class EvaluationService {
  constructor(baseUrl = "/api/evaluations") {
    this.api = createApiClient(baseUrl);
  } 
  async getAll() {
    return (await this.api.get("/")).data;
  }

  async findEvaByProId(productId) {
    return (await this.api.get(`/findEvaByProId/${productId}`)).data;
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

  async updateLike(userId, evaId) {
    return (await this.api.put(`/updateLike/${userId}/${evaId}`)).data;
  }
}
export default new EvaluationService();
