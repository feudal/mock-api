import type { NextApiRequest, NextApiResponse } from "next";

import { Field, MockApi, Project } from "models";
import { db } from "utils";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (!req.query.id) {
    res.status(400).json({ message: "Missing id" });
    return;
  }

  if (req.method === "GET") {
    /*
     * ================================= GET =================================
     */
    await db.connect();
    const projects = await Project.findOne({ _id: req.query.id })
      .populate("owner")
      .populate("mockApis")
      .populate("users");
    await db.disconnect();

    if (projects) {
      res.status(200).json(projects);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } else if (req.method === "DELETE") {
    /*
     * ================================= DELETE =================================
     */
    // TODO: Need to check if user is owner of project
    await db.connect();
    const project = await Project.findOneAndDelete({ _id: req.query.id });
    await db.disconnect();

    if (project) {
      res.status(200).json({ name: project.name });
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } else if (req.method === "PATCH") {
    /*
     * ================================= PATCH =================================
     */
    await db.connect();
    const project = await Project.findOne({ _id: req.query.id });
    if (!project) {
      res.status(404).json({ error: "Not found" });
    } else {
      const mockApiExists = project.mockApis.includes(req.body.mockApiId);
      if (mockApiExists) {
        res.status(400).json({ error: "Mock API already exists" });
      } else {
        const fields = await Promise.all(
          req.body.fields.map(async (field: any) => {
            const createdField = await Field.create(field);
            return createdField._id;
          })
        );

        const mockApi = await MockApi.create({
          name: req.body.name,
          project: req.query.id,
          fields: fields,
        });

        project.mockApis.push(mockApi._id);
        await project.save();
        res.status(200).json({ data: project });
      }
    }
    await db.disconnect();
    return;
  } else {
    /*
     * ================================= OTHER =================================
     */
    res.status(400).json({ error: "Bad request" });
  }
};

export default handler;
