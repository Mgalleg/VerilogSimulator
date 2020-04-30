/**
 * Set the initial values of min_value and max_value
 */

function initialize() {
  // Initialize min and max values
  // document.getElementById("code").value = "0";
}

initialize();

/**
 * Handle the click event on Submit (Generate) button
 */

document.getElementById("submit").onclick = function () {
  submit();
};

/**
 * An async function to send the request to the backend.
 */
async function submit() {
  console.log("In submit!");

  // import { writeFile } from "fs";

  // let sample = document.getElementById("verilog_code").value;

  // fs.writeFile('test', "test", (err) => {
  //   if (err) throw err;
  //   console.log('The file has been saved!');
  // });

  // Accessing the div that has random value
  let simulation_output = document.getElementById("output_results");

  let vcode = document.getElementById("verilog_code").value;

  let test = {
    the: vcode
  };

  console.log(Object.values(vcode));
  console.log(Object.values(test));

  simulation_output.innerHTML = "Please wait...";

  try {
    let request = `http://127.0.0.1:5000/?vcode=${vcode}`;

    console.log("request: ", request);

    // Send an HTTP GET request to the backend
    // const data = await axios.post(request, vcode);
    const data = await axios.get(request);

    console.log("data.data: ", JSON.stringify(data.data));

    // Display the simulation output
    simulation_output.innerHTML = data.data;
  } catch (error) {
    console.log("error: ", error);
  }
}