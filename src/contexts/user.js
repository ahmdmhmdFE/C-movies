import { createContext } from "react";

const userContext = createContext();
const UserProvider = userContext.Provider;

export { userContext, UserProvider };
