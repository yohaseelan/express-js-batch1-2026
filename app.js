const express = require('express');
const layout = require('express-ejs-layouts');
const methodOverride = require('method-override');

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(layout);
app.use(express.static('public'));
app.set('layout', 'layouts/main');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use('/student', require('./routes/student.js'));
app.use('/grade', require('./routes/grade.js'));
app.use('/studentApi', require('./routes/studentApi.js'));

app.get('/', (req, res) => {
    res.render('index', { title: 'home', message: 'Hello there!' });
});
















app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});