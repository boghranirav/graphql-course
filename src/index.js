import { GraphQLServer } from "graphql-yoga";

const userInfo = [
  {
    id: "1",
    name: "Nirav",
    email: "nirav@example.com",
    age: 27,
  },
  {
    id: "2",
    name: "abc",
    email: "abc@gmail.com",
    age: 23,
  },
  {
    id: "3",
    name: "xyz",
    email: "xyz@gmail.com",
    age: 31,
  },
];

const postInfo = [
  {
    id: "012",
    title: "My Context",
    body: "hello context",
    published: false,
  },
  {
    id: "013",
    title: "My Post 1",
    body: "Hi all",
    published: true,
  },
  {
    id: "014",
    title: "Post for 1st time",
    body: "This is my first post",
    published: false,
  },
];

//Type Definations(Schema)
const typeDefs = `
    type Query{
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
    }

    type User{
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post{
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`;

//Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return userInfo;
      }
      return userInfo.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return postInfo;
      }
      return postInfo.filter((post) => {
        return (
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
        );
      });
    },
    me() {
      return {
        id: "123",
        name: "ABC",
        email: "abc@gmail.com",
        age: 27,
      };
    },
    post() {
      return {
        id: "post123",
        title: "Title ABC",
        body: "Body ABC",
        published: true,
      };
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
