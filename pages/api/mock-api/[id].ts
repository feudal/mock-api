// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MockApi } from "models";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "utils";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === "GET") {
    if (!req.query.id) {
      res.status(400).json({ message: "Missing id" });
      return;
    }

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
    if (!req.query.id) {
      res.status(400).json({ message: "Missing id" });
      return;
    }

    await db.connect();
    const mockApi = await MockApi.findByIdAndDelete(req.query.id);
    await db.disconnect();

    if (mockApi) {
      res.status(200).json({ name: mockApi.name });
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } else {
    res.status(400).json({ error: "Bad request" });
  }
};

export default handler;
