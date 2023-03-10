import FolderIcon from "@mui/icons-material/Folder";
import { Stack, Card } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { Project } from "types";
import {
  DeleteProjectModal,
  EditProjectModal,
  List,
  Menu,
  StateCard,
} from "components";

const deleteProject = async (url: string) => await axios.delete(url);

export const ProjectList = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedEditProject, setSelectedEditProject] =
    useState<Project | null>(null);

  const {
    data: projects,
    error: isError,
    isLoading,
    mutate,
  } = useSWR("/api/project");

  const { trigger, isMutating } = useSWRMutation(
    "/api/project",
    () => deleteProject(`/api/project/${selectedProject?._id}`),
    {
      onSuccess: async () => {
        mutate("/api/project");
        setSelectedProject(null);
      },
    }
  );

  if (isLoading || isError) {
    return <StateCard isLoading={isLoading} isError={isError} />;
  }

  return (
    <Card>
      <List title="Project list" emptyMessage="No project created yet">
        {projects?.data?.map((project: Project) => (
          <React.Fragment key={project._id}>
            <List.Item
              key={project._id}
              href={`/project/${project._id}`}
              icon={
                project.hasPermission && (
                  <Menu>
                    <Menu.Item onClick={() => setSelectedEditProject(project)}>
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedProject(project);
                      }}
                    >
                      Delete
                    </Menu.Item>
                  </Menu>
                )
              }
            >
              <Stack direction="row" spacing={1}>
                <FolderIcon color="secondary" />
                <span>{project.name}</span>
              </Stack>
            </List.Item>

            {project.hasPermission && (
              <EditProjectModal
                project={project}
                open={selectedEditProject?._id === project._id}
                handleClose={() => setSelectedEditProject(null)}
              />
            )}

            {project.hasPermission && (
              <DeleteProjectModal
                projectName={project.name}
                open={selectedProject?._id === project._id}
                handleClose={() => setSelectedProject(null)}
                action={trigger}
                isLoading={isMutating}
              />
            )}
          </React.Fragment>
        ))}
      </List>
    </Card>
  );
};
