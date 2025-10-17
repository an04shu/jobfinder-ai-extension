# Quick Setup Guide - JobFinder AI Chrome Extension

## Step 1: Create Icon Files

The extension needs three icon files. You have several options:

### Option A: Use Online Icon Generator (Easiest)
1. Visit https://www.favicon-generator.org/
2. Upload any image or create a simple design
3. Download the generated icons
4. Rename them to: `icon16.png`, `icon48.png`, `icon128.png`
5. Place them in the `JustApply` folder

### Option B: Use Python Script (If you have Python installed)
1. Install Pillow: `pip install pillow`
2. Run: `python create_icons.py`
3. Icons will be created automatically

### Option C: Download Free Icons
1. Visit https://icons8.com/ or https://www.flaticon.com/
2. Search for "briefcase" or "job" icons
3. Download in 16x16, 48x48, and 128x128 sizes
4. Rename and place in `JustApply` folder

### Option D: Quick Temporary Fix
For testing purposes only, you can temporarily remove icon references:

1. Open `manifest.json`
2. Comment out or remove the `"icons"` and `"default_icon"` sections
3. The extension will work but won't have custom icons

## Step 2: Load Extension in Chrome

1. **Open Chrome Extensions Page**
   ```
   chrome://extensions/
   ```

2. **Enable Developer Mode**
   - Toggle the switch in the top-right corner

3. **Load Unpacked Extension**
   - Click "Load unpacked" button
   - Navigate to and select the `JustApply` folder
   - Click "Select Folder"

4. **Verify Installation**
   - You should see "JobFinder AI" in your extensions list
   - The extension should show as "Enabled"

## Step 3: Test the Extension

1. **Pin the Extension** (Optional but recommended)
   - Click the puzzle icon (🧩) in Chrome toolbar
   - Find "JobFinder AI"
   - Click the pin icon to keep it visible

2. **Open the Extension**
   - Click the JobFinder AI icon in your toolbar
   - The popup should open with a beautiful gradient background

3. **Test Functionality**
   - Click the "Fetch Jobs" button
   - Wait for the loading animation
   - You should see 10 job listings appear
   - Click "View Job" on any listing to test the link

## Troubleshooting

### Error: "Failed to load extension"
- Make sure all files are in the correct folder
- Check that file names match exactly (case-sensitive)

### Icons Not Showing
- This won't prevent the extension from working
- Follow Option A or D above to fix

### Popup Not Opening
- Right-click the extension icon → Inspect popup
- Check the console for JavaScript errors
- Ensure `popup.js` is in the same folder as `popup.html`

### "View Job" Button Not Working
- Make sure you're testing in Chrome (not another browser)
- Check that the popup has loaded completely

## What's Next?

Once the extension is working:
- ✅ The extension is using mock data (10 sample jobs)
- 🔄 To use real job data, you'll need to integrate with actual APIs
- 🎨 Customize the `mockJobs` array in `popup.js` to add more companies
- 🌟 Consider adding features like filtering, favorites, or notifications

## File Checklist

Make sure these files exist in your `JustApply` folder:
- ✅ manifest.json
- ✅ popup.html
- ✅ popup.css
- ✅ popup.js
- ✅ README.md
- ⚠️ icon16.png (need to create)
- ⚠️ icon48.png (need to create)
- ⚠️ icon128.png (need to create)

## Need Help?

- Check the Chrome Extensions documentation: https://developer.chrome.com/docs/extensions/
- Review the console logs (right-click popup → Inspect)
- Ensure Chrome is up to date

---

**Ready to find your next job? 🚀**
