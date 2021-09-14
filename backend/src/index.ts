import * as path from "path";
import * as express from "express";

(async function main() {
  const app = express();
  const frontendDist = path.join(__dirname, "..", "..", "frontend", "dist");

  if (process.env.WEBPACK_DEV) {
    const webpack = await import("webpack");
    const webpackMiddleware = await import("webpack-dev-middleware");
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

  app.use("/api/getdata", (req, res) => {
      res.status(200).send('hello world!')
  });

  app.listen(8080, () => console.log("listening!"));
})().catch(console.error);
