import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
  query ($movieId: ID!) {
    movie(id: $movieId) {
      id
      title
      medium_cover_image
      rating
      isLiked @client
    }
  }
`;

export const Movie = () => {
  const { id } = useParams();
  const { loading, data, client: {cache} } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });

  const handleClick = () => {
    cache.writeFragment({
      id: `Movie:${id}`,
      fragment: gql`
        fragment MovieFragment on Movie {
          isLiked
        }
      `,
      data: {
        isLiked: true,
      }
    });
  }

  return (
    <div className="flex h-[100vh] w-full items-center justify-around bg-gradient-to-r from-[#d754ab] to-[#fd723a] text-white">
      <div className="ml-[10px] w-[50%]">
        <h1 className="mb-[15px] text-[65px]">
          {loading ? "Loading..." : data?.movie?.title}
        </h1>
        <h4 className="mb-[10px] text-[35px]">⭐ {data?.movie?.rating}</h4>
        <button onClick={handleClick}>{data?.movie?.isLiked ? "Unlike" : "Like"}</button>
      </div>
      <div className="h-[60%] w-[25%] rounded-md bg-transparent">
        {data && (
          <img
            src={data?.movie?.medium_cover_image}
            alt="영화 포스터"
            className="h-full w-full rounded-md"
          />
        )}
      </div>
    </div>
  );
};
