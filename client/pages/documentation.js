import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import data from "../public/documentation.json";

const Documentation = () => {
  return <SwaggerUI spec={data} />;
};

export default Documentation;
