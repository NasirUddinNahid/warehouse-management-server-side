const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
require('dotenv').config()
const { decode } = require('jsonwebtoken');
const app = express();
const cors = require('cors')
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors())


function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ message: 'Unauthorized access' })
    }

    const token = authHeader?.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Forbidden' })
        }
        req.decoded = decoded;

    })
    next()
}

const uri = `mongodb+srv://${process.env.DB_userName}:${process.env.SECRET_KEY_mongoDB}@cluster0.ezv3m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
console.log(uri);


run().catch(console.dir);
app.get('/', (req, res) => {
    res.send("running server")
})

app.listen(port, () => {
    console.log(` listening on port ${port}`)
})