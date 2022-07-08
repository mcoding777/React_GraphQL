import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
  query ($movieId: ID!) {
    movie(id: $movieId) {
      id
      title
    }
  }
`;

export const Movie = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });

  console.log(data);

  if (loading) return <h1>Fetching movie...</h1>;

  return <div>{data.movie.title}</div>;
};
