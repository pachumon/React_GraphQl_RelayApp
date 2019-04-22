import express from "express";
import { MongoClient } from "mongodb";
import GraphQLHTTP from "express-graphql";
import schema from "./data/schema";

let app = express();

app.use(express.static("public"));
app.use(express.static("dist"));

//applied async constructs to avoid calls backs for mongoclient
(async () => {
  let client = await MongoClient.connect("mongodb://localhost:27017/courses");
  let db = client.db("courses");  
  app.use(
    "/graphql",
    GraphQLHTTP({
      schema: schema(db),
      graphiql: true
    })
  );
  app.listen(3000, () => console.log("app listening at port 3000"));
})();

