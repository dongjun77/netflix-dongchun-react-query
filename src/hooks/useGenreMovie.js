import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchGenreMovie = ({ selectedTabList, selectedSortMenu, page }) => {
  console.log("fetchGenreMovie", selectedSortMenu);
  return api.get(
    `/discover/movie?with_genres=${selectedTabList}&sort_by=${selectedSortMenu}&page=${page}`
  );
};

export const useGenreMovieQuery = ({
  selectedTabList,
  selectedSortMenu,
  page,
}) => {
  return useQuery({
    queryKey: ["genre-movie", { selectedTabList, selectedSortMenu, page }],
    queryFn: () => fetchGenreMovie({ selectedTabList, selectedSortMenu, page }),
    select: (result) => result.data,
  });
};
