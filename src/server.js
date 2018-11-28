const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();

const schema = require("./graphql/schema");
const H = require("./helpers/helpers")
app.use(
  "/graph",
  graphqlHTTP(req => {
    return {
      schema,

      graphiql: true
    };
  })
);

app.listen(H.setting("PORT"));
console.log(`Listening ... on ${H.setting("PORT")}`);
