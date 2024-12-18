const SearchService = require("../services/search.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const { emitEvent } = require("../../socket.io");
const e = require("express");

exports.create = async (req, res, next) => {
    if (!req.body?.userId) {
      return next(new ApiError(400, "Name can not be empty"));
    }
    try {
        const searchService = new SearchService(MongoDB.client);
        const document = await searchService.create(req.body);
        
        emitEvent("createSearch" ,{searchId: document.insertedId});
        return res.send(document);
    } catch (error) {
      return next(new ApiError(500, "An error occurred while creating search"));
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try{
        const searchService = new SearchService(MongoDB.client);
        const {name} = req.query;
        if (name){
            documents =  await searchService.findByName(name);
        }
        else {
            documents = await searchService.find({});
        }
    }catch(error){
        return next(
            new ApiError(500, "An error occurred while retrieving searchs")
        )
    }
    return res.send(documents);
};

exports.deleteOne = async (req, res, next) =>{
    try{
        const searchService = new SearchService(MongoDB.client);
        const document = await searchService.deleteOne(req.params.id);
        if(!document){
            return next(new ApiError(404, "Search not found"));
        }

        emitEvent("deleteOneSearchName",{searchId: req.params.id});
        return res.send({message: "Bạn đã xóa tìm kiếm thành công"});
    }catch(error){
        return next(
            new ApiError(
                500,
                `Could not delete search with id=${req.params.id}`
            )
        );
    }
};

exports.findByUserId = async (req, res, next) => {
    let documents = [];

    try{
        const searchService = new SearchService(MongoDB.client);
        const userId = req.params.userId;
        // console.log(userId);
        if (userId){
            documents =  await searchService.findByUserId(userId);
        }
    }catch(error){
        return next(
            new ApiError(500, "Có lỗi trong quá trình lấy danh sách dữ liệu cart")
        )
    }
    return res.send(documents);
};

exports.deleteAll = async (req, res, next) =>{
    try{
        const searchService = new SearchService(MongoDB.client);
        const result = await searchService.deleteAll(req.params.userId);
        if (result && result.deletedCount > 0) {
            
            emitEvent('deletAllSearchName' ,{searchId: req.params.userId});
            return res.send({ message: "Bạn đã xóa tất cả lịch sử tìm kiếm thành công" });
          } else {
            return next(new ApiError(404, "Không có tìm kiếm nào để xóa"));
          }
    }catch(error){
        return next(
            new ApiError(
                500,
                `Could not delete search with id=${req.params.id}`
            )
        );
    }
};



