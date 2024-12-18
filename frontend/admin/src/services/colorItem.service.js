import createApiClient from "./api.service";
class ColorItemService {
  constructor(baseUrl = "/api/colorItems") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }

  async deleteOne(id) {
    return (await this.api.delete(`/deleteOne/${id}`)).data;
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

  async updateColorItem(colorItemId, data) {
    return (
      await this.api.put(`/updateColorItem/${colorItemId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  }
}
export default new ColorItemService();
