// ============================================
// JobFinder AI - Side Panel Script
// Real-time Job Fetcher for Side Panel
// Using JSearch API (RapidAPI)
// ============================================

// API Configuration
const API_CONFIG = {
  baseUrl: 'https://jsearch.p.rapidapi.com/search',
  // IMPORTANT: Replace with your RapidAPI key from https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch
  apiKey: '27aa516217msha48ef1f1fb9dedbp1c3367jsn51c589a26dfd', // Your API key
  host: 'jsearch.p.rapidapi.com'
};

// Target companies to search for
const TARGET_COMPANIES = ['Google', 'Amazon', 'Microsoft', 'NVIDIA', 'Adobe'];

// Company logo mapping
const COMPANY_LOGOS = {
  'Google': '🔵',
  'Amazon': '🟠',
  'Microsoft': '🟦',
  'NVIDIA': '🟢',
  'Adobe': '🔴',
  'Meta': '💙',
  'Facebook': '💙',
  'Apple': '🍎',
  'Netflix': '🔴',
  'Tesla': '⚡',
  'Uber': '⚫',
  'default': '🏢'
};

// Trusted job posting domains (whitelist for verified sources)
const TRUSTED_DOMAINS = [
  // Major job boards
  'linkedin.com',
  'glassdoor.com',
  'indeed.com',
  
  // ATS platforms
  'workdayjobs.com',
  'myworkdayjobs.com',
  'greenhouse.io',
  'lever.co',
  'ashbyhq.com',
  'smartrecruiters.com',
  'icims.com',
  'taleo.net',
  'successfactors.com',
  'jobvite.com',
  
  // Company career pages
  'amazon.jobs',
  'google.com',
  'nvidia.com',
  'adobe.com',
  'microsoft.com',
  'oracle.com',
  'salesforce.com',
  'meta.com',
  'apple.com',
  'netflix.com',
  'tesla.com',
  'uber.com',
  
  // Indian IT companies
  'tcs.com',
  'wipro.com',
  'infosys.com',
  'hcl.com',
  'techmahindra.com',
  'ltimindtree.com',
  
  // Other tech companies
  'careers.twitter.com',
  'jobs.netflix.com',
  'careers.walmart.com',
  'jobs.apple.com',
  'careers.intel.com',
  'careers.airbnb.com',
  'snap.com',
  'spotify.com',
  'zoom.us',
  'shopify.com',
  'stripe.com',
  'figma.com',
  'notion.so',
  'slack.com'
];

