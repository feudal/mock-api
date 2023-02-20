import type { NextApiRequest, NextApiResponse } from "next";

import { Project } from "models";
import { db } from "utils";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (!req.query.id) {
    res.status(400).json({ message: "Missing id" });
    return;
  }

  if (req.method === "GET") {
    await db.connect();
    const projects = await Project.findOne({ _id: req.query.id });
    await db.disconnect();

    if (projects) {
      res.status(200).json(projects);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } else if (req.method === "DELETE") {
    await db.connect();
    const project = await Project.findOneAndDelete({ _id: req.query.id });
    await db.disconnect();

    if (project) {
      res.status(200).json({ name: project.name });
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } else {
    res.status(400).json({ error: "Bad request" });
  }
};

export default handler;
