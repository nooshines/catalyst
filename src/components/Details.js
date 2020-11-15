import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

const Details = () => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    getDetails();
  }, []);

  //get Catalyst Details
  const getDetails = async () => {
    try {
      const res = await axios.get("https://api.github.com/orgs/catalyst");
      setDetails(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log("details", details);
  return (
    <Fragment>
      <img src={details.avatar_url} />
      <h1>{details.name}</h1>
      <h4>{details.description}</h4>
      <div>{details.location}</div>
      <h4>Total Number of Repositories</h4>
      <div>{details.public_repos}</div>
      <h4>GitHub URL</h4>
      <div>{details.url}</div>
      <h4>Blog URL</h4>
      <div>{details.blog}</div>
    </Fragment>
  );
};

export default Details;