// DOM elements
const fetchJobsBtn = document.getElementById('fetchJobsBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const jobsContainer = document.getElementById('jobsContainer');
const emptyState = document.getElementById('emptyState');

// Profile elements
const profileSection = document.getElementById('profileSection');
const profileSummary = document.getElementById('profileSummary');
const profileForm = document.getElementById('profileForm');
const editProfileBtn = document.getElementById('editProfileBtn');
const cancelProfileBtn = document.getElementById('cancelProfileBtn');

// User profile data
let userProfile = null;

// Event listeners
fetchJobsBtn.addEventListener('click', fetchJobs);
profileForm.addEventListener('submit', handleProfileSubmit);
editProfileBtn.addEventListener('click', showProfileForm);
cancelProfileBtn.addEventListener('click', hideProfileForm);

// Main function to fetch real jobs from API
async function fetchJobs() {
  // Check if API key is configured
  if (API_CONFIG.apiKey === 'YOUR_RAPIDAPI_KEY_HERE') {
    showError('Please configure your RapidAPI key in sidepanel.js');
    return;
  }

  showLoading();

  try {
    // Fetch jobs from multiple companies
    const allJobs = await fetchJobsFromAPI();
    
    if (allJobs && allJobs.length > 0) {
      displayJobs(allJobs);
      // Save to storage for persistence
      saveJobsToStorage(allJobs);
    } else {
      showError('No jobs found. Try again later.');
    }
  } catch (error) {
    console.error('Error fetching jobs:', error);
    showError('Failed to fetch jobs. Please check your API key and internet connection.');
  } finally {
    hideLoading();
  }
}

// Fetch jobs from JSearch API
async function fetchJobsFromAPI() {
  try {
    // Check if user is a fresher
    const isFresher = checkIfFresher();
    
    if (isFresher) {
      console.log('👨‍🎓 Fresher detected - Using enhanced search strategy');
      return await fetchJobsForFreshers();
    } else {
      // Standard search for experienced professionals
      const query = buildSearchQuery();
      console.log('Search query:', query);
      return await executeSingleSearch(query, false);
    }
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

// Check if user is a fresher (0-1 years exp or recent graduate)
function checkIfFresher() {
  if (!userProfile) return false;
  
  const { experience, graduation } = userProfile;
  const currentYear = new Date().getFullYear();
  
  // Check experience (0-1 years)
  if (experience !== null && experience !== undefined && experience <= 1) {
    return true;
  }
  
  // Check if recent graduate (2024-2026)
  if (graduation && graduation >= 2024 && graduation <= currentYear + 1) {
    return true;
  }
  
  return false;
}

// Enhanced job fetching for freshers with multiple queries
async function fetchJobsForFreshers() {
  console.log('🎯 Fetching jobs with fresher-optimized strategy');
  
  // Build multiple search queries for freshers
  const queries = buildFresherQueries();
  
  // Fetch jobs from multiple queries in parallel
  const allJobsArrays = await Promise.all(
    queries.map(query => executeSingleSearch(query, true))
  );
  
  // Flatten and merge all results
  const allJobs = allJobsArrays.flat();
  
  // Remove duplicates based on job_id or title+company
  const uniqueJobs = deduplicateJobs(allJobs);
  
  // Filter to only verified sources
  const verifiedJobs = filterVerifiedJobs(uniqueJobs);
  
  // Limit to top 75 results for freshers (5x the normal amount)
  const finalJobs = verifiedJobs.slice(0, 75);
  
  console.log(`✅ Found ${finalJobs.length} verified entry-level opportunities`);
  
  return finalJobs;
}

// Execute a single search query
async function executeSingleSearch(query, isFresherJob = false) {
  try {
    const url = new URL(API_CONFIG.baseUrl);
    url.searchParams.append('query', query);
    url.searchParams.append('page', '1');
    
    // Fetch more pages for freshers
    if (isFresherJob) {
      url.searchParams.append('num_pages', '5'); // 5 pages for maximum results
    } else {
      url.searchParams.append('num_pages', '3'); // 3 pages for experienced users
    }
    
    // Expand date range for freshers (more opportunities)
    url.searchParams.append('date_posted', isFresherJob ? 'month' : 'week');

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_CONFIG.apiKey,
        'X-RapidAPI-Host': API_CONFIG.host
      }
    });

    if (!response.ok) {
      console.warn(`API Error for query "${query}": ${response.status}`);
      return [];
    }

    const data = await response.json();
    
    // Transform API response to our job format
    if (data.data && Array.isArray(data.data)) {
      const jobs = data.data
        .filter(job => job.employer_name && job.job_title)
        .map((job, index) => ({
          id: job.job_id || `${job.job_title}-${job.employer_name}-${index}`,
          title: job.job_title,
          company: job.employer_name,
          location: formatLocation(job),
          url: job.job_apply_link || job.job_google_link || '#',
          logo: getCompanyLogo(job.employer_name),
          isFresher: isFresherJob // Flag for UI display
        }));
      
      // For non-fresher queries (standard search), filter verified immediately
      // For fresher queries, filtering happens after deduplication in fetchJobsForFreshers
      if (!isFresherJob) {
        return filterVerifiedJobs(jobs);
      }
      
      return jobs;
    }

    return [];
  } catch (error) {
    console.warn(`Search failed for query "${query}":`, error.message);
    return [];
  }
}

// Deduplicate jobs based on ID or title+company combination
function deduplicateJobs(jobs) {
  const seen = new Set();
  const unique = [];
  
  for (const job of jobs) {
    // Create unique key from job_id or title+company
    const key = job.id || `${job.title.toLowerCase()}-${job.company.toLowerCase()}`;
    
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(job);
    }
  }
  
  return unique;
}

