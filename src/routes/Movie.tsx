import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
  query ($movieId: ID!) {
    movie(id: $movieId) {
      id
      title
      medium_cover_image
      rating
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

  return (
    <div className="flex h-[100vh] w-full items-center justify-around bg-gradient-to-r from-[#d754ab] to-[#fd723a] text-white">
      <div className="ml-[10px] w-[50%]">
        <h1 className="text-[65px] mb-[15px]">{loading ? "Loading..." : data?.movie?.title}</h1>
        <h4 className="text-[35px] mb-[10px]">⭐ {data?.movie?.rating}</h4>
      </div>
      <div className="w-[25%] h-[60%] bg-transparent rounded-md">
        <img src={data?.movie?.medium_cover_image} alt="영화 포스터" width="100%" height="100%" />
      </div>
    </div>
  );
};
