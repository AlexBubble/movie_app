import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// импортируем для последующего mock
import axios from "axios";

import Search from "./Search";

import { renderWithRedux } from "../../testsHelpers/renderWithRedux";

// выполняем mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

// тестовые данные для имитации ответа после запроса к API
const response = {
  data: {
    page: 1,
    results: [
      {
        adult: false,
        backdrop_path: "",
        genre_ids: [1],
        id: 1,
        original_language: "",
        original_title: "",
        overview: "",
        popularity: 1,
        poster_path: "",
        release_date: "",
        title: "title 1",
        video: false,
        vote_average: 1,
        vote_count: 1,
      },
      {
        adult: false,
        backdrop_path: "",
        genre_ids: [1],
        id: 2,
        original_language: "",
        original_title: "",
        overview: "",
        popularity: 1,
        poster_path: "",
        release_date: "",
        title: "title 2",
        video: false,
        vote_average: 1,
        vote_count: 1,
      },
    ],
    total_pages: 1,
    total_results: 2,
  },
};

describe("Search component", () => {
  beforeAll(() => {});

  test("Search component renders", () => {
    render(renderWithRedux(<Search />));

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  test("onChange works", () => {
    mockedAxios.get.mockResolvedValue(response);

    render(renderWithRedux(<Search />));

    // проверка: после ввода поисковой фразы компонент с 2 сторонним связыванием корректно отображает введенный текст
    expect(screen.getByRole("searchbox")).toHaveValue("");
    userEvent.type(screen.getByRole("searchbox"), "x-files");
    expect(screen.getByRole("searchbox")).toHaveValue("x-files");
  });

  test("Search snapshot", () => {
    const view = render(renderWithRedux(<Search />));
    expect(view).toMatchSnapshot();
  });

  afterEach(() => {
    // jest.clearAllMocks();
  });
});
