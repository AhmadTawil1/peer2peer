// Card form handling for StudyBuddy

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('flashcard-form');
  const previewContainer = document.getElementById('preview-container');
  const cardPreview = document.getElementById('card-preview');
  const filterCategorySelect = document.getElementById('filter-category');
  const categoryList = document.getElementById('category-list');
  
  // Initialize category options
  updateCategoryOptions();
  
  // Initialize flashcards display
  displayFlashcards();
  
  // Form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = {
        question: document.getElementById('question').value.trim(),
        answer: document.getElementById('answer').value.trim(),
        category: document.getElementById('category').value.trim(),
        difficulty: document.getElementById('difficulty').value
      };
      
      // Validate form
      if (!formData.question || !formData.answer) {
        alert('Please fill in both question and answer fields.');
        return;
      }
      
      // Check if we're editing or creating
      const editId = form.dataset.editId;
      
      if (editId) {
        // Update existing flashcard
        updateFlashcard(editId, formData);
        
        // Reset form
        form.reset();
        delete form.dataset.editId;
        
        // Change button text back
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.textContent = 'Create Flashcard';
      } else {
        // Add new flashcard
        addFlashcard(formData);
      }
      
      // Hide preview
      previewContainer.classList.add('hidden');
      
      // Reset form
      form.reset();
      
      // Update categories
      updateCategoryOptions();
      
      // Refresh flashcards display
      displayFlashcards();
    });
    
    // Live preview
    const formInputs = form.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
      input.addEventListener('input', updatePreview);
    });
    
    // Flip card on click in preview
    cardPreview.addEventListener('click', () => {
      cardPreview.classList.toggle('flipped');
    });
  }
  
  // Filter by category
  if (filterCategorySelect) {
    filterCategorySelect.addEventListener('change', () => {
      displayFlashcards(filterCategorySelect.value);
    });
  }
});

// Update the preview card
function updatePreview() {
  const previewContainer = document.getElementById('preview-container');
  const question = document.getElementById('question').value.trim();
  const answer = document.getElementById('answer').value.trim();
  const category = document.getElementById('category').value.trim();
  const difficulty = document.getElementById('difficulty').value;
  
  // Only show preview if there's content
  if (question || answer) {
    previewContainer.classList.remove('hidden');
    
    // Update preview content
    document.getElementById('preview-question').textContent = question || 'Question';
    document.getElementById('preview-answer').textContent = answer || 'Answer';
    document.getElementById('preview-category').textContent = category || 'Uncategorized';
    
    // Update difficulty class
    const difficultyElement = document.getElementById('preview-difficulty');
    difficultyElement.textContent = difficulty;
    
    // Set difficulty class
    difficultyElement.className = 'px-2 py-1 rounded text-xs font-medium';
    if (difficulty === 'easy') {
      difficultyElement.classList.add('bg-green-100', 'text-green-800');
    } else if (difficulty === 'medium') {
      difficultyElement.classList.add('bg-yellow-100', 'text-yellow-800');
    } else {
      difficultyElement.classList.add('bg-red-100', 'text-red-800');
    }
  } else {
    previewContainer.classList.add('hidden');
  }
}

// Update category options in datalist and filter
function updateCategoryOptions() {
  const categories = getCategories();
  const categoryList = document.getElementById('category-list');
  const filterSelect = document.getElementById('filter-category');
  
  if (categoryList) {
    // Clear existing options
    categoryList.innerHTML = '';
    
    // Add category options to datalist
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      categoryList.appendChild(option);
    });
  }
  
  if (filterSelect) {
    // Save current selection
    const currentSelection = filterSelect.value;
    
    // Clear existing options except the first one
    while (filterSelect.options.length > 1) {
      filterSelect.remove(1);
    }
    
    // Add category options to filter
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      filterSelect.appendChild(option);
    });
    
    // Restore selection if possible
    if (categories.includes(currentSelection)) {
      filterSelect.value = currentSelection;
    }
  }
}

// Display flashcards
function displayFlashcards(categoryFilter = '') {
  const container = document.getElementById('flashcards-container');
  const noCardsMessage = document.getElementById('no-cards-message');
  
  if (!container) return;
  
  // Clear existing cards (except the no-cards message)
  Array.from(container.children).forEach(child => {
    if (child.id !== 'no-cards-message') {
      child.remove();
    }
  });
  
  // Get flashcards
  let flashcards = getFlashcards();
  
  // Apply category filter if specified
  if (categoryFilter) {
    flashcards = flashcards.filter(card => card.category === categoryFilter);
  }
  
  // Show/hide no cards message
  if (flashcards.length === 0) {
    noCardsMessage.style.display = 'block';
  } else {
    noCardsMessage.style.display = 'none';
    
    // Create and append flashcard elements
    flashcards.forEach(card => {
      const cardElement = createFlashcardElement(card);
      container.appendChild(cardElement);
    });
  }
}