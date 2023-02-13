import { ApiData, MockApi } from "models";
import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";

import { Field } from "types";
import { db } from "utils";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === "POST") {
    if (!req.query.name) {
      res.status(400).json({ message: "Missing name" });
      return;
    }

    await db.connect();
    const mockApi = await MockApi.findOne({ name: req.query.name });

    if (!mockApi) {
      res.status(404).json({ error: "MockApi not found" });
      db.disconnect();
      return;
    }

    await mockApi?.populate("fields");
    const fields = mockApi.fields;

    // Generate fake data
    let data: string[] = [];
    for (let i = 0; i < req.body.count; i++) {
      data.push(
        Object.assign(
          {},
          ...fields.map((field: Field) => {
            return {
              [field.name]: faker?.[field.type[0]]?.[field.type[1]]?.(),
            };
          })
        )
      );
    }

    mockApi.data = data;
    await mockApi.save();
    await db.disconnect();

    if (mockApi) {
      res.status(200).json(mockApi);
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } else {
    res.status(400).json({ error: "Bad request" });
  }
};

export default handler;
