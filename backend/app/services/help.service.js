const { ObjectId } = require("mongodb");
class HelpService {
  constructor(client) {
    this.Help = client.db().collection("helps");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractHelpData(payload) {
    const help = {
        userId: ObjectId.isValid(payload.userId) ? new ObjectId(payload.userId) : null,
        fullname: payload.fullname,
        phone: payload.phone,
        email: payload.email,
        question: payload.question,
        reply: {
          userIdReply: payload.reply.userIdReply || "",
          answer: payload.reply.answer || "",
        },
        // userIdReply: payload.userIdReply,
    };
    // Remove undefined fields
    Object.keys(help).forEach(
      (key) => help[key] === undefined && delete help[key]
    );
    return help;
  }

  async create(payload) {
    const help = this.extractHelpData(payload);

    const result = await this.Help.insertOne(help);
    return result;
  }

  async findByUserId(userId) {
    return await this.find({ userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null});
  }

  async find(filter){
    const cursor = await this.Help.find(filter).sort({_id: -1});
    return await cursor.toArray();
  }

  async findByName(name){
      return await this.find({
          name: {$regex: new RegExp(name), $options: "i",},
      });
  }

  async deleteOne(id){
    const result = await this.Help.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
    });
    return result;
  } 

  async update(id, payload){
    const filter = {
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
    };
    const update = this.extractHelpData(payload);
    const result = await this.Help.findOneAndUpdate(
        filter,
        { $set: update },
        { returnDocument: "after" }
    );
    return result; 
  }

  async replyQuestion(id, data) {
    // const replyData = {
    //   userIdReply: ObjectId.isValid(data.userIdReply) ? new ObjectId(data.userIdReply) : null,
    //   answer: data.answer,
    // };
    // console.log(replyData);
    const result = await this.Help.updateOne(
      { _id: ObjectId.isValid(id) ? new ObjectId(id) : null},
      { $set: {reply : data} }
    );
    return result;
  }

}

module.exports = HelpService;
