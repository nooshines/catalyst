import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Contributor from "./Contributor";

const Repository = ({ repository }) => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    getContributers();
  }, []);

  const getContributers = async () => {
    const res = await axios.get(repository.contributors_url);
    console.log(res.data);
    setContributors(res.data);
  };

  return (
    <Fragment>
      <h4>Name</h4>
      <div>{repository.name}</div>
      <h4>Description</h4>
      <div>{repository.description}</div>
      <h4>GitHub URL</h4>
      <div>{repository.git_url}</div>
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
      <h4>contributers</h4>
      <div>
        {contributors.map((contributor) => {
          return <Contributor key={contributor.id} contributor={contributor} />;
        })}
      </div>
    </Fragment>
  );
};

export default Repository;
