import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "utils";
import { User } from "models";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === "GET") {
    /*
     * ================================= GET =================================
     */
    await db.connect();
    const users = await User.find({});
    await db.disconnect();

    res.status(200).json({ data: users });
  } else {
    /*
     * ================================= OTHER =================================
     */
    res.status(400).json({ error: "Bad request" });
  }
};

export default handler;
