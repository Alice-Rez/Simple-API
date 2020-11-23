const express = require("express");
const fs = require("fs");
const toDo = require("../public/data/to-do");
const qs = require("querystring");
var router = express.Router();

router.get("/", (req, res) => {
  let filteredResults = toDo.results;
  console.log(filteredResults);
  if (!Object.keys(req.query).length) {
    res.render("api");
  } else {
    if (req.query.completed) {
      let filteredResultsState = filteredResults.filter(
        (todo) => String(todo.completed) === req.query.completed
      );
      console.log(filteredResultsState);
      filteredResults = filteredResultsState;
    }

    if (req.query.id) {
      let filteredResultsId = filteredResults.filter(
        (todo) => String(todo.id) === req.query.id
      );
      console.log(filteredResultsId);
      filteredResults = filteredResultsId;
    }

    console.log(req.query, req.query.userId, filteredResults.length);

    if (req.query.userId) {
      let filteredResultsUserId = filteredResults.filter(
        (todo) => String(todo.userId) === req.query.userId
      );
      console.log(filteredResultsUserId);
      filteredResults = filteredResultsUserId;
    }

    res.json({ results: filteredResults });
  }
});

router.get("/all", (req, res) => {
  res.json(toDo.results);
});

router.get("/users/:number", (req, res) => {
  let numberUsers = req.params.number;
  let usersTotal = toDo.results[toDo.results.length - 1].userId;
  let randomNumbers = [];
  for (let i = 1; i <= numberUsers; i++) {
    let number;
    do {
      number = Math.floor(Math.random() * usersTotal + 1);
    } while (randomNumbers.includes(number));
    randomNumbers.push(number);
  }
  console.log(randomNumbers);
  let results = {};
  randomNumbers.map((number) => {
    let userData = toDo.results.reduce((acc, todo) => {
      if (todo.userId === number) {
        acc.push(todo);
      }
      return acc;
    }, []);
    return (results[`user${number}`] = userData);
  });
  //   for (let i = 1; i <= numberUsers; i++) {
  //     let userData = toDo.results.reduce((acc, todo) => {
  //       if (todo.userId === i) {
  //         acc.push(todo);
  //       }
  //       return acc;
  //     }, []);
  //     results[`user${i}`] = userData;
  //   }
  res.json(results);
});

router.get("/todo/:number", (req, res) => {
  let numberToDo = req.params.number;
  console.log(numberToDo);
  res.json({ results: toDo.results.slice(0, numberToDo) });
});

module.exports = router;
