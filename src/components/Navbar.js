import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Nav = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  margin-bottom: 20px;
  padding: 0.7rem 2rem;
  position: fixed;
  z-index: 1;
  width: 100%;
  top: 0;
  border-bottom: solid 1px red;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  display: inline-block;
`;

const Name = styled.span`
  font-size: 20px;
  margin: 10px;
  font-weight: bold;
`;

const Navbar = () => {
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
      <Nav>
        <Image src={details.avatar_url} />
        <Name>{details.name}</Name>
      </Nav>

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

export default Navbar;
