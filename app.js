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
  const { url } = req.body;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract visible text
    const text = $('body').text().replace(/\s+/g, ' ').trim();

    // Extract all links
    const links = [];
    $('a').each((i, el) => {
      const link = $(el).attr('href');
      if (link) links.push(link);
    });

    // Format output
    const output = `📝 TEXT CONTENT:\n\n${text}\n\n🔗 LINKS:\n\n${links.join('\n')}`;

    // Respond with downloadable .txt file
    res.setHeader('Content-Disposition', 'attachment; filename="scraped.txt"');
    res.setHeader('Content-Type', 'text/plain');
    res.send(output);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("❌ Failed to scrape. Check if the URL is valid or accessible.");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
