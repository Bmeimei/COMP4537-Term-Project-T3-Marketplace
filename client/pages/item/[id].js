import React from "react";
import { useRouter } from "next/router";

const Item = () => {
  const router = useRouter();

  return <div>{router.query.id}</div>;
};

export default Item;
