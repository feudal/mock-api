import type { NextApiRequest, NextApiResponse } from "next";

import { Field, Interface } from "models";
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
    const interFace = await Interface.findById(req.query.id).populate("fields");

    if (interFace) {
      res.status(200).json({
        data: interFace,
        hasPermission: interFace.project?.owner?.email === userEmail,
      });
    } else {
      res.status(404).json({ error: "Not found" });
    }
    await db.disconnect();
  } else if (req.method === "PATCH") {
    /*
     * ================================= PATCH =================================
     */
    await db.connect();
    const interFace = await Interface.findById(req.query.id).populate({
      path: "project",
      populate: { path: "owner" },
    });

    if (!interFace) {
      res.status(404).json({ error: "Not found" });
    } else if (interFace.project?.owner?.email !== userEmail) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      interFace.name = req.body.name;
      await interFace.save();
      res.status(200).json({ message: "Updated" });
    }
    await db.disconnect();
  } else if (req.method === "DELETE") {
    /*
     * ================================= DELETE =================================
     */
    await db.connect();
    const interFace = await Interface.findById(req.query.id)
      .populate({
        path: "project",
        populate: { path: "owner" },
      })
      .populate("fields");

    if (!interFace) {
      res.status(404).json({ error: "Not found" });
    } else if (interFace.project?.owner?.email !== userEmail) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      await Field.deleteMany({ _id: { $in: interFace.fields } });
      await interFace.remove();
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
