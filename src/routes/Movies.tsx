import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const ALL_MOVIES = gql`
  {
    allMovies {
      id
      title
      medium_cover_image
    }
  }
`;

export const Movies = () => {
  const { loading, error, data } = useQuery(ALL_MOVIES);

  // 로딩중이면 로딩중 화면
  if (loading) return <h1>Loading...</h1>;

  // 에러 뜨면 에러중 화면
  if (error) return <h1>Could not fetch ㅠㅠ</h1>;

  return (
    <div className="flex w-full flex-col items-center">
      <header className="flex h-[45vh] w-full flex-col items-center justify-center bg-gradient-to-r from-[#d754ab] to-[#fd723a] text-white">
        <h1 className="mb-[20px] text-[60px] font-bold">Apollo Movies</h1>
      </header>
      {loading && (
        <div className="mt-[10px] text-[18px] font-bold opacity-50">
          Loading...
        </div>
      )}
      <div className="relative top-[-50px] grid w-[60%] grid-cols-4 gap-6">
        {data?.allMovies?.map((item: any) => (
          <div
            key={item.id}
            className="h-[300px] w-full rounded-md bg-transparent shadow-[0_3px_6px_-3px_rgba(0,0,0,0.16)]"
          >
            <Link to={`movies/${item.id}`}>
              <div className="h-full w-full rounded-md">
                <img
                  src={item.medium_cover_image}
                  alt="영화 포스터"
                  height="300"
                  className="h-full rounded-md"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
