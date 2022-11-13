const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/.env'});
const express = require('express');
const colors = require('colors');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');
const port = process.env.PORT || 2121;

//Need express for this app
const app = express();

//Connect to database
connectDB();

app.use(cors());

app.use(
    '/graphql', graphqlHTTP({
        schema, graphiql: process.env.NODE_ENV === 'development',
    })
);

app.listen(port, console.log(`Server running on port ${port}, go catch it`));