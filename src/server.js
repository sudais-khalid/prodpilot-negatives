import express from "express";
import app from "./app";

if (module.hot) {
  module.hot.accept("./app", function() {
    console.log("🔁  HMR Reloading `./app`...");
  });

  console.info("✅  Server-side HMR Enabled!");
} else {
  console.info("❌  Server-side HMR Not Supported.");
}

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(3000, function(err) {
    if (err) {
      console.error(err);
      return;
    }

    console.log("Listening at http://localhost:3000");
  })
;
