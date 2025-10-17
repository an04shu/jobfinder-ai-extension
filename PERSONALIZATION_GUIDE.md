# 🎯 JobFinder AI - Personalization Guide

## 🆕 Version 2.2 - Personalized Job Search

Your JobFinder AI extension now features **intelligent job personalization** based on your unique profile!

---

## ✨ What's New in v2.2

### Personalized Job Matching
- **Profile Setup**: Configure your job preferences on first use
- **Smart Search**: Jobs tailored to your role, skills, and experience
- **Dynamic Queries**: API searches adapt to your profile
- **Edit Anytime**: Update your preferences whenever needed

### Key Benefits
- ✅ **Relevant Results**: See jobs matching YOUR skills and experience
- ✅ **Time Saving**: No more scrolling through irrelevant listings
- ✅ **Better Matches**: Experience-level appropriate opportunities
- ✅ **Location-aware**: Optional location filtering
- ✅ **Skills-based**: Results emphasize your technology stack

---

## 🚀 Getting Started

### First Time Setup

When you open the extension for the first time, you'll see a **Profile Setup** form:

```
👤 Setup Your Profile
Help us find jobs tailored for you

Desired Job Role *
[e.g., Software Engineer, Data Scientist]

Primary Skills *
[e.g., Python, JavaScript, React]
Comma-separated values

Years of Experience *    Graduation Year *
[0-20]                   [2020]

Preferred Location
[e.g., Remote, San Francisco, New York]
Optional - leave blank for all locations

[💾 Save Profile]
```

### Required Fields

1. **Desired Job Role** (Required)
   - Examples:
     - "Software Engineer"
     - "Data Scientist"
     - "Product Manager"
     - "Frontend Developer"
     - "DevOps Engineer"

2. **Primary Skills** (Required)
   - Comma-separated list
   - Examples:
     - "Python, Machine Learning, TensorFlow"
     - "JavaScript, React, Node.js"
     - "Java, Spring Boot, Microservices"
     - "AWS, Docker, Kubernetes"

3. **Years of Experience** (Required)
   - Number from 0 to 50
   - 0 = Entry Level / Intern
   - 1-2 = Junior
   - 3-5 = Mid-level
   - 6+ = Senior / Lead

4. **Graduation Year** (Required)
   - Your year of graduation
   - Used for experience validation
   - Range: 1990 - 2030

5. **Preferred Location** (Optional)
   - Leave blank for all locations
   - Examples:
     - "Remote"
     - "San Francisco"
     - "New York, NY"
     - "Remote, USA"

---

## 🔍 How Personalization Works

### Search Query Generation

Your profile data is used to build a smart search query:

**Example 1: Entry Level Developer**
```javascript
Profile:
- Role: "Software Engineer"
- Skills: "Python, JavaScript, React"
- Experience: 0 years
- Location: "Remote"

Generated Query:
"Software Engineer (Python OR JavaScript OR React) entry level OR junior OR intern Remote (Google OR Amazon OR Microsoft OR NVIDIA OR Adobe)"
```

**Example 2: Senior Data Scientist**
```javascript
Profile:
- Role: "Data Scientist"
- Skills: "Python, Machine Learning, TensorFlow"
- Experience: 7 years
- Location: "San Francisco"

Generated Query:
"Data Scientist (Python OR Machine Learning OR TensorFlow) senior OR lead San Francisco (Google OR Amazon OR Microsoft OR NVIDIA OR Adobe)"
```

### Experience Level Mapping

The extension automatically adds experience descriptors:

| Years | Added Keywords |
|-------|----------------|
| 0 | "entry level OR junior OR intern" |
| 1-2 | "junior OR entry level" |
| 3-5 | "mid-level OR intermediate" |
| 6+ | "senior OR lead" |

### Skills Matching

- Skills are split by commas
- Each skill becomes an OR condition
- API searches for jobs matching ANY of your skills
- More relevant skills = better matches

---

## ⚙️ Managing Your Profile

