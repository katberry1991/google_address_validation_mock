# Google API Address Validation Mock
This is just an quick mock to check if we can use google API to make sure that address input by users (or browsers) is an valid address

## To run
Before you start, you need an API key from google developer console and insert the key into `public/index.html`. If you are part of NETA team, just contact me for demo key.

```
npm install
node server.js
```
Or simply open `index.html`, it will work without an server


## To write some code
Run `node server.js` to have some server start at port 3000.

You can use `gulp watch` to compile assets, it also starts browsersync on port 7000 if you wanna use it.

To get minified/ugglified assets, run `gulp production`


## About the Google API key

You need to have `Google Maps JavaScript API` enabled, and then create credentials for Geocoding Service
