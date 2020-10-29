const functions = require('firebase-functions');
const express = require ('express')
const mongoose = require ('mongoose')
const cors = require ('cors')

const  { username, password } = functions.config().mongo

const url = `mongodb://${username}:${password}@cluster1-shard-00-00.fbwre.mongodb.net:27017,cluster1-shard-00-01.fbwre.mongodb.net:27017,cluster1-shard-00-02.fbwre.mongodb.net:27017/api-rest-movies?ssl=true&replicaSet=atlas-l765k5-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const app= express()

const Movies = require('./movies')

const createServer = () => {

    app.use(cors({origin:true}))
    app.get('/movies', async (req, res) => {


        const resultado = await Movies.find({}).exec()
        res.send(resultado)
    })

    app.post('/movies', async (req, res) => {

        const { body } = req

        const resultado2 = new Movies(body)

        await resultado2.save()
        res.sendStatus(204)
    })

    app.get('/movies/:id/daralta', async (req, res) => {

        const {id} = req.params
        
        await Movies.deleteOne({_id: id}).exec()
        res.sendStatus(204)
    })

    return app
}

 exports.api = functions.https.onRequest(createServer());
