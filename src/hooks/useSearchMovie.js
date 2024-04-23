import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page }) => {
  if (keyword == null || keyword == undefined || keyword == "") {
    return { results: [] };
  }
  return api.get(`/search/movie?query=${keyword}&page=${page}`);
  // return keyword // keyword가 없을때 다른 쿼리를 날리는건 동작 오류다..(?)
  //   ? api.get(`/search/movie?query=${keyword}&page=${page}`)
  //   : api.get(`/discover/movie?with_genres=28&page=${page}`);
};

export const useSearchMovieQuery = ({ keyword, page }) => {
  return useQuery({
    queryKey: ["movie-search", { keyword, page }],
    queryFn: () => fetchSearchMovie({ keyword, page }),
    select: (result) => result.data,
  });
};
