import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { db } from "utils";
import { Project, User } from "models";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const session = await getSession({ req });
  const userEmail = session?.user?.email;

  if (req.method === "GET") {
    /*
     * ================================= GET =================================
     */
    await db.connect();
    const projects = await Project.find({});
    await db.disconnect();

    res.status(200).json({ data: projects });
  } else if (req.method === "POST") {
    /*
     * ================================= POST =================================
     */
    await db.connect();
    const projectExists = await Project.exists({ name: req.body.name });

    if (projectExists) {
      res.status(400).json({ error: "Project with this name already exists" });
      db.disconnect();
      return;
    } else {
      const owner = await User.findOne({ email: userEmail }).exec();
      if (!owner) {
        res.status(400).json({ error: "Owner not found" });
        db.disconnect();
        return;
      }
      const usersIds = await User.find({
        email: { $in: req.body.emails },
      }).exec();

      const project = await Project.create({
        name: req.body.name,
        owner: owner._id,
        users: usersIds.map((user) => user._id),
      });
      await db.disconnect();

      res.status(200).json({ data: project });
    }
  } else {
    /*
     * ================================= OTHER =================================
     */
    res.status(400).json({ error: "Bad request" });
  }
};

export default handler;
