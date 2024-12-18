const { ObjectId } = require("mongodb");
class SizeService {
  constructor(client) {
    this.Size = client.db().collection("size");
    this.TypeDetails = client.db().collection("typeDetails");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractSizeData(payload) {
    const size = {
        name: payload.name,
        typeDetailId: ObjectId.isValid(payload.typeDetailId) ? new ObjectId(payload.typeDetailId) : null,
        // áo
        chestFrom: payload.chestFrom,  // Rộng ngực 
        chestTo: payload.chestTo,

        sleevedFrom: payload.sleevedFrom, // Dài Tay
        sleevedTo: payload.sleevedTo,

        shoulderFrom: payload.shoulderFrom, //Ngang vai
        shoulderTo: payload.shoulderTo,

        heightFrom: payload.heightFrom, // Dài áo
        heightTo: payload.heightTo,

        // quần
        longPantsFrom: payload.longPantsFrom, // Dài quần 
        longPantsTo: payload.longPantsTo,

        wideWaistFrom: payload.wideWaistFrom, // Rộng eo
        wideWaistTo: payload.wideWaistTo,

        widePipeFrom: payload.widePipeFrom, // Rộng ống
        widePipeTo:  payload.widePipeTo,

        // Giày
        longLegsFrom: payload.longLegsFrom,
        longLegsTo: payload.longLegsTo,

        wideLegsFrom: payload.wideLegsFrom,
        wideLegsTo: payload.wideLegsTo,
    };
    // Remove undefined fields
    Object.keys(size).forEach(
      (key) => (size[key] === null || size[key] === undefined || size[key] === "") && delete size[key]
    );
    return size;
  }

  async create(payload) {
    const size = this.extractSizeData(payload);
  
    const result = await this.Size.insertOne(size);
    return result;
  }

//   async find(filter){
//     const cursor = await this.Size.find(filter).sort({_id: -1});
//     return await cursor.toArray();
//   }
  async find(filter = {}) {
    const cursor = await this.TypeDetails.aggregate([
        {
            $match: filter  // Áp dụng bộ lọc đầu vào trên bảng chính `types`
        },
        {
            $lookup: {
                from: "size",            // Bảng phụ (typeDetails)
                localField: "_id",              // Khóa từ bảng chính (types)
                foreignField: "typeDetailId",         // Khóa từ bảng phụ (typeDetails)
                as: "sizeDetails"               // Tên cho mảng chứa thông tin bảng phụ
            }
        },
        {
            $project: {
                _id: 1,                         // Giữ lại các trường cần thiết từ bảng chính
                name: 1,
                genderId:1,
                typeId: 1,
                description: 1,                 // Giữ lại description từ bảng chính
                sizeDetails: 1,
            }
        },
        {
            $sort: { _id: -1 }                  // Sắp xếp kết quả theo _id giảm dần
        }
    ]);

    return await cursor.toArray();              // Trả về kết quả dưới dạng mảng
}

  async findByName(name){
      return await this.find({
          name: {$regex: new RegExp(name), $options: "i",},
      });
  }

  async getAll(filter){
      const cursor = await this.Size.find(filter).sort({_id: -1});
      return await cursor.toArray();
  }
  

  async deleteOne(id){
    const result = await this.Size.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
    });
    return result;
  } 

  async update(id, payload){
    const filter = {
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
    };
    const update = this.extractSizeData(payload);
    const result = await this.Size.findOneAndUpdate(
        filter,
        { $set: update },
        { returnDocument: "after" }
    );
    return result; 
  }
}

module.exports = SizeService;
