"use client";
import React, { useState, useEffect } from "react";
import { Typography, Box, TextField, Autocomplete } from "@mui/material";
import FilterFriends from "./filterFriends";
import { Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import "../globals.css";

export default function SearchFriends() {
  const [input, setInput] = useState("");
  const [friendList, setfriendList] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const dummyFriends = [
    {
      id: 1,
      name: "Adrian",
      status: "Public",
      image: "./image/something",
    },
    {
      id: 2,
      name: "Zhi",
      status: "Public",
      image: "./image/something",
    },
    {
      id: 3,
      name: "Miles",
      status: "Public",
      image: "./image/something",
    },
    {
      id: 4,
      name: "Olivia",
      status: "Private",
      image: "./image/example1",
    },
    {
      id: 5,
      name: "Ethan",
      status: "Public",
      image: "./image/example2",
    },
    {
      id: 6,
      name: "Sophia",
      status: "Private",
      image: "./image/example3",
    },
    {
      id: 7,
      name: "Liam",
      status: "Public",
      image: "./image/example4",
    },
    {
      id: 8,
      name: "Emma",
      status: "Private",
      image: "./image/example5",
    },
    {
      id: 9,
      name: "Noah",
      status: "Public",
      image: "./image/example6",
    },
    {
      id: 10,
      name: "Ava",
      status: "Private",
      image: "./image/example7",
    },
  ];
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedFriends = filteredFriends.slice(startIndex, endIndex);

  const handleInput = (e) => {
    const targetValue = e.target.value.toLowerCase();
    setInput(targetValue);
    const newFriends = friendList.filter((element) => {
      if (targetValue === "") {
        return element;
      } else {
        return element.name.toLowerCase().includes(targetValue);
      }
    });
    console.log("newFriends", newFriends);
    setFilteredFriends(newFriends);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch("/api/friendship", {
          method: "GET",
        });
        const data = await response.json();
        console.log("events data", data);
        setfriendList(data);
        setFilteredFriends(data);
      } catch (error) {
        console.error("Failed to fetch [posts]:", error);
      }
    };
    fetchPeople();
  }, []);

  return (
    <Box
      className="App"
      sx={{
        width: "clamp(500px, 80%, 1000px)",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: 1000,
      }}
    >
      <Typography variant="h4" component={"h1"}>
        Search People
      </Typography>
      {/* <Autocomplete
        sx={{width: "60%", textAlign: "center"}}
        disablePortal
        id="combo-box-demo"
        options={friendList.map((item) => item.name)}
        onChange={handleInput}
        renderInput={(params) => (
          <TextField
            {...params}
            key = {params.id}
            value = {input}
            label="Search Friends"
            onChange={handleInput}
            sx={{
              margin: '10px auto',
            }}
          />
        )}
      /> */}
      <TextField
        value={input}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        label="Search Friends"
        onChange={handleInput}
        sx={{
          margin: "10px auto",
          width: "60%",
        }}
      />
      <FilterFriends searchstring={input} friendList={displayedFriends} />
      <div className="pagination-container">
        <Pagination
          count={Math.ceil(filteredFriends.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </div>
    </Box>
  );
}
