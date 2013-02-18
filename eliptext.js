/*global jQuery */
/*!	
* ElipText.JS 0.1
*
* Copyright 2013, Peter Hrynkow http://peterhrynkow.com
* Released under the WTFPL license 
* http://sam.zoy.org/wtfpl/
*
*
* Date: Sun Feb 17
*/
$.fn.elipText = function(options) {

    var settings = {
        'radius' : 200,
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


        var elem = $(this), 
            txt = elem.html().replace(/\s/g, '&nbsp;');
                
        elem.html(txt).lettering();

        var offset = 0,
            origin = 'center ' + (settings.radius) + 'px',
            delta = (180 / Math.PI),
            ch = parseInt(elem.find('span').css('line-height'), 10);

        if (settings.dir===-1) {
            origin = 'center ' + (-settings.radius + ch) + 'px';
        } 
        
        elem.find('span').each(function () {
          var l = $(this);
          offset += l.outerWidth() / 2 / (settings.radius-ch) * delta;
          l.data('rot', offset);                      
          offset += l.outerWidth() / 2 / (settings.radius-ch) * delta;
  
        });
        elem.find('span').each(function () {
            var l = $(this),
                r = (-offset * settings.dir / 2) + l.data('rot') * settings.dir,            
                transform = 'rotate(' + r + 'deg)';

            l.css({
                top: 0,
                left: '50%',
                marginLeft: -l.width() / 2,
                position: "absolute",
                //
                webkitTransform: transform,
                MozTransform: transform,
                oTransform: transform,
                msTransform: transform,
                transform: transform,
                //
                webkitTransformOrigin: origin,
                MozTransformOrigin: origin,
                oTransformOrigin: origin,
                msTransformOrigin: origin,
                transformOrigin: origin
            });
        });
    });
};