import * as path from "path";
import express from "express";
import { people } from "./api";

(async function main() {
  const app = express();
  app.use(express.json());
  const frontendDist = path.join(__dirname, "..", "..", "frontend", "dist");

  app.use('/api/people', people);

  if (process.env.WEBPACK_DEV) {
    const { default: webpack } = await import("webpack");
    const { default: webpackMiddleware } = await import(
      "webpack-dev-middleware"
    );
    const { default: config } = await import("../../frontend/webpack.config");

    app.use(
      webpackMiddleware(
        webpack({
          ...config,
          mode: "development",
        }),
        {
          publicPath: config.output.publicPath,
        }
      )
    );
  } else {
    app.use(express.static(frontendDist));
    // Fallback for client side routing.
    app.use("*", (req, res) => {
      const index = path.join(frontendDist, "index.html");
      res.sendFile(index);
    });
  }

  app.listen(8080, () => console.log("listening!"));
})().catch(console.error);
