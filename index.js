const express = require("express");
const app = express();
const cors = require("cors");
const cookie = require("cookie-parser");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dbConnect = require("./src/config/dbconnect");
const dotenv = require("dotenv").config();
const authRouter = require("./src/routers/authRouter");
const productRouter = require("./src/routers/productRouter");
const blogRouter = require("./src/routers/blogRouter");
const prodcategoryRouter = require("./src/routers/prodcategoryRouter");
const blogcatRouter = require("./src/routers/blogcatRouter");
const brandRouter = require("./src/routers/brandRouter");
const couponRouter = require("./src/routers/couponRouter");
const { notFound, errHandler } = require("./src/middlewares/errHandler");
const swaggerUI = require("swagger-ui-express");
const swaggeJSDoc = require("swagger-jsdoc");
dbConnect();
const PORT = process.env.PORT || 3000;

app.use(cookie());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("common"));

app.use("/api/v1/user", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/prodcategory", prodcategoryRouter);
app.use("/api/v1/blogcat", blogcatRouter);
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/coupon", couponRouter);

app.listen(PORT, () => {
  console.log(`Sever is running at PORT ${PORT}`);
});

// swagger config
const swaggerOption = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Documents",
      version: "2.0.0.2",
    },
  },
  apis: ["./routers/*.js"],
};

const swaggerDocs = swaggeJSDoc(swaggerOption);
app.use("/", (req, res) => {
  res.send("SEVER ON!!!");
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(notFound);
app.use(errHandler);
