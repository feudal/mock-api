import type { NextApiRequest, NextApiResponse } from "next";

import { MockApi } from "models";
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
    await db.connect();
    const mockApi = await MockApi.findByIdAndDelete(req.query.id);
    await db.disconnect();

    if (mockApi) {
      res.status(200).json({ name: mockApi.name });
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } else {
    /*
     * ================================= OTHER =================================
     */
    res.status(400).json({ error: "Bad request" });
  }
};

export default handler;
