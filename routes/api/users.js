const express = require("express");
const router = express.Router();
const hashService = require("../../utils/hash/hashService");
const {
  registerUserValidation,
  loginUserValidation,
  userIdValidation,
  userUpdatedValidation,
} = require("../../validation/authValidationService");
const normalizeUser = require("../../model/usersService/helpers/normalizationUserService");
const usersServiceModel = require("../../model/usersService/usersService");
const { generateToken } = require("../../utils/token/tokenService");
const CustomError = require("../../utils/CustomError");
const authmw = require("../../middleware/authMiddleware");
const permissionsMiddleware = require("../../middleware/permissionsMiddleware");
const cardsValidationService = require("../../validation/cardsValidationService");
const chalk = require("chalk");

//http://localhost:8181/api/users
router.post("/", async (req, res) => {
  try {
    await registerUserValidation(req.body);
    req.body.password = await hashService.generateHash(req.body.password);
    user = normalizeUser(req.body);
    await usersServiceModel.registerUser(user);
    res.json(user);
  } catch (err) {
    res.status(404).json(err);
  }
});

//http://localhost:8181/api/auth/login
router.post("/login", async (req, res) => {
  try {
    await loginUserValidation(req.body);
    const userData = await usersServiceModel.getUserByEmail(req.body.email);
    if (!userData) throw new CustomError("invalid email and/or password");
    const isPasswordMatch = await hashService.cmpHash(
      req.body.password,
      userData.password
    );
    if (!isPasswordMatch)
      throw new CustomError("invalid email and/or password");
    const token = await generateToken({
      _id: userData._id,
      isAdmin: userData.isAdmin,
      isBusiness: userData.isBusiness,
    });
    res.json({ token });
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get(
  "/",
  authmw,
  permissionsMiddleware(false, true, false),
  async (req, res) => {
    try {
      const users = await usersServiceModel.getAllUsers();
      res.json(users);
    } catch (err) {
      console.log(chalk.red("Failed to retrieve users:"));
      console.error(err);
      res.status(400).json({ error: "Failed to retrieve users" });
    }
  }
);

router.get(
  "/:id",
  authmw,
  permissionsMiddleware(false, true, false, true),
  async (req, res) => {
    try {
      // console.log("before", req.params.id);
      // await cardsValidationService.cardIdValidation(req.params.id);
      await userIdValidation(req.params.id);
      const userFromDB = await usersServiceModel.getUserById(req.params.id);
      res.json(userFromDB);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

router.put(
  "/:id",
  authmw,
  permissionsMiddleware(false, false, false, true),
  async (req, res) => {
    try {
      // await cardsValidationService.cardIdValidation(req.params.id);
      await userIdValidation(req.params.id);
      // console.log("aftervalid", req.params.id);
      await userUpdatedValidation(req.body);
      const normalUser = normalizeUser(req.body);
      const updatedUser = await usersServiceModel.updateUser(
        req.params.id,
        normalUser
      );
      if (updatedUser) {
        res.json({ msg: "the user is updated!", updatedUser });
      } else {
        throw new CustomError("didnt find the user");
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

router.patch(
  "/:id",
  authmw,
  permissionsMiddleware(false, false, false, true),
  async (req, res) => {
    try {
      await userIdValidation(req.params.id);
      await usersServiceModel.updateUserBizStatus(req.params.id);
      let updatedUser = await usersServiceModel.getUserById(req.params.id);

      res.status(200).json({ msg: "biz status is updated!", updatedUser });
    } catch (err) {
      console.log(chalk.red("User Patch Error:"));
      console.error(err);
      res.status(400).json(err);
    }
  }
);

router.delete(
  "/:id",
  authmw,
  permissionsMiddleware(false, true, false, true),
  async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await usersServiceModel.getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const deletedUser = await usersServiceModel.deleteUser(userId);
      res.json({
        msg: `user - ${deletedUser.name.firstName} ${deletedUser.name.lastName} deleted`,
      });
    } catch (err) {
      console.log(chalk.red("delete failed"));
      console.error(err);
      res.status(400).json({ error: "Failed to delete user" });
    }
  }
);

module.exports = router;
