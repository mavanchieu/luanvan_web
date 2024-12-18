import createApiClient from "./api.service";
class EvaluationService {
  constructor(baseUrl = "/api/evaluations") {
    this.api = createApiClient(baseUrl);
  } 
  async getAll() {
    return (await this.api.get("/")).data;
  }

  async deleteOne(id) {
    return (await this.api.delete(`/${id}`)).data;
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
}
export default new EvaluationService();