### Viewing Your Profile

Once saved, your profile appears as a compact summary:

```
┌─────────────────────────────────────┐
│ 👤  Software Engineer               │
│     Python, JavaScript, React • 2   │
│     years                        ⚙️ │
└─────────────────────────────────────┘
```

### Editing Your Profile

1. **Click the Settings Icon** (⚙️) on the profile summary
2. **Form Appears** with your current data pre-filled
3. **Make Changes** to any fields
4. **Click "Save Profile"** to update
5. **Click "Cancel"** to discard changes

### Profile Storage

- Stored securely in `chrome.storage.local`
- Persists across browser sessions
- Never sent to external servers (except in API queries)
- Can be cleared via Chrome settings

---

## 💡 Best Practices

### Writing Job Roles

**Good Examples:**
- ✅ "Software Engineer"
- ✅ "Frontend Developer"
- ✅ "Data Scientist"
- ✅ "Product Manager"
- ✅ "DevOps Engineer"

**Less Effective:**
- ❌ "Engineer" (too generic)
- ❌ "I want to be a developer" (not a role)
- ❌ "Any tech job" (no specificity)

### Listing Skills

**Good Examples:**
- ✅ "Python, JavaScript, React, Node.js"
- ✅ "Java, Spring Boot, Microservices"
- ✅ "AWS, Docker, Kubernetes, Terraform"

**Tips:**
- Use specific technology names
- Include frameworks and tools
- Separate with commas
- 3-7 skills is optimal
- Order by importance (most important first)

### Setting Experience

**Guidelines:**
- Be honest about your experience
- Include internships as 0 years
- Round down (e.g., 3.5 years → 3 years)
- Count only professional experience
- Don't include academic projects

### Choosing Location

**Options:**
- Leave blank for all locations
- "Remote" for remote-only jobs
- Specific city: "San Francisco"
- City + state: "Austin, TX"
- Multiple: "Remote, San Francisco"

---

## 🎯 Personalization Examples

### Example 1: New Graduate

**Profile:**
```
Role: Software Engineer
Skills: Python, Java, SQL
Experience: 0
Graduation: 2024
Location: (blank)
```

**Query Generated:**
```
Software Engineer (Python OR Java OR SQL) 
entry level OR junior OR intern 
(Google OR Amazon OR Microsoft OR NVIDIA OR Adobe)
```

**Result:** Entry-level software engineering positions

---

### Example 2: Mid-Level Frontend Developer

**Profile:**
```
Role: Frontend Developer
Skills: React, TypeScript, CSS, Node.js
Experience: 4
Graduation: 2019
Location: Remote
```

**Query Generated:**
```
Frontend Developer (React OR TypeScript OR CSS OR Node.js) 
mid-level OR intermediate Remote 
(Google OR Amazon OR Microsoft OR NVIDIA OR Adobe)
```

**Result:** Mid-level remote frontend positions

---

### Example 3: Senior Data Scientist

**Profile:**
```
Role: Data Scientist
Skills: Python, Machine Learning, TensorFlow, PyTorch
Experience: 8
Graduation: 2015
Location: San Francisco
```

**Query Generated:**
```
Data Scientist (Python OR Machine Learning OR TensorFlow OR PyTorch) 
senior OR lead San Francisco 
(Google OR Amazon OR Microsoft OR NVIDIA OR Adobe)
```

**Result:** Senior data science roles in San Francisco

---

## 🔧 Technical Details

### Profile Data Structure

```javascript
{
  jobRole: "Software Engineer",
  skills: "Python, JavaScript, React",
  experience: 2,
  graduation: 2022,
  location: "Remote"
}
```

### Storage Location

```javascript
chrome.storage.local
├── userProfile: { ... }
├── lastFetchedJobs: [ ... ]
└── lastFetchTime: 1234567890
```

### Query Building Algorithm

