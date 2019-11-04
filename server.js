const express = require("express");
const budgetRouter = require("./budget/budget-router");

const server = express();

server.use(express.json());
server.use("/api/budgets", budgetRouter);

module.exports = server;
