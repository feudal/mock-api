import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "utils";
import { MockApi } from "models";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === "GET") {
    await db.connect();
    const mockApis = await MockApi.findOne({ name: req.query.name });
    await db.disconnect();
    const data = mockApis.data;

    res.status(200).json({ data });
  } else if (req.method === "DELETE") {
    await db.connect();
    const mockApi = await MockApi.findOneAndUpdate(
      { name: req.query.name },
      { $unset: { data: 1 } },
      { new: true }
    );
    await db.disconnect();

    res.status(200).json({ data: mockApi });
  } else {
    res.status(400).json({ error: "Bad request" });
  }
};

export default handler;
