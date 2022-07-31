
;(function($){
	var defaults = {
		'rotate':false,
		'circleCenterX':150,
		'circleCenterY':150,
		'circleRad':250,
		'autoPlay':false,
		'transitionTime':'1s'
	}
	
	//constructor class
	var Rotata = function(element, options){
		var widget = element;
		this.config = $.extend({}, defaults, options);
		this.element = element;
		elementInAction = this.element;
		obj = this;
		
		this.init();
	}
		var posObject ={};
		var decrementor = 0;
	Rotata.prototype.init = function(){
		if($('.rotateBackRotata').length==0){
		obj.createButtons();
		}
		var configOption = this.config;
		var numOfEleme = this.element.children().length;
		var radianSets=[];
		var angleForEach = 360/numOfEleme;
		for(i=1;i<=numOfEleme;i++)
		{
			radian = (i*angleForEach)*((Math.PI)/180);
			radianSets.push(radian);
		}
		if(!configOption.rotate){
		$(elementInAction).children().each(function( index, value ) {
				xpos = configOption.circleCenterX+configOption.circleRad*Math.cos(radianSets[index]);
				ypos = configOption.circleCenterY+configOption.circleRad*Math.sin(radianSets[index]);
				
				posObject["elem"+index+"xpos" ]= xpos;
				posObject["elem"+index+"ypos" ]= ypos;
				$(this).css({'left':xpos+'px','top':ypos+'px'});
				
			});
			obj.assignZindex();
			obj.createReflection();
		}
		
		Rotata.prototype.transitionProp = function(elem){
			elem.css({'-moz-transition-duration':configOption.transitionTime,
								'-webkit-transition-duration':configOption.transitionTime,
								'transition-duration':configOption.transitionTime
							})	
		}
		
		Rotata.prototype.rotateForward = function(){
				
			$(elementInAction).children().each(function( index, value ) {
				obj.transitionProp($(this));
				$(this).css('z-index',$(this).next().css('z-index'))
				
				if(index==numOfEleme-1){
					$(this).css({'left':posObject["elem"+0+"xpos" ]+'px',
										'top':posObject["elem"+0+"ypos" ]+'px'
					});
				}
				else{
					$(this).css({'left':posObject["elem"+(index+1)+"xpos" ]+'px',
												'top':posObject["elem"+(index+1)+"ypos" ]+'px'
					});
				}
			});
			$(elementInAction).children().eq(numOfEleme-1).css('z-index',parseInt($(elementInAction).children().last().css('z-index'))+1);
			setTimeout(function(){
									$(elementInAction).children().last().prependTo(elementInAction);
									$('.rotateBackRotata,.rotateForwardRotata').removeAttr('disabled');
									},parseInt(configOption.transitionTime)*1000);	
								}
		
		
		Rotata.prototype.rotateBackward = function(){
				
			$(elementInAction).children().each(function( index, value ) {
				$(this).css('z-index',$(this).prev().css('z-index'));
				obj.transitionProp($(this));
				if(index==0){
					$(this).css({'left':posObject["elem"+(numOfEleme-1)+"xpos" ]+'px',
										'top':posObject["elem"+(numOfEleme-1)+"ypos" ]+'px'
					});
				}
				else{
					$(this).css({'left':posObject["elem"+(index-1)+"xpos" ]+'px',
												'top':posObject["elem"+(index-1)+"ypos" ]+'px'
					});
				}
			});
			$(elementInAction).children().first().css('z-index',parseInt($(elementInAction).children().eq(1).css('z-index')));
			setTimeout(function(){
										$(elementInAction).children().first().appendTo(elementInAction);
										$('.rotateBackRotata,.rotateForwardRotata').removeAttr('disabled');
										},parseInt(configOption.transitionTime)*1000);	
		}
			
		};
		
		Rotata.prototype.createButtons = function(){
			elementInAction.wrap("<div class='rotataOuter'></div>");
			var eachElementWidth = elementInAction.children().first().width();
			elementInAction.parent().css({'width':(elementInAction.width()*2)+(eachElementWidth/2),'position':'relative'});
			elementInAction.css({'margin-left':eachElementWidth/2+'px'});
			$('<input/>', {
    				class: 'rotateBackRotata',
						type: 'button',
    				value: '<'
			}).appendTo('.rotataOuter');
			$('<input/>', {
    				class: 'rotateForwardRotata',
						type: 'button',
    				value: '>'
			}).appendTo('.rotataOuter');
		}
		
		// create reflection
		Rotata.prototype.createReflection = function(){
			elementInAction.children().each(function(){
				var reflected = $(this).clone();
				reflected.removeAttr('class style');
				reflected.addClass('eachBitReflected');
				reflected.appendTo($(this));

				reflected.css({
					'position':'absolute',
					'transform':'rotateX(180deg)',
					'-moz-transform':'rotateX(180deg)',
					'-webkit-transform':'rotateX(180deg)',
					'top':'100%',
					'height':'100%',
					'overflow':'hidden',
					'margin-top':'1px',
					'opacity':'.1'
					
					});
				
			})
		}
		
		Rotata.prototype.assignZindex = function(){
			var totalelem = elementInAction.children().length;
			var maxTopValue =0;
			var maxTopElement=elementInAction.children().first();
			elementInAction.children().each(function(){
				var thismaxTopValue = parseInt($(this).css('top'));
				if(thismaxTopValue > maxTopValue){
					maxTopValue = thismaxTopValue;
					maxTopElement = $(this);	
				}
				});
				var indexed = elementInAction.children().index( maxTopElement);
				var maxZindex = totalelem*10;
				elementInAction.children().eq(indexed).css('z-index',maxZindex);
				maxTopElement.nextAll().each(function(index){
						if(index <(totalelem/2) )
						{
						$(this).css('z-index',maxZindex-10);
						maxZindex-=10;
						}
						else{
						$(this).css('z-index',maxZindex+10);
						maxZindex+=10;	
						}
						
				});
				maxZindex = totalelem*10;
				maxTopElement.prevAll().each(function(index){
						$(this).css('z-index',maxZindex-10);
						maxZindex-=10;
				});
			}
		
		
		Rotata.prototype.autoplay = function(){
			if(obj.config.autoPlay==true){
				$('.rotateForwardRotata,.rotateBackRotata').hide();
				 setInterval(function(){$('.rotateForwardRotata').trigger('click')},parseInt(obj.config.transitionTime)*1000);
			}
		}
		
	
	$.fn.rotata = function(options){
		new Rotata(this, options)
		obj.autoplay();
		return this;
	};

	$( document ).on( "click", ".rotateBackRotata,.rotateForwardRotata", function() {
			if($(this).hasClass('rotateBackRotata')){$(this).attr("disabled", "disabled");obj.rotateBackward()};
			if($(this).hasClass('rotateForwardRotata')){$(this).attr("disabled", "disabled");obj.rotateForward()};
			var objPos2 = Object.create(posObject);
			
	});
})(jQuery);





