## Next Generation Spacecraft Sequencing with ATHLETE

![](skills-element src=./projects/skills/sequencing.json)

##### NASA JPL

##### 2012-2014

[On The Verge: NASA JPL and 'Terms and Conditions' director Cullen Hoback](https://www.youtube.com/watch?v=4b1vCwbxnsk) _Verge_

[Natural Interface Control of Future Space Robotics](https://www.youtube.com/watch?v=fyAgVohvJbc) _Ops Lab Youtube_

Investigated, designed, and developed prototype platform for the next generation of spacecraft visualization and operation using the JPL ATHLETE robot as a model mission. We produced web-based sequence editors and 3d visualization tools, as well as intuitive 3d interfaces for visually building and playing-back sequences.

![ATHLETE Rover in the microgravity testbed](sliding-image src=../projects/images/athlete-testbed.jpg min-perc=10 max-perc=90)

### Visual Sequencing
ATHLETE is an immensely complicated, 36-DoF robot with no real "forward" direction. We had developed a visual sequencing platform to help engineers and operators understand and simulate what would happen before sending commands to the real hardware. Point cloud representations of the telemetry provided by on board cameras were also rendered so operation could happen in context.

![ATHLETE Rover in the microgravity testbed](sliding-image src=../projects/images/athlete-zspace-sm.gif min-perc=10 max-perc=120)

_TODO: 3d Model of ATHLETE?_

The tool provided a maquette style interface for articulating the rover and generating commands based on the motions indicated by dragging ligaments around. The visualization and interactions were ported to a number of platforms including ZSpace, VR headsets, and the Hololens.

### Sequencing in the Web
At the end of the day sequences are processed as textual commands and can be hand editted and inspected as needed. Our visual sequencing tool were built to work in concert with a suite of web-based services that allowed you to edit and validate sequences using libraries like Ace Editor, as well as inspect and both real and ATHLETE-simulation telemetry.

This work is beginning to be used as reference for building a series of reusable components for multi-mission purposes.

<!--
### Sequencing Feedback and Simulation
_TODO_
-->

<!--
### The Future
_TODO_
-->
