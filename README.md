# 🎯 JobFinder AI v2.4

A lightweight Chrome Extension that fetches **real-time job opportunities** from top tech companies using the JSearch API. Now with **flexible profiles** (only job role required), **5x more results**, and support for **10 major companies**!

## 🆕 What's New in v2.4 - Flexible Profiles & Maximum Results!

- ⚡ **Simplified Setup** - Only job role required, all other fields optional
- 📊 **5x More Results** - Up to 75 jobs for freshers, 45 for experienced (vs 15-30 before)
- 🏢 **10 Companies** - Added Meta, Apple, Netflix, Tesla, Uber (vs 5 before)
- 🎯 **Smart Optional Fields** - Fill what you want, leave rest blank for broader search
- 🚀 **More Pages** - Fetches 3-5 pages per query for maximum opportunities

## ✨ Previous Updates

### v2.3 - Enhanced Fresher Support

- 🎓 **Automatic Fresher Detection** - Detects 0-1 year experience or recent graduates
- 🔍 **Multi-Query Search** - 3 parallel searches with fresher keywords
- 📈 **2x More Results** - Extended to 30 results for entry-level candidates
- 🏷️ **Entry-Level Badges** - Visual indicators on job cards

### v2.2 - Personalized Job Search

- 👤 **Smart Profile System** - Set up your job preferences
- 🎯 **Intelligent Matching** - Jobs tailored to your role, skills, and experience
- 📊 **Dynamic Queries** - API searches adapt to your profile
- ⚙️ **Edit Anytime** - Update preferences with one click

### v2.1 - Side Panel Mode

- 📌 **Persistent Side Panel** - Extension stays open while you browse tabs
- 🖼️ **Better Layout** - More space for job listings and details
- 💾 **Cache Support** - Last fetched jobs saved and restored

### v2.0 - Real Job Data

- 🆕 **Real Job Data** - Fetches actual job openings from JSearch API (RapidAPI)
- 🔄 **Live Updates** - Get current job listings, not static links
- 📍 **Detailed Info** - Real job titles, company names, and locations
- 🔗 **Direct Apply Links** - Opens actual job application pages
- 🆓 **Free to Use** - 2,500 free API requests per month

## Features

- 👤 **Personalized Job Search** - AI-powered matching based on your profile (NEW!)
- 📌 **Persistent Side Panel** - Stays open while you browse
- 🎯 **Smart Profile System** - Set role, skills, experience, and location (NEW!)
- 🔍 **One-Click Job Discovery** - Fetch latest job opportunities with a single click
- 🏢 **Multiple Companies** - Real jobs from Google, Amazon, Microsoft, NVIDIA, and Adobe
- 🚀 **Direct Application Links** - Open actual job application pages
- 💫 **Clean & Modern UI** - Beautiful gradient design with smooth animations
- ⚡ **Lightweight & Fast** - Minimal resource usage, built with Manifest V3
- 📊 **Error Handling** - Graceful error messages and loading states
- 💾 **Smart Caching** - Saves your last search for quick access
- 🔒 **Privacy Focused** - All profile data stored locally on your device

## Installation & Setup

### Step 1: Get Your Free API Key (5 minutes)

**IMPORTANT:** This extension requires a free RapidAPI key to fetch real job data.

1. Visit [JSearch API on RapidAPI](https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch)
2. Sign up for a free account (no credit card required)
3. Subscribe to the **"Basic (Free)"** plan (2,500 requests/month)
4. Copy your API key from the dashboard

📖 **Detailed guide**: See `API_SETUP_GUIDE.md` or `QUICK_API_SETUP.txt`

### Step 2: Configure the Extension

1. Open `sidepanel.js` in a text editor (or `popup.js` if using old version)
2. Find line 10: `apiKey: 'YOUR_RAPIDAPI_KEY_HERE'`
3. Replace `'YOUR_RAPIDAPI_KEY_HERE'` with your actual API key
4. Save the file

### Step 3: Install in Chrome

1. **Generate Icons First**
   - Open `generate_icons.html` in your browser
   - Click "Generate Icons" and download all 3 files
   - Save them in the `JustApply` folder

2. **Load Extension**
   - Navigate to `chrome://extensions/` in Chrome
   - Enable "Developer mode" (toggle in top-right)
   - Click "Load unpacked"
   - Select the `JustApply` folder

3. **Pin the Extension** (Optional)
   - Click the puzzle icon in Chrome toolbar
   - Find "JobFinder AI" and click the pin icon

## Usage

### Using the Side Panel (v2.1)

