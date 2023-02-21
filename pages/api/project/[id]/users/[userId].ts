import type { NextApiRequest, NextApiResponse } from "next";

import { Project } from "models";
import { db } from "utils";
import { ObjectId } from "mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (!req.query.id) {
    res.status(400).json({ message: "Missing id" });
    return;
  }
  if (req.method === "PATCH") {
    /*
     * ================================= PATCH =================================
     */
    await db.connect();
    const project = await Project.findOneAndUpdate(
      { _id: req.query.id },
      { $pull: { users: new ObjectId(req.query.userId as string) } }
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
