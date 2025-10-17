# 🔑 API Setup Guide - JobFinder AI

## Overview

JobFinder AI now fetches **real-time job data** from the JSearch API via RapidAPI. This guide will help you set up your free API key in just a few minutes.

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Get Your Free RapidAPI Key

1. **Visit RapidAPI JSearch Page**
   - Go to: https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch
   - Or search "JSearch API" on [RapidAPI.com](https://rapidapi.com)

2. **Sign Up / Log In**
   - Click "Sign Up" (top-right) if you don't have an account
   - Use Google, GitHub, or email to create a free account
   - **It's completely free** - no credit card required for basic usage

3. **Subscribe to JSearch API (Free Plan)**
   - On the JSearch API page, click the **"Subscribe to Test"** button
   - Select the **"Basic (Free)"** plan
   - This gives you **2,500 free requests per month** - more than enough!
   - Click "Subscribe"

4. **Get Your API Key**
   - After subscribing, you'll see the **"X-RapidAPI-Key"** in the code snippets
   - Copy this key (it looks like: `abc123def456...`)
   - Keep this key private!

---

### Step 2: Configure the Extension

1. **Open `popup.js` in a text editor**
   - Location: `C:/Users/an04s/Desktop/JustApply/popup.js`
   - Use Notepad, VS Code, or any text editor

2. **Find the API Configuration Section**
   - Look for lines 6-12 at the top of the file:
   ```javascript
   const API_CONFIG = {
     baseUrl: 'https://jsearch.p.rapidapi.com/search',
     apiKey: 'YOUR_RAPIDAPI_KEY_HERE', // Replace this!
     host: 'jsearch.p.rapidapi.com'
   };
   ```

3. **Replace the API Key**
   - Replace `'YOUR_RAPIDAPI_KEY_HERE'` with your actual key
   - Keep the quotes around it!
   
   **Before:**
   ```javascript
   apiKey: 'YOUR_RAPIDAPI_KEY_HERE',
   ```
   
   **After:**
   ```javascript
   apiKey: 'abc123def456ghi789jkl012mno345pqr678stu',
   ```

4. **Save the File**
   - Save `popup.js` with your changes

---

### Step 3: Reload the Extension

1. **Open Chrome Extensions Page**
   - Go to: `chrome://extensions/`

2. **Reload the Extension**
   - Find "JobFinder AI" in your extensions list
   - Click the **refresh/reload icon** 🔄
   - This applies your API key changes

3. **Test It!**
   - Click the JobFinder AI extension icon
   - Click "Fetch Jobs"
   - You should now see **real job listings**! 🎉

---

## 📊 API Limits & Usage

### Free Plan Details
- **Requests per month**: 2,500
- **Cost**: $0 (completely free)
- **Rate limit**: 5 requests per second
- **Perfect for**: Personal use, testing, small projects

### How Many Requests Does the Extension Use?
- **Each "Fetch Jobs" click** = 1 API request
- **If you click 10 times per day** = 300 requests/month
- **Well within the free limit!** ✅

### Monitoring Your Usage
1. Go to [RapidAPI Dashboard](https://rapidapi.com/developer/dashboard)
2. Click on "Analytics"
3. View your monthly usage statistics

---

## 🔒 Security Best Practices

### ⚠️ Important Security Notes

1. **Never Share Your API Key Publicly**
   - Don't commit it to GitHub (use `.gitignore`)
   - Don't share screenshots with your key visible
   - Don't post it in forums or Discord

2. **For Public Distribution**
   - If sharing this extension with others, remove your API key
   - Users should get their own free keys
   - Consider creating a setup script that prompts for the key

3. **Key Rotation**
   - You can regenerate your key anytime on RapidAPI
   - Go to your app settings → Security → Regenerate Key

---

## 🛠️ Customization Options

### Change Job Search Query

Edit `popup.js` line 67 to customize what jobs are fetched:

```javascript
// Current search (software engineer jobs at tech companies)
const query = 'software engineer (Google OR Amazon OR Microsoft OR NVIDIA OR Adobe)';

// Examples of other searches:
// Product Manager jobs
const query = 'product manager (Google OR Amazon OR Microsoft OR NVIDIA OR Adobe)';

// Data Scientist jobs
const query = 'data scientist (Google OR Amazon OR Microsoft OR NVIDIA OR Adobe)';

// Remote-only jobs
const query = 'software engineer remote (Google OR Amazon OR Microsoft OR NVIDIA OR Adobe)';

// Specific location
const query = 'software engineer (Google OR Amazon OR Microsoft OR NVIDIA OR Adobe) San Francisco';
```

### Change Date Range

Edit `popup.js` line 73:

```javascript
// Current: Jobs from last week
url.searchParams.append('date_posted', 'week');

// Options:
// 'today'    - Posted today
// '3days'    - Posted in last 3 days
// 'week'     - Posted in last week
// 'month'    - Posted in last month
// 'all'      - All job postings
```

### Add More Companies

Edit the `TARGET_COMPANIES` array in `popup.js` (line 15):

```javascript
const TARGET_COMPANIES = ['Google', 'Amazon', 'Microsoft', 'NVIDIA', 'Adobe', 'Meta', 'Apple', 'Netflix'];
```

Then update the search query to include them:

```javascript
const query = 'software engineer (Google OR Amazon OR Microsoft OR NVIDIA OR Adobe OR Meta OR Apple OR Netflix)';
```

### Increase Job Limit

Edit `popup.js` line 93:

```javascript
// Current: Shows 15 jobs
.slice(0, 15)

// To show more:
.slice(0, 30)  // 30 jobs
```

---

## 🐛 Troubleshooting

### Problem: "Please configure your RapidAPI key"

**Solution:**
- You haven't replaced the placeholder API key
- Open `popup.js` and follow Step 2 above
- Make sure to save the file and reload the extension

### Problem: "Failed to fetch jobs. Please check your API key"

**Solution:**
- Your API key might be incorrect
- Check for extra spaces or missing characters
- Verify you copied the entire key from RapidAPI
- Make sure you're subscribed to the JSearch API (free plan)

### Problem: No jobs appear, but no error

**Solution:**
- The search might not have found any recent jobs
- Try changing the date range to 'month' or 'all'
- Try a broader search query

### Problem: CORS or Network Error

**Solution:**
- Make sure you have internet connection
- Check that the extension has permissions in `manifest.json`
- Try reloading the extension

### Problem: "Rate limit exceeded"

**Solution:**
- You've used your 2,500 monthly requests
- Wait until next month for reset
- Or upgrade to a paid plan on RapidAPI (if needed)

---

## 🔄 API Response Format

### What the JSearch API Returns

Each job object contains:

```javascript
{
  job_id: "unique-id",
  job_title: "Senior Software Engineer",
  employer_name: "Google",
  job_city: "Mountain View",
  job_state: "CA",
  job_country: "US",
  job_is_remote: false,
  job_apply_link: "https://...",
  job_google_link: "https://...",
  // ... and more fields
}
```

### How We Transform It

The extension converts this to a simpler format:

```javascript
{
  id: job.job_id,
  title: job.job_title,
  company: job.employer_name,
  location: "Mountain View, CA",
  url: job.job_apply_link,
  logo: "🔵" // Based on company name
}
```

---

## 📈 Advanced Configuration

### Using Environment Variables (For Developers)

If you want to avoid hardcoding the API key:

1. Create a `config.js` file:
```javascript
const API_KEY = 'your-key-here';
export { API_KEY };
```

2. Add it to `.gitignore`:
```
config.js
```

3. Import in `popup.js`:
```javascript
import { API_KEY } from './config.js';
const API_CONFIG = {
  apiKey: API_KEY,
  // ...
};
```

4. Update `manifest.json` to use modules:
```json
{
  "content_scripts": [{
    "js": ["popup.js"],
    "type": "module"
  }]
}
```

### Using Chrome Storage API

Store the API key in Chrome's secure storage:

```javascript
// Save key
chrome.storage.local.set({ apiKey: 'your-key' });

// Retrieve key
chrome.storage.local.get(['apiKey'], (result) => {
  const API_CONFIG = {
    apiKey: result.apiKey,
    // ...
  };
});
```

---

## 🎯 Testing Checklist

After setup, verify:

- [ ] API key is correctly pasted in `popup.js`
- [ ] File is saved
- [ ] Extension is reloaded in Chrome
- [ ] Click "Fetch Jobs" shows real job listings
- [ ] Job titles and companies are real
- [ ] "View Job" buttons open actual job pages
- [ ] No error messages appear

---

## 📞 Support & Resources

### RapidAPI Resources
- [JSearch API Documentation](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch)
- [RapidAPI Support](https://rapidapi.com/support)
- [API Status Page](https://status.rapidapi.com/)

### Extension Resources
- Check `README.md` for general extension info
- Review `popup.js` code comments for details
- Open Chrome DevTools to debug (Right-click → Inspect)

### Community
- RapidAPI Community Forum
- Stack Overflow (tag: `rapidapi`, `chrome-extension`)

---

## 🎉 Success!

Once configured, your JobFinder AI extension will display real, current job openings from top tech companies!

**Key Benefits:**
- ✅ Real-time job data (updated constantly)
- ✅ Direct apply links
- ✅ Multiple companies in one place
- ✅ Free to use (2,500 requests/month)
- ✅ No manual searching needed

---

## 🔮 Next Steps

Now that you have real job data:

1. **Customize the search** to match your job interests
2. **Adjust the date range** to see more/fewer jobs
3. **Add more companies** you're interested in
4. **Share with friends** (but they need their own API keys!)

---

**Happy Job Hunting! 🚀**

*Last Updated: October 2025*
