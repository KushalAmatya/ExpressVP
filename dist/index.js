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

// src/index.ts
var import_express2 = __toESM(require("express"));
var import_dotenv = __toESM(require("dotenv"));

// src/routes/auth.routes.ts
var import_express = __toESM(require("express"));

// src/controllers/authController.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var login = (req, res) => {
  const { email, password } = req.body;
  const authToken = import_jsonwebtoken.default.sign(
    { email, password },
    process.env.SECRET,
    { expiresIn: "1h" }
  );
  console.log(authToken);
  res.json({ email, password, authToken });
};
var register = (req, res) => {
  const { name, email, password } = req.body;
  res.json({ name, email, password });
};

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

// src/index.ts
var import_cors = __toESM(require("cors"));
var import_helmet = __toESM(require("helmet"));
import_dotenv.default.config();
var app = (0, import_express2.default)();
var PORT = process.env.PORT || 5e3;
app.use((0, import_cors.default)());
app.use((0, import_helmet.default)());
app.use(import_express2.default.json());
app.use("/auth", auth_routes_default);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map