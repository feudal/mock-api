import type { NextApiRequest, NextApiResponse } from "next";

import { Project, User } from "models";
import { db } from "utils";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === "POST") {
    /*
     * ================================= POST =================================
     */
    await db.connect();
    const users = await User.find({ email: { $in: req.body.emails } });

    const project = await Project.findOneAndUpdate(
      { _id: req.query.id },
      { $addToSet: { users: { $each: users.map((user) => user._id) } } }
    );
    await db.disconnect();

    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } else {
    /*
     * ================================= OTHER =================================
     */
    res.status(400).json({ error: "Bad request" });
  }
};

export default handler;
