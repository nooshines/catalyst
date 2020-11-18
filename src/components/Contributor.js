import React, { Fragment } from "react";
import styled from "styled-components";

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50px;
`;

const Wrapper = styled.div`
  display: inline-block;
  margin: 5px;
`;

const Contributor = ({ contributor }) => {
  return (
    <Wrapper>
      <a href={contributor.html_url}>
        {" "}
        <Image src={contributor.avatar_url} />
      </a>
      <div>{contributor.login}</div>
    </Wrapper>
  );
};

export default Contributor;
