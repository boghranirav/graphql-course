const Subscription = {
  comment: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      const post = db.postInfo.find(
        (post) => post.id === postId && post.published
      );

      if (!post) {
        throw new Error("Post not found.");
      }

      return pubsub.asyncIterator(`comment ${postId}`);
    },
  },
  post: {
    subscribe(parent, args, { db, pubsub }, info) {
      return pubsub.asyncIterator(`post`);
    },
  },
};

export { Subscription as default };
