import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from "graphql";

let counter=50

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: () => ({
      counter: {
        type: GraphQLInt,
        resolve: () => counter
      },
      message: {
        type: GraphQLString,
        resolve: () => "sample message"
      }
    })
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: () => ({
      incrementCounter: {
        type: GraphQLInt,
        resolve: () => ++counter
      }
    })
  })
});

export default schema;
