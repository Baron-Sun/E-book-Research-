var express = require('express');
var app = express();
var proxy = require('http-proxy-middleware');
var bodyParser = require('body-parser')
const config = require('./config.js');
const session = require('express-session');
const fs = require('fs');
const path = require('path');


// app.use(cors());
app.use(bodyParser.json())

app.use(session({
    secret: 'sessiontest',
    resave: true,
    saveUninitialized: true,
    proxy: true
}));


//注册路由
app.use(express.static('./build'));


app.get('/', (req, res) => {

    res.render('./build/index.html')
})


// 代理
app.use('/_api2', proxy.createProxyMiddleware({
    // 代理跨域目标接口
    target: config.api2,
    changeOrigin: true,
    pathRewrite: {
        '^/_api2': '/'
    },
    onProxyRes: async function (proxyRes, req, res) {

        if (req.originalUrl.includes('/user/login')) {

            proxyRes.on('data', function (data) {
                data = data.toString('utf-8');
                let _data = JSON.parse(data)
                if (_data.detail) {
                    req.session.bookId = _data.detail.bookPointer
                    req.session.userType = _data.detail.userType
                }


            });
        }
    },
    onProxyReq: async function (proxyReq, req, res) {
        // check for whether the session be freshed
        if (req.originalUrl.includes('/unlock/addUnlock')) {
            let body = req.query
            console.log('body', body)
            if (body.bookId) {
                req.session.bookId = body.bookId
            }

        }
    }
}));


const book = require('./routes/book')

app.use('/book', book)

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', "index.html"));
})

var server = app.listen(config.port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log(`Example app listening at ${config.url}:${port}`);
});
