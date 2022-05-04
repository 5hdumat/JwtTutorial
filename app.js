const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// LOAD THE CONFIG
require("dotenv").config();
const routes = require("./routes");
const port = 3000;

try {
    /**
     * Express Configuration
     **/
    const app = express();

    // parse JSON
    app.use(express.json());

    // print the request log on console
    app.use(morgan("dev"));

    // set Routes
    app.use("/", routes);

    app.listen(port, () => {
        console.log(`Express is running (port: ${port})`);
    });

    /**
     * Connect to Mongodb Server
     **/
    mongoose.connect(process.env.MONGO_URI, () => {
        console.log(`Mongodb is connect`);
    });
} catch (err) {
    console.log(err);
}
