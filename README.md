# capture-iframe-click

Chrome extension to capture the xpath of an element clicked inside an iframe.

The extension uses two scripts:
- background.js: transmits messages received from the iframe to the outer page.
- content.js: injected in both outer page and iframe by the extension. In the iframe it captures any element clicked, finds it's xpath, and sends it as a message to the background. On the outer page, it listens for messages and inserts their content in an input field. The code to generate xpath was found in this [stack overflow answer](https://stackoverflow.com/questions/2631820/how-do-i-ensure-saved-click-coordinates-can-be-reloaed-to-the-same-place-even-i/2631931#2631931) and it's not mine.

Tested on Chrome 84.0.4147.125 (65 bits).

To load the extension check this tutorial: https://developer.chrome.com/extensions/getstarted 