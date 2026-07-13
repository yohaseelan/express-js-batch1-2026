const express = require('express');

const app = express();
const port = 5000;
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' });
});

app.get('/student', (req, res) => {
    res.render('student/index', { title: 'Student Page', message: 'Welcome to the student page!' });
});
app.get('/student/:id', (req, res) => {
    const studentId = req.params.id;
    res.render('student/show', { title: 'Student Page', message: `Welcome to the student page for student ID: ${studentId}` });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});