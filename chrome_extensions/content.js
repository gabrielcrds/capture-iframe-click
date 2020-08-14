function getPathTo(element) {
    if (element.id !== '')
        return 'id("' + element.id + '")';
    if (element === document.body)
        return element.tagName;

    var ix = 0;
    var siblings = element.parentNode.childNodes;
    for (var i = 0; i < siblings.length; i++) {
        var sibling = siblings[i];
        if (sibling === element)
            return getPathTo(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
        if (sibling.nodeType === 1 && sibling.tagName === element.tagName)
            ix++;
    }
}

function getPageXY(element) {
    var x = 0, y = 0;
    while (element) {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    }
    return [x, y];
}

function getXpath(event){
    if (event === undefined) event = window.event;                     // IE hack
    var target = 'target' in event ? event.target : event.srcElement; // another IE hack

    var root = document.compatMode === 'CSS1Compat' ? document.documentElement : document.body;
    var mxy = [event.clientX + root.scrollLeft, event.clientY + root.scrollTop];

    var path = getPathTo(target);
    var txy = getPageXY(target);
    console.log('Clicked element ' + path + ' offset ' + (mxy[0] - txy[0]) + ', ' + (mxy[1] - txy[1]));
    return path;
}

function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
} 

docReady(function () {
    var inp = document.getElementById("path_input_container");

    if (inp) {
        var port = chrome.runtime.connect({ name: "sink" });
        port.onMessage.addListener(function (msg) {
            inp.value = msg["content"]
        });
    }
    else {
        var port = chrome.runtime.connect({ name: "source" });
        
        document.onclick = function (event) {
            path = getXpath(event);
            port.postMessage({ content: path });
        }
    }
});


