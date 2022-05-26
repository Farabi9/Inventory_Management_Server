const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId, ObjectID } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

//middleware
app.use(express.json())
app.use(cors())






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gkgv3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const toolCollection = client.db('phone-pear').collection('tools');
        const userCollection = client.db('phone-pear').collection('users');
        const productCollection = client.db('phone-pear').collection('products');
        const reviewCollection = client.db('phone-pear').collection('reviews');
        const orderCollection = client.db('phone-pear').collection('orders');



        app.get('/tools', async (req, res) => {
            const query = {};
            const result = await toolCollection.find(query).toArray();
            res.send(result);
        })

        app.get('/tools/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await toolCollection.findOne(query);
            res.send(result)
        })
        app.post('/products', async (req, res) => {
            const product = req.body;
            const result = await productCollection.insertOne(product);
            res.send(result);
        })
        app.get('/products', async (req, res) => {
            const query = {};
            const result = await productCollection.find(query).toArray()
            res.send(result);
        })

        app.post('/addreview', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })

        app.get('/review', async(req, res) =>{
            const query = {};
            const result = await reviewCollection.find(query).toArray();
            res.send(result) 
        })

        app.post('/addorder', async(req, res) =>{
                 const order = req.body;
                 const result = await orderCollection.insertOne(order);
                 res.send(result)
        })

        app.get('/addorder/:email', async(req, res) =>{
            const email = req.params.email;
            const query = {email: email};
            const myOrders = await orderCollection.find(query).toArray()
            res.send(myOrders);  
        })

        app.get('/orders', async(req, res) =>{
            const query = {};
            const result = await orderCollection.find(query).toArray();
            res.send(result)
        })

    app.post('/users', async(req, res) =>{
        const user = req.body;
        const result = await userCollection.insertOne(user)
        res.send(result)
    })

    app.get('/users', async(req, res) =>{
        const query = {};
        const result = await userCollection.find(query).toArray()
        res.send(result)
    })


    }
    finally {

    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})