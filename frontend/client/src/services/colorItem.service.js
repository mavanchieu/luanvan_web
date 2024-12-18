import createApiClient from "./api.service";
class ColorItemService {
  constructor(baseUrl = "/api/colorItems") {
    this.api = createApiClient(baseUrl);
  } 
  async getAll() {
    return (await this.api.get("/")).data;
  }

  
  async updateQuantity(colorItemId, sizeId, quantity){
    return (await this.api.put(`/updateQuantity/${colorItemId}/${sizeId}/${quantity}`));
  }

  async updateInscreaseQuantity(colorItemId, sizeId, quantity){
    return (await this.api.put(`/updateInscreaseQuantity/${colorItemId}/${sizeId}/${quantity}`));
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
export default new ColorItemService();
