# RASPI_LineTracer

![image](https://user-images.githubusercontent.com/66546156/125194423-2f317000-e28c-11eb-952d-8b7af8a02335.png)
![image](https://user-images.githubusercontent.com/66546156/125194431-32c4f700-e28c-11eb-88cd-c2754f6e669e.png)

라즈베리파이 라인트레이서 자동차

# 라인 트레이서

라인트레이서를 구현하기 위해 적외선 센서 모듈인 TCRT 5000을 2개 사용하였다
TCRT 5000 모듈을통해 흑,백색을 구분하며 양쪽 센서에 닿을경우 터치 메세지와 함께 다른 방향으로 가도록
코드가 동작되는 방식이다

![image](https://user-images.githubusercontent.com/66546156/125194291-8edb4b80-e28b-11eb-9c2f-fc0fe5a31f9a.png)
![image](https://user-images.githubusercontent.com/66546156/125194294-913da580-e28b-11eb-97bd-b0fdb772cfa2.png)


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


 MQTT_RobotControl.py 코드에 있는 LineTracer() 함수는 GPIO로 좌 우측 센서의 값을 읽어들인 후 왼쪽 센서가 검정 선에 닿으면 좌회전, 오른쪽 센서가 검정 선에 닿으면 우회전 
 두 센서 모두 선에 닿지않으면 직진을 하도록 하였다. .forward, right, left() 안에 들어가는 인자값은 PWM으로 DC모터에 인가되는 전력량과 비례해서 상승한다. 때문에 9v전지를 이용할 경우에는 출력이 PWM 인자를 높게 주어야하며, 전원 어댑터를 사용할 경우에는 PWM인자를 낮게 줘도 잘 굴러간다. 


# 라즈베리 파이카

![image](https://user-images.githubusercontent.com/66546156/125194540-c39bd280-e28c-11eb-986a-0a587d0db0b6.png)
![image](https://user-images.githubusercontent.com/66546156/125194557-ce566780-e28c-11eb-9e79-dadfc0f852ef.png)

2개의 모터를 제어하기 위해 L298N 모터 보드를 사용하였다. 핀이 4개라서 최대 2개의 바퀴 제어가 가능하다.
A 바퀴 전진 후진, B 바퀴 전진 후진
만약 바퀴를 네개 달게 된다면 RC카처럼 왼쪽 오른쪽 바퀴를 하나로 묶어서 컨트롤해야한다. 이번 프로젝트에서는 보조배터리와 9v 건전지를 사용하기 때문에 전력 손실로 인하여 바퀴를 2개만 사용하였고 무게 중심을 잡기 위해 휠 캐스터를 달아주어 뒷바퀴는 앞바퀴에 의해 끌려가게끔 설계하였다.  

# 파이카 컨트롤
![image](https://user-images.githubusercontent.com/66546156/125194719-7409d680-e28d-11eb-92d5-0a3315102aeb.png)

![image](https://user-images.githubusercontent.com/66546156/125194805-c1864380-e28d-11eb-9796-b87a4efc6ddf.png)


파이카를 원격으로 컨트롤 하기 위해 사용한 방법은 MQTT를 이용한 통신이다. 
Mosquttio Mqtt (for windows)를 사용하였고 노트북에서 MQTT 서버를 연 후 
리모컨 역할을 하는 HTML 페이지에서 명령에 맞는 메세지를 publish 하게 하였다
라즈베리파이의 코드에서는 해당 MQTT를 Subscribe 하고 있다가 명령 메세지가 도착하면 메세지에 맞는 명령을 수행하게 된다. 

학교 네트워크에서는 웹 소켓 포트가 8081밖에 열리지 않아 8081로 설정하였고 MQTT서버도 그에 맞게 8081포트도 사용하게끔 변경하였다

mosquitto 폴더의 mosquitto.conf 파일에서 상단에서 조금 내려서

#Port to use for the default listener.
#port 1883
listener 1883
protocol mqtt
listener 8081
protocol websockets 

이렇게 설정해주면 8081 포트도 사용가능하다


# 주행 화면 스트리밍
![image](https://user-images.githubusercontent.com/66546156/125194337-cd710600-e28b-11eb-8cb4-f56e1676275d.png)

라즈베리파이 motion web cam streaming을 사용하면 외부에서 라즈베리파이 ip를 웹 주소에 입력하면  파이카메라가 촬영하고 있는 내용을 HTML에 띄워준다. 
이를 응용해서 조종을 제어하는 웹페이지 부분에 해당 HTML코드를 추가해주는것 만으로 구현 완료하였다.
자율주행 프로그램과 카메라 스트리밍이 동시에 돌아가야하므로 웹캠 스트리밍은 백그라운드로 작동시키고 thonny를 이용해 자율주행.py를 실행하였다.

![image](https://user-images.githubusercontent.com/66546156/125194399-23de4480-e28c-11eb-9473-2bc0c398df13.png)

