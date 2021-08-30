import { GraphQLServer } from "graphql-yoga";
import uuidv4 from "uuid/v4";

let userInfo = [
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

let postInfo = [
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

let commentInfo = [
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

    type Mutation{
      createUser(data: CreateUserInput!): User!
      deleteUser(id: ID!): User!
      createPost(data: CreatePostInput!): Post!
      deletePost(id: ID!): Post!
      createComment(data: CreateCommentInput!): Comment!
      deleteComment(id: ID!): Comment!
    }

    input CreateUserInput{
      name: String!
      email: String!
      age: Int
    }

    input CreatePostInput{
      title: String!
      body: String!
      published: Boolean!
      author: ID!
    }

    input CreateCommentInput{
      text: String!
      author: ID!
      post: ID!
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
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = userInfo.some(
        (user) => user.email === args.data.email
      );

      if (emailTaken) {
        throw new Error("Email Taken.");
      }

      const user = {
        id: uuidv4(),
        ...args.data,
      };

      userInfo.push(user);

      return user;
    },
    deleteUser(parent, args, ctx, info){
      const userIndex =userInfo.findIndex((user)=>user.id===args.id)

      if(userIndex===-1){
        throw new Error("User not found.")
      }

      const deletedUser=userInfo.splice(userIndex,1);

      postInfo=postInfo.filter((post)=>{
        const match=post.id===args.id

        if(match){
          commentInfo=commentInfo.filter((comment)=> comment.post !== post.id) 
        }
        return !match;
      })
          commentInfo=commentInfo.filter((comment)=>comment.author !== args.id) 

      return deletedUser[0];
    },
    createPost(parent, args, ctx, info) {
      const userExist = userInfo.some((user) => user.id === args.data.author);
      if (!userExist) throw new Error("User not found.");

      const post = {
        id: uuidv4(),
        ...args.data,
      };

      postInfo.push(post);

      return post;
    },
    deletePost(parent, args, ctx, info){
      const postIndex =postInfo.findIndex((post)=>post.id===args.id)

      if(postIndex===-1){
        throw new Error("Post not found.")
      }

      const deletedPost=postInfo.splice(postIndex,1);
      commentInfo=commentInfo.filter((comment) => comment.post!==args.id);
      return deletedPost[0];
    },
    createComment(parent, args, ctx, info) {
      const userExist = userInfo.some((user) => user.id === args.data.author);

      const postExist = postInfo.some(
        (post) => post.id === args.data.post && post.published === true
      );

      if (!userExist) throw new Error("User not found.");
      if (!postExist) throw new Error("Post does not exist.");

      const comment = {
        id: uuidv4(),
        ...args.data,
      };

      commentInfo.push(comment);
      return comment;
    },
    deleteComment(parent, args, ctx, info){
      const commentIndex =commentInfo.findIndex((comment)=>comment.id===args.id)

      if(commentIndex===-1){
        throw new Error("Comment not found.")
      }
      const deletedComment=commentInfo.splice(commentIndex,1);
      return deletedComment[0];

    }
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
