const User = {
  posts(parent, args, { db }, info) {
    return db.postInfo.filter((post) => {
      return post.author === parent.id;
    });
  },
  comments(parent, args, { db }, info) {
    return db.commentInfo.filter((comment) => {
      return comment.author === parent.id;
    });
  },
};

export { User as default };
