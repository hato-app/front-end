import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import AppState from "./interfaces/AppStateType";
import * as sessionApi from "./api/session";

const initialAppState: AppState = {};

const AppContext = createContext(initialAppState);
const AppDispatchContext = createContext<Dispatch<SetStateAction<AppState>>>(
  () => initialAppState
);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [useAppState, setAppState] = useState(initialAppState);

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(useAppState));
  }, [useAppState]);

  const checkSession = async () => {
    const user = await sessionApi.checkSession();
    if (user) {
      setAppState({ user });
    } else {
      setAppState({});
    }
  };

  return (
    <AppContext.Provider value={useAppState}>
      <AppDispatchContext.Provider value={setAppState}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export const useAppDispatchContext = () => useContext(AppDispatchContext);

export default AppProvider;
