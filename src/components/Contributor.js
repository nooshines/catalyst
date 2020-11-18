import React, { Fragment } from "react";
import styled from "styled-components";

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50px;
`;

const Contributor = ({ contributor }) => {
  return (
    <Fragment>
      <a href={contributor.html_url}>
        {" "}
        <Image src={contributor.avatar_url} />
      </a>

      <div>{contributor.login}</div>
    </Fragment>
  );
};

export default Contributor;
