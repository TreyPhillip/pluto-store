var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var cors = require("cors");

//------Routers--------------
var accountRouter = require("./routes/account");
var indexRouter = require("./routes/product");
var profileRouter = require("./routes/profile");
var productCategoryRouter = require("./routes/productcategory");
var productsRouter = require("./routes/product");
var wishlistRouter = require("./routes/wishlist");
var shippingRouter = require("./routes/shippingaddress");

var paymentRouter = require("./routes/payment");
var orderRouter = require("./routes/orders");
var orderDetailRouter = require("./routes/orderdetail");
var purchaseHistoryRouter = require("./routes/purchasehistory");
var reviewRouter = require("./routes/review");

var app = express();

//use required packages
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//use create route api
app.use("/", indexRouter);
app.use("/", profileRouter);
app.use("/", accountRouter);
app.use("/", productCategoryRouter);
app.use("/", productsRouter);
app.use("/", wishlistRouter);
app.use("/", shippingRouter);

app.use("/", paymentRouter);
app.use("/", orderRouter);
app.use("/", orderDetailRouter);
app.use("/", purchaseHistoryRouter);
app.use("/", reviewRouter);
//export to be use o
module.exports = app;
