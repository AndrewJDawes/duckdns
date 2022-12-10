// require file system module
const fs = require("fs");
const https = require("https");
// read token.txt file
// const token = fs.readFileSync("/run/secrets/token.txt");
const token = fs.readFileSync("token.txt");
// read config.json
const configRaw = fs.readFileSync("config.json");
const configParsed = JSON.parse(configRaw);
// get domains
const domains = configParsed.domains;
// loop through domains to create query param
const queryParams = new URLSearchParams();
queryParams.set("domains", domains);
queryParams.set("token", token);
// Leave empty to allow Duck DNS to detect
queryParams.set("ip", "");
// make this request
const endpoint = "https://www.duckdns.org/update";
const endpointWithParams = `${endpoint}?${queryParams.toString()}`
// "https://www.duckdns.org/update?domains=exampledomain&token=a7c4d0ad-114e-40ef-ba1d-d217904a50f2&ip="
https
  .get(endpointWithParams, (resp) => {
    let data = "";

    // A chunk of data has been received.
    resp.on("data", (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on("end", () => {
      console.log(data);
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  });
