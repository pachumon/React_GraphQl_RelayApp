import express from "express";
import { MongoClient } from "mongodb";
import GraphQLHTTP from "express-graphql";
import Schema from "./data/schema";
import { graphql } from "graphql";
import { introspectionQuery } from "graphql/utilities";
import fs from "fs";

let app = express();

app.use(express.static("public"));
app.use(express.static("dist"));

//applied async constructs to avoid calls backs for mongoclient
(async () => {
  let client = await MongoClient.connect("mongodb://localhost:27017/courses");
  let db = client.db("courses");
  let schema = Schema(db);
  app.use(
    "/graphql",
    GraphQLHTTP({
      schema,
      graphiql: true
    })
  );
  app.listen(3000, () => console.log("app listening at port 3000"));

  let json = await graphql(schema, introspectionQuery);

  fs.writeFile("./data/schema.json", JSON.stringify(json.data, null, 2), err => {
    if (err) throw err;
    console.log("json schema created");
  });
})();
