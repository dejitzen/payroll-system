module.exports.getContractById = async (req, res) => {
  try {
    const { Contract } = req.app.get("models");
    const { id } = req.params;
    const contract = await Contract.findOne({
      where: { id: id, ClientId: req.get("profile_id") },
    });
    if (!contract) return res.status(404).end();
    return res.json(contract);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
