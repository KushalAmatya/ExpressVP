"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var import_express3 = __toESM(require("express"));
var import_dotenv = __toESM(require("dotenv"));

// src/routes/auth.routes.ts
var import_express = __toESM(require("express"));

// src/controllers/authController.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));

// src/model/authModel.ts
var import_mongoose = __toESM(require("mongoose"));
var UserSchema = new import_mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});
var authUser = import_mongoose.default.model("auth", UserSchema);
var authModel_default = authUser;

// src/controllers/authController.ts
var import_bcrypt = __toESM(require("bcrypt"));
var login = (req, res) => __async(void 0, null, function* () {
  const { email, password } = req.body;
  try {
    const existingUser = yield authModel_default.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const passwordCorrect = import_bcrypt.default.compareSync(password, existingUser.password);
    if (!passwordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const authToken = import_jsonwebtoken.default.sign(
      { email: existingUser.email, userId: existingUser._id },
      process.env.SECRET,
      { expiresIn: "1d" }
    );
    console.log(authToken);
    res.json({ authToken });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err });
  }
});
var register = (req, res) => __async(void 0, null, function* () {
  const { name, email, password } = req.body;
  try {
    const existingUser = yield authModel_default.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = yield import_bcrypt.default.genSalt(10);
    const hashedPassword = yield import_bcrypt.default.hash(password, salt);
    const newUser = new authModel_default({
      name,
      email,
      password: hashedPassword
    });
    yield newUser.save();
    res.status(201).json({ message: "User registered successfully", email });
  } catch (err) {
    res.status(500).json({ message: "Error registering user", error: err });
  }
});

// src/middleware/validationMiddleware.ts
var import_zod = require("zod");
var import_http_status_codes = require("http-status-codes");
function validateData(schema) {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof import_zod.ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`
        }));
        res.status(import_http_status_codes.StatusCodes.BAD_REQUEST).json({ error: "Invalid data", details: errorMessages });
      } else {
        res.status(import_http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
      }
    }
  };
}

// src/schemas/authSchema.ts
var import_zod2 = require("zod");
var authRegistrationSchema = import_zod2.z.object({
  name: import_zod2.z.string().min(2).max(255),
  email: import_zod2.z.string().email(),
  password: import_zod2.z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,16}$/)
});
var authLoginSchema = import_zod2.z.object({
  email: import_zod2.z.string().email(),
  password: import_zod2.z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,16}$/)
});

// src/routes/auth.routes.ts
var authRouter = import_express.default.Router();
authRouter.post("/login", validateData(authLoginSchema), login);
authRouter.post("/register", validateData(authRegistrationSchema), register);
var auth_routes_default = authRouter;

// src/routes/app.routes.ts
var import_express2 = __toESM(require("express"));

// src/middleware/authValidationMiddleware.ts
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var SECRET_KEY = process.env.SECRET;
console.log("env token", SECRET_KEY, process.env.SECRET);
var isAuth = (req, res, next) => __async(void 0, null, function* () {
  var _a;
  try {
    console.log("req.headers", req.header);
    const token = (_a = req.header("Authorization")) == null ? void 0 : _a.slice(7);
    console.log("header token", token);
    console.log("env token", SECRET_KEY, process.env.SECRET);
    if (!token) {
      throw new Error();
    }
    const decoded = import_jsonwebtoken2.default.verify(token, process.env.SECRET);
    req.token = decoded;
    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
});

// src/routes/app.routes.ts
var import_multer = __toESM(require("multer"));

// src/model/appModel.ts
var import_mongoose2 = __toESM(require("mongoose"));
var AppSchema = new import_mongoose2.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  }
});
var appModel = import_mongoose2.default.model("app", AppSchema);

// src/controllers/appController.ts
var addTodo = (req, res) => __async(void 0, null, function* () {
  const dataModel = new appModel({
    title: req.body.title,
    description: req.body.description
  });
  yield dataModel.save();
  res.json({ message: "Todo added successfully" });
});
var getTodos = (req, res) => __async(void 0, null, function* () {
  const todos = yield appModel.find({});
  res.json(todos);
});
var deleteTodo = (req, res) => __async(void 0, null, function* () {
  yield appModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted successfully" });
});
var updateTodo = (req, res) => __async(void 0, null, function* () {
  if (!req.body.title || !req.body.description) {
    return res.status(400).json({ message: "Please provide all details" });
  }
  if (!req.query.id) {
    return res.status(400).json({ message: "Please provide id" });
  }
  yield appModel.findByIdAndUpdate(req.query.id, {
    title: req.body.title,
    description: req.body.description
  });
  res.json({ message: "Todo updated successfully" });
});

// src/routes/app.routes.ts
var appRouter = import_express2.default.Router();
var upload = (0, import_multer.default)({ dest: "uploads/" });
appRouter.post("/add", upload.single("image"), isAuth, addTodo);
appRouter.get("/todos", isAuth, getTodos);
appRouter.delete("/delete/:id", isAuth, deleteTodo);
appRouter.put("/update", isAuth, updateTodo);
var app_routes_default = appRouter;

// src/index.ts
var import_cors = __toESM(require("cors"));
var import_helmet = __toESM(require("helmet"));
var import_mongoose3 = __toESM(require("mongoose"));
import_dotenv.default.config();
var app = (0, import_express3.default)();
var PORT = process.env.PORT || 5e3;
app.use((0, import_cors.default)());
app.use((0, import_helmet.default)());
app.use(import_express3.default.json());
app.use("/auth", auth_routes_default);
app.use("/", app_routes_default);
import_mongoose3.default.connect(process.env.DB).then(() => {
  console.log("Connected to the database");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
//# sourceMappingURL=index.js.map