"use strict";

const port = 3000;
const http = require("http");
const app = http.createServer();

app.on("request", (req, res) => {
	let body = [];
	req.on("data", (bodydata) => {
		console.log(`data: ${bodydata}`);
		body.push(bodydata);
	});
	req.on("end", () => {
		const bodyString = Buffer.concat(body).toString();
		console.log(`Request Body: ${bodyString}`);

		if (bodyString === "") return 0;
		const array = JSON.parse(
			'{"' +
				decodeURI(bodyString.replace(/&/g, '","').replace(/=/g, '":"')) +
				'"}'
		);
		for (let key of array) {
			console.log(`name: ${key}, value: ${array[key]}`);
		}
	});

	// request logs
	console.log(`method: ${req.method}`);
	console.log(`url: ${req.url}`);
	console.log(`header ${req.headers}`);

	// params
	const params = new URL(req.url, "http://localhost:3000").searchParams;
	for (let param of params) {
		console.log(`name: ${param[0]}, value: ${param[1]}`);
	}

	res.writeHead(200, { "Content-Type": "text/html" });
	switch (req.url) {
		case "/get":
			res.end("GET");
			break;

		case "/post":
			res.end("POST");
			break;

		default:
			res.end("Default");
	}
});

app.listen(port, () => {
	console.log(`Start Server on ${port}`);
});
