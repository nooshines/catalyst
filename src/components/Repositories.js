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

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Repositories = () => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    getRepositories();
  }, []);

  //get Catalyst Repositories
  const getRepositories = async () => {
    try {
      const res = await axios.get("https://api.github.com/orgs/catalyst/repos");
      setRepositories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(repositories);
  return (
    <Grid>
      {repositories.map((repository) => {
        return <Repository key={repository.id} repository={repository} />;
      })}
    </Grid>
  );
};

export default Repositories;
