import { server } from "./app.js";
import "./websocket.js";

const port = +process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});