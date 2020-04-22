require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./queries');
const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: "50mb"}));

app.engine('html', require('ejs').renderFile);
app.use(express.static('/views'));
app.use('/styles', express.static('./css'));
app.use('/scripts', express.static('./js'));

app.get('/', async (req, res) => {
    res.render('index.ejs', {
        tutors: await db.findAllTripTutors(),
        trips: await db.findAllTrips(),
        schedules: await db.findAllTripSchedules(),
        schools: await db.findAllSchools()
    });
});

app.post('/', async (req, res) => {
    await db.create(req.body);
    res.sendStatus(200);
});

app.post('/school', async (req, res) => {
    await db.createSchool(req.body);
    res.sendStatus(200);
});

app.post('/tutor', async (req, res) => {
    await db.createTutor(req.body);
    res.sendStatus(200);
});

app.delete('/', async (req, res) => {
    await db.removeTrip(req.query.id);
    res.sendStatus(200);
});

app.delete('/tutor', async (req, res) => {
    await db.removeTutor(req.query.id);
    res.sendStatus(200);
});

app.delete('/school', async (req, res) => {
    await db.removeSchool(req.query.id);
    res.sendStatus(200);
});

app.listen(8080);