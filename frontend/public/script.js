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

  let vcode = document.getElementById("verilog_code").value;

  console.log(Object.values(vcode));

  let v = JSON.stringify(vcode);
  v = v.replace(/\%/g, '%25');
  v = v.replace(/\//g, '%2F')
  v = v.replace(/\\n/g, '%0D%0A');
  v = v.replace(/\+/g, '%2B');
  v = v.replace(/\#/g, '%23');

  v = JSON.parse(v);

  simulation_output.innerHTML = "Please wait...";

  try {
    let request = `http://127.0.0.1:5000/?vcode=${v}`;

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