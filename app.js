const express = require('express');
const path = require('path');
const methodOverride = require("method-override");
const app = express();
const port = 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
const mypage = (req, res) => {
    console.log(path.join(__dirname, 'pages', 'index.html'));
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
};
app.get('/', mypage);

app.get('/about', (req, res) => {

    res.sendFile(path.join(__dirname, 'pages', 'about.html'))
});
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'contact.html'))
});
app.get('/profile', (req, res) => {

    let myname = req.query.name || "Guest";
    let myage = req.query.age || "unknown";
    res.sendFile(path.join(__dirname, 'pages', 'profile.html'))
});
app.get('/myinfo/:name/:age', (req, res) => {
    let myname = req.params.name || "Guest";
    let myage = req.params.age || "unknown";
    res.sendFile(path.join(__dirname, 'pages', 'myinfo.html'))
});
app.get('/download', (req, res) => {

    // res.download(path.join(__dirname, 'files', 'doc-2.docx'), 'seelan.docx', (err) => {
    //     if (err) {
    //         console.log(err);
    //         res.status(404).send('Error downloading file');
    //     } else {

    //         console.log('File downloaded successfully');
    //         res.end();
    //     }
    // });
    res.download(path.join(__dirname, 'files', 'doc-2.docx'), (err) => {
        if (err) {
            console.log(err);
            res.status(404).send('Error downloading file');
        } else {

            console.log('File downloaded successfully');

        }
    });
});
app.get('/download-pdf', (req, res) => {

    res.sendFile(path.join(__dirname, 'files', '7.pdf'), (err) => {
        if (err) {
            console.log(err);
            res.status(404).send('Error downloading file');
        } else {

            console.log('File downloaded successfully');
            res.end();
        }
    });
});
app.get('/photo', (req, res) => {

    res.download(path.join(__dirname, 'files', 'yarlit.jpg'), (err) => {
        if (err) {
            console.log(err);
            res.status(404).send('Error downloading file');
        } else {

            console.log('File downloaded successfully');
            res.end();
        }
    });
});
app.put('/submit', (req, res) => {
    let fname = req.body.fname || "Guest";
    let lname = req.body.lname || "unknown";

    res.send(`Form submitted successfully for ${fname} ${lname}`);

});
app.get('/student', (req, res) => {

  res.send("show student details");
});
app.get('/student/:id', (req, res) => {
   let studentId = req.params.id;
  res.send(`show student details for student with ID: ${studentId}`);

});
app.post('/student', (req, res) => {
  res.send("create a new student");
});
app.put('/student/:id', (req, res) => {
  let studentId = req.params.id;
  res.send(`update student details for student with ID: ${studentId}`);
}); 
app.delete('/student/:id', (req, res) => {
  let studentId = req.params.id;
  res.send(`delete student with ID: ${studentId}`);
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});