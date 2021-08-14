const express = require("express");
// const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
// const connectToMongoDB = require("./config/_mongodb");
// const cookieParser = require("cookie-parser");
// // Connecting Mongodb Database
// connectToMongoDB();

const homeRoutes = require("./routes/home");


const PORT = process.env.PORT || 5000;

// Parsing the request bodys
app.use(
	cors({
		credentials: true,
		origin: [/https?:\/\/localhost:\d{4}/ ],
	})
);
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
// app.use(cookieParser());


// Setting view engine
app.set("view engine", "ejs");
app.use(express.static("assets"));

// Setting Routes
app.use(homeRoutes);

// Starting the server
app.listen(PORT, () => {
	console.log(`You are listening to Port ${PORT}`);
});
