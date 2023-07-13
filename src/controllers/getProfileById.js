module.exports.getProfileById = async (req, res) => {
  try {
    const { Profile } = req.app.get("models");
    const profile = await Profile.findOne({
      where: { id: req.get("profile_id") },
    });
    if (!profile) return res.status(404).end();
    return res.json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
