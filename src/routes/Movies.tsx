import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const ALL_MOVIES = gql`
  {
    allMovies {
      id
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
        <li key={item.id}>
          <Link to={`movies/${item.id}`}>{item.title}</Link>
        </li>
      ))}
    </div>
  );
};
