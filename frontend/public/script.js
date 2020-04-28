/**
 * Set the initial values of min_value and max_value
 */
// function initialize() {
//   // Initialize min and max values
//   document.getElementById("code").value = "0";
// }

// initialize();

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

  // Accessing the div that has random value
  let simulation_output = document.getElementById("output_results");

  let code = document.getElementById("output_results");

  simulation_output.innerHTML = "Please wait...";

  try {
    let request = `http://127.0.0.1:5000/?code=${verilog_code}`;

    console.log("request: ", request);

    // Send an HTTP GET request to the backend
    const data = await axios.get(request);

    console.log("data.data: ", JSON.stringify(data.data));

    // Display the simulation output
    simulation_output.innerHTML = data.data;
  } catch (error) {
    console.log("error: ", error);
  }
}