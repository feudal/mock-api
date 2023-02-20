import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "utils";
import { MockApi } from "models";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (!req.query.name) {
    res.status(400).json({ message: "Missing name" });
    return;
  }

  if (req.method === "GET") {
    /*
     * ================================= GET =================================
     */

    await db.connect();
    const mockApis = await MockApi.findOne({ name: req.query.name });
    const data = mockApis.data.find((item: any) => item.id === req.query.id);
    await db.disconnect();

    if (!data) res.status(404).json({ error: "Not found" });
    else res.status(200).json({ data });
  } else if (req.method === "PATCH") {
    await db.connect();
    const mockApi = await MockApi.findOne(
      { name: req.query.name, data: { $elemMatch: { id: req.query.id } } },
      { "data.$": 1 }
    );

    if (mockApi) {
      const updatedData = { ...mockApi.data[0], ...req.body };
      await MockApi.updateOne(
        { _id: mockApi._id, "data.id": req.query.id },
        { $set: { "data.$": updatedData } }
      );
      res.status(200).json({ data: updatedData });
    } else {
      res.status(404).json({ error: "Not found" });
    }
    await db.disconnect();
  } else if (req.method === "PUT") {
    /*
     * ================================= PUT =================================
     */
    await db.connect();
    const mockApi = await MockApi.findOne(
      { name: req.query.name, data: { $elemMatch: { id: req.query.id } } },
      { "data.$": 1 }
    );

    if (mockApi) {
      const updatedData = { id: mockApi.data[0].id, ...req.body };
      await MockApi.findOneAndUpdate(
        { name: req.query.name, "data.id": req.query.id },
        { $set: { "data.$": updatedData } },
        { new: true }
      );
      res.status(200).json({ data: updatedData });
    } else {
      res.status(404).json({ error: "Not found" });
    }
    await db.disconnect();
  } else if (req.method === "DELETE") {
    /*
     * ================================= DELETE =================================
     */

    await db.connect();
    const mockApi = await MockApi.findOne({ name: req.query.name });
    const itemExists = mockApi.data.find(
      (item: any) => item.id === req.query.id
    );

    if (!itemExists) res.status(404).json({ error: "Not found" });
    mockApi.data = mockApi.data.filter((item: any) => item.id !== req.query.id);
    await mockApi.save();
    await db.disconnect();

    res.status(200).json({ message: "Deleted" });
  } else {
    /*
     * ================================= OTHER =================================
     */
    res.status(400).json({ error: "Bad request" });
  }
};

export default handler;
