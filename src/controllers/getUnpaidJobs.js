module.exports.getUnpaidJobs = async (req, res) => {
  try {
    const { Job, Contract, Profile } = req.app.get("models");
    const { Op } = require("sequelize");
    const job = await Job.findAll({
      include: [
        {
          include: [
            {
              model: Profile,
              as: "Contractor",
            },
          ],
          model: Contract,
          where: {
            [Op.and]: [
              { status: "in_progress" },
              {
                [Op.or]: [
                  { clientId: req.query.user_id },
                  { contractorId: req.query.user_id },
                ],
              },
            ],
          },
        },
      ],

      where: {
        paid: null,
      },
    });
    if (!job) return res.status(404).end();
    return res.json(job);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
