var io  = require('socket.io-client');
//Localhost port 3000
 var socket      = io.connect('http://localhost:3000',{reconnection:true});

//heroku host
//var socket      =io.connect('https://gps-server-nodejs.herokuapp.com/',{reconnection:true});

var connected2Server = false;
var countSend = 0;

//Base will collect infomation from Serial Port and Trasnmit to Server via Socket.io

//Serial Port 
var serialport  = require('serialport');
var portName= process.argv[2] //Get the 1st Argument you pass to
var myPort  = new serialport(portName,{baudRate:9600,stopBits:1,parity:"none",autoOpen:true});
var readline    = serialport.parsers.Readline;
var parser      = new readline();      

myPort.pipe(parser)

myPort.on('open', showPortOpen);
myPort.on('close', showPortClose);
myPort.on('error', showError);
parser.on('data', readSerialData);

function readSerialData(data) {
    if(connected2Server){
        console.log('\n\nReceiving ' + data.length + ' bytes from serial');
        console.log(data);  
        console.log(countSend + " times");

        myObj ={"GPS":data,"count":countSend};

        //Send data
        socket.emit('base-send-GPS-message',myObj);  

        //Increase countSend
        countSend = countSend + 1;

        console.log('Send '+data.length +' bytes to Server');
    }else{
        console.log('\n\nNot connected to Server...');
    }
}
function showPortOpen() {
    console.log('port open' + myPort.comName + 'Data rate: ' + myPort.baudRate);
 }
  
   
 function showPortClose() {
    console.log('port closed.');
 }
  
 function showError(error) {
    console.log('Serial port error: ' + error);
 }

 //Add a connect listener

 socket.on('connect',function(socket){
    connected2Server = true;
    console.log('Connected!');
 });
 socket.on('disconnect',function(){
    connected2Server = false;
    console.log('\n\nDisconnected from Server...');
});