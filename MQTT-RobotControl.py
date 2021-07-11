import paho.mqtt.client as mqtt
from time import sleep
from RobotDance import RobotDance
from RobotWheels import RobotWheels
from RobotBeep import RobotBeep
from RobotCamera import RobotCamera
from gpiozero import DistanceSensor

distance_sensor = DistanceSensor(echo=18, trigger=17)
right_sensor =3
left_sensor = 4

def on_message(client, userdata, message):
 command = message.payload.decode("utf-8")
 if command == "Forward":
 move_forward()
 elif command == "Backward":
 move_backward()
 elif command == "Left":
 turn_left()
 elif command == "Right":
 turn_right()
 elif command == "Picture":
 take_picture()
 elif command == "Alarm":
 sound_alarm()
 elif command == "Dance":
 robot_dance()
def move_forward():
 robotWheels = RobotWheels()
 robotWheels.move_forward()
 sleep(1)
 print("Moved forward")
 robotWheels.stop()
 watchMode()
def move_backward():
 robotWheels = RobotWheels()
 robotWheels.move_backwards()
 sleep(1)
 print("Moved backwards")
 robotWheels.stop()
 watchMode()

 def turn_left():
     robotWheels = RobotWheels()
     robotWheels.turn_left()
     sleep(1)
     print("Turned left")
     robotWheels.stop()
     watchMode()

 def turn_right():
     robotWheels = RobotWheels()
     robotWheels.turn_right()
     print("Turned right")
     robotWheels.stop()
     watchMode()

 def LineTracer():
     try:
         while True:
             if GPIO.input(right_sensor) and not GPIO.input(left_sensor):
                 print("go right")
                 robot.right(0.25)
                 robot.stop()
             elif GPIO.input(left_sensor) and not GPIO.input(right_sensor):
                 print("go left")
                 robot.left(0.25)
                 robot.stop()
             else:
                 print("Following the line!")
                 robot.forward(0.17)

                 robot.stop()
     except:
         GPIO.cleanup()
         print("exception")

 def watchMode():
     print("Watching.....")
     mqttc = mqtt.Client()
     mqttc.username_pw_set("raspSangsu", "xxxxxx")
     mqttc.connect("mqttBrokerIP")
     mqttc.on_message = on_message
     mqttc.subscribe("RobotControl")
     mqttc.loop()
     sleep(2)

 watchMode()