// Extract domain from URL for verification
function extractDomain(url) {
  try {
    if (!url || url === '#') return null;
    
    // Handle relative URLs or invalid URLs
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return null;
    }
    
    const urlObj = new URL(url);
    let hostname = urlObj.hostname.toLowerCase();
    
    // Remove 'www.' prefix if present
    hostname = hostname.replace(/^www\./, '');
    
    return hostname;
  } catch (error) {
    console.warn('Error extracting domain from URL:', url, error);
    return null;
  }
}

// Check if URL is from a trusted source
function isVerifiedSource(url) {
  const domain = extractDomain(url);
  if (!domain) return false;
  
  // Check if domain or any parent domain is in trusted list
  return TRUSTED_DOMAINS.some(trustedDomain => {
    return domain === trustedDomain || domain.endsWith('.' + trustedDomain);
  });
}

// Filter jobs to only include verified sources
function filterVerifiedJobs(jobs) {
  const verified = jobs.filter(job => {
    const isVerified = isVerifiedSource(job.url);
    if (isVerified) {
      job.isVerified = true; // Mark as verified for UI
    }
    return isVerified;
  });
  
  console.log(`✅ Verified jobs: ${verified.length} out of ${jobs.length} total`);
  
  return verified;
}

// Format job location
function formatLocation(job) {
  if (job.job_city && job.job_state) {
    return `${job.job_city}, ${job.job_state}`;
  } else if (job.job_city) {
    return job.job_city;
  } else if (job.job_country) {
    return job.job_country;
  } else if (job.job_is_remote) {
    return 'Remote';
  }
  return 'Location not specified';
}

// Get company logo emoji
function getCompanyLogo(companyName) {
  // Check if company name contains any of our target companies
  for (const [company, logo] of Object.entries(COMPANY_LOGOS)) {
    if (companyName.toLowerCase().includes(company.toLowerCase())) {
      return logo;
    }
  }
  return COMPANY_LOGOS.default;
}

// Show loading spinner
function showLoading() {
  fetchJobsBtn.disabled = true;
  fetchJobsBtn.style.opacity = '0.6';
  loadingSpinner.classList.remove('hidden');
  emptyState.classList.add('hidden');
  jobsContainer.innerHTML = '';
  
  // Remove any existing error messages
  const existingError = document.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
}

// Hide loading spinner
function hideLoading() {
  fetchJobsBtn.disabled = false;
  fetchJobsBtn.style.opacity = '1';
  loadingSpinner.classList.add('hidden');
}

// Display jobs in the container
function displayJobs(jobs) {
  jobsContainer.innerHTML = '';
  emptyState.classList.add('hidden');

  if (jobs.length === 0) {
    showNoVerifiedJobsMessage();
    return;
  }
  
  // Show verified jobs info banner
  showVerifiedJobsInfo(jobs.length);
  
  // Check if these are fresher jobs and show info message
  const fresherJobsCount = jobs.filter(j => j.isFresher).length;
  if (fresherJobsCount > 0 && checkIfFresher()) {
    showFresherInfo(jobs.length, fresherJobsCount);
  }

  jobs.forEach((job, index) => {
    const jobCard = createJobCard(job, index);
    jobsContainer.appendChild(jobCard);
  });
}

// Show message when no verified jobs found
function showNoVerifiedJobsMessage() {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'no-verified-jobs-message';
  messageDiv.innerHTML = `
    <div class="message-icon">🔒</div>
    <div class="message-content">
      <h3>No Official Job Openings Found</h3>
      <p>We couldn't find any verified job postings from official sources for your search.</p>
      <div class="suggestions">
        <strong>Try:</strong>
        <ul>
          <li>Broadening your search (remove filters)</li>
          <li>Checking back later for new postings</li>
          <li>Adjusting your job role or skills</li>
        </ul>
      </div>
      <p class="info-note">
        <span class="verified-badge-small">✓ Verified</span>
        We only show jobs from trusted sources like LinkedIn, company career pages, and official job boards.
      </p>
    </div>
  `;
  jobsContainer.appendChild(messageDiv);
}

