rotataDiz
=========

jquery plugin to create a 360 degree rotating carousel

==========================================================

How to use:

a) Include script in your page preferably before the end of body tag

	<script type="text/javascript" src="js/jquery.rotataDiz.min.js"></script>

b) Include the css file 

	<link href="css/style.css" rel="stylesheet" type="text/css"/>

c) place each images inside div having class 'eachBit'

	<div id="rotata">
		<div class="eachBit"><img src="images/colored_eggs.jpg"/></div>
		<div class="eachBit rty"><img src="images/rabbits3602.jpg"/></div>
		<div class="eachBit"><img src="images/springcrocus4906.jpg"/></div>
		<div class="eachBit"><img src="images/woolchicks5061.jpg"/></div>
		<div class="eachBit"><img src="images/spring_lamb.jpg"/></div>
		<div class="eachBit rty"><img src="images/speckled_egg_nest.jpg"/></div>
	</div>

d) call rotataDiz when dom is ready

	<script type="text/javascript">
		$(document).ready(function() {
			$('#rotata').rotata({'transitionTime':'1s','autoPlay':false});
		});
	</script>
	
options:

 1) autoPlay - whether you want the carousel to auto rotate or not (false by default, true for autorotate)
 2) circleRad - radius of circle
 3) transitionTime - default 1s , transition time between one movement

