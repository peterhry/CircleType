/*
 * CircleType 0.36
 * Peter Hrynkow
 * Copyright 2014, Licensed GPL & MIT
 *
*/

$.fn.circleType = function(options) {

    var self = this,
        settings = {
        dir: 1,
        position: 'relative',
        links: false
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
            fs = parseInt($(elem).css('font-size'), 10),
            ch = parseInt($(elem).css('line-height'), 10) || fs,
            txt = elem.innerHTML.replace(/^\s+|\s+$/g, '').replace(/\s/g, '&nbsp;'),
            letters, 
            center;

        elem.innerHTML = txt
        $(elem).lettering();

        elem.style.position = settings.position;

        letters = elem.getElementsByTagName('span');
        center = Math.floor(letters.length / 2);
                
        var layout = function () {
            var tw = 0, 
                i,
                offset = 0,
                minRadius, 
                origin, 
                innerRadius,
                l, style, r, transform;
                                                
            for (i = 0; i < letters.length; i++) {
                tw += letters[i].offsetWidth;
            }
            minRadius = (tw / Math.PI) / 2 + ch;
            
            if (settings.fluid && !settings.fitText) {
                settings.radius = Math.max(elem.offsetWidth / 2, minRadius);
            }    
            else if (!settings.radius) {
                settings.radius = minRadius;
            }   
            
            if (settings.dir === -1) {
                origin = 'center ' + (-settings.radius + ch) / fs + 'em';
            } else {
                origin = 'center ' + settings.radius / fs + 'em';
            }

            innerRadius = settings.radius - ch;
                
            for (i = 0; i < letters.length; i++) {
                l = letters[i];
                offset += l.offsetWidth / 2 / innerRadius * delta;
                l.rot = offset;                      
                offset += l.offsetWidth / 2 / innerRadius * delta;
            }

            var linksMapNames = new Array(),
                linksMapTargets = new Array();

            if (options.links) {
                var tokens0 = txt.split('<a&nbsp');
                tokens0.shift();
                tokens0.forEach(function(entry) {
                    var tokens1 = entry.substring(7, entry.indexOf('<')).split('>');
                    linksMapNames.push(tokens1[1].replace(/&nbsp;/g, ' '));
                    linksMapTargets.push(tokens1[0].substring(0, tokens1[0].length - 1));
                });
            }

            var linkIndex = 0,
                innerLinkIndex = 0,
                justChanged = false;
            for (i = 0; i < letters.length; i++) {
                l = letters[i];

                //console.log('<a href=\'#\'>' + l + '</a>');

                style = l.style;
                r = (-offset * settings.dir / 2) + l.rot * settings.dir;
                transform = 'rotate(' + r + 'deg)';
                    
                style.position = 'absolute';
                style.left = '50%';
                style.marginLeft = -(l.offsetWidth / 2) / fs + 'em';

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

                if ((linksMapNames[linkIndex].charAt(innerLinkIndex) == l.innerHTML) || (l.innerHTML == '&nbsp;' && linksMapNames[linkIndex].charAt(innerLinkIndex) == ' ')) {
                    l.innerHTML = '<a href=\'' + linksMapTargets[linkIndex] + '\'>' + l.innerHTML + '</a>';
                    innerLinkIndex++;
                    justChanged = true;
                } else {
                    if (justChanged) {
                        linkIndex++;
                        innerLinkIndex = 0;
                        justChanged = false;
                    }
                }
            }
            
            if (settings.fitText) {
                if (typeof($.fn.fitText) !== 'function') {
                    console.log('FitText.js is required when using the fitText option');
                } else {
                    $(elem).fitText();
                    $(window).resize(function () {
                        updateHeight();
                    });
                }
            }    
            updateHeight();
            
            if (typeof settings.callback === 'function') {
                // Execute our callback with the element we transformed as `this`
                settings.callback.apply(elem);
            }
        };
        
        var getBounds = function (elem) {
            var docElem = document.documentElement,
                box = elem.getBoundingClientRect();
            return {
                top: box.top + window.pageYOffset - docElem.clientTop,
                left: box.left + window.pageXOffset - docElem.clientLeft,
                height: box.height
            };
        };       
        
        var updateHeight = function () {
            var mid = getBounds(letters[center]),
                first = getBounds(letters[0]),
                h;
            if (mid.top < first.top) {
                h = first.top - mid.top + first.height;
            } else {
                h = mid.top - first.top + first.height;
            }
            elem.style.height = h + 'px';  
        }

        if (settings.fluid && !settings.fitText) {
            $(window).on('resize', function () {
                layout();
            });
        }    

        if (document.readyState !== "complete") {
            elem.style.visibility = 'hidden';
            $(window).on('load',function () {
                elem.style.visibility = 'visible';
                layout();
            });
        } else {
            layout();
        }
    });
};


