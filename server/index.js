require('dotenv').config()

const express = require('express')
const massive = require('massive')
const session = require('express-session')

const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env
const auth = require('./authController')

const app = express();

app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then( db => {
    app.set('db', db)
    console.log('Fully running Lord Swami')
}).catch(err => console.log(err))

//Auth endpoints
app.post('/auth/register', auth.register)
app.post('/auth/login', auth.login)
app.post('/auth/logout')

app.listen(SERVER_PORT, ()=>console.log(`Active on port ${SERVER_PORT}`))