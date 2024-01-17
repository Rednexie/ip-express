const app = require("express")()
const fs = require('fs');

const port = 3000;
const log = true


app.set('trust proxy', true)
app.set('json spaces', 2);
app.set('etag', false);
app.disable('x-powered-by');
app.use(require('cors')())


app.use((req, res, next) => {
    
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('x-xss-protection', '1; mode=block');
  res.setHeader('x-frame-options', false);
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  res.setHeader('Origin-Agent-Cluster', 'true');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-DNS-Prefetch-Control', 'off');
  res.setHeader('X-Download-Options', 'noopen');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.removeHeader('X-Ratelimit-Limit');
  res.removeHeader('X-Ratelimit-Remaining');
  res.removeHeader('X-Ratelimit-Reset');
  res.setHeader('Set-Cookies', 'SameSite=None; Secure');
  res.setHeader('X-Frame-Options', 'DENY');


  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'HEAD,GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use((req, res, next) => {
  if(log){
    fs.appendFile('./logs', `[${new Date().toLocaleString()}] ${req.ip}: ${req.method} => ${req.originalUrl}`, (err) => {
        if(err) console.error(err)
    })
  }
  console.log(`[${new Date().toLocaleString()}] ${req.ip}: ${req.method} => ${req.originalUrl}`)
  next()
})

app.get("/api", (req, res) => {
  let ip;
  const ipp = req.ip;
  if(ipp == "::1"){
    ip = "127.0.0.1"
    return res.status(200).send(ip)
  }
  ip = ipp.replace("::ffff:", "");
  return res.status(200).json({ ip })
})

app.get("/text", (req, res) => {
  const ipp = req.ip;
  const ip = ipp.replace("::ffff:", "")
  res.status(200).send(ip)
})

app.get("/json", (req, res) => {
  const ipp = req.ip;
  const ip = ipp.replace("::ffff:", "")
  res.json({ip})
})
app.get("/ips", async (req, res) => {
    res.json(req.ips)
})
app.get("/ips", async (req, res) => {
    res.send(req.ip)
})
app.get("/json/:id", (req, res) => {
  const id = req.params.id
  const ipp = req.connection.remoteAddress || req.headers['x-forwarded-for'];
  const ip = ipp.replace("::ffff:", "-local-")
  return res.json({
    id: ip
  });
})


app.listen(port, () => {
  console.log('ip-express is listening on port', port)
})

if(log && !fs.existsSync('./logs')) fs.writeFileSync('./logs', '', 'utf-8')
