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

  // variable is assigned the output results that are to be determined later. 
  let simulation_output = document.getElementById("output_results");

  // variable is assigned the verilog code as an object written by the user. 
  let vcode = document.getElementById("verilog_code").value;

  // Displaying the verilog code for debugging purposes.
  console.log(Object.values(vcode));

  // The variable param is assigned the verilog code but as a JSON string. 
  let param = JSON.stringify(vcode);

  // Due to special characters in verilog and the way some characters are encoded
  // characters in param are replaced by their encoded version
  param = param.replace(/\%/g, '%25');
  param = param.replace(/\//g, '%2F')
  param = param.replace(/\\n/g, '%0D%0A');
  param = param.replace(/\+/g, '%2B');
  param = param.replace(/\#/g, '%23');

  // param is converted back to an object to be passed in the request.
  param = JSON.parse(param);

  // An intermediate message is displayed. 
  simulation_output.innerHTML = "Almost there...";

  try {
    // The request is made to the backend with the verilog code being passed as an object.
    let request = `http://127.0.0.1:5000/?vcode=${param}`;

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