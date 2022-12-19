import React from "react";
import { useParams } from "react-router-dom";

const CoinDetails = () => {
  const params = useParams();
  console.log(params);

  return <div>{params.details}</div>;
};

export default CoinDetails;
