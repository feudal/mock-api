import { faker } from "@faker-js/faker";
import { Field, Interface } from "types";

export const generateObjectFromFields = (
  fields: Field[],
  interfaces: Interface[]
): Object => {
  if (!fields || !interfaces) return {};

  return Object.assign(
    { id: faker.datatype.uuid() },

    ...fields.map((field: Field) => {
      const interFace = interfaces.find(
        (i: Interface) => i.name === field?.type?.[1]
      );

      switch (field.type?.[0]) {
        case "enum":
          return {
            [field.name]:
              field.type[1].split(" | ")?.[
                //generate random number between 0 and length of enum
                faker.datatype.number(field.type[1].split(" | ").length - 1)
              ],
          };
        case "interface":
          if (!interFace) return {};
          return {
            [field.name]: generateObjectFromFields(
              interFace.fields,
              interfaces
            ),
          };
        case "array-of-interface":
          if (!interFace) return {};
          return {
            [field.name]: Array.from(
              { length: faker.datatype.number(10) },
              () => generateObjectFromFields(interFace.fields, interfaces)
            ),
          };
        default:
          return {
            // @ts-ignore
            [field.name]: faker?.[field.type[0]]?.[field.type[1]]?.(),
          };
      }
    })
  );
};
