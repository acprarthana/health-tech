const sqlite3 = require("sqlite3").verbose();

const path = require("path");

const dbPath = path.join(
    __dirname,
    "../health.db"
);

const db = new sqlite3.Database(dbPath, (err) => {

    if (err) {
        console.log(err.message);
    } else {
        console.log("Connected to SQLite Database");
    }
});

module.exports = db;