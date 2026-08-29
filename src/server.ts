import app from "./app";
import http from "http";
import ENV_CONFIG from "./config/env.config";
import connectDatabase from "./config/db.config";

const PORT = ENV_CONFIG.PORT;
const DB_URI = ENV_CONFIG.DB_URI;


// connect database
connectDatabase(DB_URI);

// http server
const server = http.createServer(app);

// listen
server.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
    console.log(`press ctrl + c to close server`);
});