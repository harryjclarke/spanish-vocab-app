import { Link } from "react-router-dom";

import React from "react";

const Public = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  return (
    <section>
      <p>{today}</p>

      <h1>Welcome!</h1>
    </section>
  );
};

export default Public;
