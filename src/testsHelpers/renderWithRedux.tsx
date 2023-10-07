import { Provider } from "react-redux";
import { store } from "../storage/store";
import { ReactNode } from "react";

// помощник для тестирования отрисовки компонентов, взаимодействующих с Redux
export const renderWithRedux = (component: ReactNode) => {
  return <Provider store={store}>{component}</Provider>;
};
