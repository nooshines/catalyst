import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Repository from "./Repository";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  width: 100%;
  padding: 20px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Repositories = () => {
  const [repositories, setRepositories] = useState([]);
  const [filteRedrepos, setFilteredRepos] = useState([]);
  const [filter, setFilter] = useState("none");

  useEffect(() => {
    getRepositories();
  }, []);

  useEffect(() => {
    if (filter === "forked") {
      const repos = repositories.filter((repo) => {
        return;
      });
    }
  }, [filter]);

  //get Catalyst Repositories
  const getRepositories = async () => {
    try {
      const res = await axios.get("https://api.github.com/orgs/catalyst/repos");
      setRepositories(res.data);
      setFilteredRepos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(repositories);

  return (
    <Fragment>
      <Grid>
        {repositories.map((repository) => {
          return <Repository key={repository.id} repository={repository} />;
        })}
      </Grid>
    </Fragment>
  );
};

export default Repositories;
