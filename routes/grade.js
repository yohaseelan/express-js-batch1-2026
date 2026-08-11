const express = require('express');
const methodOverride = require('method-override');
const db = require('../config/db.js');
const router = express.Router();

router.delete('/:id', (req, res) => {
    const gradeId = req.params.id;

    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('DELETE FROM grades WHERE id = ?', [gradeId], (err, results) => {
                if (err) {
                    res.send('Error executing query!' + err);
                } else {
                    res.redirect('/student');
                }
            });
        }
    });
});


router.get('/', (req, res) => {
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM grades order by id  desc limit 10 ', (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else {
                    console.log(results);
                    res.render('grade/index', { title: 'Grade Page', message: 'Welcome to the grade page!', grades: results });
                }
            });
        }
    });

});


router.get('/:id/show', (req, res) => {
    const gradeId = req.params.id;
    if (!gradeId) {
        res.status(400).send('Grade ID is required');
        return;
    }
    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM grades WHERE id = ?', [gradeId], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                }
                else if (results.length === 0) {
                    res.status(404).render('grade/not_found', { title: 'Grade not found', message: 'The requested grade was not found.' });
                }
                else {
                    console.log(results);
                    res.render('grade/show', { title: 'Grade show Page', message: `Welcome to the grade page for grade ID: ${gradeId}`, grade: results[0] });
                }
            });
        }
    });
});


router.get('/:id/edit', (req, res) => {
    const gradeId = req.params.id;

    if (!gradeId) {
        res.status(400).send('Grade ID is required');
        return;
    }

    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('SELECT * FROM grades WHERE id = ?', [gradeId], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else if (results.length === 0) {
                    res.status(404).render('grade/not_found', { title: 'Grade not found', message: 'The requested grade was not found.' });
                } else {
                    res.render('grade/edit', { title: 'Edit Grade ' + results[0].grade, grade: results[0] });
                }
            });
        }
    });
});

router.put('/:id', (req, res) => {
    const gradeId = req.params.id;
    const { grade } = req.body;

    if (!grade) {
        res.status(400).send('Grade is required');
        return;
    }

    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {
            db.query('UPDATE grades SET grade = ? WHERE id = ?', [grade, gradeId], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else {
                    res.redirect('/student');
                }
            });
        }
    });
});

router.get('/create', (req, res) => {
    res.render('grade/create', { title: 'Grade Create Page', message: 'Welcome to the grade create page!' });
});


router.post('/', (req, res) => {
    // res.send('Received data: ' + JSON.stringify(req.body));
    const { grade } = req.body;

    // res.send(`Received data: Grade - ${grade}`);
    if (!grade) {
        res.status(400).send('Grade is required');
        return;
    }


    db.connect((err) => {
        if (err) {
            res.send('Error connecting to the database!');
        } else {

            db.query('INSERT INTO grades (grade) VALUES (?)', [grade], (err, results) => {
                if (err) {
                    res.send('Error executing query!');
                } else {
                    res.redirect('/student');
                }
            });
        }
    });
});


module.exports = router;