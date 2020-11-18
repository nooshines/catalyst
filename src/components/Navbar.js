import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Nav = styled.div`
  display: flex;
  align-items: center;
  padding: 0.7rem 2rem;
  position: fixed;
  z-index: 1;
  width: 100%;
  top: 0;
  border-bottom: solid 1px red;
  background-color: white;
`;

const Showcase = styled.div`
  text-align: center;
  padding: 150px;
  background-color: black;
  color: white;
  .description {
    padding-bottom: 50px;
    font-size: 40px;
  }
  .title {
    padding: 10px;
  }
  .location {
    padding: 10px;
  }
  a {
    color: white;
    text-decoration: none;
    display: block;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    padding: 80px;
    .description {
      padding-top: 10px;
      padding-bottom: 30px;
      font-size: 30px;
    }
  }
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
      <Showcase>
        <div className="description">{details.description}</div>
        <div className="title">
          Total Number of Repositories : {details.public_repos}
        </div>
        <div className="location">Location : {details.location}</div>
        <a className="title" href={details.url}>
          GitHub URL : {details.html_url}
        </a>
        <a className="title" href={details.blog}>
          Blog URL : {details.blog}
        </a>
      </Showcase>
    </Fragment>
  );
};

export default Navbar;
