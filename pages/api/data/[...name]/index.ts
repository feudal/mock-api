import type { NextApiRequest, NextApiResponse } from "next";

import { db, checkIfIsId } from "utils";
import { MockApi } from "models";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.query.name?.length === 0) {
    res.status(400).json({ error: "Name is required" });
    return;
  }

  const allQueryNames: string[] = req.query.name as string[];
  const queryId = allQueryNames.at(-1);
  const hasId = checkIfIsId(queryId);

  const mockApiName = hasId
    ? allQueryNames.slice(0, allQueryNames.length - 1).join("/")
    : allQueryNames.join("/");

  switch (hasId) {
    case false: // [name].tsx
      if (req.method === "GET") {
        /*
         * ================================= GET =================================
         */
        await db.connect();
        const mockApis = await MockApi.findOne({ name: mockApiName });
        await db.disconnect();
        const data = mockApis.data;

        res.status(200).json({ data });
      } else if (req.method === "POST") {
        const data = req.body;
        if (!data) res.status(400).json({ error: "Body is required" });

        await db.connect();
        const mockApis = await MockApi.findOne({ name: mockApiName });
        mockApis.data.push(data);
        await mockApis.save();
        await db.disconnect();

        res.status(200).json({ data });
      } else if (req.method === "DELETE") {
        /*
         * ================================= DELETE =================================
         */
        await db.connect();
        await MockApi.findOneAndUpdate(
          { name: mockApiName },
          { $unset: { data: "", interface: "" } },
          { new: true }
        );
        await db.disconnect();

        res.status(200).json({ message: "Deleted" });
      } else {
        /*
         * ================================= OTHER =================================
         */
        res.status(400).json({ error: "Bad request" });
      }
    case true: // [id].tsx
      if (req.method === "GET") {
        /*
         * ================================= GET =================================
         */

        await db.connect();
        const mockApis = await MockApi.findOne({ name: mockApiName });
        const data = mockApis.data.find((item: any) => item.id === queryId);
        await db.disconnect();

        if (!data) res.status(404).json({ error: "Not found" });
        else res.status(200).json({ data });
      } else if (req.method === "PATCH") {
        /*
         * ================================= PATCH =================================
         */
        await db.connect();
        const mockApi = await MockApi.findOne(
          { name: mockApiName, data: { $elemMatch: { id: queryId } } },
          { "data.$": 1 }
        );

        if (mockApi) {
          const updatedData = { ...mockApi.data[0], ...req.body };
          await MockApi.updateOne(
            { _id: mockApi._id, "data.id": queryId },
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
          { name: mockApiName, data: { $elemMatch: { id: queryId } } },
          { "data.$": 1 }
        );

        if (mockApi) {
          const updatedData = { id: mockApi.data[0].id, ...req.body };
          await MockApi.findOneAndUpdate(
            { name: mockApiName, "data.id": queryId },
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
        const mockApi = await MockApi.findOne({ name: mockApiName });
        const itemExists = mockApi.data.find(
          (item: any) => item.id === queryId
        );

        if (!itemExists) res.status(404).json({ error: "Not found" });
        mockApi.data = mockApi.data.filter((item: any) => item.id !== queryId);
        await mockApi.save();
        await db.disconnect();

        res.status(200).json({ message: "Deleted" });
      } else {
        /*
         * ================================= OTHER =================================
         */
        res.status(400).json({ error: "Bad request" });
      }
  }
};

export default handler;
