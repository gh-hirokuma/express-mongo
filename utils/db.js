const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const USER = "root";
const PASS = "password";
const HOST = "192.168.99.100";
const PORT = "27017";
const DB_NAME = "go2dive";

const conn = `mongodb://${USER}:${PASS}@${HOST}:${PORT}/${DB_NAME}?authSource=admin`;
mongoose.connect(conn);

module.exports = { Schema, mongoose };
