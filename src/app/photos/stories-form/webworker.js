self.addEventListener('message', function(e) {
    console.log(e.data)
        const request = requestAnimationFrame(e.data)
        self.postMessage(request);
}, false);