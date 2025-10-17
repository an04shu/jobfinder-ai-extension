// ============================================
// JobFinder AI - Real-time Job Fetcher
// Using JSearch API (RapidAPI)
// ============================================

// API Configuration
const API_CONFIG = {
  baseUrl: 'https://jsearch.p.rapidapi.com/search',
  // IMPORTANT: Replace with your RapidAPI key from https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch
  apiKey: '27aa516217msha48ef1f1fb9dedbp1c3367jsn51c589a26dfd', // Replace this!
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
  'default': '🏢'
};

// DOM elements
const fetchJobsBtn = document.getElementById('fetchJobsBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const jobsContainer = document.getElementById('jobsContainer');
const emptyState = document.getElementById('emptyState');

// Event listener for fetch jobs button
fetchJobsBtn.addEventListener('click', fetchJobs);

// Main function to fetch real jobs from API
async function fetchJobs() {
  // Check if API key is configured
  if (API_CONFIG.apiKey === 'YOUR_RAPIDAPI_KEY_HERE') {
    showError('Please configure your RapidAPI key in popup.js');
    return;
  }

  showLoading();

  try {
    // Fetch jobs from multiple companies
    const allJobs = await fetchJobsFromAPI();
    
    if (allJobs && allJobs.length > 0) {
      displayJobs(allJobs);
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
    // Search for software engineering jobs at tech companies
    const query = 'software engineer (Google OR Amazon OR Microsoft OR NVIDIA OR Adobe)';
    
    const url = new URL(API_CONFIG.baseUrl);
    url.searchParams.append('query', query);
    url.searchParams.append('page', '1');
    url.searchParams.append('num_pages', '1');
    url.searchParams.append('date_posted', 'week'); // Jobs from the last week

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_CONFIG.apiKey,
        'X-RapidAPI-Host': API_CONFIG.host
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Transform API response to our job format
    if (data.data && Array.isArray(data.data)) {
      const jobs = data.data
        .filter(job => job.employer_name && job.job_title) // Filter out incomplete jobs
        .slice(0, 15) // Limit to 15 jobs for better performance
        .map((job, index) => ({
          id: job.job_id || index,
          title: job.job_title,
          company: job.employer_name,
          location: formatLocation(job),
          url: job.job_apply_link || job.job_google_link || '#',
          logo: getCompanyLogo(job.employer_name)
        }));
      
      return jobs;
    }

    return [];
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
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
    showError('No jobs found. Try adjusting your search criteria.');
    return;
  }

  jobs.forEach((job, index) => {
    const jobCard = createJobCard(job, index);
    jobsContainer.appendChild(jobCard);
  });
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

  card.innerHTML = `
    <div class="job-header">
      <div class="company-logo">${job.logo}</div>
      <div class="job-info">
        <div class="job-title">${title}</div>
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

// Optional: Auto-fetch jobs on popup open
// Uncomment the line below if you want jobs to load automatically
// window.addEventListener('DOMContentLoaded', fetchJobs);
