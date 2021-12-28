const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose');
const db = require('./dbConfig.json');

const GraphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
  schema: GraphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true
})); 

mongoose.connect(
  `mongodb+srv://${db.env.MONGO_USER}:${db.env.MONGO_PASSWORD}@cluster0.s1qfa.mongodb.net/${db.env.MONGO_DB}?retryWrites=true&w=majority`
  
  ).then(() => {
  app.listen(3000)
})
.catch(err => {
  console.log(err)
});

// app.listen(3000)