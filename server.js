require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const users = require('./users')
const transactions = require('./transactions')
const PORT = process.env.PORT ?? 5000

app.use(express.json())

//middleware for protecting secret routes, call it when you need to protect secret routes
const verifyToken = (req, res, next) => {
    try {
        const authToken = req.headers.token

        //validate token
        const decoded = jwt.verify(authToken, process.env.TOKEN_SECRET)

        //if valid, retrieve username from token
        const username = decoded.data
        req.user = username

        next()
    } catch (error) {
        res.sendStatus(403)
    }
}

app.get('/', (req, res) => {
    res.send('hello world')
})

app.post('/login', (req, res) => {
    const { username, password } = req.body

    if (users[username].password === password) {
        //authenticate and create the jwt
        const newToken = jwt.sign(
            {
                data: username,
            },
            process.env.TOKEN_SECRET,
            { expiresIn: 60 * 60 }
        )

        res
        .status(200)
        .cookie('NewCookie', newToken, { path: '/', httpOnly: true })
        .send('cookie')
    } else {
        res.status(403).send('Unauthorised')
    }
})
//testing

app.post('/post', verifyToken, (req, res) => {

    const username = req.user
    const userTransactions = transactions[username]

    res.status(200).json({ transactions: userTransactions })
})

app.post('/logout', (req, res)=>{
    res.clearCookie('NewCookie').send('cookie dead')
})


app.listen(PORT, () => {
    console.log('Listening at port 3000')
})