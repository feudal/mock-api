export interface MockApi {
  _id: string;
  name: string;
  count: string;
  interfaceName: string;
  fields: Field[];

  createdAt: string;
  updatedAt: string;
}

export interface Field {
  name: string;
  type: string[];
}
