const { SignUp, Login } = require("../controllers/AuthController.js");
const {
  Find,
  UserAssign,
  AssignDelete,
  GetStudents,
  StudentSearch,
  PeopleDelete,
  UserDelete,
} = require("../controllers/UserController.js");
const { userVerification } = require("../Middlewares/AuthMiddleware.js");
const {
  Check,
  HostelAssign,
  RoomCheck,
} = require("../controllers/HostelController.js");
const router = require("express").Router();

router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/", userVerification);
router.post("/check", Check);
router.post("/hostelassign", HostelAssign);
router.post("/userassign", UserAssign);
router.post("/search", StudentSearch);
router.post("/roomcheck", RoomCheck);

router.delete("/assigndelete/:id", AssignDelete);
router.delete("/peopledelete/:id", PeopleDelete);
router.delete("/userdelete/:id", UserDelete);

router.get("/find", Find);
router.get("/getstudents", GetStudents);

module.exports = router;
