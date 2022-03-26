const { createUser,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser,
    login, 
    signup} = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/signup", signup);
router.get("/",checkToken, getUsers);
router.get("/:id",checkToken, getUserByUserId);
router.patch("/",checkToken, updateUser);
router.delete("/",checkToken, deleteUser);
router.post("/login",login);
module.exports = router;