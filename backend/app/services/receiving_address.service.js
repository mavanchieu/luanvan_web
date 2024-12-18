const { ObjectId } = require("mongodb");
class ReceivingAddressService {
  constructor(client) {
    this.ReceivingAddress = client.db().collection("receivingAddress");
  }
    extractReceivingAddressData(payload) {
        const receiving_address = {
            userId: ObjectId.isValid(payload.userId) ? new ObjectId(payload.userId) : null,
            fullname: payload.fullname,
            phone: payload.phone,
            address: payload.address,
            status: payload.status,
        };

        // Remove fields that are not set
        Object.keys(receiving_address).forEach(
            (key) => receiving_address[key] === undefined || receiving_address[key] === null ? delete receiving_address[key] : null
        );

    return receiving_address;
}


  async create(payload) {
    const receiving_address = this.extractReceivingAddressData(payload);
  
    const result = await this.ReceivingAddress.insertOne(receiving_address);
    return result;
  } 
  
  async find(filter){
    const cursor = await this.ReceivingAddress.find(filter).sort({_id: -1});
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" }
    });
  }

  async deleteOne(id) {
    const result = await this.ReceivingAddress.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null
    });
    return result;
  }


  async findByName(name){
      return await this.find({
          name: {$regex: new RegExp(name), $options: "i",},
      });
  }

  async deleteOne(id){
    const result = await this.ReceivingAddress.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
    });
    return result;
  } 

  async deleteAll(userId){
    const result = await this.ReceivingAddress.deleteMany({ userId: userId });
    return result;
  } 

  async update(id, payload){
    const filter = {
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null, 
    };
    const update = this.extractReceivingAddressData(payload);
    const result = await this.ReceivingAddress.findOneAndUpdate(
        filter,
        { $set: update },
        { returnDocument: "after" }
    );
    return result; 
  }
}

module.exports = ReceivingAddressService;
