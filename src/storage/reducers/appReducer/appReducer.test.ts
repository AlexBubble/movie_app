import { appReducer } from "./appReducer";
import { EActionTypes } from "./models";

describe("appReducer", () => {
  test("returns valid state when passed a valid action", () => {
    const result = appReducer(undefined, {
      type: EActionTypes.SET_IS_LOADING,
      payload: true,
    });

    expect(result.isLoading).toEqual(true);
  });

  test("set new genres with 'setGenres' action", () => {
    const result = appReducer(undefined, {
      type: EActionTypes.SET_GENRES,
      payload: [{ id: 1, name: "testGenre" }],
    });

    expect(result.genres).toEqual([{ id: 1, name: "testGenre" }]);
  });
});
