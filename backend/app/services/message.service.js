const { ObjectId } = require("mongodb");
class MessageService {
  constructor(client) {
    this.Message = client.db().collection("message");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractMessageData(payload) {
    const message = {
      userId: ObjectId.isValid(payload.userId) ? new ObjectId(payload.userId) : null,
      message: [
        {
          content: payload.content,
          status: payload.status || '0',
        },
      ],
    };
    // Remove undefined fields
    Object.keys(message).forEach(
      (key) => message[key] === undefined && delete message[key]
    );
    return message;
  }

  async create(payload) {
    const messageData = this.extractMessageData(payload);

    // Kiểm tra nếu userId đã tồn tại trong cơ sở dữ liệu
    const existingMessage = await this.Message.findOne({ userId: messageData.userId });

    if (existingMessage) {
      // Nếu userId tồn tại, thêm tin nhắn mới vào mảng 'message'
      const updateResult = await this.Message.updateOne(
        { userId: messageData.userId },
        {
          $push: {
            message: {
              $each: messageData.message, // Thêm các phần tử mới vào mảng message
            },
          },
        }
      );
      return updateResult;
    } else {
      // Nếu userId chưa tồn tại, tạo một tài liệu mới
      const insertResult = await this.Message.insertOne(messageData);
      return insertResult;
    }
  }

  async find(filter){
    const cursor = await this.Message.find(filter).sort({_id: -1});
    return await cursor.toArray();
  }

  async findByName(name){
      return await this.find({
          name: {$regex: new RegExp(name), $options: "i",},
      });
  }

  async findByUserId(userId) {
    return await this.find({ userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null});
  }
  
//   async deleteOne(id){
//     const result = await this.Message.findOneAndDelete({
//       _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
//     });
//     return result;
//   } 

//   async deleteAll(userId){
//     const result = await this.Message.deleteMany({ userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null });
//     return result;
//   } 

//   async update(id, payload){
//     const filter = {
//         _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
//     };
//     const update = this.extractMessageData(payload);
//     const result = await this.Message.findOneAndUpdate(
//         filter,
//         { $set: update },
//         { returnDocument: "after" }
//     );
//     return result; 
//   }
}

module.exports = MessageService;
