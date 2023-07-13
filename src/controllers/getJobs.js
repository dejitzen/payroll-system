module.exports.getJobs = async (req, res) => {
  try {
    const { Op } = require("sequelize");
    const { Job, Contract } = req.app.get("models");
    const job = await Job.findAll({
      include: [
        {
          model: Contract,
          where: {
            [Op.and]: [
              { status: "in_progress" },
              { ClientId: req.get("profile_id") },
              { ContractorId: req.query.contractor_id },
            ],
          },
        },
      ],
    });
    if (!job) return res.status(404).end();
    return res.json(job);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
