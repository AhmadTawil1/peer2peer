// Main JavaScript file to handle routing and page rendering
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  
  // Simple router
  const routes = {
    '/': renderAskPage,
    '/feed': renderFeedPage,
    '/profile': renderProfilePage
  };

  // Navigation function
  window.navigateTo = (path) => {
    window.history.pushState({}, '', path);
    renderPage();
  };

  // Handle back/forward browser buttons
  window.addEventListener('popstate', renderPage);

  // Initial page render
  renderPage();

  function renderPage() {
    const path = window.location.pathname;
    const renderFunction = routes[path] || routes['/'];
    root.innerHTML = '';
    renderFunction(root);
  }
});

// Render the Ask for Help page
function renderAskPage(container) {
  container.innerHTML = `
    ${renderHeader()}
    <main class="w-full min-h-screen bg-gray-50 pb-16">
      <div class="container max-w-4xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">Ask for Help</h1>
        <p class="text-gray-600 mb-8">Fill out the form below to get help with your homework</p>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <form id="helpRequestForm" class="space-y-6">
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Question Title</label>
              <input type="text" id="title" name="title" placeholder="E.g., How do I solve this quadratic equation?" 
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary">
            </div>
            
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select id="subject" name="subject" 
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary">
                <option value="" disabled selected>Select a subject</option>
                <option value="mathematics">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="biology">Biology</option>
                <option value="english">English</option>
                <option value="history">History</option>
                <option value="computer_science">Computer Science</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
              <textarea id="description" name="description" rows="5" placeholder="Describe your question in detail..." 
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">File Upload (Optional)</label>
              <div class="flex items-center justify-center w-full">
                <label for="fileUpload" class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg class="w-8 h-8 mb-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p class="mb-2 text-sm text-gray-500"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                    <p class="text-xs text-gray-500">PDF, PNG, JPG or DOCX (MAX. 10MB)</p>
                  </div>
                  <input id="fileUpload" type="file" class="hidden" />
                </label>
              </div>
              <div id="filePreview" class="mt-2 hidden">
                <div class="flex items-center p-2 bg-gray-100 rounded">
                  <span id="fileName" class="text-sm text-gray-700 truncate flex-1"></span>
                  <button type="button" id="removeFile" class="text-red-500 hover:text-red-700">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">Help Type</label>
              <div class="flex space-x-4">
                <div class="flex items-center">
                  <input type="radio" id="written" name="helpType" value="written" checked
                    class="h-4 w-4 text-primary focus:ring-primary border-gray-300">
                  <label for="written" class="ml-2 text-sm text-gray-700">Written Answer</label>
                </div>
                <div class="flex items-center">
                  <input type="radio" id="live" name="helpType" value="live"
                    class="h-4 w-4 text-primary focus:ring-primary border-gray-300">
                  <label for="live" class="ml-2 text-sm text-gray-700">Live Help Session</label>
                </div>
              </div>
            </div>
            
            <div class="pt-4">
              <button type="submit" class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Submit Question
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
    ${renderNavigation()}
  `;

  // File upload preview functionality
  const fileUpload = document.getElementById('fileUpload');
  const filePreview = document.getElementById('filePreview');
  const fileName = document.getElementById('fileName');
  const removeFile = document.getElementById('removeFile');

  fileUpload.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      fileName.textContent = e.target.files[0].name;
      filePreview.classList.remove('hidden');
    }
  });

  removeFile.addEventListener('click', () => {
    fileUpload.value = '';
    filePreview.classList.add('hidden');
  });

  // Form submission
  const form = document.getElementById('helpRequestForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Question submitted successfully!');
    window.navigateTo('/feed');
  });
}

