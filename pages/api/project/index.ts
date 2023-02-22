import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { db } from "utils";
import { Project, User } from "models";
import { User as UserType } from "types";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const session = await getSession({ req });
  const userEmail = session?.user?.email;

  if (req.method === "GET") {
    /*
     * ================================= GET =================================
     */
    await db.connect();
    const projects = await Project.find({}).populate("owner").populate("users");

    if (!projects) {
      res.status(404).json({ error: "Not found" });
    } else {
      const filteredProjects = projects.filter((project) => {
        if (project.owner?.email === userEmail) return true;
        if (
          project.users.map((user: UserType) => user.email).includes(userEmail)
        ) {
          return true;
        }
      });
      const projectsWithPermissions = filteredProjects.map((project) => ({
        ...project._doc,
        hasPermission: project.owner?.email === userEmail,
      }));
      res.status(200).json({ data: projectsWithPermissions });
    }
    await db.disconnect();
  } else if (req.method === "POST") {
    /*
     * ================================= POST =================================
     */
    await db.connect();
    const projectExists = await Project.exists({ name: req.body.name });

    if (projectExists) {
      res.status(400).json({ error: "Project with this name already exists" });
      db.disconnect();
    } else {
      const owner = await User.findOne({ email: userEmail }).exec();

      if (!owner) {
        res.status(400).json({ error: "Owner not found" });
        db.disconnect();
        return;
      }
      const usersIds = await User.find({
        email: { $in: req.body.emails },
      }).exec();

      const project = await Project.create({
        name: req.body.name,
        owner: owner._id,
        users: usersIds.map((user) => user._id),
      });
      owner.projects.push(project._id);
      await owner.save();
      await db.disconnect();

      res.status(200).json({ data: project });
    }
  } else {
    /*
     * ================================= OTHER =================================
     */
    res.status(400).json({ error: "Bad request" });
  }
};

export default handler;
