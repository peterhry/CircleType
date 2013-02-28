/*
 * CircleType 0.3
 * Peter Hrynkow
 * Copyright 2013, Licensed GPL & MIT
 *
*/


$.fn.circleType = function(options) {

    var settings = {
        dir: 1
    };

    if (typeof($.fn.lettering) !== 'function') {
        console.log('Lettering.js is required');
        return;
    }

    return this.each(function () {
    
        if (options) { 
            $.extend(settings, options);
        }
        var elem = this, 
            delta = (180 / Math.PI),
            txt = elem.innerHTML.replace(/\s/g, '&nbsp;'),
            letters;
        
        elem.innerHTML = txt
        $(elem).lettering();

        elem.style.position =  'relative';

        letters = elem.getElementsByTagName('span');
                
        var layout = function () {
            var tw = 0, 
                i,
                offset = 0,
                ch = parseInt($(elem).css('line-height'), 10),
                minRadius, 
                origin, 
                innerRadius,
                l, style, r, transform,
                bb,
                yMax = Number.MIN_VALUE, 
                yMin = Number.MAX_VALUE;
            
            for (i = 0; i < letters.length; i++) {
                tw += letters[i].offsetWidth;
            }
            minRadius = (tw / Math.PI) / 2 + ch;

            if (settings.fluid) {
                settings.radius = Math.max(elem.offsetWidth / 2, minRadius);
            }    
            else if (!settings.radius) {
                settings.radius = minRadius;
            }    
            if (settings.dir === -1) {
                origin = 'center ' + (-settings.radius + ch) + 'px';
            } else {
                origin = 'center ' + settings.radius + 'px';
            }

            innerRadius = settings.radius - ch;
                
            for (i = 0; i < letters.length; i++) {
                l = letters[i];
                offset += l.offsetWidth / 2 / innerRadius * delta;
                l.rot = offset;                      
                offset += l.offsetWidth / 2 / innerRadius * delta;
            }   
            for (i = 0; i < letters.length; i++) {
                l = letters[i]
                style = l.style
                r = (-offset * settings.dir / 2) + l.rot * settings.dir            
                transform = 'rotate(' + r + 'deg)';
                    
                style.position = 'absolute';
                style.left = '50%';
                style.marginLeft = -l.offsetWidth / 2 + 'px';

                style.webkitTransform = transform;
                style.MozTransform = transform;
                style.OTransform = transform;
                style.msTransform = transform;
                style.transform = transform;

                style.webkitTransformOrigin = origin;
                style.MozTransformOrigin = origin;
                style.OTransformOrigin = origin;
                style.msTransformOrigin = origin;
                style.transformOrigin = origin;
                if(settings.dir === -1) {
                    style.bottom = 0;
                }

                bb = getPosition(l);
                if (bb.top < yMin) {
                    yMin = bb.top;
                } 
                if (bb.top > yMax) {
                    yMax = bb.top;
                }
                
            }
            
            if (settings.dir !== -1) {
                yMax += ch;
            }
            
            elem.style.height = yMax - yMin + 'px';      
        };
        
        var getPosition = function (elem) {
        	var docElem = document.documentElement,
        	    box = elem.getBoundingClientRect();
	        return {
		        top: box.top + window.pageYOffset - docElem.clientTop,
		        left: box.left + window.pageXOffset - docElem.clientLeft
	        };
        };        


        if (settings.fluid) {
            $(window).resize(function () {
                layout();
            });
        }    

        if (document.readyState !== "complete") {
            elem.style.visibility = 'hidden';
            $(window).load(function () {
                elem.style.visibility = 'visible';
                layout();
            });
        } else {
            layout();
        }
    });
};