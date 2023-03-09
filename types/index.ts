export interface MockApi {
  _id: string;
  name: string;
  project: Project;
  interface: Interface;
  data: Object[];
}

export interface Field {
  name: string;
  type?: string[];
}

export interface Project {
  _id: string;
  name: string;
  owner: User;
  users: User[];
  mockApis: MockApi[];
  interfaces: Interface[];
  hasPermission: boolean;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  projects: Project[];
}

export interface Interface {
  _id: string;
  name: string;
  project: Project;
  fields: Field[];
}

export interface CustomError extends Error {
  info?: any;
  status?: number;
}
