/*
 * CircleType 0.32
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
                y1, y2, h;
            
            for (i = 0; i < letters.length; i++) {
                tw += letters[i].offsetWidth;
            }
            minRadius = (tw / Math.PI) / 2 + ch;
            if (settings.fluid) {
                settings.radius = Math.max(elem.offsetWidth / 2, minRadius);
            }    
            else if (!settings.radius || settings.fitText) {
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
            }
            
            y1 = getPosition(letters[Math.floor(letters.length / 2)]).top;
            y2 = getPosition(l).top;
            
            if (y1 < y2) {
                h = y2 - y1 + ch;
            } else {
                h = y1 - y2 + ch;
            }
            
            elem.style.height = h + 'px';      
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
        if (settings.fitText) {
            if (typeof($.fn.fitText) !== 'function') {
                console.log('FitText.js is required when using the fitText option');
            } else {
                $(elem).fitText();
                $(window).resize(function () {
                    layout();
                });
            }
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
