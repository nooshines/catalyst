import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Repository from "./Repository";

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
    <Fragment>
      {repositories.map((repository) => {
        return <Repository key={repository.id} repository={repository} />;
      })}
    </Fragment>
  );
};

export default Repositories;
