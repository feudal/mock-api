import type { NextApiRequest, NextApiResponse } from "next";

import { Field, MockApi } from "models";
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
    const mockApi = await MockApi.findById(req.query.id);
    await mockApi?.populate("fields");
    await db.disconnect();

    if (mockApi) {
      res.status(200).json(mockApi);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } else if (req.method === "DELETE") {
    /*
     * ================================= DELETE =================================
     */
    await db.connect();
    const mockApi = await MockApi.findById(req.query.id)
      .populate("project")
      .populate("fields");

    if (!mockApi) {
      res.status(404).json({ error: "Not found" });
    } else if (mockApi.project.owner.email !== req.query.userId) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      await Field.deleteMany({ _id: { $in: mockApi.fields } });
      await mockApi.remove();
      res.status(200).json({ message: "Deleted" });
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
