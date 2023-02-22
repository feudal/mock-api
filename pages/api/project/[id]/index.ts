import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { Field, MockApi, Project } from "models";
import { db } from "utils";
import { User } from "types";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (!req.query.id) {
    res.status(400).json({ message: "Missing id" });
    return;
  }

  const session = await getSession({ req });
  const userEmail = session?.user?.email;

  if (req.method === "GET") {
    /*
     * ================================= GET =================================
     */
    await db.connect();
    const project = await Project.findOne({ _id: req.query.id })
      .populate("owner")
      .populate("mockApis")
      .populate("users");
    await db.disconnect();

    if (!project) {
      res.status(404).json({ error: "Not found" });
    } else if (
      project.users.map((user: User) => user.email).includes(userEmail) ||
      project.owner?.email === userEmail
    ) {
      res.status(200).json({
        data: project,
        hasPermission: project.owner?.email === userEmail,
      });
    }
  } else if (req.method === "DELETE") {
    /*
     * ================================= DELETE =================================
     */
    await db.connect();
    const project = await Project.findOne({ _id: req.query.id }).populate(
      "owner"
    );
    if (!project) {
      res.status(404).json({ error: "Not found" });
    } else if (project.owner?.email !== userEmail) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const allMockApis = project.mockApis;
    const allFields = await Promise.all(
      allMockApis.map(async (mockApi: any) => {
        const mockApiFields = await MockApi.findOne({ _id: mockApi }).populate(
          "fields"
        );
        return mockApiFields?.fields;
      })
    );
    const allFieldsIds = allFields.flat().map((field) => field?._id);
    await Field.deleteMany({ _id: { $in: allFieldsIds } });
    await MockApi.deleteMany({ _id: { $in: allMockApis } });
    await project.remove();
    await db.disconnect();

    res.status(200).json({ message: "Deleted" });
  } else if (req.method === "PATCH") {
    /*
     * ================================= PATCH =================================
     */
    await db.connect();
    const project = await Project.findOne({ _id: req.query.id }).populate(
      "owner"
    );

    if (!project) {
      res.status(404).json({ error: "Not found" });
    } else if (project.owner?.email !== userEmail) {
      res.status(401).json({ error: "Unauthorized" });
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
  } else {
    /*
     * ================================= OTHER =================================
     */
    res.status(400).json({ error: "Bad request" });
  }
};

export default handler;
