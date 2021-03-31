require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 8000;

// DB config
require("./configs/db.configs");
const myCors = {
  origin: [process.env.FRONTEND_POINT],
  // methods: ["GET", "POST"],
  // allowedHeaders: ["my-custom-header"],
  credentials: true,
};

// Cors
// const whitelist = ["http://localhost:3001"];
// const corsOptionsDelegate = function (req, callback) {
//   let corsOptions;
//   if (whitelist.indexOf(req.header("Origin")) !== -1) {
//     corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false }; // disable CORS for this request
//   }
//   callback(null, corsOptions); // callback expects two parameters: error and options
// };

app.use(cors(myCors));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", [process.env.FRONTEND_POINT]);
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });

// app.use((req, res, next) => {
//   const authHeader = req.get("Authorization");
//   // console.log(authHeader);
//   next();
// });
// ApolloServer configs
const { apolloServer } = require("./configs/apolloServer.configs");
apolloServer.applyMiddleware({ app, path: "/graphql", cors: myCors });
apolloServer.installSubscriptionHandlers(httpServer);

// socketIO
const io = socketIO(httpServer, {
  cors: myCors,
});

require("./socket/socket.io")(io);

// Make sure to call listen on httpServer, NOT on app.
httpServer.listen(PORT, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`
  );
});
