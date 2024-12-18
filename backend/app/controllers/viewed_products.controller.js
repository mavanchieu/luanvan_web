const ViewedProductsService = require("../services/viewed_products.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.productId) {
      return next(new ApiError(400, "Id không đươc trống"));
    }
    try {
      const viewedProductsService = new ViewedProductsService(MongoDB.client);
      const document = await viewedProductsService.create(req.body);
    
      return res.send(document);
    } catch (error) {
      return next(new ApiError(500, "Có lỗi trong quá trình tạo viewedProducts mới"));
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try{
        const viewedProductsService = new ViewedProductsService(MongoDB.client);
        const {name} = req.query;
        if (name){
            documents =  await viewedProductsService.findByName(name);
        }
        else {
            documents = await viewedProductsService.find({});
        }
    }catch(error){
        return next(
            new ApiError(500, "Có lỗi trong quá trình lấy danh sách dữ liệu viewedProducts")
        )
    }
    return res.send(documents);
};

exports.findByUserId = async (req, res, next) => {
    let documents = [];

    try{
        const viewedProductsService = new ViewedProductsService(MongoDB.client);
        const userId = req.params.userId;
        console.log(userId);
        if (userId){
            documents =  await viewedProductsService.findByUserId(userId);
        }
    }catch(error){
        return next(
            new ApiError(500, "Có lỗi trong quá trình lấy danh sách dữ liệu cart")
        )
    }
    return res.send(documents);
};

exports.deleteOne = async (req, res, next) =>{
    try{
        const viewedProductsService = new ViewedProductsService(MongoDB.client);
        const document = await viewedProductsService.deleteOne(req.params.id);
        if(!document){
            return next(new ApiError(404, "ViewedProducts không được tìm thấy"));
        }
        return res.send({message: "Bạn đã xóa loại sản phẩm thành công"});
    }catch(error){
        return next(
            new ApiError(
                500,
                `Không thể xóa viewedProducts với id=${req.params.id}`
            )
        );
    }
};

exports.deleteAll = async (req, res, next) =>{
    try{
        const viewedProductsService = new ViewedProductsService(MongoDB.client);
        const document = await viewedProductsService.deleteAll(req.params.userId);
        if(!document){
            return next(new ApiError(404, "ViewedProducts not found"));
        }
        return res.send({message: "All ViewedProducts was delete successfully"});
    }catch(error){
        return next(
            new ApiError(
                500,
                `Could not delete viewedProducts with id=${req.params.userId}`
            )
        );
    }
};

exports.update = async(req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400, "Dữ liệu cập nhật không được trống"));
    }
    try {
        const  viewedProductsService = new ViewedProductsService(MongoDB.client);
        const document = await viewedProductsService.update(req.params.id, {
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


