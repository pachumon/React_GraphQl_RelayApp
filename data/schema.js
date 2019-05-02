import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from "graphql";

var Schema = db => {
  let store={};

  let storeType = new GraphQLObjectType({
    name: "Store",
    fields: () => ({
      links: {
        type: GraphQLList(linkType),
        resolve: () =>
          db
            .collection("links")
            .find({})
            .toArray()
      }
    })
  });

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
        store:{
          type:storeType,
          resolve:()=>store
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
