const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded( {extended : false } )) //false: url 인코딩 안함

const ejs = require("ejs");
const path = require("path");

app.set("view engine", "ejs") // app에 view eingine 설치, ejs를 템풀릿으로
app.use(express.static(path.join(__dirname, '/'))) ;
app.use(express.static('views'))

app.get('/', (req, res) => {
    console.log("main ejs");
    res.render("main", {});
})

app.listen(port, () => {
    console.log(`Server is runnint at https://localhost:${port}`)
})
