import { GraphQLServer } from "graphql-yoga";

//Type Definations(Schema)
const typeDefs = `
    type Query{
        hello: String!
        name: String!
    }
`;

//Resolvers
const resolvers = {
  Query: {
    hello() {
      return "This is my first query (GraphQL).";
    },
    name() {
      return "Nirav Boghra";
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("Server is running...");
});