1. **Open Side Panel**: Click the JobFinder AI extension icon in your Chrome toolbar
2. **Side Panel Opens**: Extension appears on the right side of your browser
3. **Fetch Jobs**: Click the "🔍 Fetch Jobs" button
4. **Browse**: Scroll through available job listings
5. **Apply**: Click "View Job" on any listing - opens in new tab while side panel stays open!
6. **Stay Open**: Side panel remains visible even when switching tabs

**Benefits:**
- ✅ Panel stays open while you browse
- ✅ No need to keep re-opening the extension
- ✅ Browse jobs while visiting company websites
- ✅ Last search is cached for quick access

📖 **For detailed guide**: See `SIDEPANEL_GUIDE.md`

## File Structure

```
JustApply/
├── manifest.json          # Extension configuration (Manifest V3, v2.1)
├── background.js          # Service worker (handles side panel)
├── sidepanel.html         # Side panel interface (NEW!)
├── sidepanel.css          # Side panel styling (NEW!)
├── sidepanel.js           # Side panel logic & API calls (NEW!)
├── popup.html             # Legacy popup (not used in v2.1)
├── popup.css              # Legacy popup styling
├── popup.js               # Legacy popup logic
├── README.md              # This file
├── SIDEPANEL_GUIDE.md     # Side panel documentation (NEW!)
├── icon16.png             # Extension icon (16x16)
├── icon48.png             # Extension icon (48x48)
└── icon128.png            # Extension icon (128x128)
```

## Important Notes

### Icons Required
The extension currently references icon files (`icon16.png`, `icon48.png`, `icon128.png`) that need to be created. You have two options:

1. **Create your own icons** (recommended for production)
2. **Use placeholder icons** - You can temporarily create simple colored squares or download free icons from:
   - [Flaticon](https://www.flaticon.com/)
   - [Icons8](https://icons8.com/)
   - Or use online icon generators

### Current Data Source
- The extension fetches **real-time job data** from JSearch API
- Powered by RapidAPI's job search aggregation
- Updates with current job postings from multiple sources
- Free tier: 2,500 API requests per month
- Each "Fetch Jobs" click = 1 API request

### Customization Options

**Change Job Search Query** (Line 67 in `popup.js`):
```javascript
// Current: Software engineering jobs
const query = 'software engineer (Google OR Amazon OR Microsoft OR NVIDIA OR Adobe)';

// Examples:
const query = 'product manager (Google OR Amazon OR ...)';
const query = 'data scientist (Google OR Amazon OR ...)';
const query = 'software engineer remote (Google OR ...)';
```

**Change Date Range** (Line 73 in `popup.js`):
```javascript
url.searchParams.append('date_posted', 'week'); // Options: 'today', '3days', 'week', 'month', 'all'
```

**Add More Companies**:
1. Update `TARGET_COMPANIES` array (line 15)
2. Add logo emoji to `COMPANY_LOGOS` (line 18-24)
3. Update search query to include new companies

## Technical Details

- **Manifest Version**: V3 (Latest Chrome standard)
- **API**: JSearch API via RapidAPI
- **Permissions**: 
  - `activeTab` - To open job pages in new tabs
  - `storage` - To store API preferences (future use)
  - `host_permissions` - Access to JSearch API endpoint
- **Browser Compatibility**: Chrome, Edge, and other Chromium-based browsers
- **API Limits**: 2,500 free requests/month (more than enough for daily use)

## Future Enhancements

- ✅ ~~Real-time job data fetching~~ (DONE in v2.0!)
- Job filtering by location, role, or experience level
- Save favorite jobs for later
- Job notifications for new postings
- Dark mode support
- Cache API responses to reduce requests

## Troubleshooting

**Error: "Please configure your RapidAPI key"**
- You haven't set up your API key yet
- Follow the API setup guide in `API_SETUP_GUIDE.md`
- Make sure to save `popup.js` after adding your key

**Error: "Failed to fetch jobs"**
- Check that your API key is correct (no extra spaces)
- Verify you're subscribed to JSearch API on RapidAPI
- Check your internet connection
- Try reloading the extension

**Extension doesn't load?**
- Ensure all files are in the same directory
- Check that Developer Mode is enabled
- Try reloading the extension from `chrome://extensions/`

**Icons not showing?**
- Use `generate_icons.html` to create them
- Or temporarily comment out icon references in manifest.json

**No jobs appearing (but no error)?**
- Try changing `date_posted` to 'month' or 'all' in popup.js
- Check console for details (Right-click popup → Inspect)
- The search might not have found recent jobs

## License

This is a sample project for educational purposes. Career page URLs belong to their respective companies.

---

**Built with ❤️ for job seekers**
