const UsersDiscountCodeService = require("../services/usersDiscountCode.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    console.log(req.body.userId)
    if (!req.body?.userId) {
       
      return next(new ApiError(400, "UserId can not be empty"));
    }
    try {
      const usersDiscountCodeService = new UsersDiscountCodeService(MongoDB.client);
      const document = await usersDiscountCodeService.create(req.body);
    
      return res.send(document);
    } catch (error) {
      return next(new ApiError(500, "An error occurred while creating UsersDiscountCode"));
    }
};

exports.findDiscountByUserId = async (req, res, next) => {
  let documents = [];
  const userId = req.params.userId;
  console.log(userId);
  try{
      const userDiscountCodeService = new UsersDiscountCodeService(MongoDB.client);
      // const userId = req.params.userId;
      if (userId){
          documents =  await userDiscountCodeService.findDiscountByUserId(userId);
      }
  }catch(error){
      return next(
          new ApiError(500, "Có lỗi trong quá trình lấy danh sách dữ liệu cart")
      )
  }
  return res.send(documents);
};


// exports.deleteOne = async (req, res, next) =>{
//     try{
//         const usersUsersDiscountCodeService = new UsersDiscountCodeService(MongoDB.client);
//         const document = await usersUsersDiscountCodeService.deleteOne(req.params.id);
//         if(!document){
//             return next(new ApiError(404, "UsersDiscountCode not found"));
//         }
//         return res.send({message: "Bạn đã xóa nhãn hiệu thành công"});
//     }catch(error){
//         return next(
//             new ApiError(
//                 500,
//                 `Could not delete usersUsersDiscountCode with id=${req.params.id}`
//             )
//         );
//     }
// };

exports.update = async(req, res, next) => {
    try {
        const  usersDiscountCodeService = new UsersDiscountCodeService(MongoDB.client);
        const document = await usersDiscountCodeService.update(req.params.id);
        console.log("id", req.params.id);
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


