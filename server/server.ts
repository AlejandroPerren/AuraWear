import server from "./src/server"

server.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
  });

server.listen(8000, () => {
    console.log(`Server listen in http://localhost:8000`)
})