/*===============
@Author: Misha Marinenko <misha@marinenko.rf.gd>
@Copyright: (c) 2018
===============*/
const consola = require('consola');
const { exec } = require('child_process');
var prompt = require('prompt');
var express = require("express");
var app = express();

if(process.argv[2] || process.argv[1] == "--run-server"){
	runServer();
}

function runServer(){
	/*consola.info("🌌", "Starting the server setup...");
	prompt.start();
	  prompt.get(['name', 'serveraddr', 'passcode', 'port'], function (err, result) {
	consola.info("🌌", "Data you entered:");
    consola.log(result);
    consola.info("🌌", "Setup Done!");
    consola.info("🌌", "Starting the UniverseServer...");*/
    var result = { name: '0',                                                 
  serveraddr: 'localhost',
  passcode: '0000',
  port: '3000' };
    global.config = result;
    UniverseServer();
  //});
}
function UniverseServer(){
	app.get("/exec",function (req, res){
		if(global.config.passcode == req.passcode){
			res.send(exec(req.exec, (err, stdout, stderr) => {
  				if (err) {
  				 	 return {error: true};
  				 	 
  				}
  				return {error: false, stdout: stdout, stderr: stderr};
			}))
		}else{
			res.send({error: true})

		}
	});
	app.listen(global.config.port, function(){
		consola.info("🌌", "UniverseServer Started! \n", "listening on ", "http://"+global.config.serveraddr+":"+global.config.port)
	})
}