// Show info banner about verified jobs
function showVerifiedJobsInfo(jobCount) {
  const infoDiv = document.createElement('div');
  infoDiv.className = 'verified-jobs-banner';
  infoDiv.innerHTML = `
    <div class="banner-icon">✓</div>
    <div class="banner-text">
      <strong>All ${jobCount} jobs are from verified sources</strong>
      <span class="banner-detail">Official company pages, LinkedIn, and trusted job boards only</span>
    </div>
  `;
  
  // Insert before jobs container
  jobsContainer.parentNode.insertBefore(infoDiv, jobsContainer);
  
  // Auto-remove after 6 seconds
  setTimeout(() => {
    infoDiv.style.opacity = '0';
    setTimeout(() => infoDiv.remove(), 300);
  }, 6000);
}

// Show info message for fresher job search
function showFresherInfo(totalJobs, fresherCount) {
  const infoDiv = document.createElement('div');
  infoDiv.className = 'fresher-info-message';
  infoDiv.innerHTML = `
    <div class="info-icon">🎓</div>
    <div class="info-text">
      <strong>Entry-Level Search Activated</strong>
      <p>Found ${totalJobs} opportunities optimized for freshers and recent graduates</p>
    </div>
  `;
  
  // Insert before jobs container
  jobsContainer.parentNode.insertBefore(infoDiv, jobsContainer);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    infoDiv.style.opacity = '0';
    setTimeout(() => infoDiv.remove(), 300);
  }, 5000);
}

// Create a job card element
function createJobCard(job, index) {
  const card = document.createElement('div');
  card.className = 'job-card';
  card.style.animationDelay = `${index * 0.05}s`;

  // Sanitize data to prevent XSS
  const title = escapeHtml(job.title);
  const company = escapeHtml(job.company);
  const location = escapeHtml(job.location);
  
  // Add entry-level badge for fresher jobs
  const fresherBadge = job.isFresher ? '<span class="entry-level-badge">🎓 Entry Level</span>' : '';
  
  // Add verified badge (all jobs shown are verified)
  const verifiedBadge = '<span class="verified-badge">✓ Verified</span>';

  card.innerHTML = `
    <div class="job-header">
      <div class="company-logo">${job.logo}</div>
      <div class="job-info">
        <div class="job-title">${title} ${fresherBadge} ${verifiedBadge}</div>
        <div class="company-name">${company}</div>
      </div>
    </div>
    <div class="job-footer">
      <div class="job-location">📍 ${location}</div>
      <button class="apply-btn" data-url="${escapeHtml(job.url)}">View Job</button>
    </div>
  `;

  // Add click event to apply button
  const applyBtn = card.querySelector('.apply-btn');
  applyBtn.addEventListener('click', () => {
    if (job.url && job.url !== '#') {
      // Open in new tab - side panel remains open!
      chrome.tabs.create({ url: job.url });
    }
  });

  return card;
}

// Show error message
function showError(message) {
  hideLoading();
  emptyState.classList.add('hidden');
  jobsContainer.innerHTML = '';

  // Remove existing error if any
  const existingError = document.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }

  // Create error message element
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.innerHTML = `
    <div class="error-icon">⚠️</div>
    <p>${escapeHtml(message)}</p>
    ${message.includes('API key') ? '<p class="error-hint">Get your free API key at <a href="https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch" target="_blank">RapidAPI JSearch</a></p>' : ''}
  `;

  // Insert error before jobs container
  jobsContainer.parentNode.insertBefore(errorDiv, jobsContainer);
}

// Escape HTML to prevent XSS attacks
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ============================================
// Profile Management Functions
// ============================================

