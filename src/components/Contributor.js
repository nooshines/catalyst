import React, { Fragment } from "react";

const Contributor = ({ Contributor }) => {
  return (
    <Fragment>
      {/* <img src={Contributor.avatar_url} /> */}
      <h5>Contributor Name</h5>
      <div>{Contributor.login}</div>
    </Fragment>
  );
};

export default Contributor;
