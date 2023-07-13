const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./model");
const { getJobs } = require("./controllers/getJobs");
const { getProfileById } = require("./controllers/getProfileById");
const { getProfiles } = require("./controllers/getProfiles");
const { getProfile } = require("./middleware/getProfile");
const { getUnpaidJobs } = require("./controllers/getUnpaidJobs");
const { payJob } = require("./controllers/payJob");
const { addBalance } = require("./controllers/addBalance");
const { getBestProfession } = require("./controllers/getBestProfession");
const { getContractById } = require("./controllers/getContractById");
const { getBestClients } = require("./controllers/getBestClients");

const app = express();
app.use(bodyParser.json());
const cors = require("cors");

app.use(cors());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

/**
 * FIX ME!
 * @returns contract by id
 */
app.get("/contracts/:id", getProfile, getContractById);
app.get("/profile", getProfile, getProfileById);
app.get("/profiles", getProfiles);
app.get("/jobs", getProfile, getJobs);
app.get("/jobs/unpaid", getProfile, getUnpaidJobs);
app.post(`/balances/deposit/:userId`, getProfile, addBalance);
app.post(`/jobs/:job_id/pay`, getProfile, payJob);

app.get("/admin/best-profession", getProfile, getBestProfession);
app.get("/admin/best-clients", getProfile, getBestClients);

module.exports = app;
