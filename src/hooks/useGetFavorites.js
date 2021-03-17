import { useQuery, gql } from "@apollo/client";
const GET_FAVS = gql`
  query getFavs {
    favs {
      id
      categoryId
      src
      likes
      userId
    }
  }
`;
export const useGetFavorites = () => {
  const { loading, error, data } = useQuery(GET_FAVS, {
    fetchPolicy: "network-only",
  });
  return { loading, error, data };
};
