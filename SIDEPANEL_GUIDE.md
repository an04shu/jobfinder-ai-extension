# 🎯 JobFinder AI - Side Panel Guide

## 🎉 Welcome to Side Panel Mode!

Your JobFinder AI extension has been upgraded to use Chrome's **persistent side panel** interface. This means the extension stays open while you browse, giving you constant access to job listings!

---

## 🆕 What's New in v2.1

### Side Panel Interface
- **Persistent Display**: Extension stays open while you browse different tabs
- **Wider Layout**: More space for job details
- **Better Scrolling**: Smooth scrolling through unlimited job listings
- **Sticky Header**: Search button always visible at top
- **Cache Support**: Last fetched jobs are saved and restored

### Key Benefits
- ✅ **No more re-opening**: Side panel stays visible across tabs
- ✅ **Multi-task friendly**: Browse jobs while checking company websites
- ✅ **Better UX**: More space for job cards and details
- ✅ **Persistent state**: Jobs remain visible even after clicking links

---

## 🚀 How to Use

### Opening the Side Panel

**Method 1: Extension Icon**
1. Click the JobFinder AI icon in Chrome toolbar
2. Side panel opens automatically on the right side
3. Panel remains open until you close it

**Method 2: Right-click**
1. Right-click the extension icon
2. Select "Open side panel"

