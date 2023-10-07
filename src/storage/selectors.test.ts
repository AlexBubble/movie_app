import { getAppStateQuery } from "./selectors";

describe("redux selectors", () => {
  test("get query from state", () => {
    const state = {
      app: {
        moviesPopular: undefined,
        moviesSearch: undefined,
        query: "x-files",
        genres: undefined,
        movieDetail: undefined,
        moviesRecommened: undefined,
        moviesSimilar: undefined,
        moviesFavorites: [],
        isLoading: false,
        error: undefined,
        movieTrailer: undefined,
      },
    };

    const result = getAppStateQuery(state);

    expect(result).toEqual(state.app.query);
  });
});
