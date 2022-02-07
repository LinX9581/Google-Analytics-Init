import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import './global'
import indexRouter from './routes/index-router.js'
import './routes/allSchedule' //每日數據存入排程
import './test/customData.js' //資料測試

const app = express();
const http = require('http').Server(app);
const host = '0.0.0.0';
const port = process.env.PORT || 3009;

app.use(bodyParser.json());
app.set("views", "views/");
app.set("view engine", "ejs");
app.use(cors());
app.use(express.static('public')); //靜態檔案放置區
app.use('/', indexRouter);

http.listen(port, host, function() {
    console.log("Server started.......");
});