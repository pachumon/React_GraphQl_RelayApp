import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID
} from "graphql";

import {
  connectionDefinitions,
  connectionArgs,
  connectionFromPromisedArray,
  mutationWithClientMutationId,
  globalIdField
} from "graphql-relay";

var Schema = db => {
  let store = {};

  let storeType = new GraphQLObjectType({
    name: "Store",
    fields: () => ({
      id: globalIdField("Store"),
      linkConnection: {
        type: linkConnection.connectionType,
        args: connectionArgs,
        resolve: (_, args) => {
          console.log(args);
          return connectionFromPromisedArray(
            db
              .collection("links")
              .find({})
              .sort({ createdAt: -1 })
              .limit(args.first)
              .toArray(),
            args
          );
        }
      }
    })
  });

  let linkType = new GraphQLObjectType({
    name: "Link",
    fields: () => ({
      id: {
        type: new GraphQLNonNull(GraphQLID),
        resolve: obj => obj._id
      },
      _id: { type: GraphQLString },
      title: { type: GraphQLString },
      url: { type: GraphQLString },
      createdAt:{
        type:GraphQLString,
        resolve:(obj)=> new Date(obj.createdAt).toISOString()        
      }
    })
  });

  let linkConnection = connectionDefinitions({
    name: "Link",
    nodeType: linkType
  });

  let createLinkMutation = mutationWithClientMutationId({
    name: "CreateLink",
    inputFields: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      url: { type: new GraphQLNonNull(GraphQLString) }
    },
    outputFields: {
      linkEdge: {
        type: linkConnection.edgeType,
        resolve: obj => {
          return { node: obj.ops[0], cursor: obj.insertedId };
        }
      },
      store: {
        type: storeType,
        resolve: () => store
      }
    },
    mutateAndGetPayload: ({ title, url }) => {
      console.log("invoked createlink mutation");      
      return db
        .collection("links")
        .insertOne({ title, url, createdAt: Date.now() });
    }
  });

  let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "Query",
      fields: () => ({
        store: {
          type: storeType,
          resolve: () => store
        }
      })
    }),
    mutation: new GraphQLObjectType({
      name: "Mutation",
      fields: () => ({
        createLink: createLinkMutation
      })
    })
  });
  return schema;
};
export default Schema;
