const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.userInfo;
    }
    return db.userInfo.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.postInfo;
    }
    return db.postInfo.filter((post) => {
      return (
        post.title.toLowerCase().includes(args.query.toLowerCase()) ||
        post.body.toLowerCase().includes(args.query.toLowerCase())
      );
    });
  },
  comments(parent, args, { db }, info) {
    return db.commentInfo;
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
};

export { Query as default };
