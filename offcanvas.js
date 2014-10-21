(function() {

    var opener = document.querySelector(".offcanvas-trigger"),
        closer = document.querySelector(".offcanvas-close"),
        canvas = document.querySelector(".offcanvas-page-wrapper"),
        container = document.querySelector(".offcanvas-page-container");

    function init() {
        overlay();
        toggle();
        collapseChildren();
    }

    function toggle() {
        if (document.addEventListener) { // For all major browsers, except IE 8 and earlier

            opener.addEventListener("click", toggleMenu);
            closer.addEventListener("click", toggleMenu);


        } else if (document.attachEvent) { // For IE 8 and earlier versions
            opener.attachEvent("click", toggleMenu);
            closer.attachEvent("click", toggleMenu);

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
                ol.addEventListener("click", closeMenu);
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
            trigger.addEventListener("click", function() {
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
