import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Contributor from "./Contributor";

const CardWrapper = styled.div`
  border: 1px solid #ccc;
  color: black;
  text-align: center;
  :hover {
    background: #f8f8f8;
    cursor: pointer;
  }
`;

const Repository = ({ repository }) => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    getContributers();
  }, []);

  const getContributers = async () => {
    const res = await axios.get(repository.contributors_url);
    setContributors(res.data);
  };

  console.log("cont", contributors);

  return (
    <CardWrapper>
      <h4>Name</h4>
      <div>{repository.name}</div>
      <h4>Description</h4>
      <div>{repository.description}</div>
      <a href={repository.git_url}>GitHub URL</a>
      <h4>is this repository Forked ? </h4>
      <div>{repository.fork ? "forked" : "not forked"}</div>
      <h4>Star Count</h4>
      <div>{repository.stargazers_count}</div>
      <h4>Watchers Count</h4>
      <div>{repository.watchers_count}</div>
      <h4>licence</h4>
      <div>{repository.license ? repository.license.name : "No License"}</div>
      <h4>Language</h4>
      <div>{repository.language}</div>
      {/* <h4>contributers</h4>
      <h4>Created At</h4>
      <div>{repository.created_at}</div>
      <h4>Updated At</h4>
      <div>{repository.updated_at}</div> */}
    </CardWrapper>
  );
};

export default Repository;
