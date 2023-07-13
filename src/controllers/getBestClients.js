module.exports.getBestClients = async (req, res) => {
  try {
    const { sequelize } = require("../model");
    const { Job, Contract, Profile } = req.app.get("models");
    const { start, end, limit = 2 } = req.query;
    const { Op } = require("sequelize");
    const bestProfession = await Job.findAll({
      attributes: [[sequelize.literal("SUM(price)"), "paid"]],
      include: [
        {
          model: Contract,
          as: "Contract",
          include: [
            {
              model: Profile,
              as: "Client",
              attributes: ["id", "firstName", "lastName"],
            },
          ],
        },
      ],
      where: {
        paymentDate: { [Op.between]: [start, end] },
        paid: 1,
      },
      group: ["Contract.Client.id"],
      order: [[sequelize.literal("paid"), "DESC"]],
      limit: parseInt(limit, 10),
    });
    const formattedArray = bestProfession.map((item) => {
      return {
        id: item.Contract.Client.id,
        fullName: `${item.Contract.Client.firstName} ${item.Contract.Client.lastName}`,
        paid: item.paid,
      };
    });

    return res.json(formattedArray);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