```javascript
function buildSearchQuery() {
  1. Start with job role
  2. Add skills as OR conditions
  3. Map experience to level descriptors
  4. Append location if specified
  5. Add target companies
  6. Join all parts with spaces
  7. Return complete query string
}
```

---

## 🎨 UI Components

### Profile Setup Form
- Clean, modern design
- Required field indicators (*)
- Input validation
- Helpful placeholders
- Success feedback

### Profile Summary
- Compact display
- Shows role and top 3 skills
- Experience indicator
- Edit button (⚙️)
- Smooth animations

### Success Messages
- Green background
- Checkmark icon ✅
- Auto-dismiss after 3 seconds
- Fade-out animation

---

## 📊 Comparison: Before vs After

### Before Personalization

**Search Query:**
```
software engineer (Google OR Amazon OR Microsoft OR NVIDIA OR Adobe)
```

**Results:**
- Mix of all experience levels
- Various tech stacks
- All locations
- Less relevant matches

### After Personalization

**Search Query (Example):**
```
Data Scientist (Python OR Machine Learning) mid-level San Francisco (Google OR Amazon OR Microsoft OR NVIDIA OR Adobe)
```

**Results:**
- Experience-appropriate roles
- Matching tech stack
- Preferred location
- Highly relevant matches

---

## 🐛 Troubleshooting

### Profile Form Won't Submit

**Check:**
- All required fields are filled
- Experience is a number (not text)
- Graduation year is valid (1990-2030)
- Skills are comma-separated

**Solution:**
- Browser console will show validation errors
- Make sure form is completely filled

### Profile Not Saving

**Symptoms:**
- Form submits but doesn't save
- Profile doesn't appear after save

**Solutions:**
1. Check Chrome storage permissions in manifest.json
2. Open DevTools → Application → Storage → Local Storage
3. Look for `chrome-extension://...` with userProfile key
4. Try: `chrome.storage.local.get(console.log)` in console

### Jobs Not Personalized

**Symptoms:**
- Generic results after setting profile
- Query doesn't match profile

**Solutions:**
1. Check console for search query
2. Verify profile is loaded: `console.log(userProfile)`
3. Make sure profile is saved properly
4. Try editing and re-saving profile

### Profile Summary Shows Wrong Data

**Symptoms:**
- Skills truncated incorrectly
- Experience shows wrong

**Solutions:**
1. Edit profile and verify all fields
2. Check for special characters in skills
3. Ensure comma separation in skills
4. Re-save profile

---

## 🔒 Privacy & Security

### What We Store
- ✅ Job role, skills, experience, graduation, location
- ✅ Stored locally in Chrome (not on servers)
- ✅ Used only for search query generation

### What We DON'T Store
- ❌ Personal information (name, email, phone)
- ❌ Resume or work history
- ❌ Application tracking data
- ❌ Browsing history

### Data Usage
- Profile data sent only in API search queries
- No analytics or tracking
- No third-party sharing
- You can clear data anytime

### Clearing Your Profile

**Option 1: Via Extension**
- Edit profile and change all fields
- Or reinstall extension (clears storage)

**Option 2: Via Chrome Settings**
1. Go to `chrome://settings/content/all`
2. Find `chrome-extension://[your-extension-id]`
3. Click "Clear data"

---

## 🎓 Advanced Customization

### Modifying Experience Thresholds

Edit `sidepanel.js` line 290-300:

```javascript
// Current mapping
if (experience === 0) {
  queryParts.push('entry level OR junior OR intern');
} else if (experience <= 2) {
  queryParts.push('junior OR entry level');
} else if (experience <= 5) {
  queryParts.push('mid-level OR intermediate');
} else {
  queryParts.push('senior OR lead');
}

// Custom mapping example
if (experience === 0) {
  queryParts.push('intern');
} else if (experience <= 3) {
  queryParts.push('junior');
} else if (experience <= 7) {
  queryParts.push('mid-level');
} else {
  queryParts.push('senior');
}
```

### Adding More Companies

Edit `sidepanel.js` line 308:

