server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Дозволити всі домени
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE"); // Дозволені методи
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization"); // Дозволені заголовки
  next();
});

server.use(middlewares);
server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running on http://localhost:3001");
});
