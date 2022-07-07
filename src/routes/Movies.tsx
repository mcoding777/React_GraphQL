import { gql, useQuery } from "@apollo/client";

const ALL_MOVIES = gql`
  {
    allMovies {
      title
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
    <div>
      {data.allMovies.map((item: any) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </div>
  );
};
