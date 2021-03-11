import React from "react";
import { PhotoCard } from "../components/PhotoCard";
import { useGetPhotoCard } from "../hooks/useGetPhotoCard";

export const Detail = ({ detailId }) => {
  const { loading, error, data } = useGetPhotoCard(detailId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { photo = {} } = data;
  return <PhotoCard {...photo} />;
};
