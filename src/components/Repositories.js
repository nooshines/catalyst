import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Repository from "./Repository";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Radio, FormControlLabel, RadioGroup } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  width: 100%;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Repositories = () => {
  const classes = useStyles();
  const [repositories, setRepositories] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [filter, setFilter] = useState("None");
  const [open, setOpen] = useState(false);
  const [openSort, setSortOpen] = useState(false);
  const [sort, setSort] = useState("created");
  const [order, setOrder] = useState("asc");

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSortClose = () => {
    setSortOpen(false);
  };

  const handleSortOpen = () => {
    setSortOpen(true);
  };

  useEffect(() => {
    getRepositories();
  }, []);

  useEffect(() => {
    console.log("sort", sort);
    let repos = repositories;
    if (filter === "Forked") {
      repos = repositories.filter((repo) => {
        return repo.fork === true;
      });
    } else if (filter === "Not Forked") {
      repos = repos.filter((repo) => {
        return repo.fork === false;
      });
    }
    setFilteredRepos(repos);
  }, [filter]);

  const sortRepos = (sort) => {
    let repos = filteredRepos;
    if (sort === "created") {
      repos = filteredRepos.sort((a, b) => {
        if (
          order === "asc"
            ? a.created_at > b.created_at
            : a.created_at < b.created_at
        ) {
          return 1;
        }
        if (
          order === "asc"
            ? a.created_at < b.created_at
            : a.created_at > b.created_at
        ) {
          return -1;
        }
        return 0;
      });
    } else if (sort === "updated") {
      repos = filteredRepos.sort((a, b) => {
        if (a.updated_at > b.updated_at) {
          return 1;
        }
        if (a.updated_at < b.updated_at) {
          return -1;
        }
        return 0;
      });
    } else if (sort === "fullname") {
      repos = filteredRepos.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    }
    setFilteredRepos(repos);
  };

  const handleChange = (event) => {
    if (event.target.name === "sortBy") {
      sortRepos(event.target.value);
      setSort(event.target.value);
    } else {
      setFilter(event.target.value);
    }
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
    setSort(event.target.value);
  };

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

  console.log("filteredrepos", filteredRepos);

  return (
    <Fragment>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">
          Filter By :
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={filter}
          onChange={handleChange}
        >
          <MenuItem value="None">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Forked"}>Forked</MenuItem>
          <MenuItem value={"Not Forked"}>Not Forked</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">
          Sort By :
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={openSort}
          onClose={handleSortClose}
          onOpen={handleSortOpen}
          value={sort}
          onChange={handleChange}
          name="sortBy"
        >
          <MenuItem value={"created"}>
            <em>Created Time</em>
          </MenuItem>
          <MenuItem value={"updated"}>Updated Time</MenuItem>
          <MenuItem value={"fullname"}>Full Name</MenuItem>
        </Select>
        <RadioGroup name="orderBy" value={order} onChange={handleOrderChange}>
          <FormControlLabel value="asc" control={<Radio />} label="Ascending" />
          <FormControlLabel
            value="desc"
            control={<Radio />}
            label="Descending"
          />
        </RadioGroup>
      </FormControl>

      <Grid>
        {filteredRepos.map((repository) => {
          return <Repository key={repository.id} repository={repository} />;
        })}
      </Grid>
    </Fragment>
  );
};

export default Repositories;
