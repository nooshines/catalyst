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
  }
`;

const Name = styled.div`
  padding: 10px;
  font-weight: bold;
  font-size: 25px;
  color: #bb2205;
`;

const Description = styled.div`
  padding: 10px;
  font-size: 13px;
`;

const GitHubRepo = styled.div`
  padding: 10px;
  a {
    cursor: pointer;
    color: black;
    font-weight: bold;
    color: #393e46;
    :hover {
      color: black;
    }
  }
`;

const Icon = styled.i`
  padding-right: 5px;
`;

const Title = styled.span`
  padding: 10px;
  font-weight: bold;
`;

const Fork = styled.div`
  padding: 10px;
`;

const Wrapper = styled.div`
  padding: 5px;
`;

const Cont = styled.div`
  padding: 5px;
  font-weight: bold;
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

  const topContributors = contributors.slice(0, 5);

  return (
    <CardWrapper>
      <Name>{repository.name}</Name>
      <Description>{repository.description}</Description>
      <Wrapper>
        <Title>Star Count :</Title>
        <span>{repository.stargazers_count}</span>
      </Wrapper>
      <Wrapper>
        <Title> Watchers Count :</Title>
        <span>{repository.watchers_count}</span>
      </Wrapper>
      <Wrapper>
        <Title> Licence :</Title>
        <span>
          {repository.license ? repository.license.name : "No License"}
        </span>
      </Wrapper>
      <Wrapper>
        <Title>Language :</Title>
        <span>{repository.language}</span>
      </Wrapper>
      <Fork>
        <Icon className="fas fa-code-branch" />
        {repository.fork ? "Forked" : "Not Forked"}
      </Fork>
      <GitHubRepo>
        <Icon className="fab fa-github" />
        <a href={repository.git_url}>GitHub URL</a>
      </GitHubRepo>
      <Wrapper>
        <Cont>Contributers:</Cont>
        {topContributors.length &&
          topContributors.map((contributor) => {
            return (
              <Contributor key={contributor.id} contributor={contributor} />
            );
          })}
      </Wrapper>
      <div>{repository.full_name}</div>
      <div>{repository.created_at}</div>
      <div>{repository.updated_at}</div>
    </CardWrapper>
  );
};

export default Repository;
