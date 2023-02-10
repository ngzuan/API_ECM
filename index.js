const express = require("express");
const app = express();
const cors = require("cors");
const cookie = require("cookie-parser");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dbConnect = require("./config/dbconnect");
const dotenv = require("dotenv").config();
const authRouter = require("./routers/authRouter");
const productRouter = require("./routers/productRouter");
const blogRouter = require("./routers/blogRouter");
const prodcategoryRouter = require("./routers/prodcategoryRouter");
const blogcatRouter = require("./routers/blogcatRouter");
const brandRouter = require("./routers/brandRouter");
const couponRouter = require("./routers/couponRouter");
const { notFound, errHandler } = require("./middlewares/errHandler");
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
  apis: ["./router/*.js"],
};

const swaggerDocs = swaggeJSDoc(swaggerOption);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(notFound);
app.use(errHandler);
