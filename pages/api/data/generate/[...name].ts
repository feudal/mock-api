import { MockApi } from "models";
import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";

import { Field } from "types";
import { db, parseName } from "utils";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  /*
   * ================================= POST =================================
   */

  const mockApiName = parseName(req.query.name);

  if (req.method === "POST") {
    if (!mockApiName) {
      res.status(400).json({ message: "Missing name" });
      return;
    }

    await db.connect();
    const mockApi = await MockApi.findOne({ name: mockApiName })
      .populate("fields")
      .populate("enumFields");

    if (!mockApi) {
      res.status(404).json({ error: "MockApi not found" });
      db.disconnect();
      return;
    }

    const fields = mockApi.fields;
    const enumFields = mockApi.enumFields;

    // Generate fake data
    let data: string[] = [];
    for (let i = 0; i < req.body.count; i++) {
      data.push(
        Object.assign(
          { id: faker.datatype.uuid() },
          ...fields.map((field: Field) => ({
            // @ts-ignore
            [field.name]: faker?.[field.type[0]]?.[field.type[1]]?.(),
          })),
          ...enumFields.map((field: Field) => ({
            [field.name]:
              field.choices?.[faker.datatype.number(field.choices.length - 1)],
          }))
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
    /*
     * ================================= OTHER =================================
     */
    res.status(400).json({ error: "Bad request" });
  }
};

export default handler;
