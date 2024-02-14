import React, { useState, useMemo, useCallback } from "react";
import AppStorage from "../utils/AppStorage";
import { UserContext } from "./UserContext";

export const ContextWrapper = ({ children }) => {
  const [user, setUserState] = useState(AppStorage.getUserData());

  const setUser = useCallback(
    (person) => {
      const tempUser = { ...person };
      AppStorage.setUserData(tempUser);
      setUserState(tempUser);
    },
    [setUserState]
  );

  const userProviderState = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={userProviderState}>
      {children}
    </UserContext.Provider>
  );
};
