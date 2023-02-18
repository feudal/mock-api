import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "utils";
import { User } from "models";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === "GET") {
    await db.connect();
    const users = await User.find({});
    await db.disconnect();

    res.status(200).json({ data: users });
  } else if (req.method === "POST") {
    // await db.connect();
    // const mockApiExists = await MockApi.exists({ name: req.body.name });
    // if (mockApiExists) {
    //   res.status(400).json({ error: "Api with this name already exists" });
    //   db.disconnect();
    //   return;
    // } else {
    //   const fields = await Promise.all(
    //     req.body.fields.map(async (field: any) => {
    //       const createdField = await Field.create(field);
    //       return createdField._id;
    //     })
    //   );
    //   const mockApi = await MockApi.create({
    //     name: req.body.name,
    //     fields: fields,
    //   });
    //   await db.disconnect();
    //   res.status(200).json({ data: mockApi });
    // }
  } else {
    res.status(400).json({ error: "Bad request" });
  }
};

export default handler;
