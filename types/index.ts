export interface MockApi {
  _id: string;
  name: string;
  interfaceName: string;
  projectId: string;
  fields: Field[];
  enumFields: Field[];
  data: Object[];

  createdAt: string;
  updatedAt: string;
}

export interface Field {
  name: string;
  type?: string[];
  choices?: string[];
}

export interface Project {
  _id: string;
  name: string;
  owner: User;
  users: User[];
  mockApis: MockApi[];
  hasPermission: boolean;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  projects: Project[];
}
