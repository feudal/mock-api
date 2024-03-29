import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { Field, Interface, MockApi, Project } from "models";
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
    let project;
    if (req.query.populateFields === "true") {
      project = await Project.findById(req.query.id)
        .populate("owner")
        .populate("users")
        .populate({
          path: "interfaces",
          populate: { path: "fields" },
        })
        .populate({
          path: "mockApis",
          populate: { path: "interface", populate: { path: "fields" } },
        });
    } else {
      project = await Project.findById(req.query.id)
        .populate("owner")
        .populate("users")
        .populate("interfaces")
        .populate("mockApis");
    }

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
    const allInterfaces = project.interfaces;
    const allFields = await Promise.all(
      allInterfaces.map(async (interfaceId: any) => {
        const interfaceFields = await Interface.findOne({
          _id: interfaceId,
        }).populate("fields");
        return interfaceFields?.fields;
      })
    );
    const allFieldsIds = allFields.flat().map((field) => field?._id);
    await Field.deleteMany({ _id: { $in: allFieldsIds } });
    await MockApi.deleteMany({ _id: { $in: allMockApis } });
    await Interface.deleteMany({ _id: { $in: allInterfaces } });
    await project.remove();
    await db.disconnect();

    res.status(200).json({ message: "Deleted" });
  } else if (req.method === "PATCH") {
    /*
     * ================================= PATCH =================================
     */

    if (!req.body.name)
      res.status(400).json({ error: "Body must contain name" });

    await db.connect();
    const project = await Project.findOne({ _id: req.query.id }).populate(
      "owner"
    );
    if (!project) {
      res.status(404).json({ error: "Not found" });
    } else if (project.owner?.email !== userEmail) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      project.name = req.body.name;
      await project.save();
      res.status(200).json({ data: project });
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
