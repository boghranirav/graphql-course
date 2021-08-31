const Comment = {
  author(parent, args, { db }, info) {
    return db.userInfo.find((user) => {
      return user.id === parent.author;
    });
  },
  post(parent, args, { db }, info) {
    return db.postInfo.find((post) => {
      return post.id === parent.post;
    });
  },
};

export { Comment as default };
