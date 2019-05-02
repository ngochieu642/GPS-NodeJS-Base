# GPS-NodeJS-Base

##How to run
1/ npm start 
  The default COM is in the package.json (at script:"start")
2/ node index.js yourCOMPort (ex: node index COM3)

##How it works 
Base station receives GPS message from Serial Port, then uses Socket.IO to transmit to the server(on Heroku): https://gps-server-nodejs.herokuapp.com/
