const cors = require("cors");
const express = require("express")
const useragent = require("express-useragent")
const app = express();
const port = 80;
// Modules
const consoled = require("consoled.js"); // I am in love with this module, since it's made by me(narcissistic rizz)

app.use(cors())

app.use(useragent.express())

app.use((req, res, next) => {
  const ipp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const ip = ipp.replace("::ffff:", "")
  const browser = req.useragent.browser;
  const version = req.useragent.version;
  const os = req.useragent.os;
  const method = req.method;
  const url = req.originalUrl
  const base = req.baseurl;
  const time = new Date().toLocaleString("tr-TR");
  const host = req.hostname;
  const requestPath = req.path;
  consoled.bright.green(`IP Address: ${ip}, Browser: ${browser} ${version}, OS: ${os}, method: ${method}, time: ${time}, ${requestPath} to ${host}`);
  next();
});

// --------------------------------------------------------------------------------------------------------------------
//            IP 
//                     V4
//                               API  
// --------------------------------------------------------------------------------------------------------------------
app.get("/api", (req, res) => {
  const ipp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const ip;
  if(ipp == "::1"){
    ip = "localhost"
    return res.status(200).send(ip)
  }
  ip = ipp.replace("::ffff:", "");
  return res.status(200).send(ip)
})

app.get("/text", (req, res) => {
  const ipp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const ip = ipp.replace("::ffff:", "")
  res.status(200).send(ip)
})
app.get("/json", (req, res) => {
  const ipp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const ip = ipp.replace("::ffff:", "")
  res.json(ip)
})

app.get("/json/:id", (req, res) => {
  const id = req.params.id
  const ipp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const ip = ipp.replace("::ffff:", "-local-")
  return res.json({
    id: ip
  });
})



const server = app.listen(port, () => {
  consoled.blue("HTTP Server created on port " + server.address().port)
})
