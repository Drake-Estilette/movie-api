const http = require("http"),
  fs = require("fs"),
  url = require("url");

// Create an HTTP server that responds with "Hello World!" to every request
http
  .createServer((request, response) => {
    let address = request.url,
      q = new URL(address, "http://" + request.headers.host),
      filePath = "";
    // Log the URL and timestamp to log.txt
    fs.appendFile(
      "log.txt",
      "URL" + address + "\nTimeStamp" + new Date() + "\n\n",
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Added data to log");
        }
      }
    );
    // Determine the file path based on the request URL
    if (q.pathname.includes("documentation")) {
      filePath = __dirname + "documentation.html";
    } else {
      filePath = "index.html";
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        throw err;
      }
      // Send the file content as the response
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(data);
      return response.end();
    });
  })
  .listen(8080);

console.log("Server running on port 8080");
