import app from "./app";
import http from "http";
import connectDatabase from "./config/db.config";
const PORT = 8080;
const DB_URI = "mongodb://localhost:27017/project_db";


// connect database
connectDatabase(DB_URI);

// http server
const server = http.createServer(app);

// listen
server.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
    console.log(`press ctrl + c to close server`);
});