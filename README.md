# curly-couscous
Just some cool stuff made by me

## Dev setup

- Requires npm 7+

Run `npm install` in the root directory, then `npm run start -w backend` to get a live dev server up and running locally.

Navigate to http://localhost:8080 to see the page. Everything is compiled live, but hot-module-reloading is not turned on, so you need to refresh the browser to get updated frontend changes.

The data is stored in memory in an array. Any changes made via the api are persisted in the same process until its restarted.

There is a DELETE endpoint but no UI for it, you can debug the request to find a id to test with.
