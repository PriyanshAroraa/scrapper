Perfect! Here's the full README content formatted for easy copy-paste into a `.docx` or anywhere else:

---

# 🕸️ Website Scraper

A simple Node.js + Express web app that lets you enter a website URL and scrape its visible text and all anchor links. The scraped content is returned as a downloadable `.txt` file.

---

## 🚀 Features

* 🌐 Enter any website URL
* 🧠 Automatically fixes missing `https://`
* 📝 Extracts visible text content
* 🔗 Extracts all anchor links
* 📄 Returns a `.txt` file with the results
* 💥 Handles common errors (invalid URLs, blocked scraping)

---

## 📁 Project Structure

```
scrapper-main/
├── public/
│   └── index.html         # UI for user input
├── app.js                 # Main Express server
├── package.json           # Dependencies
```

---

## 🧑‍💻 How to Run

**1. Clone the repo**

```bash
git clone https://github.com/PriyanshAroraa/scrapper-main.git
cd scrapper-main
```

**2. Install dependencies**

```bash
npm install --legacy-peer-deps
```

**3. Start the server**

```bash
node app.js
```

**4. Open in browser**

```
http://localhost:3000
```

---

## 🛠️ Technologies Used

* **Express** – Web server
* **Cheerio** – HTML parser (like jQuery for the server)
* **Axios** – HTTP client
* **Node.js** – Runtime

---

## ⚠️ Notes & Limitations

* Always enter a valid full URL (e.g., `https://example.com`)
* Some websites like `chat.openai.com`, banking domains, or JavaScript-heavy pages may:

  * ❌ Block bots (returns 403)
  * ❌ Require login / dynamic rendering
* If you get `403 Forbidden`, the website likely has scraping protection.

---

## ✅ Improvements

* [ ] Use Puppeteer/Playwright for scraping JavaScript-heavy pages
* [ ] Add file saving to local directory
* [ ] Improve frontend UI
* [ ] Add logs for scraping jobs

---

## 📄 License

MIT License. Free to use and modify.

---

Let me know if you want a personalized version with your GitHub name, profile pic, or college details!
