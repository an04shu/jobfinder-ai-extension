// ============================================
// JobFinder AI - Background Service Worker
// Handles side panel operations
// ============================================

// Open side panel when extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ windowId: tab.windowId });
});

// Optional: Set up side panel behavior on install
chrome.runtime.onInstalled.addListener(() => {
  console.log('JobFinder AI extension installed');
  
  // Enable side panel for all sites
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error('Error setting panel behavior:', error));
});
