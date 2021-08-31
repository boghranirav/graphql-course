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

const db={
    userInfo,
    postInfo,
    commentInfo
}

export {db as default}