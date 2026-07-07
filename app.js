const express = require('express');
const app = express();
const port = 5000;
const mypage = (req, res) => {
    res.send('<h1 style="color: blue;">Welcome to my page</h1>');
};
app.get('/', mypage);

app.get('/about', (req, res) => {
    let myname = "seelan";
    res.send(`<h1 style="color: green;">About Page</h1><p>Hello, my name is ${myname}.</p>`);
});
app.get('/contact', (req, res) => {
    res.send('<h1 style="color: red;">Contact Page</h1>');
});
app.get('/profile', (req, res) => {
    let myname = req.query.name || "Guest";
    let myage = req.query.age || "unknown";
    res.send(`<h1 style="color: red;">Profile Page</h1><p>Hello, my name is ${myname} and I am ${myage} years old.</p>`);
});
app.get('/myinfo/:name/:age', (req, res) => {
    let myname = req.params.name || "Guest";
    let myage = req.params.age || "unknown";
    res.send(`<h1 style="color: red;">my info Page</h1><p>Hello, my name is ${myname} and I am ${myage} years old.</p>`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});