// Build personalized search query based on user profile
function buildSearchQuery() {
  if (!userProfile) {
    // Default query if no profile exists
    return 'software engineer (Google OR Amazon OR Microsoft OR NVIDIA OR Adobe)';
  }

  const { jobRole, skills, experience, location } = userProfile;
  
  // Build query parts
  let queryParts = [];
  
  // Add job role
  queryParts.push(jobRole);
  
  // Add skills as OR conditions (only if provided)
  if (skills && skills.trim()) {
    const skillsList = skills.split(',').map(s => s.trim()).filter(s => s);
    if (skillsList.length > 0) {
      queryParts.push(`(${skillsList.join(' OR ')})`);
    }
  }
  
  // Add experience level descriptor (only if provided)
  if (experience !== null && experience !== undefined) {
    if (experience === 0) {
      queryParts.push('entry level OR junior OR intern');
    } else if (experience <= 2) {
      queryParts.push('junior OR entry level');
    } else if (experience <= 5) {
      queryParts.push('mid-level OR intermediate');
    } else {
      queryParts.push('senior OR lead');
    }
  }
  
  // Add location if specified
  if (location && location.trim()) {
    queryParts.push(location.trim());
  }
  
  // Add target companies (expanded list for more opportunities)
  queryParts.push('(Google OR Amazon OR Microsoft OR NVIDIA OR Adobe OR Meta OR Apple OR Netflix OR Tesla OR Uber)');
  
  return queryParts.join(' ');
}

// Build multiple search queries optimized for freshers
function buildFresherQueries() {
  if (!userProfile) {
    return ['entry level software engineer (Google OR Amazon OR Microsoft OR NVIDIA OR Adobe)'];
  }

  const { jobRole, skills, location } = userProfile;
  const queries = [];
  
  // Extract base role (e.g., "Software Engineer" -> "software engineer")
  const baseRole = jobRole.toLowerCase();
  
  // Parse skills (only if provided)
  const skillsList = (skills && skills.trim()) ? skills.split(',').map(s => s.trim()).filter(s => s) : [];
  const skillsString = skillsList.length > 0 ? `(${skillsList.join(' OR ')})` : '';
  
  // Location string
  const locationStr = (location && location.trim()) ? location.trim() : '';
  
  // Companies string
  const companies = '(Google OR Amazon OR Microsoft OR NVIDIA OR Adobe OR Meta OR Apple OR Netflix OR Tesla OR Uber)';
  
  // Query 1: Direct entry-level search
  let query1Parts = [
    `(${baseRole} OR entry level ${baseRole} OR junior ${baseRole})`,
    skillsString,
    locationStr,
    companies
  ].filter(p => p);
  queries.push(query1Parts.join(' '));
  
  // Query 2: Fresher-specific keywords
  let query2Parts = [
    `(fresher OR graduate OR trainee OR associate)`,
    baseRole.split(' ')[0], // First word of role (e.g., "software")
    skillsString,
    locationStr,
    companies
  ].filter(p => p);
  queries.push(query2Parts.join(' '));
  
  // Query 3: Campus/intern keywords (if very fresh)
  if (userProfile.experience === 0 || (userProfile.graduation && userProfile.graduation >= new Date().getFullYear())) {
    let query3Parts = [
      `(intern OR internship OR campus OR new graduate)`,
      baseRole.split(' ')[0],
      skillsString,
      locationStr,
      companies
    ].filter(p => p);
    queries.push(query3Parts.join(' '));
  }
  
  console.log('📋 Fresher search queries:', queries);
  return queries;
}

// Handle profile form submission
async function handleProfileSubmit(e) {
  e.preventDefault();
  
  const profile = {
    jobRole: document.getElementById('jobRole').value.trim(),
    skills: document.getElementById('skills').value.trim() || '',
    experience: document.getElementById('experience').value ? parseInt(document.getElementById('experience').value) : null,
    graduation: document.getElementById('graduation').value ? parseInt(document.getElementById('graduation').value) : null,
    location: document.getElementById('location').value.trim() || ''
  };
  
  await saveProfile(profile);
  userProfile = profile;
  
  hideProfileForm();
  displayProfileSummary(profile);
  
  // Show success message
  showSuccessMessage('Profile saved! Jobs will be personalized for you.');
}

// Save profile to Chrome storage
async function saveProfile(profile) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ userProfile: profile }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        console.log('Profile saved successfully');
        resolve();
      }
    });
  });
}

// Load profile from Chrome storage
async function loadProfile() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['userProfile'], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result.userProfile || null);
      }
    });
  });
}

