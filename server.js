import express from "express";
import { MongoClient } from "mongodb";
import GraphQLHTTP from "express-graphql";
import schema from "./data/schema";

let app = express();

app.use(express.static("public"));
app.use(express.static("dist"));

app.use(
  "/graphql",
  GraphQLHTTP({
    schema,
    graphiql:true
  })
);

let db;

MongoClient.connect("mongodb://localhost:27017/courses", (err, client) => {
  if (err) throw err;
  db = client.db("courses");
  app.listen(3000, () => console.log("app listening at port 3000"));
});

app.get("/data/links", (req, res) => {
  db.collection("links")
    .find({})
    .toArray((err, links) => {
      if (err) throw err;

      res.json(links);
    });
});
