import React, { useEffect } from "react";
import "./App.css";
import Main from "./components/pages/Main/Main";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import ActionCreators from "./storage/reducers/appReducer/actionCreators";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Detail from "./components/pages/Detail/Detail";
import Favorites from "./components/pages/Favorites/Favorites";
import { getAppStateGenres } from "./storage/selectors";

const App = () => {
  const dispatch = useAppDispatch();
  const genres = useAppSelector(getAppStateGenres);

  useEffect(() => {
    if (
      typeof genres === "undefined" ||
      "success" in genres ||
      genres.length === 0
    ) {
      dispatch(ActionCreators.fetchGenresThunkCreator());
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/detail/:movieId"} element={<Detail />} />
        <Route path={"/favorites"} element={<Favorites />} />
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
