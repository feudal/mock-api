export interface MockApi {
  _id: string;
  name: string;
  interfaceName: string;
  projectId: string;
  fields: Field[];
  data: Object[];

  createdAt: string;
  updatedAt: string;
}

export interface Field {
  name: string;
  type: string[];
}

export interface Project {
  _id: string;
  name: string;
  owner: User;
  users: User[];
  mockApis: MockApi[];
}

export interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  projects: Project[];
}
