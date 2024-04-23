import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchRecommnadMovie = (id) => {
  return api.get(`/movie/${id}/recommendations`);
};

export const useRecommnadMovieQuery = ({ id }) => {
  return useQuery({
    queryKey: ["recommand-movie", { id }],
    queryFn: () => fetchRecommnadMovie(id),
    select: (result) => result.data,
  });
};
