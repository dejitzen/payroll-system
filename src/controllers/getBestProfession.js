module.exports.getBestProfession = async (req, res) => {
  try {
    const { sequelize } = require("../model");
    const { Job, Contract, Profile } = req.app.get("models");
    const { start, end } = req.query;
    const { Op } = require("sequelize");
    const bestProfession = await Job.findOne({
      attributes: [[sequelize.literal("SUM(price)"), "totalEarnings"]],
      include: [
        {
          model: Contract,
          as: "Contract",
          include: [
            {
              model: Profile,
              as: "Contractor",
              attributes: ["profession"],
            },
          ],
        },
      ],
      where: {
        paymentDate: { [Op.between]: [start, end] },
        paid: 1,
      },
      group: ["Contract.Contractor.profession"],
      order: [[sequelize.literal("totalEarnings"), "DESC"]],
      limit: 1,
    });

    const profession = bestProfession?.Contract?.Contractor?.profession || "";

    return res.json({ profession });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
