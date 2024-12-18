const FavoriteService = require("../services/favorite.service");
const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const { emitEvent } = require("../../socket.io");
// Add book
exports.create = async (req, res, next) => {
  if (!req.body?.userId) {
    return next(new ApiError(400, "UserId can not empty"));
  }
  try {
    const favoriteService = new FavoriteService(MongoDB.client);
    const document = await favoriteService.create(req.body);
    emitEvent("createFavorite", { idFav: document.insertedId });
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "An error occurred while creating favorite"));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const favoriteService = new FavoriteService(MongoDB.client);
    const { userId } = req.query;
    if (userId) {
      documents = await favoriteService.findByMdg(userId);
    } else {
      documents = await favoriteService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving favorites")
    );
  }
  return res.send(documents);
};

exports.findByUserId = async (req, res, next) => {
  let documents = [];

  try {
    const favoriteService = new FavoriteService(MongoDB.client);
    const userId = req.params.userId;
    // console.log(userId);
    if (userId) {
      documents = await favoriteService.findByUserId(userId);
    }
  } catch (error) {
    return next(
      new ApiError(500, "Có lỗi trong quá trình lấy danh sách dữ liệu cart")
    );
  }
  return res.send(documents);
};

exports.deleteOne = async (req, res, next) => {
  try {
    const favoriteService = new FavoriteService(MongoDB.client);
    const document = await favoriteService.deleteOne(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Favorite not found"));
    }
    emitEvent("deleteOneFavorite", { idFav: req.params.id });
    return res.send({ message: "Favorite was delete successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete favorite with id=${req.params.id}`)
    );
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const favoriteService = new FavoriteService(MongoDB.client);
    const document = await favoriteService.deleteAll(req.params.userId);
    if (!document) {
      return next(new ApiError(404, "Favorite not found"));
    }
    emitEvent("deleteAllFavorite", { userId: req.params.userId });
    return res.send({ message: "All Favorites was delete successfully" });
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Could not delete favorite with id=${req.params.userId}`
      )
    );
  }
};

// exports.updateStatus = async(req, res, next) => {
//     try {
//         const  borrowService = new BorrowService(MongoDB.client);
//         const document = await borrowService.updateStatus(req.params.id);
//         if(!document){
//             return next(new ApiError(404, "Borrow not found"));
//         }
//         return res.send({message: "Borrow was update successfully"});
//     } catch(error){
//         return next(
//             new ApiError(500, `Error updating borrow with id=${req.params.id}`)
//         );
//     }
// };
