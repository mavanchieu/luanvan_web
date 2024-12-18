import createApiClient from "./api.service";
class CollectionService {
  constructor(baseUrl = "/api/collections") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }

  async getAllSeasonalCollection() {
    return (await this.api.get("/seasonalCollection")).data;
  }

  async deleteOneBrandCollection(id) {
    return (await this.api.delete(`/deleteOneBrandCollection/${id}`)).data;
  }

  async deleteOneSeasonalCollection(id) {
    return (await this.api.delete(`/deleteOneSeasonalCollection/${id}`)).data;
  }

  async updateCollection(colorItemId, data) {
    return (
      await this.api.put(`/updateCollection/${colorItemId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  }
}
export default new CollectionService();
