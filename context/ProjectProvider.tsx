import { useRouter } from "next/router";
import {
  createContext,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import useSWR from "swr";
import { Interface, MockApi, Project, User } from "types";

interface ProjectContextType {
  isLoading: boolean;
  isError: boolean;
  project?: Project;
  mockApis?: MockApi[];
  mockApi?: MockApi;
  interfaces?: Interface[];
  hasPermission?: boolean;
  users?: User[];
  owner?: User;
}

export const ProjectContext = createContext({} as ProjectContextType);

interface Props {
  children: ReactNode;
}

export const ProjectProvider = ({ children }: Props): ReactElement => {
  const router = useRouter();
  const [project, setProject] = useState<Project>();
  const [mockApis, setMockApis] = useState<MockApi[]>();
  const [mockApi, setMockApi] = useState<MockApi>();
  const [interfaces, setInterfaces] = useState<Interface[]>();
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [users, setUsers] = useState<User[]>();
  const [owner, setOwner] = useState<User>();
  const [projectId, setProjectId] = useState<string | string[] | undefined>(
    router.query.projectId
  );

  useEffect(
    () => setProjectId(router.query.projectId),
    [router.query.projectId]
  );

  useEffect(
    () =>
      setMockApi(
        project?.mockApis.find(
          (mockApi: MockApi) => mockApi._id === router.query.id
        )
      ),
    [project?.mockApis, router.query.id]
  );

  const { error: isError, isLoading } = useSWR<{
    data: Project;
    hasPermission: boolean;
  }>(projectId && `/api/project/${projectId}?populateFields=true`, {
    onSuccess: ({ data, hasPermission }) => {
      setProject(data);
      setMockApis(data.mockApis);
      setMockApi(
        data.mockApis.find(
          (mockApi: MockApi) => mockApi._id === router.query.id
        )
      );
      setInterfaces(data.interfaces);
      setHasPermission(hasPermission);
      setUsers(data.users);
      setOwner(data.owner);
    },
  });

  return (
    <ProjectContext.Provider
      value={
        projectId
          ? {
              isLoading,
              isError,
              project,
              mockApis,
              mockApi,
              interfaces,
              hasPermission,
              users,
              owner,
            }
          : ({} as ProjectContextType)
      }
    >
      {children}
    </ProjectContext.Provider>
  );
};
