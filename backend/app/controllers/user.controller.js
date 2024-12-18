const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

const jwt = require("jsonwebtoken");

exports.create = async (req, res, next) => {
  if (!req.body?.username) {
    return next(new ApiError(400, "Username can not be empty"));
  }
  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "An error occurred while creating the user"));
  }
};

exports.login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(username);

  try {
    const userService = new UserService(MongoDB.client);
    const user = await userService.findOne({ username, password });
    if (user) {
      // Tạo token tự động bởi jwt
      const token = jwt.sign({ username: user.username }, "your-secret-key", {
        expiresIn: "2h",
      });

      // gửi token đến user
      res.json({ token, message: `Welcome, ${user.username}`, user });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.error(error);
    return next(
      new ApiError(500, `Error retrieving user with username=${username}`)
    );
  }
};

exports.logout = (req, res) => {
  res.clearCookie("auth-token"); // thoát token
  res.status(200).json({ message: "Logout successful" });
};

exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const userService = new UserService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await UserService.findByName(name);
    } else {
      documents = await userService.find({});
    }
  } catch (error) {
    return next(new ApiError(500, "An error occurred while retrieving brands"));
  }
  return res.send(documents);
};

exports.findById = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "User not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving user with id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu cập nhật không được trống"));
  }
  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.update(req.params.id, {
      ...req.body,
    });
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy chi tiết người dùng"));
    }
    return res.send({ message: "Cập nhật người dùng thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi cập nhật người dùng với id=${req.params.id}`)
    );
  }
};

// cập nhật ảnh đại diện
exports.updateImage = async (req, res, next) => {
  // console.log(userId);
  try {
    if (!req.body.userId) {
      throw new ApiError(400, "Tên màu không được để trống");
    }
    const userId = req.body.userId;
    const image = req.file ? req.file.path : null;

    console.log(userId);

    const userService = new UserService(MongoDB.client);
    console.log("Image user data to be saved:", userId);

    const document = await userService.updateImage(userId, image);
    res.status(201).send(document);
  } catch (error) {
    console.error("Lỗi trong bộ điều khiển tạo:", error);
    next(new ApiError(500, "Đã xảy ra lỗi khi thay đổi ảnh đại diện"));
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.deleteOne(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Search not found"));
    }

    if (document == "Lỗi ràng buộc dữ liệu") {
      return next(new ApiError(404, "Lỗi ràng buộc dữ liệu"));
    }

    return res.send({ message: "Xóa tài khoản thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete search with id=${req.params.id}`)
    );
  }
};
