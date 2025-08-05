const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// מגיש את כל הקבצים הסטטיים מתוך תיקיית public
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    console.log("🔌 לקוח התחבר");

    // קבלת בחירת המשתתף
    socket.on("chooseImage", (image) => {
        console.log("🪄 המשתתף בחר:", image);
        io.emit("imageChosen", image); // שלח לקוסם
    });

    socket.on("disconnect", () => {
        console.log("❌ לקוח התנתק");
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 השרת רץ על פורט ${PORT}`);
});