// Flashcard component for StudyBuddy

// Create a flashcard DOM element
function createFlashcardElement(card, isEditable = true) {
  const cardElement = document.createElement('div');
  cardElement.className = 'flip-card w-full h-64 cursor-pointer mb-4';
  cardElement.dataset.id = card.id;
  
  // Set difficulty class
  let difficultyClass = 'bg-yellow-100 text-yellow-800';
  if (card.difficulty === 'easy') {
    difficultyClass = 'bg-green-100 text-green-800';
  } else if (card.difficulty === 'hard') {
    difficultyClass = 'bg-red-100 text-red-800';
  }
  
  cardElement.innerHTML = `
    <div class="flip-card-inner relative w-full h-full">
      <div class="flip-card-front absolute w-full h-full bg-white rounded-lg shadow-md p-6 flex flex-col">
        <div class="text-sm text-gray-500 mb-2">${card.category || 'Uncategorized'}</div>
        <div class="flex-grow flex items-center justify-center">
          <p class="text-xl text-center">${card.question}</p>
        </div>
        <div class="flex justify-between items-center mt-4">
          <span class="text-xs text-gray-500">Click to flip</span>
          <span class="px-2 py-1 rounded text-xs font-medium ${difficultyClass}">${card.difficulty || 'medium'}</span>
        </div>
      </div>
      <div class="flip-card-back absolute w-full h-full bg-white rounded-lg shadow-md p-6 flex flex-col">
        <div class="text-sm text-gray-500 mb-2">Answer</div>
        <div class="flex-grow flex items-center justify-center">
          <p class="text-xl text-center">${card.answer}</p>
        </div>
        <div class="text-xs text-gray-500 text-right mt-4">Click to flip back</div>
      </div>
    </div>
  `;
  
  // Add flip functionality
  cardElement.addEventListener('click', function(e) {
    // Don't flip if clicking on action buttons
    if (e.target.closest('.card-actions')) return;
    
    this.classList.toggle('flipped');
  });
  
  // Add edit/delete buttons if editable
  if (isEditable) {
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'card-actions absolute top-2 right-2 z-10';
    
    const editButton = document.createElement('button');
    editButton.className = 'text-gray-500 hover:text-primary p-1';
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.addEventListener('click', (e) => {
      e.stopPropagation();
      editFlashcard(card.id);
    });
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'text-gray-500 hover:text-red-500 p-1 ml-1';
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm('Are you sure you want to delete this flashcard?')) {
        deleteFlashcard(card.id);
        cardElement.remove();
        
        // Check if there are no cards left
        const flashcards = getFlashcards();
        if (flashcards.length === 0) {
          document.getElementById('no-cards-message').style.display = 'block';
        }
        
        // Update category filter if needed
        updateCategoryFilter();
      }
    });
    
    actionsDiv.appendChild(editButton);
    actionsDiv.appendChild(deleteButton);
    cardElement.querySelector('.flip-card-inner').appendChild(actionsDiv);
  }
  
  return cardElement;
}

// Edit a flashcard
function editFlashcard(id) {
  const flashcards = getFlashcards();
  const card = flashcards.find(card => card.id === id);
  
  if (card && document.getElementById('flashcard-form')) {
    // Fill the form with card data
    document.getElementById('question').value = card.question;
    document.getElementById('answer').value = card.answer;
    document.getElementById('category').value = card.category || '';
    document.getElementById('difficulty').value = card.difficulty || 'medium';
    
    // Change form submit button text
    const submitButton = document.querySelector('#flashcard-form button[type="submit"]');
    submitButton.textContent = 'Update Flashcard';
    
    // Add a data attribute to the form to indicate editing mode
    const form = document.getElementById('flashcard-form');
    form.dataset.editId = id;
    
    // Scroll to the form
    form.scrollIntoView({ behavior: 'smooth' });
    
    // Show preview
    updatePreview();
    document.getElementById('preview-container').classList.remove('hidden');
  }
}

// Function to update category filter options
function updateCategoryFilter() {
  const filterSelect = document.getElementById('filter-category');
  if (!filterSelect) return;
  
  const categories = getCategories();
  
  // Clear existing options except the first one
  while (filterSelect.options.length > 1) {
    filterSelect.remove(1);
  }
  
  // Add category options
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    filterSelect.appendChild(option);
  });
}