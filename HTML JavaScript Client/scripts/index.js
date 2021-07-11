function moveForward() {
 //client = new Paho.MQTT.Client("driver.cloudmqtt.com", 38727,"web_" + parseInt(Math.random() * 100, 10));
  client = new Paho.MQTT.Client("192.168.205.160",8081,"raspsangsu1");
 // set callback handlers
 client.onConnectionLost = onConnectionLost;
 var options = {
 useSSL: false,
 userName: "sangsu_html_forward",
 password: "1111",
 onSuccess: sendMoveForwardMessage,
 onFailure: doFail
 }

 // connect the client
 //client.connect(options);
 client.connect({onSuccess: sendMoveForwardMessage})
}

// called when the client connects
function sendMoveForwardMessage() {
 message = new Paho.MQTT.Message("Forward");
 message.destinationName = "hello/world";
 client.send(message);
}

function moveBackward() {
 client = new Paho.MQTT.Client("192.168.205.160",8081,"raspsangsu2");
 client.onConnectionLost = onConnectionLost;
 var options = {
 useSSL: false,
 userName: "sangsu_html_backward",
 password: "1111",
 onSuccess: sendMoveBackwardMessage,
 onFailure: doFail
 }
 // connect the client
 client.connect({onSuccess: sendMoveBackwardMessage})
}

// called when the client connects
function sendMoveBackwardMessage() {
 message = new Paho.MQTT.Message("Backward");
 message.destinationName = "hello/world";
 client.send(message);
}

function turnLeft() {
 //client = new Paho.MQTT.Client("driver.cloudmqtt.com", 38727,"web_" + parseInt(Math.random() * 100, 10));
  client = new Paho.MQTT.Client("192.168.205.160",8081,"raspsangsu3");
 // set callback handlers
 client.onConnectionLost = onConnectionLost;
 var options = {
 useSSL: false,
 userName: "sangsu_html_left",
 password: "1111",
 onSuccess: sendTurnLeftMessage,
 onFailure: doFail
 }

 // connect the client
 //client.connect(options);
 client.connect({onSuccess: sendTurnLeftMessage})
}

// called when the client connects
function sendTurnLeftMessage() {
 message = new Paho.MQTT.Message("Left");
 message.destinationName = "hello/world";
 client.send(message);
}


function turnRight() {
  //client = new Paho.MQTT.Client("driver.cloudmqtt.com", 38727,"web_" + parseInt(Math.random() * 100, 10));
  client = new Paho.MQTT.Client("192.168.205.160",8081,"raspsangsu4");
 // set callback handlers
 client.onConnectionLost = onConnectionLost;
 var options = {
 useSSL: false,
 userName: "sangsu_html_right",
 password: "1111",
 onSuccess: sendTurnRightMessage,
 onFailure: doFail
 }

 // connect the client
 //client.connect(options);
 client.connect({onSuccess: sendTurnRightMessage})
}
// called when the client connects

function sendTurnRightMessage() {
 message = new Paho.MQTT.Message("Right");
 message.destinationName = "hello/world";
 client.send(message);
}

function LineTrace() {
  //client = new Paho.MQTT.Client("driver.cloudmqtt.com", 38727,"web_" + parseInt(Math.random() * 100, 10));
  client = new Paho.MQTT.Client("192.168.205.160",8081,"raspsangsu5");
 // set callback handlers
 client.onConnectionLost = onConnectionLost;
 var options = {
 useSSL: false,
 userName: "sangsu_html_line",
 password: "1111",
 onSuccess: sendLineTraceMessage,
 onFailure: doFail
 }

 // connect the client
 //client.connect(options);
 client.connect({onSuccess: sendLineTraceMessage})
}
// called when the client connects

function sendLineTraceMessage() {
 message = new Paho.MQTT.Message("line");
 message.destinationName = "hello/world";
 client.send(message);
}



function takePicture() {
 client = new Paho.MQTT.Client("driver.cloudmqtt.com", 38727,"web_" + parseInt(Math.random() * 100, 10));
 // set callback handlers
 client.onConnectionLost = onConnectionLost;
 var options = {
 useSSL: true,
userName: "fiuxdaln",
password: "TwLjT9X_BTra",
 onSuccess: sendTakePictureMessage,
 onFailure: doFail
 }
 // connect the client
 client.connect(options);
}

// called when the client connects
function sendTakePictureMessage() {
 message = new Paho.MQTT.Message("Picture");
 message.destinationName = "RobotControlXX";
 client.send(message);
}

function TARASAlarm() {
 client = new Paho.MQTT.Client("driver.cloudmqtt.com", 38727,"web_" + parseInt(Math.random() * 100, 10));
 // set callback handlers
 client.onConnectionLost = onConnectionLost;
 var options = {
 useSSL: true,
userName: "fiuxdaln",
password: "TwLjT9X_BTra",
 onSuccess: sendTARASAlarmMessage,
 onFailure: doFail
 }
 // connect the client
 client.connect(options);
}
// called when the client connects
function sendTARASAlarmMessage() {
 message = new Paho.MQTT.Message("Alarm");
 message.destinationName = "RobotControlXX";
 client.send(message);
}
function makeTARASDance() {
 client = new Paho.MQTT.Client("driver.cloudmqtt.com", 38727,
"web_" + parseInt(Math.random() * 100, 10));
 // set callback handlers
 client.onConnectionLost = onConnectionLost;
 var options = {
 useSSL: true,
userName: "fiuxdaln",
password: "TwLjT9X_BTra",
 onSuccess: makeTARASDanceMessage,
 onFailure: doFail
 }
 // connect the client
 client.connect(options);
}
// called when the client connects
function makeTARASDanceMessage() {
 message = new Paho.MQTT.Message("Dance");
 message.destinationName = "RobotControlXX";
 client.send(message);
}
function doFail() {
 alert("Error!");
}
// called when the client loses its connection
function onConnectionLost(responseObject) {
 if (responseObject.errorCode !== 0) {
     alert("onConnectionLost:" + responseObject.errorMessage);
 }
}
// called when a message arrives
function onMessageArrived(message) {
 document.getElementById('messageTxt').value =
message.payloadString;
}
function onsubsribeDistanceDataSuccess() {
 client.subscribe("distance");
 alert("Subscribed to distance data");
}


function subscribeDistanceData() {
 client = new Paho.MQTT.Client("driver.cloudmqtt.com", 38727,"web_" + parseInt(Math.random() * 100, 10));
 // set callback handlers
 client.onConnectionLost = onConnectionLost;
 client.onMessageArrived = onMessageArrived;
 var options = {
 useSSL: true,
userName: "fiuxdaln",
password: "TwLjT9X_BTra",
 onSuccess: onsubsribeDistanceDataSuccess,
 onFailure: doFail
 }
 // connect the client
 client.connect(options);
}