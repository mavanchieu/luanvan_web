import createApiClient from "./api.service";
class UserService {
  constructor(baseUrl = "/api/users") {
    this.api = createApiClient(baseUrl);
  } 
  async create(data) {
    return (await this.api.post("/", data)).data;
  }
  async login(data) {
    return (await this.api.post("/login",data)).data;
  }
  async logout() {
    return (await this.api.get("/logout")).data;
  }
  async getAllUsers() {
    return (await this.api.get("/")).data;
  }
  async getId(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async update(id, data) {
    return (await this.api.put(`/updateUser/${id}`, data)).data;
  }

  // async updateImage(data) {
  //   return (await this.api.put(`/updateImage`, data)).data;
  // }
  async updateImage(data) {
    return (
      await this.api.put("/updateImage", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  }
  
}
export default new UserService();