// Render the Help Requests Feed page
function renderFeedPage(container) {
  container.innerHTML = `
    ${renderHeader()}
    <main class="w-full min-h-screen bg-gray-50 pb-16">
      <div class="container max-w-4xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">Help Requests</h1>
        
        <div class="bg-white rounded-lg shadow-md p-6 mb-8">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div class="relative flex-1">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input type="text" placeholder="Search requests..." class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary">
            </div>
            
            <button id="filterButton" class="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
              </svg>
              Filters
            </button>
          </div>
          
          <div id="filterPanel" class="hidden mb-6 p-4 bg-gray-50 rounded-md">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary">
                  <option value="">All Subjects</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="biology">Biology</option>
                  <option value="english">English</option>
                  <option value="history">History</option>
                  <option value="computer_science">Computer Science</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
                <select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary">
                  <option value="">Any Urgency</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              
              <div class="flex items-center pt-6">
                <input type="checkbox" id="unansweredOnly" class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded">
                <label for="unansweredOnly" class="ml-2 text-sm text-gray-700">Unanswered only</label>
              </div>
            </div>
            
            <div class="mt-4 flex justify-end">
              <button class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">Apply Filters</button>
            </div>
          </div>
          
          <div class="space-y-4">
            <!-- Help Request Cards -->
            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div class="flex justify-between items-start mb-2">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Mathematics
                </span>
                <span class="text-xs text-gray-500">Posted 2 hours ago</span>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-1">Need help with calculus integration by parts</h3>
              <p class="text-sm text-gray-500 mb-3 line-clamp-2">I'm struggling with this integration problem and would appreciate some guidance on how to approach it correctly.</p>
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                    </svg>
                    Medium Urgency
                  </span>
                </div>
                <button class="px-3 py-1 bg-primary text-white text-sm rounded-md hover:bg-primary/90">
                  Help Now
                </button>
              </div>
            </div>
            
            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div class="flex justify-between items-start mb-2">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Biology
                </span>
                <span class="text-xs text-gray-500">Posted 5 hours ago</span>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-1">Help with photosynthesis diagram explanation</h3>
              <p class="text-sm text-gray-500 mb-3 line-clamp-2">I need to explain this diagram for my biology class but I'm not sure about some of the processes shown.</p>
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 mr-2">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                    </svg>
                    High Urgency
                  </span>
                </div>
                <button class="px-3 py-1 bg-primary text-white text-sm rounded-md hover:bg-primary/90">
                  Help Now
                </button>
              </div>
            </div>
            
            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div class="flex justify-between items-start mb-2">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Physics
                </span>
                <span class="text-xs text-gray-500">Posted 1 day ago</span>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-1">Newton's laws of motion problem set</h3>
              <p class="text-sm text-gray-500 mb-3 line-clamp-2">I'm working through these problems but getting stuck on the application of Newton's second law in this specific scenario.</p>
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mr-2">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                    </svg>
                    Low Urgency
                  </span>
                </div>
                <button class="px-3 py-1 bg-primary text-white text-sm rounded-md hover:bg-primary/90">
                  Help Now
                </button>
              </div>
            </div>
            
            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div class="flex justify-between items-start mb-2">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  Computer Science
                </span>
                <span class="text-xs text-gray-500">Posted 3 days ago</span>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-1">Help debugging my recursive function</h3>
              <p class="text-sm text-gray-500 mb-3 line-clamp-2">My recursive function for calculating Fibonacci numbers is causing a stack overflow and I'm not sure why.</p>
              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                    </svg>
                    Medium Urgency
                  </span>
                </div>
                <button class="px-3 py-1 bg-primary text-white text-sm rounded-md hover:bg-primary/90">
                  Help Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    ${renderNavigation()}
  `;

  // Filter panel toggle
  const filterButton = document.getElementById('filterButton');
  const filterPanel = document.getElementById('filterPanel');
  
  filterButton.addEventListener('click', () => {
    filterPanel.classList.toggle('hidden');
  });
}

