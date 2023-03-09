import { Interface, MockApi, Project } from "models";
import type { NextApiRequest, NextApiResponse } from "next";

import { db, generateObjectFromFields, parseName } from "utils";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  /*
   * ================================= POST =================================
   */

  const mockApiName = parseName(req.query.name);

  if (req.method === "POST") {
    if (!mockApiName) {
      res.status(400).json({ message: "Missing name" });
      return;
    }
    const count = parseInt(req.body.count);
    if (Number.isNaN(count) || count <= 0) {
      res.status(400).json({ message: "Invalid count" });
      return;
    }
    if (!req.body.interfaceId) {
      res.status(400).json({ message: "Missing interface id" });
      return;
    }
    if (!req.body.projectId) {
      res.status(400).json({ message: "Missing project id" });
      return;
    }

    await db.connect();
    const { interfaces } = await Project.findById(req.body.projectId).populate({
      path: "interfaces",
      populate: { path: "fields" },
    });

    const mockApi = await MockApi.findOne({ name: mockApiName });
    const interFace = await Interface.findById(req.body.interfaceId).populate(
      "fields"
    );

    if (!interFace) {
      res.status(404).json({ error: "Not found" });
      db.disconnect();
      return;
    }

    const fields = interFace.fields;

    // Generate fake data
    let data: Object[] = [];
    for (let i = 0; i < req.body.count; i++) {
      data.push(generateObjectFromFields(fields, interfaces));
    }

    mockApi.data = data;
    mockApi.interface = interFace;
    await mockApi.save();
    await db.disconnect();
    res.status(200).json({ data });
  } else {
    /*
     * ================================= OTHER =================================
     */
    res.status(400).json({ error: "Bad request" });
  }
};

export default handler;
