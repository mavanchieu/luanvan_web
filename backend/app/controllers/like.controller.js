const LikeService = require("../services/like.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    try {
      const likeService = new LikeService(MongoDB.client);
      const document = await likeService.create(req.body);
    
      return res.send(document);
    } catch (error) {
      return next(new ApiError(500, "Có lỗi trong quá trình tạo like mới"));
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try{
        const likeService = new LikeService(MongoDB.client);
        const {name} = req.query;
        if (name){
            documents =  await likeService.findByName(name);
        }
        else {
            documents = await likeService.find({});
        }
    }catch(error){
        return next(
            new ApiError(500, "Có lỗi trong quá trình lấy danh sách dữ liệu like")
        )
    }
    return res.send(documents);
};

exports.deleteOne = async (req, res, next) =>{
    try{
        const likeService = new LikeService(MongoDB.client);
        const document = await likeService.deleteOne(req.params.id);
        if(!document){
            return next(new ApiError(404, "Like không được tìm thấy"));
        }
        return res.send({message: "Bạn đã xóa giới tính thành công"});
    }catch(error){
        return next(
            new ApiError(
                500,
                `Không thể xóa like với id=${req.params.id}`
            )
        );
    }
};

exports.update = async(req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400, "Dữ liệu cập nhật không được trống"));
    }
    try {
        const  likeService = new LikeService(MongoDB.client);
        const document = await likeService.update(req.params.id, {
            ...req.body,
            // image: req.file ? req.file.path : null,
        });
        if(!document){
            return next(new ApiError(404, "Không tìm thấy giới tính"));
        }
        return res.send({message: "Cập nhật giới tính thành công"});
    } catch(error){
        return next(
            new ApiError(500, `Lỗi cập nhật giới tính với id=${req.params.id}`)
        );
    }
}


