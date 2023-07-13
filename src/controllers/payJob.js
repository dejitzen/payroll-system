module.exports.payJob = async (req, res) => {
  try {
    const { Job, Contract, Profile } = req.app.get("models");
    const { job_id } = req.params;
    const job = await Job.findOne({ where: { id: job_id } });
    if (!job) return res.status(404).json({ error: "Job not found" }).end();
    if (job.paid == 1) {
      return res.status(400).json({ error: "Job already paid" }).end();
    }
    const contract = await Contract.findOne({
      where: { id: job.ContractId },
    });
    if (!contract)
      return res.status(404).json({ error: "Contract not found" }).end();
    const client = await Profile.findOne({
      where: { id: req.get("profile_id") },
    });
    if (!client)
      return res.status(404).json({ error: "Client not found" }).end();
    if (client.balance < job.price) {
      return res
        .status(400)
        .json({ error: "Insuficient founds for the transaction" })
        .end();
    }
    const contractor = await Profile.findOne({
      where: { id: contract.id },
    });

    if (!contractor)
      return res.status(404).json({ error: "Contractor not found" }).end();
    const clientUpdated = await Profile.update(
      { balance: client.balance - job.price },
      {
        where: { id: req.get("profile_id") },
      }
    );
    if (clientUpdated[0] > 0) {
      var contractorUpdated = await Profile.update(
        { balance: contractor.balance + job.price },
        {
          where: { id: contractor.id },
        }
      );
      if (contractorUpdated[0] > 0) {
        var paidJob = await Job.update(
          { paid: true },
          {
            where: { id: job_id },
          }
        );
      }
    } else {
      return res
        .status(500)
        .json({ error: "An error occured during the transaction" })
        .end();
    }

    return res.json({ clientUpdated, contractorUpdated, paidJob });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
