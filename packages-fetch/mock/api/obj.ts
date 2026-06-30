export default eventHandler(() => {
  return {
    code: 100,
    data: {
      id: 1,
      password: "123456",
      realName: "Admin",
      roles: [
        "admin"
      ],
      username: "admin",
      homePath: "/workspace"
    },
    error: null,
    message: "错  误"
  };
});
