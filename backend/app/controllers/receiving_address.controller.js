const ReceivingAddressService = require("../services/receiving_address.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.userId) {
      return next(new ApiError(400, "UserId can not be empty"));
    }
    try {
      const receivingAddressService = new ReceivingAddressService(MongoDB.client);
      const document = await receivingAddressService.create(req.body);
      return res.send(document);
    } catch (error) {
      return next(new ApiError(500, "An error occurred while creating receivingAddress"));
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try{
        const receivingAddressService = new ReceivingAddressService(MongoDB.client);
        const {name} = req.query;
        if (name){
            documents =  await receivingAddressService.findByName(name);
        }
        else {
            documents = await receivingAddressService.find({});
        }
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while retrieving receiving_address")
        )
    }
    return res.send(documents);
};

exports.deleteOne = async (req, res, next) =>{
    try{
        const receivingAddressService = new ReceivingAddressService(MongoDB.client);
        const document = await receivingAddressService.deleteOne(req.params.id);
        if(!document){
            return next(new ApiError(404, "ReceivingAddress not found"));
        }
        return res.send({message: "Bạn đã xóa địa chỉ thành công"});
    }catch(error){
        return next(
            new ApiError(
                500,
                `Could not delete receiving_address with id=${req.params.id}`
            )
        );
    }
};

exports.deleteAll = async (req, res, next) =>{
    try{
        const receivingAddressService = new ReceivingAddressService(MongoDB.client);
        const result = await receivingAddressService.deleteAll(req.params.userId);
        if (result && result.deletedCount > 0) {
            return res.send({ message: "Bạn đã xóa tất địa chỉ nhận hàng thành công" });
          } else {
            return next(new ApiError(404, "Không có địa chỉ nào để xóa"));
          }
    }catch(error){
        return next(
            new ApiError(
                500,
                `Could not delete receiving_address with id=${req.params.id}`
            )
        );
    }
};

exports.update = async(req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400, "Dữ liệu cập nhật không được trống"));
    }
    try {
        const  receivingAddressService = new ReceivingAddressService(MongoDB.client);
        const document = await receivingAddressService.update(req.params.id, {
            ...req.body,
            // image: req.file ? req.file.path : null,
        });
        if(!document){
            return next(new ApiError(404, "Không tìm thấy địa chỉ nhận hàng"));
        }
        return res.send({message: "Cập nhật địa chỉ nhận hàng thành công"});
    } catch(error){
        return next(
            new ApiError(500, `Lỗi cập nhật địa chỉ nhận hàng với id=${req.params.id}`)
        );
    }
}




