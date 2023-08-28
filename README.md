# Vector Web Setup (non DDL)
Vector Web Setup provides an open source tool to allow users of Vector
to configure their robot without relying on the proprietary phone
application that previously provided the only method a user could use
to configure their robot.

The software is written in [Node.js](https://nodejs.org) and should run anywhere you can
run Node.js. It is tested on Windows, Mac OSX, and Linux.

#Nodejs install

curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs

# Firmware Install Process
You can install the escapepod firmware or any firmware you want by adding the file to the ota folder

To auto flash a firmware once you pair and connect, make sure to update the 
otaEndpoints variable in the js file site\js\env\endpoints.js to the http link of the file. 
It has to be http as Vector cannot do an https handshake when flashing the firmware

e.g. if your PC's IP address is 192.168.0.8 and your ota file is 1.8ep.ota
place the file in the ota folder and update the variable to
  let otaEndpoints = "http://192.168.0.8:8000/ota/1.8ep.ota"

Alternatively, you can specify what ota file to use by appending the ota parameter in the url

http://192.168.0.8:8000/html/main.html?ota=http://192.168.0.8:8000/ota/1.8ep.ota

That way you can set the otaEndpoints variable to one firmware and flash a different one

# Alternative - Manuall Install method when pairing
uncheck - Enable auto-setup

view status - status

connect to wifi - wifi-scan

wifi-connect "SSID" "password"


ota-start https://192.168.0.8:8000/ota/ep-prod-1.8.ota



