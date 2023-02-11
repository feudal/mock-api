// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MockApi } from "models";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "utils";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === "GET") {
    await db.connect();
    const mockApis = await MockApi.find({});
    await db.disconnect();

    res.status(200).json({ data: mockApis });
  } else if (req.method === "POST") {
    await db.connect();
    const mockApiExists = await MockApi.exists({ name: req.body.name });

    if (mockApiExists) {
      res.status(400).json({ error: "Api with this name already exists" });
      db.disconnect();
      return;
    } else {
      const mockApi = await MockApi.create({ name: req.body.name });
      await db.disconnect();

      res.status(200).json({ name: mockApi.name });
    }
  } else {
    res.status(400).json({ error: "Bad request" });
  }
};

export default handler;
