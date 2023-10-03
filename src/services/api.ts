import axios from "axios";

// URLs для запросов к API
const URL_POPULAR = process.env.REACT_APP_POPULAR as string;
const URL_SEARCH = process.env.REACT_APP_SEARCH as string;
const URL_GENRES = process.env.REACT_APP_GENRES as string;
const URL_DETAIL = process.env.REACT_APP_DETAIL as string;
const URL_RECOMMENDED = process.env.REACT_APP_DETAIL as string;
const URL_SIMILAR = process.env.REACT_APP_DETAIL as string;
const URL_TRAILER = process.env.REACT_APP_DETAIL as string;

const HEADERS = { accept: "application/json" };

// создаем новый экземпляр axios с пользовательской конфигурацией
const instance = axios.create({
  // заголовки с API ключом
  headers: HEADERS,
  params: { language: "en-US", api_key: process.env.REACT_APP_API_KEY },
});

export const fetchPopular = async (page: number) => {
  try {
    const response = await instance.get(URL_POPULAR, {
      params: {
        page: page,
      },
    });

    return response.data;
  } catch (error) {
    if (typeof error === "string") {
      return error;
    } else if (error instanceof Error) {
      return error.message;
    }
  }
};
export const fetchSearch = async (page: number, query: string) => {
  try {
    const response = await instance.get(URL_SEARCH, {
      params: {
        page: page,
        include_adult: "false",
        query: query,
      },
    });

    return response.data;
  } catch (error) {
    if (typeof error === "string") {
      return error;
    } else if (error instanceof Error) {
      return error.message;
    }
  }
};
export const fetchGenres = async () => {
  try {
    const response = await instance.get(URL_GENRES);

    return response.data;
  } catch (error) {
    if (typeof error === "string") {
      return error;
    } else if (error instanceof Error) {
      return error.message;
    }
  }
};
export const fetchDetail = async (movieId: number) => {
  try {
    const response = await instance.get(`${URL_DETAIL}/${movieId}`);

    return response.data;
  } catch (error) {
    if (typeof error === "string") {
      return error;
    } else if (error instanceof Error) {
      return error.message;
    }
  }
};
export const fetchRecommended = async (page: number, movieId: number) => {
  try {
    const response = await instance.get(
      `${URL_RECOMMENDED}/${movieId}/recommendations`,
      {
        params: {
          page: page,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (typeof error === "string") {
      return error;
    } else if (error instanceof Error) {
      return error.message;
    }
  }
};
export const fetchSimilar = async (page: number, movieId: number) => {
  try {
    const response = await instance.get(`${URL_SIMILAR}/${movieId}/similar`, {
      params: {
        page: page,
      },
    });

    return response.data;
  } catch (error) {
    if (typeof error === "string") {
      return error;
    } else if (error instanceof Error) {
      return error.message;
    }
  }
};
export const fetchTrailer = async (movieId: number) => {
  try {
    const response = await instance.get(`${URL_TRAILER}/${movieId}/videos`);

    return response.data;
  } catch (error) {
    if (typeof error === "string") {
      return error;
    } else if (error instanceof Error) {
      return error.message;
    }
  }
};
