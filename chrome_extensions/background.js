source_port = null
sink_port = null

chrome.runtime.onConnect.addListener(function(port) {
    if (port.name == "sink") {
        sink_port = port;
    }
    else if(port.name == "source"){
        source_port = port;
        port.onMessage.addListener(function(msg) {
            sink_port.postMessage(msg);
        });
    } 
});