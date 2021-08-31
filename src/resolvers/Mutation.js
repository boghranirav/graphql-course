import uuidv4 from "uuid/v4";

const Mutation = {
  createUser(parent, args, { db }, info) {
    const emailTaken = db.userInfo.some(
      (user) => user.email === args.data.email
    );

    if (emailTaken) {
      throw new Error("Email Taken.");
    }

    const user = {
      id: uuidv4(),
      ...args.data,
    };

    db.userInfo.push(user);

    return user;
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = db.userInfo.findIndex((user) => user.id === args.id);

    if (userIndex === -1) {
      throw new Error("User not found.");
    }

    const deletedUser = db.userInfo.splice(userIndex, 1);

    postInfo = db.postInfo.filter((post) => {
      const match = post.id === args.id;

      if (match) {
        db.commentInfo = db.commentInfo.filter(
          (comment) => comment.post !== post.id
        );
      }
      return !match;
    });
    db.commentInfo = db.commentInfo.filter(
      (comment) => comment.author !== args.id
    );

    return deletedUser[0];
  },
  updateUser(parent, args, { db }, info) {
    const { id, data } = args;
    const user = db.userInfo.find((user) => user.id === id);

    if (!user) {
      throw new Error("User not found.");
    }

    if (typeof data.email === "string") {
      const emailTaken = db.userInfo.some((user) => user.email === data.email);

      if (emailTaken) {
        throw new Error("Email Taken.");
      }
      user.email = data.email;
    }

    if (typeof data.name === "string") {
      user.name = data.name;
    }

    if (typeof data.age !== "undefined") {
      user.age = data.age;
    }

    return user;
  },
  createPost(parent, args, { db }, info) {
    const userExist = db.userInfo.some((user) => user.id === args.data.author);
    if (!userExist) throw new Error("User not found.");

    const post = {
      id: uuidv4(),
      ...args.data,
    };

    db.postInfo.push(post);

    return post;
  },
  deletePost(parent, args, { db }, info) {
    const postIndex = db.postInfo.findIndex((post) => post.id === args.id);

    if (postIndex === -1) {
      throw new Error("Post not found.");
    }

    const deletedPost = db.postInfo.splice(postIndex, 1);
    db.commentInfo = db.commentInfo.filter(
      (comment) => comment.post !== args.id
    );
    return deletedPost[0];
  },
  updatePost(parent, args, { db }, info) {
    const { id, data } = args;

    const post = db.postInfo.find((post) => post.id === id);

    if (!post) {
      throw new Error("Post not found.");
    }

    if (typeof data.title === "string") {
      post.title = data.title;
    }

    if (typeof data.body === "string") {
      post.body = data.body;
    }
    if (typeof data.published === "boolean") {
      post.published = data.published;
    }

    return post;
  },
  createComment(parent, args, { db }, info) {
    const userExist = db.userInfo.some((user) => user.id === args.data.author);

    const postExist = db.postInfo.some(
      (post) => post.id === args.data.post && post.published === true
    );

    if (!userExist) throw new Error("User not found.");
    if (!postExist) throw new Error("Post does not exist.");

    const comment = {
      id: uuidv4(),
      ...args.data,
    };

    db.commentInfo.push(comment);
    return comment;
  },
  deleteComment(parent, args, { db }, info) {
    const commentIndex = db.commentInfo.findIndex(
      (comment) => comment.id === args.id
    );

    if (commentIndex === -1) {
      throw new Error("Comment not found.");
    }
    const deletedComment = db.commentInfo.splice(commentIndex, 1);
    return deletedComment[0];
  },
  updateComment(parent, args, { db }, info) {
    const { id, data } = args;

    const comment = db.commentInfo.find((comment) => comment.id === args.id);

    if (!comment) {
      throw new Error("Comment not found.");
    }

    if (typeof data.text === "string") {
      comment.text = data.text;
    }

    return comment;
  },
};

export { Mutation as default };
