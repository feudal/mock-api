import type { NextApiRequest, NextApiResponse } from "next";

import { MockApi } from "models";
import { db } from "utils";
import { getSession } from "next-auth/react";

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
    const mockApi = await MockApi.findById(req.query.id).populate("fields");
    await db.disconnect();

    if (mockApi) {
      res.status(200).json({
        data: mockApi,
        hasPermission: mockApi.project?.owner?.email === userEmail,
      });
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } else if (req.method === "PATCH") {
    /*
     * ================================= PATCH =================================
     */

    await db.connect();
    const mockApi = await MockApi.findById(req.query.id).populate({
      path: "project",
      populate: { path: "owner" },
    });

    if (!mockApi) {
      res.status(404).json({ error: "Not found" });
    } else if (mockApi.project?.owner?.email !== userEmail) {
      console.log({ project: mockApi.project, userEmail });
      res.status(401).json({ error: "Unauthorized" });
    } else {
      mockApi.name = req.body.name;
      await mockApi.save();
      console.log({ mockApi });
      res.status(200).json({ message: "Updated" });
    }
    await db.disconnect();
  } else if (req.method === "DELETE") {
    /*
     * ================================= DELETE =================================
     */
    await db.connect();
    const mockApi = await MockApi.findById(req.query.id).populate({
      path: "project",
      populate: { path: "owner" },
    });

    if (!mockApi) {
      res.status(404).json({ error: "Not found" });
    } else if (mockApi.project?.owner?.email !== userEmail) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
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
