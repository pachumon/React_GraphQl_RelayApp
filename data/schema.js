import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from "graphql";

var Schema = db => {
  let linkType = new GraphQLObjectType({
    name: "Links",
    fields: () => ({
      _id: { type: GraphQLString },
      title: { type: GraphQLString },
      url: { type: GraphQLString }
    })
  });

  let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "Query",
      fields: () => ({
        links: {
          type: GraphQLList(linkType),
          resolve: () => db.collection("links").find({}).toArray()
        }
      })
    })
    // mutation: new GraphQLObjectType({
    //   name: "Mutation",
    //   fields: () => ({
    //     incrementCounter: {
    //       type: GraphQLInt,
    //       resolve: () => ++counter
    //     }
    //   })
    // })
  });
  return schema;
};
export default Schema;
