// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MockApi } from "models";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "utils";

type Data = {
  name: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === "DELETE") {
    if (!req.query.id) {
      res.status(400).json({ message: "Missing id" });
      return;
    }

    await db.connect();

    const id = req.query.id;
    const mockApi = await MockApi.findByIdAndDelete(id);

    await db.disconnect();

    if (mockApi) {
      res.status(200).json({ name: mockApi.name });
    } else {
      res.status(404).json({ error: "Not found" });
    }
  }

  res.status(400).json({ error: "Bad request" });
};

export default handler;
