export interface MockApi {
  _id: string;
  name: string;
  interfaceName: string;
  fields: Field[];
  data: Object[];

  createdAt: string;
  updatedAt: string;
}

export interface Field {
  name: string;
  type: string[];
}
