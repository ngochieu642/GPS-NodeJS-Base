# GPS-NodeJS-Base

## How to run
1/ Clone the repository <br/>
git clone https://github.com/ngochieu642/GPS-NodeJS-Base.git <br/>
2/ cd GPS_Base <br/>
3/ npm install <br/>
4/ npm start - the default COM is COM3, which can be found in script:"start"<br/>
Or node index your-COM-Port (ex: node index COM3)


## How it works 
Base station receives GPS message from Serial Port, then uses Socket.IO to transmit to the server(on Heroku): https://gps-server-nodejs.herokuapp.com/
