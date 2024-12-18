const HelpService = require("../services/help.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.fullname) {
      return next(new ApiError(400, "Fullname can not be empty"));
    }
    try {
      const helpService = new HelpService(MongoDB.client);
      const document = await helpService.create(req.body);
    
      return res.send(document);
    } catch (error) {
      return next(new ApiError(500, "An error occurred while creating help"));
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try{
        const helpService = new HelpService(MongoDB.client);
        const {name} = req.query;
        if (name){
            documents =  await helpService.findByName(name);
        }
        else {
            documents = await helpService.find({});
        }
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while retrieving helps")
        )
    }
    return res.send(documents);
};

exports.findByUserId = async (req, res, next) => {
    let documents = [];

    try{
        const helpService = new HelpService(MongoDB.client);
        const userId = req.params.userId;
        // console.log(userId);
        if (userId){
            documents =  await helpService.findByUserId(userId);
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
        const helpService = new HelpService(MongoDB.client);
        const document = await helpService.deleteOne(req.params.id);
        if(!document){
            return next(new ApiError(404, "Help not found"));
        }
        return res.send({message: "Bạn đã xóa nhãn hiệu thành công"});
    }catch(error){
        return next(
            new ApiError(
                500,
                `Could not delete help with id=${req.params.id}`
            )
        );
    }
};

exports.update = async(req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const  helpService = new HelpService(MongoDB.client);
        const document = await helpService.update(req.params.id, {
            ...req.body,
            // image: req.file ? req.file.path : null,
        });
        if(!document){
            return next(new ApiError(404, "Không tìm thấy nhãn hiệu"));
        }
        return res.send({message: "Cập nhật nhãn hiệu thành công"});
    } catch(error){
        return next(
            new ApiError(500, `Lỗi cập nhật nhãn hiệu với id=${req.params.id}`)
        );
    }
}

exports.replyQuestion = async(req, res, next) => {

    try {
        console.log(req.body);
        const  helpService = new HelpService(MongoDB.client);
        const document = await helpService.replyQuestion(req.params.id, {
            ...req.body,
        });
        if(!document){
            return next(new ApiError(404, "Cập nhật không thành công "));
        }
        return res.send({message: "Trả lời thành công"});
    } catch(error){
        return next(
            new ApiError(500, `Lỗi cập nhật với id=${req.params.id}`)
        );
    }
}