// Display profile summary
function displayProfileSummary(profile) {
  const summaryRole = document.getElementById('summaryRole');
  const summarySkills = document.getElementById('summarySkills');
  
  summaryRole.textContent = profile.jobRole;
  
  // Build summary text from available fields
  let summaryParts = [];
  
  if (profile.skills && profile.skills.trim()) {
    const skillsText = profile.skills.split(',').slice(0, 3).join(', ');
    summaryParts.push(skillsText);
  }
  
  if (profile.experience !== null && profile.experience !== undefined) {
    const experienceText = profile.experience === 0 ? 'Entry Level' : `${profile.experience} years`;
    summaryParts.push(experienceText);
  } else {
    summaryParts.push('All levels');
  }
  
  summarySkills.textContent = summaryParts.join(' • ') || 'All skills and levels';
  
  profileSummary.classList.remove('hidden');
  profileSection.classList.add('hidden');
}

// Show profile form for editing
function showProfileForm() {
  if (userProfile) {
    // Populate form with existing data
    document.getElementById('jobRole').value = userProfile.jobRole;
    document.getElementById('skills').value = userProfile.skills || '';
    document.getElementById('experience').value = userProfile.experience !== null ? userProfile.experience : '';
    document.getElementById('graduation').value = userProfile.graduation || '';
    document.getElementById('location').value = userProfile.location || '';
    
    cancelProfileBtn.classList.remove('hidden');
  }
  
  profileSection.classList.remove('hidden');
  profileSummary.classList.add('hidden');
  
  // Scroll to profile section
  profileSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Hide profile form
function hideProfileForm() {
  profileSection.classList.add('hidden');
  
  if (userProfile) {
    profileSummary.classList.remove('hidden');
    cancelProfileBtn.classList.add('hidden');
  }
}

// Show success message
function showSuccessMessage(message) {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.innerHTML = `
    <div class="success-icon">✅</div>
    <p>${escapeHtml(message)}</p>
  `;
  
  // Insert after profile summary or section
  const targetElement = profileSummary.classList.contains('hidden') ? profileSection : profileSummary;
  targetElement.parentNode.insertBefore(successDiv, targetElement.nextSibling);
  
  // Remove after 3 seconds
  setTimeout(() => {
    successDiv.style.opacity = '0';
    setTimeout(() => successDiv.remove(), 300);
  }, 3000);
}

// Save jobs to Chrome storage for persistence
function saveJobsToStorage(jobs) {
  chrome.storage.local.set({ 
    lastFetchedJobs: jobs,
    lastFetchTime: Date.now()
  }).catch(error => {
    console.error('Error saving to storage:', error);
  });
}

// Load jobs from Chrome storage
function loadJobsFromStorage() {
  chrome.storage.local.get(['lastFetchedJobs', 'lastFetchTime'], (result) => {
    if (result.lastFetchedJobs && result.lastFetchedJobs.length > 0) {
      // Check if cached jobs are less than 1 hour old
      const oneHour = 60 * 60 * 1000;
      const isCacheValid = result.lastFetchTime && (Date.now() - result.lastFetchTime < oneHour);
      
      if (isCacheValid) {
        console.log('Loading cached jobs from storage');
        displayJobs(result.lastFetchedJobs);
      } else {
        console.log('Cache expired, showing empty state');
      }
    }
  });
}

// Initialize side panel
async function initSidePanel() {
  console.log('JobFinder AI Side Panel initialized');
  
  try {
    // Load user profile
    userProfile = await loadProfile();
    
    if (userProfile) {
      // Profile exists - show summary and fetch personalized jobs
      console.log('Profile loaded:', userProfile);
      displayProfileSummary(userProfile);
      
      // Load cached jobs if available
      loadJobsFromStorage();
    } else {
      // No profile - show setup form
      console.log('No profile found - showing setup form');
      profileSection.classList.remove('hidden');
      emptyState.classList.add('hidden');
    }
  } catch (error) {
    console.error('Error initializing side panel:', error);
    // Show profile form as fallback
    profileSection.classList.remove('hidden');
  }
  
  // Optional: Auto-fetch jobs on panel open (uncomment if desired)
  // setTimeout(() => fetchJobs(), 500);
}

// Run initialization when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSidePanel);
} else {
  initSidePanel();
}
