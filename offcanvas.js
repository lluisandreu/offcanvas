(function() {

    var opener = document.querySelector(".offcanvas-trigger");
    var closer = document.querySelector(".offcanvas-close");
    var canvas = document.querySelector(".offcanvas-page-wrapper");
    var container = document.querySelector(".offcanvas-page-container");


    function detectmob() {
        if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i)) {
            return true;
        } else {
            return false;
        }
    }
    if (detectmob()) {
        eventtype = "touchstart";
    } else if (navigator.userAgent.match(/iemobile/i)) {
        // Touch event for Window Mobiles
        eventtype = "MSPointerDown";
    } else {
        eventtype = "click";
    }

    function init() {
        overlay();
        toggle();
        collapseChildren();
    }

    function toggle() {
        if (document.addEventListener) { // For all major browsers, except IE 8 and earlier

            opener.addEventListener(eventtype, toggleMenu);
            closer.addEventListener(eventtype, toggleMenu);


        } else if (document.attachEvent) { // For IE 8 and earlier versions
            opener.attachEvent(eventtype, toggleMenu);
            closer.attachEvent(eventtype, toggleMenu);

        }

        document.onkeydown = function(key) {
            if (key.keyCode == 27 && classie.has(canvas, 'open')) {
                closeMenu();
            }
        }
    }

    function toggleMenu() {
        if (!classie.has(canvas, 'open')) {
            classie.add(canvas, 'open');
        } else {
            classie.remove(canvas, 'open');
        }
    }

    function closeMenu() {
        if (classie.has(canvas, 'open')) {
            classie.remove(canvas, 'open');
        }
    }

    function overlay() {
        if (Modernizr.webgl) {
            var ol = document.createElement("div");
            ol.className = "offcanvas-overlay";
            container.appendChild(ol);

            if (document.addEventListener) {
                ol.addEventListener(eventtype, closeMenu);
            }
        }
    }

    function collapseChildren() {
        var parent = document.querySelectorAll('.offcanvas-navigation li.parent-item');
        for (var i = parent.length - 1; i >= 0; i--) {
            var trigger = document.createElement('div');
            trigger.innerHTML = '<span class="collapse-arrow"></span>';
            trigger.className = "collapse-trigger trigger-closed";
            parent[i].appendChild(trigger);
            trigger.addEventListener(eventtype, function() {
                if (classie.has(this, 'trigger-closed')) {
                    classie.add(this, 'trigger-collapsed');
                    classie.remove(this, 'trigger-closed');
                } else {
                    classie.add(this, 'trigger-closed');
                    classie.remove(this, 'trigger-collapsed');
                }

                var child = this.previousSibling;
                if (!classie.has(child, 'child-collapsed')) {
                    classie.add(child, 'child-collapsed');
                    classie.remove(child, 'child-closed');
                } else {
                    classie.add(child, 'child-closed');
                    classie.remove(child, 'child-collapsed');
                }
            });
        }
    };
    init();
})();
