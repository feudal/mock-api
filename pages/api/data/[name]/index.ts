import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "utils";
import { MockApi } from "models";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === "GET") {
    /*
     * ================================= GET =================================
     */
    await db.connect();
    const mockApis = await MockApi.findOne({ name: req.query.name });
    await db.disconnect();
    const data = mockApis.data;

    res.status(200).json({ data });
  } else if (req.method === "POST") {
    const data = req.body;
    if (!data) res.status(400).json({ error: "Body is required" });

    await db.connect();
    const mockApis = await MockApi.findOne({ name: req.query.name });
    mockApis.data.push(data);
    await mockApis.save();
    await db.disconnect();

    res.status(200).json({ data });
  } else if (req.method === "DELETE") {
    /*
     * ================================= DELETE =================================
     */
    await db.connect();
    const mockApi = await MockApi.findOneAndUpdate(
      { name: req.query.name },
      { $unset: { data: 1 } },
      { new: true }
    );
    await db.disconnect();

    res.status(200).json({ data: mockApi });
  } else {
    /*
     * ================================= OTHER =================================
     */
    res.status(400).json({ error: "Bad request" });
  }
};

export default handler;
