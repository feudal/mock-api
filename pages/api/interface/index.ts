import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "utils";
import { Interface, Project } from "models";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === "GET") {
    /*
     * ================================= GET =================================
     */
    await db.connect();
    const mockApis = await Interface.find({});
    await db.disconnect();

    res.status(200).json({ data: mockApis });
  } else if (req.method === "POST") {
    /*
     * ================================= POST =================================
     */
    await db.connect();
    const mockApiExistsInProject = await Interface.exists({
      name: req.body.name,
      project: req.body.projectId,
    });

    if (mockApiExistsInProject) {
      res
        .status(400)
        .json({ error: "Interface with this name already exists" });
      db.disconnect();
    } else {
      const project = await Project.findById(req.body.projectId);
      if (!project) res.status(400).json({ error: "Project does not exist" });

      const interFace = await Interface.create({
        name: req.body.name,
        project,
      });
      console.log({ interFace });
      await project.interfaces.push(interFace._id);
      await project.save();
      await db.disconnect();

      res.status(200).json({ data: interFace });
    }
  } else {
    /*
     * ================================= OTHER =================================
     */
    res.status(400).json({ error: "Bad request" });
  }
};

export default handler;
