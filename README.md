PROJECT DESCRIPTION

For my final project I decided to make a verilog simulator. This simulator accepts verilog code from the front end and runs a simulator in the backend. The results from the simulation are then displayed on the front end for the user. 

FEATURES

This project is user friendly with only 3 components for the user to consider. The first is the left text box where the user pastes or writes their code. The second is the simulate button that the user can press after writing their code. The third is the output text box on the right that displays the results.

IMPLEMENTATION

The project is composed of two parts: the frontend and the backend. The frontend communicates with the backend through a GET request. The frontend uses HTML and css styling. In the backend, the simulator “icarus verilog” http://iverilog.icarus.com/ is used. This simulator can be used through terminal commands. For this reason, the exec() method is called in the backend. The exec() is called twice. Once for processing the verilog code into an executable file, and another time for running that executable file. The output is sent back to the front end. 

Below is the link to a video explaining the project as well as some screenshots showing the simulator in action. 
https://youtu.be/r3UO0o8gHs0



FUTURE CONSIDERATIONS

One way to add more functionality to this project is to allow the user to upload their verilog files. This would be useful to users who already have verilog files and simply wish to simulate their designs without having to copy and paste their code. Another feature that could be added is a waveform display. This would require running another program in the backend. 
