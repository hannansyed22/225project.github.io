const corsAnywhere = require('cors-anywhere');

// Listen on port 8080 or any other port you prefer
const host = 'localhost';
const port = 8080;

corsAnywhere.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'], // Optional
    removeHeaders: ['cookie', 'cookie2'] // Optional
}).listen(port, host, () => {
    console.log(`CORS Anywhere proxy running at http://${host}:${port}`);
});
