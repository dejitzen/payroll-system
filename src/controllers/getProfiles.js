module.exports.getProfiles = async (req, res) => {
  try {
    const { Profile } = req.app.get("models");
    const type = req.query.type || null;
    const profile = await Profile.findAll({
      where: { ...(type ? { type } : null) },
    });
    if (!profile) return res.status(404).end();
    return res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
