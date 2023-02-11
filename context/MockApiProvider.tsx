import { createContext, PropsWithChildren, useState } from "react";

interface MockApiContextType {
  needToUpdate: boolean;
  setNeedToUpdate: (needToUpdate: boolean) => void;
}

const initialValues = {
  needToUpdate: true,
  setNeedToUpdate: () => {},
};

export const MockApiContext = createContext<MockApiContextType>(initialValues);

export const MockApiProvider = ({ children }: PropsWithChildren) => {
  const [needToUpdate, setNeedToUpdate] = useState(true);

  return (
    <MockApiContext.Provider
      value={{
        needToUpdate,
        setNeedToUpdate,
      }}
    >
      {children}
    </MockApiContext.Provider>
  );
};
