## Human Robotic Systems

![](skills-element src=./projects/skills/hrs.json)

##### NASA JPL

##### 2012-2014

[NASA remotely controls Athlete rover with Leap Motion](https://www.theverge.com/2013/3/27/4154900/nasa-athlete-leap-motion-GDC) _The Verge_

[NASA JPL takes a VR tour of Mars with Oculus Rift and Virtuix Omni](http://www.engadget.com/2013/08/05/nasa-jpl-oculus-rift-virtuix-omni/) _Engadget_

[How gaming tech is making for better interplanetary exploration](http://arstechnica.com/science/2013/10/how-gaming-tech-is-making-for-better-interplanetary-exploration/) _Arstechnica_

[Predicting the Future Could Improve Remote-Control of Space Robots](http://www.wired.com/wiredscience/2013/10/space-robot-time-delay/) _Wired_

[Virtual reality: not just a game](http://www.ocregister.com/articles/around-533108-virtual-rift.html/) _OC Register_

[NASA JPL creates a more immersive way to control a space robot with the Oculus Rift and the Kinect 2](http://www.engadget.com/2013/12/23/nasa-jpl-control-robotic-arm-kinect-2/) _Engadget_

[The headset allowing Nasa scientists to 'walk' on Mars](http://www.bbc.com/news/technology-29522600) _BBC Click_

[We Are Space Invaders @ 00:47:00](https://www.gdcvault.com/play/1018023/We-Are-the-Space-Invaders) _GDC 2013_

[2016 Unity Vision Summit](https://www.youtube.com/watch?v=sME2pxTKyIs) _Unity 2016 Vision Summit_

Research task to explore new opportunities and investigate innovative approaches to solving difficult problems in spacecraft operations. Tasks included tools to mitigate the negative effects of time delay in rover operations, intuitively operating high-degree-of-freedom robots such as Robonaut and ATHLETE, and visualizing spacecraft imagery with immersive technologies.

### Time Delay Tolerant Rover Operation
Robots are hard to control, and it get's even harder the further away they get. Our task was to research approaches to mitigating the negative effects of round-trip light and communication time to the robot, such as our rovers on Mars or Robonaut on the International Space Station. The major variables involved levels of uncertainty and error in the way a robot might move. Will the wheels slip? Will the arm sag? Visual odometry and on-board correction can account for this to some extent, but how can an operator stay ahead of the telemetry feedback and avoid waiting for a full round-trip communication loop?

![Time Delay Visualization](sliding-image src=../projects/images/time-delay.jpg min-perc=40 max-perc=100)


Our approach was to develop a basic error model of the robots operation and visualize everywhere the rover _might_ end up after performing a set of operations, so operators can take that into account and only send commands such that the rover is likely to be safe given the error model.

### Robotic Scaffolding
Related to time delayed operations, precise robot operations can be difficult to quickly control because of the finely controlled movements required to manipulate a tool. So how can we allow for quickly instructing a complex robot like Robonaut to pick something up or manipulate a tool?

![Robotic Operations with Jaco](sliding-image src=../projects/images/jaco-scaffold-dual.jpg min-perc=10 max-prc=90)

Our test platform was a robot called Jaco -- an IK-controlled, 6-DoF robot typically meant for the disabled. Our approach to the problem was to enable the user to apply structured object definitions we call "scaffolds" to the visual telemetry (a Prime Sense sensor in our case) with predefined interactions so the operator can simply instruct to "turn this", or "grab that". 

### Mighty Morphenaut

[NASA Looks to PlayStation VR to Solve Key Challenge of Space Robot Operation](https://www.roadtovr.com/nasa-sony-playstation-vr-remote-robot-operator-training/)

[Youtube Video](https://www.youtube.com/watch?v=mrpHJ5Qya90)

"Mighty Morphonaut" is a goofily named collaborative project with Sony's Magic Labs made with PSVR and demoed at SIGGRAPH 2015. It explores the how we might operate Robotnaut on the ISS with delayed operations while at the same time looking at previously unexplored territory such as voice chat, collaborative physics, and constrained IK arms in virtual reality.

![Might Morphenaut](sliding-image src=../projects/images/Mighty-Morphenaut_PlayStation-Magic-Lab_Siggraph-2015.jpg min-perc=10 max-prc=90)

### VR Mars
The commercialization of VR headsets brought the opportunity to put people on Mars in ways that hadn't been possible before, so we explored approaches to visualization the martian landscape in ways that would help our scientists better understand the world around the rover.

![VR Mars](sliding-image src=../projects/images/vr-mars.jpg min-perc=10 max-prc=90)

We started with a basic approach of visualizing cylindrical panoramas before moving into surflet and 3d reconstruction. This effort eventually bloomed into Project OnSite -- a Hololens application for visualizing the most robust Mars visualization to date.


