const Post = {
  author(parent, args, { db }, info) {
    return db.userInfo.find((user) => {
      return user.id === parent.author;
    });
  },
  comments(parent, args, { db }, info) {
    return db.commentInfo.filter((comment) => {
      return comment.post === parent.id;
    });
  },
};

export { Post as default };
