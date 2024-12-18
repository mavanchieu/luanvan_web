const SizeService = require("../services/size.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
      return next(new ApiError(400, "Tên không đươc trống"));
    }
    try {
      const sizeService = new SizeService(MongoDB.client);
      const document = await sizeService.create(req.body);
    
      return res.send(document);
    } catch (error) {
      return next(new ApiError(500, "Có lỗi trong quá trình tạo size mới"));
    }
};


// lấy tất cả sizes đã có kết nối bảng
exports.findAll = async (req, res, next) => {
    let documents = [];

    try{
        const sizeService = new SizeService(MongoDB.client);
        const {name} = req.query;
        if (name){
            documents =  await sizeService.findByName(name);
        }
        else {
            documents = await sizeService.find({});
        }
    }catch(error){
        return next(
            new ApiError(500, "Có lỗi trong quá trình lấy danh sách dữ liệu size")
        )
    }
    return res.send(documents);
};

exports.getAll = async (req, res, next) => {
    let documents = [];

    try{
        const sizeService = new SizeService(MongoDB.client);
        const {name} = req.query;
        if (name){
            documents =  await sizeService.findByName(name);
        }
        else {
            documents = await sizeService.getAll({});
        }
    }catch(error){
        return next(
            new ApiError(500, "Có lỗi trong quá trình lấy danh sách dữ liệu size")
        )
    }
    return res.send(documents);
};


// lấy nguyên vẹn csdl sizes


exports.deleteOne = async (req, res, next) =>{
    try{
        const sizeService = new SizeService(MongoDB.client);
        const document = await sizeService.deleteOne(req.params.id);
        if(!document){
            return next(new ApiError(404, "Size không được tìm thấy"));
        }
        return res.send({message: "Bạn đã xóa loại sản phẩm thành công"});
    }catch(error){
        return next(
            new ApiError(
                500,
                `Không thể xóa size với id=${req.params.id}`
            )
        );
    }
};

exports.update = async(req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400, "Dữ liệu cập nhật không được trống"));
    }
    try {
        const  sizeService = new SizeService(MongoDB.client);
        const document = await sizeService.update(req.params.id, {
            ...req.body,
            // image: req.file ? req.file.path : null,
        });
        if(!document){
            return next(new ApiError(404, "Không tìm thấy loại sản phẩm"));
        }
        return res.send({message: "Cập nhật loại sản phẩm thành công"});
    } catch(error){
        return next(
            new ApiError(500, `Lỗi cập nhật loại sản phẩm với id=${req.params.id}`)
        );
    }
}