// Render the Helper Profile page
function renderProfilePage(container) {
  container.innerHTML = `
    ${renderHeader()}
    <main class="w-full min-h-screen bg-gray-50 pb-16">
      <div class="container max-w-4xl mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="bg-gradient-to-r from-primary to-accent h-32"></div>
          <div class="px-6 py-4 md:px-8 md:py-6">
            <div class="flex flex-col md:flex-row md:items-end -mt-16 mb-4">
              <div class="md:mr-6">
                <img src="https://i.pravatar.cc/150?img=32" alt="Profile" class="w-24 h-24 rounded-full border-4 border-white shadow-md">
              </div>
              <div class="mt-4 md:mt-0">
                <h1 class="text-2xl font-bold text-gray-900">Alex Johnson</h1>
                <p class="text-gray-600">Computer Science Major | University of Technology</p>
              </div>
            </div>
            
            <div class="border-t border-gray-200 pt-4 mt-2">
              <h2 class="text-xl font-semibold text-gray-800 mb-3">About Me</h2>
              <p class="text-gray-600 mb-6">
                I'm a third-year computer science student passionate about algorithms and data structures. 
                I enjoy helping others understand complex concepts by breaking them down into simpler parts.
              </p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 class="text-lg font-medium text-gray-800 mb-3">Stats</h3>
                  <div class="bg-gray-50 rounded-lg p-4">
                    <div class="flex justify-between items-center mb-3">
                      <span class="text-gray-600">Questions Answered</span>
                      <span class="font-semibold text-gray-900">42</span>
                    </div>
                    <div class="flex justify-between items-center mb-3">
                      <span class="text-gray-600">Average Rating</span>
                      <div class="flex items-center">
                        <div class="flex">
                          <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        </div>
                        <span class="ml-1 text-gray-900 font-semibold">5.0</span>
                      </div>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-gray-600">Response Time</span>
                      <span class="font-semibold text-gray-900">~30 minutes</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 class="text-lg font-medium text-gray-800 mb-3">Expertise</h3>
                  <div class="flex flex-wrap gap-2">
                    <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Algorithms</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Data Structures</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Python</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">JavaScript</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Web Development</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Database Design</span>
                  </div>
                </div>
              </div>
              
              <div class="mb-6">
                <h3 class="text-lg font-medium text-gray-800 mb-3">Achievements</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div class="flex flex-col items-center p-3 bg-gradient-to-b from-amber-50 to-amber-100 rounded-lg border border-amber-200">
                    <div class="w-12 h-12 flex items-center justify-center bg-amber-400 rounded-full mb-2">
                      <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <span class="text-sm font-medium text-gray-900 text-center">Top Helper</span>
                  </div>
                  
                  <div class="flex flex-col items-center p-3 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <div class="w-12 h-12 flex items-center justify-center bg-blue-400 rounded-full mb-2">
                      <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                      </svg>
                    </div>
                    <span class="text-sm font-medium text-gray-900 text-center">Community Leader</span>
                  </div>
                  
                  <div class="flex flex-col items-center p-3 bg-gradient-to-b from-green-50 to-green-100 rounded-lg border border-green-200">
                    <div class="w-12 h-12 flex items-center justify-center bg-green-400 rounded-full mb-2">
                      <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                      </svg>
                    </div>
                    <span class="text-sm font-medium text-gray-900 text-center">Perfect Rating</span>
                  </div>
                  
                  <div class="flex flex-col items-center p-3 bg-gradient-to-b from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                    <div class="w-12 h-12 flex items-center justify-center bg-purple-400 rounded-full mb-2">
                      <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                      </svg>
                    </div>
                    <span class="text-sm font-medium text-gray-900 text-center">Mentor Status</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 class="text-lg font-medium text-gray-800 mb-3">Recent Activity</h3>
                <div class="space-y-4">
                  <div class="p-4 border border-gray-200 rounded-lg">
                    <div class="flex justify-between items-start mb-2">
                      <h4 class="font-medium text-gray-900">Helped with Calculus Integration</h4>
                      <span class="text-xs text-gray-500">2 days ago</span>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">Provided step-by-step explanation for solving complex integration problems using substitution method.</p>
                    <div class="flex">
                      <div class="flex">
                        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div class="p-4 border border-gray-200 rounded-lg">
                    <div class="flex justify-between items-start mb-2">
                      <h4 class="font-medium text-gray-900">Debugged Python Code</h4>
                      <span class="text-xs text-gray-500">1 week ago</span>
                    </div>
                    <p class="text-sm text-gray-600 mb-2">Helped identify and fix a recursive function that was causing stack overflow issues.</p>
                    <div class="flex">
                      <div class="flex">
                        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    ${renderNavigation()}
  `;
}

// Render the header component
function renderHeader() {
  return `
    <header class="bg-white shadow-sm">
      <div class="container max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" class="flex items-center">
          <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
          <span class="ml-2 text-xl font-bold text-gray-900">StudyBuddy</span>
        </a>
        <div class="flex items-center space-x-4">
          <button class="text-gray-600 hover:text-gray-900">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
          </button>
          <a href="/profile" class="flex items-center">
            <img src="https://i.pravatar.cc/150?img=32" alt="Profile" class="w-8 h-8 rounded-full border border-gray-200">
          </a>
        </div>
      </div>
    </header>
  `;
}

// Render the navigation component
function renderNavigation() {
  return `
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div class="container max-w-4xl mx-auto px-4">
        <div class="flex justify-around">
          <a href="/" class="flex flex-col items-center py-3 px-4 text-primary">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-xs mt-1">Ask</span>
          </a>
          <a href="/feed" class="flex flex-col items-center py-3 px-4 text-gray-600 hover:text-primary">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            <span class="text-xs mt-1">Feed</span>
          </a>
          <a href="/profile" class="flex flex-col items-center py-3 px-4 text-gray-600 hover:text-primary">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span class="text-xs mt-1">Profile</span>
          </a>
        </div>
      </div>
    </nav>
  `;
}