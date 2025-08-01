const express = require("express");
const { open } = sqlite;
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();

const dbPath = path.join(__dirname, "covid19India.db");
