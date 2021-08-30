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
    author: "1",
  },
  {
    id: "013",
    title: "My Post 1",
    body: "Hi all",
    published: true,
    author: "1",
  },
  {
    id: "014",
    title: "Post for 1st time",
    body: "This is my first post",
    published: false,
    author: "2",
  },
];

const commentInfo = [
  { id: "c01", text: "comment 1", author: "1", post: "012" },
  { id: "c02", text: "my cmt", author: "2", post: "012" },
  { id: "c03", text: "good post", author: "1", post: "013" },
  { id: "c04", text: "good morning", author: "3", post: "014" },
];

//Type Definations(Schema)
const typeDefs = `
    type Query{
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type User{
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post{
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User
        comments: [Comment!]!
    }

    type Comment{
      id: ID!
      text: String!
      author: User
      post: Post!
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
    comments(parent, args, ctx, info) {
      return commentInfo;
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
  Post: {
    author(parent, args, ctx, info) {
      return userInfo.find((user) => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return commentInfo.filter((comment) => {
        return comment.post === parent.id;
      });
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return postInfo.filter((post) => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return commentInfo.filter((comment) => {
        return comment.author === parent.id;
      });
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return userInfo.find((user) => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return postInfo.find((post) => {
        console.log("post,parent", post.id, parent.post);
        return post.id === parent.post;
      });
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
