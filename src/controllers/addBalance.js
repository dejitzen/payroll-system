module.exports.addBalance = async (req, res) => {
  try {
    const { sequelize } = require("../model");
    const { Job, Contract, Profile } = req.app.get("models");
    const { Op } = require("sequelize");
    const profile = await Profile.findOne({
      where: { id: req.params.userId, type: "client" },
    });
    if (!profile)
      return res
        .status(404)
        .json({ error: "No client found with the given ID" })
        .end();
    const job = await Job.findOne({
      attributes: [
        [sequelize.fn("SUM", sequelize.col("price")), "totalUnpaidAmount"],
      ],
      include: [
        {
          model: Contract,
          where: {
            [Op.and]: [
              { status: "in_progress" },
              { clientId: req.params.userId },
            ],
          },
        },
      ],
      where: {
        paid: null,
      },
    });
    const totalUnpaidAmount = job.dataValues.totalUnpaidAmount || 0;

    var finalAmount = (25 * totalUnpaidAmount) / 100;

    if (req.body.amount > finalAmount) {
      return res
        .status(400)
        .json({ error: "Deposit amount exceeds the limit" });
    }
    const updated = await Profile.update(
      { balance: profile.dataValues.balance + req.body.amount },
      {
        where: { id: req.params.userId },
      }
    );
    if (updated[0] >= 1) {
      return res.json("Success").end();
    }
    return res.json({ error: "An issue occured " });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
