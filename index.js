const express = require("express");
const app = express();
const cors = require("cors");


const homeRoutes = require("./routes/home");


const PORT = process.env.PORT || 5000;

// Parsing the request bodys
app.use(
	cors({
		credentials: true,
		origin: [/https?:\/\/localhost:\d{4}/ ],
	})
);

// Setting view engine
app.set("view engine", "ejs");
app.use(express.static("assets"));

// Setting Routes
app.use(homeRoutes);

// Starting the server
app.listen(PORT, () => {
	console.log(`You are listening to Port ${PORT}`);
});
