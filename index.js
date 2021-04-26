require('dotenv').config();
const express = require('express')
const app = express()
const http = require('http').Server(app);


// Khởi tạo paypal
var paypal = require('paypal-rest-sdk');

// const io = require('socket.io')(http);

const cors = require("cors");
var upload = require('express-fileupload');
const port = 8000

const ProductAPI = require('./API/Router/product.router')
const UserAPI = require('./API/Router/user.router')
const CartAPI = require('./API/Router/cart.router')
const OrderAPI = require('./API/Router/order.router')
const HistoryAPI = require('./API/Router/history.router')
const CommentAPI = require('./API/Router/comment.router')
const DeliveryAPI = require('./API/Router/delivery.router')
const CategoryAPI = require('./API/Router/category.router')

const ProductAdmin = require('./API/Router/admin/product.router')

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to database ')
})
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });


app.use('/', express.static('public'))
app.use(upload());

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// Cài đặt config cho paypal
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': process.env.CLIENT_ID, // Thông số này copy bên my account paypal
  'client_secret': process.env.CLIENT_SECRET // Thông số này cùng vậy
});

app.use('/api/Product', ProductAPI)
app.use('/api/User', UserAPI)
app.use('/api/Cart', CartAPI)
app.use('/api/Payment', OrderAPI)
app.use('/api/History', HistoryAPI)
app.use('/api/Comment', CommentAPI)
app.use('/api/Delivery', DeliveryAPI)
app.use('/api/Category', CategoryAPI)

app.use('/api/admin/Product', ProductAdmin)


http.listen(port, () => {
  console.log('listening on *: ' + port);
});