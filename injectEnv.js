const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const htmlPath = path.resolve(__dirname, "index.html");
let htmlContent = fs.readFileSync(htmlPath, "utf-8");

htmlContent = htmlContent.replace(
  "<head>",
  `<head>
   <script>
     window.env = {
       API_KEY: "${process.env.API_KEY}"
     };
   </script>`
);

fs.writeFileSync(htmlPath, htmlContent, "utf-8");
