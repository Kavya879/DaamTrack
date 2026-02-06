
<p align="center">
  <img src="https://raw.githubusercontent.com/Kavya879/DaamTrack/main/public/logo.jpg" alt="DaamTrack Logo" width="180"/>
</p>


<p align="center">
  A full-stack product price tracker that watches prices for you — so you don’t have to.
</p>

---

##   What is DaamTrack?

**DaamTrack** is a full-stack web application that lets users track product prices from online stores and get notified when prices change.

You paste a product link, DaamTrack extracts the price, stores it, and **automatically checks the price every day at 9 AM**. If the price drops (or changes), users get notified via email.

Built with modern tools, clean UI, and real-world automation in mind.

---

##  Features

- 🔗 Track products using just a URL  
-  Automatic price scraping using Firecrawl  
-  Daily cron job runs **every day at 9 AM**  
- 📉 Detects price changes over time  
-  Email notifications using Resend  
-  Secure database with Supabase  
-  Clean UI built with Shadcn UI  
- ⚡ Fast and SEO-friendly with Next.js  

---

##  How It Works

1. User adds a product URL  
2. Firecrawl scrapes the product name, price, and currency  
3. Data is stored in Supabase  
4. A cron job runs every day at **9 AM**  
5. If the price changes, an email notification is sent  

Simple, automated, and reliable.

---

##  Tech Stack

**Frontend**
- Next.js 
- Shadcn UI
- Tailwind CSS

**Backend**
- Next.js 
- Supabase (PostgreSQL)
- Firecrawl (Web scraping)
- Resend (Email service)

**Automation**
- Cron Jobs (daily at 9 AM)

---

##  Cron Job Schedule

The price-check cron job runs:

```text
Every day at 9:00 AM
````

It:

* Fetches all tracked products
* Re-scrapes current prices
* Compares with stored prices
* Triggers emails if changes are detected

---

## 📸 Screenshots

<div align="center">
  <img src="https://raw.githubusercontent.com/Kavya879/DaamTrack/main/public/screenshots/home.png" width="580" alt="Home Page" />
  <br />
  <strong>Home Page</strong>
</div>

<br />

<div align="center">
  <img src="https://raw.githubusercontent.com/Kavya879/DaamTrack/main/public/screenshots/tracker.png" width="580" alt="Tracker" />
  <br />
  <strong>Tracker</strong>
</div>

<br />

<div align="center">
  <img src="https://raw.githubusercontent.com/Kavya879/DaamTrack/main/public/screenshots/mail.png" width="580" alt="Mail" />
  <br />
  <strong>Sample Mail</strong>
</div>

---

##  Contributing 🤝

Pull requests are welcome.
If you have ideas, improvements, or bug fixes — feel free to open an issue or PR.

---

## 📄 License

This project is licensed under the **MIT License**.

---





