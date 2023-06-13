# Kaew-ta App 📱

### APPLICATION DEVELOPMENT TO DETECT OBSTACLES AND OBJECTS FOR VISUALLY IMPAIRED PEOPLE USING MACHINE LEARNING

This project is a part of PROJECT IN SOFTWARE ENGINEERING 1&2 1/2022 and 2/2022

### **Tech, Framework and IDE**

[![Generic badge](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/Expo-20232A?style=for-the-badge&logo=expo&logoColor=white)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/Tensorflow.js-20232A?style=for-the-badge&logo=tensorflow&logoColor=F38740)](https://shields.io/) [![Roboflow](https://img.shields.io/static/v1?label=&message=Roboflow&color=%2320232A&style=for-the-badge)](https://) [![YOLOV5](https://img.shields.io/static/v1?label=&message=YOLOV5&color=%2320232A&style=for-the-badge&logo=YOLO&logoColor=00FFFF)](https://) [![Generic badge](https://img.shields.io/badge/Visual_Studio_Code-20232A?style=for-the-badge&logo=visual%20studio%20code&logoColor=0078D4)](https://shields.io/)

### **Flow Design**

[![diagrams.net](https://img.shields.io/static/v1?label=&message=diagrams.net&color=%2320232A&style=for-the-badge&logo=diagrams.net)](https://drive.google.com/file/d/1Bg4rdSzIdEJlZb7M2nmWu-_ESmLxu0qG/view?usp=sharing)

# Feature 😊

- **Detects 4 types of obstacles ==>** `sofa`, `table`, `billboards`, and `electric poles`.
- **Detects 3 types of objects ==>** `glasses`, `plates` and `spoons`.
- **Detect 9 types of money ==>** `one baht`, `two baht`, `five baht`, `ten baht`, `twenty baht`, `fifty baht`, `one hundred baht`, `five hundred baht` and `one thousand baht`.
- **support accessibility in Android and iOS**
- **A voice reads the names of obstacles, objects, notes and coins in response to the user.**
- **support language is Thai and English**

# Demo 😍
### Demo kaew-ta-app Use Accessibility
[![youtube](
https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/y-A7JDu0bBo)

### Demo kaew-ta-app
[![youtube](
https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/yRaSTJ0rT1E)

# **Steps to Run!** 😘

```
* Please test application on real device
* Recommend use iOS device to test application

  1. cd kaew-ta-app
  2. yarn install
  3. yarn start
  4. open Expo Go and scan QR CODE
```

**Expo Go** is an application for testing apps on real devices. Can be downloaded from App Store and Google Play Store.

# **Bug ?** 🥲😓

When running the application in android and selecting detection mode, you have to press save 1 time to detect. If you don't press save, it can't be detected. and when returning to the main menu at the terminal will alert

```
WARN  Possible Unhandled Promise Rejection (id: 0):
Error: ExponentGLObjectManager.createCameraTextureAsync: GLContext not found for given context id
```

But in iOS it can be used normally. and load the model faster and work more stable as well.