```javascript
// Current
queryParts.push('(Google OR Amazon OR Microsoft OR NVIDIA OR Adobe)');

// With more companies
queryParts.push('(Google OR Amazon OR Microsoft OR NVIDIA OR Adobe OR Meta OR Apple OR Netflix)');
```

### Removing Company Filter

```javascript
// Remove or comment out line 308
// queryParts.push('(Google OR Amazon OR Microsoft OR NVIDIA OR Adobe)');
```

---

## 📈 Tips for Best Results

### 1. Be Specific
- Use exact job titles from job postings
- List specific technologies, not categories
- Example: "React" not "Frontend Framework"

### 2. Update Regularly
- Refresh profile when learning new skills
- Update experience annually
- Adjust location if job searching remotely

### 3. Experiment
- Try different skill combinations
- Test with/without location
- Compare results with generic search

### 4. Optimize Skills List
- Put most important skills first
- Include both languages and frameworks
- Add relevant tools (e.g., Git, Docker)

### 5. Match Experience Level
- Be realistic about your level
- Consider job market for your area
- Don't over/under-estimate

---

## 🎉 Success Stories

### Scenario 1: Recent Grad

**Profile:**
- Role: Software Engineer
- Skills: Python, Django, React
- Experience: 0
- Location: Remote

**Result:**
- Found 12 entry-level remote positions
- All matched skill set
- Applied to 5, got 2 interviews

### Scenario 2: Career Switch

**Profile:**
- Role: Data Analyst → Data Scientist
- Skills: Python, SQL, Pandas, scikit-learn
- Experience: 3
- Location: (blank)

**Result:**
- Transitioned successfully
- Found mid-level DS roles
- Skills overlap helped

### Scenario 3: Senior Developer

**Profile:**
- Role: Senior Software Engineer
- Skills: Java, Spring, Microservices, Kubernetes
- Experience: 10
- Location: San Francisco

**Result:**
- Senior/Staff level positions
- Higher salary ranges
- Better company matches

---

## 📞 Support

### Need Help?

1. **Check Console**: Right-click panel → Inspect → Console
2. **View Profile**: `chrome.storage.local.get(console.log)`
3. **Test Query**: Check console when fetching jobs
4. **Read Docs**: SIDEPANEL_GUIDE.md, README.md

### Common Questions

**Q: Can I have multiple profiles?**
A: Currently one profile per extension. You can edit anytime.

**Q: Does graduation year affect results?**
A: Indirectly - it validates experience consistency.

**Q: Can I search multiple roles?**
A: No, but you can edit profile quickly to switch roles.

**Q: Are skills case-sensitive?**
A: No, the API handles case automatically.

**Q: How often should I update my profile?**
A: When you learn significant new skills or gain experience.

---

## 🔮 Future Enhancements

Potential features for v2.3+:

- [ ] Multiple profile presets
- [ ] Skill importance weighting
- [ ] Saved searches
- [ ] Job preferences (remote%, salary, etc.)
- [ ] Resume parsing for auto-fill
- [ ] Industry/domain selection
- [ ] Company preferences
- [ ] Job alerts based on profile

---

## ✅ Checklist: Optimizing Your Profile

- [ ] Job role is specific and accurate
- [ ] Listed 3-7 relevant skills
- [ ] Experience matches reality
- [ ] Graduation year is correct
- [ ] Location preference set (or blank for all)
- [ ] Tested job results with profile
- [ ] Jobs match experience level
- [ ] Skills appear in results
- [ ] Location filter works (if set)
- [ ] Updated profile recently

---

**🎯 Ready to Find Your Perfect Job?**

With personalized search, JobFinder AI becomes YOUR personal job hunting assistant, showing only the most relevant opportunities!

**Setup → Search → Apply → Land Your Dream Job! 🚀**

---

*Version 2.2.0 - Personalized Job Search*  
*Chrome Manifest V3 Compatible*  
*Powered by JSearch API + Smart Personalization*
