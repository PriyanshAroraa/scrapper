import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/scrape", async (req, res) => {
  let { url } = req.body;

  // Auto-fix if protocol is missing
  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }

  try {
    // Validate URL format
    new URL(url);
  } catch (e) {
    return res.status(400).send("❌ Invalid URL format.");
  }

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0', // Pretend to be a browser
      }
    });

    const $ = cheerio.load(response.data);

    const text = $('body').text().replace(/\s+/g, ' ').trim();
    const links = [];
    $('a').each((i, el) => {
      const link = $(el).attr('href');
      if (link) links.push(link);
    });

    const output = `📝 TEXT CONTENT:\n\n${text}\n\n🔗 LINKS:\n\n${links.join('\n')}`;

    res.setHeader('Content-Disposition', 'attachment; filename="scraped.txt"');
    res.setHeader('Content-Type', 'text/plain');
    res.send(output);

  } catch (err) {
    console.error("Scrape failed:", err.message);
    res.status(500).send("❌ Failed to scrape. Site may have blocked the request or is unreachable.");
  }
});


app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
