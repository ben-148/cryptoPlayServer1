const fs = require("fs");
const path = require("path");

const today = new Date();
const day = String(today.getDate()).padStart(2, "0");
const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
const year = today.getFullYear();

const logFileName = `${day}_${month}_${year}.log`;

const logFilePath = path.join(__dirname, "logs", `${logFileName}`);

function fileLogger(req, res, next) {
  // Capture the start time to calculate response time later if needed
  const startTime = Date.now();

  // Store the original write and end methods of the response
  const originalWrite = res.write;
  const originalEnd = res.end;

  // Create a new writable stream to capture response data
  const chunks = [];
  res.write = function (chunk) {
    chunks.push(chunk);
    originalWrite.apply(res, arguments);
  };

  // When the response is finished, calculate response time and log the details
  res.end = function (chunk) {
    if (chunk) {
      chunks.push(chunk);
    }
    const responseBody = Buffer.concat(chunks).toString("utf8");

    // Restore the original methods
    res.write = originalWrite;
    res.end = originalEnd;

    // Capture the status code
    const statusCode = res.statusCode;

    // Log the request details along with the status code and response body
    if (
      statusCode >= 400 ||
      (statusCode < 400 && responseBody.includes('"err":'))
    ) {
      // Log the request details along with the status code and response body
      const logMessage = `${new Date().toISOString()} - ${req.method} ${
        req.url
      } - Status: ${statusCode}\nResponse: ${responseBody}\n`;

      fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
          console.error("Error writing to file logger:", err);
        }
      });
    }

    // Continue with the original response end
    originalEnd.apply(res, arguments);
  };

  next();
}

module.exports = fileLogger;