**Method 3: Keyboard (if set up)**
1. Use Chrome keyboard shortcuts (chrome://extensions/shortcuts)
2. Assign a shortcut to "Open side panel"

### Using the Side Panel

1. **Fetch Jobs**: Click the "🔍 Fetch Jobs" button
2. **Browse**: Scroll through job listings
3. **Apply**: Click "View Job" on any listing
4. **Continue**: Job opens in new tab, side panel stays open!
5. **Stay Updated**: Click "Fetch Jobs" anytime for new listings

### Closing the Side Panel

- Click the ✕ button at the top of the side panel
- Or click the extension icon again
- Panel can be reopened anytime without losing state

---

## 📐 Layout & Design

### Side Panel Dimensions
- **Width**: ~400-500px (adjusts to Chrome's side panel)
- **Height**: Full browser height
- **Position**: Right side of Chrome window
- **Responsive**: Adapts to different screen sizes

### Visual Features
- **Gradient Background**: Purple-blue gradient (matches v2.0)
- **Sticky Header**: Title and fetch button stay at top
- **Smooth Scrolling**: Custom scrollbar styling
- **Card Animations**: Jobs slide in with stagger effect
- **Hover Effects**: Cards lift on hover

---

## 🔄 Persistence Features

### What Persists
- ✅ **Job Listings**: Last fetched jobs are cached
- ✅ **Panel State**: Panel stays open across tabs
- ✅ **Scroll Position**: Maintains your scroll position
- ✅ **Cache Duration**: Jobs cached for 1 hour

### What Doesn't Persist
- ❌ Loading state (resets on panel reopen)
- ❌ Error messages (cleared on new fetch)
- ❌ Jobs older than 1 hour (need re-fetch)

---

## 🎨 Customization

### Modify Search Query
Edit `sidepanel.js` line 68:

```javascript
// Current: Software engineer jobs
const query = 'software engineer (Google OR Amazon OR Microsoft OR NVIDIA OR Adobe)';

// Examples:
const query = 'product manager (Google OR Amazon OR ...)';
const query = 'data scientist (Google OR Amazon OR ...)';
const query = 'frontend developer remote (Google OR ...)';
```

### Change Date Range
Edit `sidepanel.js` line 73:

```javascript
url.searchParams.append('date_posted', 'week');

// Options: 'today', '3days', 'week', 'month', 'all'
```

### Auto-fetch on Open
Edit `sidepanel.js` line 287:

```javascript
// Uncomment to auto-fetch jobs when panel opens:
setTimeout(() => fetchJobs(), 500);
```

### Adjust Cache Duration
Edit `sidepanel.js` line 266:

```javascript
const oneHour = 60 * 60 * 1000; // Change to desired milliseconds
// Examples:
// 30 minutes: 30 * 60 * 1000
// 2 hours: 2 * 60 * 60 * 1000
```

---

## 🔧 Technical Details

### Files Structure

```
JustApply/
├── manifest.json          # Updated for side panel (v2.1)
├── background.js          # Service worker to handle side panel
├── sidepanel.html         # Side panel interface
├── sidepanel.css          # Side panel styling
├── sidepanel.js           # Side panel logic & API calls
├── popup.html             # (Legacy - not used)
├── popup.css              # (Legacy - not used)
└── popup.js               # (Legacy - not used)
```

### Manifest V3 Configuration

```json
{
  "side_panel": {
    "default_path": "sidepanel.html"
  },
  "background": {
    "service_worker": "background.js"
  },
  "permissions": [
    "activeTab",
    "storage",
    "sidePanel"
  ]
}
```

### API Integration
- Same JSearch API as v2.0
- Same RapidAPI key required
- API calls made from side panel context
- Results cached in Chrome storage

---

## 🆚 Side Panel vs Popup

| Feature | Popup (Old) | Side Panel (New) |
|---------|-------------|------------------|
| **Stays Open** | ❌ Closes on click | ✅ Persistent |
| **Width** | Fixed 400px | ~400-500px |
| **Height** | Max 600px | Full height |
| **Tab Switching** | Closes | Stays open |
| **State** | Lost on close | Persistent |
| **Multi-tasking** | Limited | Excellent |
| **Scrolling** | Limited | Unlimited |

---

## 🐛 Troubleshooting

### Side Panel Won't Open
**Solution:**
1. Check Chrome version (requires Chrome 114+)
2. Reload extension at chrome://extensions/
3. Check console for errors (right-click panel → Inspect)
4. Try removing and re-adding extension

### Jobs Don't Load
**Solutions:**
1. Verify API key is configured in `sidepanel.js`
2. Check internet connection
3. Open DevTools (F12) and check console
4. Try clearing cache: chrome.storage.local.clear()

### Side Panel Appears Blank
**Solutions:**
1. Check all files exist (sidepanel.html, sidepanel.css, sidepanel.js)
2. Verify file paths in manifest.json
3. Check for JavaScript errors in console
4. Reload the extension

### "View Job" Doesn't Open Links
**Solutions:**
1. Check `activeTab` permission in manifest.json
2. Verify job URLs are valid
3. Check if popup blocker is interfering
4. Try opening links manually first

### Cache Not Working
**Solutions:**
1. Check `storage` permission in manifest.json
2. Verify Chrome storage is not full
3. Check browser console for storage errors
4. Try: `chrome.storage.local.get(console.log)`

---

## ⚙️ Advanced Features

### Storage API Usage

**Save custom data:**
```javascript
chrome.storage.local.set({ 
  customKey: 'value' 
});
```

**Retrieve data:**
```javascript
chrome.storage.local.get(['customKey'], (result) => {
  console.log(result.customKey);
});
```

**Clear all data:**
```javascript
chrome.storage.local.clear();
```

### Background Service Worker

The `background.js` file handles:
- Opening side panel on icon click
- Setting panel behavior
- Future: Could handle notifications, alarms, etc.

**Example - Open panel programmatically:**
```javascript
chrome.sidePanel.open({ windowId: windowId });
```

---

## 🎯 Best Practices

### For Users
1. **Keep Panel Open**: No need to close it between sessions
2. **Refresh Regularly**: Click "Fetch Jobs" daily for new postings
3. **Multi-task**: Browse company sites while panel shows jobs
4. **Customize**: Edit search query for your job interests
5. **Monitor API**: Check usage at rapidapi.com/dashboard

### For Developers
1. **Test Thoroughly**: Check across different Chrome versions
2. **Handle Errors**: Add try-catch for all async operations
3. **Optimize Performance**: Limit job results to prevent lag
4. **Cache Wisely**: Balance between freshness and API usage
5. **Responsive Design**: Test at different panel widths

---

## 📊 Performance Tips

### Reduce API Calls
- Enable auto-fetch only if needed
- Increase cache duration for less frequent updates
- Limit job results (line 93: `.slice(0, 15)`)

### Improve Load Speed
- Keep job cards simple
- Use CSS animations sparingly
- Defer non-critical operations
- Lazy load images (if added in future)

### Optimize Storage
- Clear old cached data periodically
- Compress data before storing (if needed)
- Set reasonable cache expiration
- Monitor storage usage

---

## 🔮 Future Enhancements

Potential features for future versions:

- [ ] Job filtering UI (location, date, company)
- [ ] Save favorite jobs in side panel
- [ ] Job notifications via service worker
- [ ] Dark mode toggle
- [ ] Search history
- [ ] Apply directly from panel (if APIs support)
- [ ] Salary information display
- [ ] Job recommendations based on history

---

## 📚 Additional Resources

### Chrome Side Panel API
- [Official Documentation](https://developer.chrome.com/docs/extensions/reference/sidePanel/)
- [Side Panel Sample](https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/sample.sidepanel-site-specific)
- [Migration Guide](https://developer.chrome.com/docs/extensions/migrating/)

### Related Guides
- `API_SETUP_GUIDE.md` - API key configuration
- `README.md` - General extension documentation
- `CHANGELOG.md` - Version history

---

## ✅ Migration Checklist

If upgrading from popup version:

- [ ] Updated manifest.json to v2.1
- [ ] Created background.js
- [ ] Created sidepanel.html
- [ ] Created sidepanel.css
- [ ] Created sidepanel.js
- [ ] Updated API key in sidepanel.js
- [ ] Reloaded extension at chrome://extensions/
- [ ] Tested opening side panel
- [ ] Tested fetching jobs
- [ ] Tested "View Job" links
- [ ] Verified persistence across tabs

---

## 🎉 Enjoy Your Persistent Job Search!

The side panel makes JobFinder AI much more powerful and user-friendly. Now you can browse job listings while researching companies, all in one window!

**Quick Start:**
1. Click extension icon → side panel opens
2. Click "Fetch Jobs"
3. Browse listings
4. Click "View Job" to apply
5. Keep panel open while you browse!

**Happy Job Hunting! 🚀**

---

*Version 2.1.0 - Side Panel Update*  
*For support, check README.md or open an issue*
