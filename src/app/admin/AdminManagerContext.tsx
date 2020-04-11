import * as React from "react";
import { FC, useContext } from "react";

const AdminContext: React.Context<boolean> = React.createContext(false as boolean);

export const AdminManagerContext: FC = ({ children }) => (
  <AdminContext.Provider value={window.location.search.includes("?admin")}>
    {children}
  </AdminContext.Provider>
);

export const useAdmin: () => boolean = () => useContext(AdminContext);
