"use strict";

const express = require("express");
const app = express();
const fs = require("fs");

// Using child_process to run the shell commands
const { exec } = require("child_process");

// We need cors middleware to bypass CORS security in browsers.
const cors = require("cors");

app.use(express.static("static"));
app.use(cors());

let port = 5000;

/**
 * A promise that resolves after t ms.
 * @param {Number} t
 */
const delay = function (t) {
  return new Promise((resolve) => setTimeout(resolve, t));
};

/**
 * The default path
 */
app.get("/", async function (req, res) {
  if (req.query && Object.keys(req.query).length > 0) {
    console.log("I got a query!");
    handleGet(res, res, req.query);
  }
});

app.listen(port, (err) => {
  console.log(`Listening on port: ${port}`);
});



//-----------------------------------------------------------------------------

/**
 * Handles a Get request
 * @param {Object} req
 * @param {Object} res
 * @param {Object} query
 */
async function handleGet(req, res, query) {

  const fs = require("fs");

  console.log(Object.values(query));
  let str = JSON.stringify(Object.values(query));
  str = str.replace('%2C', '#')

  console.log(str)
  str = JSON.parse(str);
  console.log(str)

  fs.writeFile('input', str, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

  exec("iverilog -o test input", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    // console.log(`stdout: ${stdout}`);
  });
  
  await delay(2000);

  exec("vvp test", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    // console.log(`stdout: ${stdout}`);

    // Convert output to JSON
    let outputString = JSON.stringify(stdout);

    // Send it back to the frontend.
    res.send(outputString);
  });
}