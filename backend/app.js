"use strict";

const express = require("express");
const app = express();

// Require "fs" for writing files
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

  // Display the query for debugging purposes
  console.log(Object.values(query));

  // The query will get written into a file called "input" in the same directory.
  fs.writeFile('input', Object.values(query), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

  // The exec() method is called in order to run terminal commands.
  // The first command is below. It will create the executable file "e_file"
  // The previously written input file is used below.
  exec("iverilog -o e_file input", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
  
  // Artificial delay
  await delay(2000);

  // The second exec() method is to run the executable file. 
  // The output is sent to the frontend.
  exec("vvp e_file", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);

    // Convert output to JSON
    let outputString = JSON.stringify(stdout);

    // Send it back to the frontend.
    res.send(outputString);
  });
}