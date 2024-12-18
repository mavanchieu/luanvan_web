import createApiClient from "./api.service";
class UsersDiscountCodeService {
  constructor(baseUrl = "/api/usersDiscountCode") {
    this.api = createApiClient(baseUrl);
  } 

  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  async getAllDiscountByUserId(userId) {
    return (await this.api.get(`/findDiscountByUserId/${userId}`)).data;
  }

  async update(id) {
    return (await this.api.put(`/${id}`)).data;
  }
}

export default new UsersDiscountCodeService();
