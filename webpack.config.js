const path = require('path');
const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
    mode,
    target,
    devtool,
    entry: [
        path.resolve(__dirname, 'src', 'static', 'js', 'dev', 'burger.js'),
        path.resolve(__dirname, 'src', 'static', 'js', 'dev', 'strictTargets.js'),
        path.resolve(__dirname, 'src', 'static', 'js', 'dev', 'pickupApartment.js'),
    ],
    // entry: path.resolve(__dirname, 'src', 'js', 'dev'),
    output: {
        path: path.resolve(__dirname, 'src', 'static', 'js'),
        filename: "script.js",
    }
}