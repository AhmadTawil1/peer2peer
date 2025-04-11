// Study session handling for StudyBuddy

document.addEventListener('DOMContentLoaded', () => {
  const studyForm = document.getElementById('study-form');
  const studySetup = document.getElementById('study-setup');
  const studyActive = document.getElementById('study-active');
  const studyResults = document.getElementById('study-results');
  const noCardsWarning = document.getElementById('no-cards-warning');
  
  // Session state
  let currentSession = {
    cards: [],
    currentIndex: 0,
    startTime: null,
    difficultCards: [],
    category: '',
    difficulty: ''
  };
  
  // Initialize category options
  updateStudyCategories();
  
  // Start session form submission
  if (studyForm) {
    studyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const category = document.getElementById('session-category').value;
      const difficulty = document.getElementById('session-difficulty').value;
      const count = parseInt(document.getElementById('session-count').value) || 10;
      
      // Get matching flashcards
      let flashcards = getFlashcards();
      
      // Filter by category if selected
      if (category) {
        flashcards = flashcards.filter(card => card.category === category);
      }
      
      // Filter by difficulty if selected
      if (difficulty) {
        flashcards = flashcards.filter(card => card.difficulty === difficulty);
      }
      
      // Check if we have enough cards
      if (flashcards.length === 0) {
        noCardsWarning.classList.remove('hidden');
        return;
      }
      
      // Shuffle cards
      flashcards = shuffleArray(flashcards);
      
      // Limit to requested count
      const sessionCards = flashcards.slice(0, Math.min(count, flashcards.length));
      
      // Set up session
      currentSession = {
        cards: sessionCards,
        currentIndex: 0,
        startTime: Date.now(),
        difficultCards: [],
        category: category,
        difficulty: difficulty
      };
      
      // Update UI
      document.getElementById('current-card-num').textContent = '1';
      document.getElementById('total-cards').textContent = sessionCards.length;
      
      // Show first card
      showCurrentCard();
      
      // Switch views
      studySetup.classList.add('hidden');
      studyActive.classList.remove('hidden');
    });
  }
  
  // Next card button
  const nextCardBtn = document.getElementById('next-card-btn');
  if (nextCardBtn) {
    nextCardBtn.addEventListener('click', () => {
      // Move to next card if not at the end
      if (currentSession.currentIndex < currentSession.cards.length - 1) {
        // Update card as reviewed
        const currentCard = currentSession.cards[currentSession.currentIndex];
        updateFlashcard(currentCard.id, { lastReviewed: Date.now() });
        
        // Move to next card
        currentSession.currentIndex++;
        document.getElementById('current-card-num').textContent = currentSession.currentIndex + 1;
        
        // Show next card with animation
        const cardContainer = document.getElementById('study-card-container');
        const currentCardElement = cardContainer.firstChild;
        
        // Add slide-out animation
        currentCardElement.classList.add('slide-out');
        
        // After animation completes, show new card
        setTimeout(() => {
          showCurrentCard();
        }, 300);
      } else {
        // End of session
        endStudySession();
      }
    });
  }
  
  // Previous card button
  const prevCardBtn = document.getElementById('prev-card-btn');
  if (prevCardBtn) {
    prevCardBtn.addEventListener('click', () => {
      // Move to previous card if not at the beginning
      if (currentSession.currentIndex > 0) {
        currentSession.currentIndex--;
        document.getElementById('current-card-num').textContent = currentSession.currentIndex + 1;
        showCurrentCard();
      }
    });
  }
  
  // Mark difficult button
  const markDifficultBtn = document.getElementById('mark-difficult-btn');
  if (markDifficultBtn) {
    markDifficultBtn.addEventListener('click', () => {
      const currentCard = currentSession.cards[currentSession.currentIndex];
      
      // Toggle difficult status
      const isDifficult = currentSession.difficultCards.includes(currentCard.id);
      
      if (isDifficult) {
        // Remove from difficult cards
        currentSession.difficultCards = currentSession.difficultCards.filter(id => id !== currentCard.id);
        markDifficultBtn.classList.remove('bg-red-500');
        markDifficultBtn.classList.add('bg-yellow-500');
        markDifficultBtn.innerHTML = '<i class="fas fa-flag mr-1"></i> Mark Difficult';
      } else {
        // Add to difficult cards
        currentSession.difficultCards.push(currentCard.id);
        markDifficultBtn.classList.remove('bg-yellow-500');
        markDifficultBtn.classList.add('bg-red-500');
        markDifficultBtn.innerHTML = '<i class="fas fa-flag mr-1"></i> Marked Difficult';
      }
    });
  }
  
  // End session button
  const endSessionBtn = document.getElementById('end-session-btn');
  if (endSessionBtn) {
    endSessionBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to end this study session?')) {
        endStudySession();
      }
    });
  }
});

// Update study categories dropdown
function updateStudyCategories() {
  const categorySelect = document.getElementById('session-category');
  if (!categorySelect) return;
  
  const categories = getCategories();
  
  // Clear existing options except the first one
  while (categorySelect.options.length > 1) {
    categorySelect.remove(1);
  }
  
  // Add category options
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

// Show the current card
function showCurrentCard() {
  const cardContainer = document.getElementById('study-card-container');
  const currentCard = currentSession.cards[currentSession.currentIndex];
  
  // Clear container
  cardContainer.innerHTML = '';
  
  // Create card element
  const cardElement = createFlashcardElement(currentCard, false);
  cardElement.classList.add('slide-in');
  cardContainer.appendChild(cardElement);
  
  // Update difficult button state
  const markDifficultBtn = document.getElementById('mark-difficult-btn');
  if (markDifficultBtn) {
    const isDifficult = currentSession.difficultCards.includes(currentCard.id);
    
    if (isDifficult) {
      markDifficultBtn.classList.remove('bg-yellow-500');
      markDifficultBtn.classList.add('bg-red-500');
      markDifficultBtn.innerHTML = '<i class="fas fa-flag mr-1"></i> Marked Difficult';
    } else {
      markDifficultBtn.classList.remove('bg-red-500');
      markDifficultBtn.classList.add('bg-yellow-500');
      markDifficultBtn.innerHTML = '<i class="fas fa-flag mr-1"></i> Mark Difficult';
    }
  }
  
  // Update previous button state
  const prevCardBtn = document.getElementById('prev-card-btn');
  if (prevCardBtn) {
    prevCardBtn.disabled = currentSession.currentIndex === 0;
    if (currentSession.currentIndex === 0) {
      prevCardBtn.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
      prevCardBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
  }
}

// End the study session
function endStudySession() {
  // Calculate session duration in minutes
  const duration = Math.round((Date.now() - currentSession.startTime) / 60000);
  
  // Create session record
  const sessionRecord = {
    date: Date.now(),
    duration: duration,
    cardsStudied: currentSession.cards.length,
    difficultCards: currentSession.difficultCards.length,
    categories: currentSession.category ? [currentSession.category] : []
  };
  
  // Save session
  addStudySession(sessionRecord);
  
  // Update UI with results
  document.getElementById('result-cards-studied').textContent = sessionRecord.cardsStudied;
  document.getElementById('result-difficult-cards').textContent = sessionRecord.difficultCards;
  document.getElementById('result-time-spent').textContent = formatTime(duration);
  
  // Switch views
  document.getElementById('study-active').classList.add('hidden');
  document.getElementById('study-results').classList.remove('hidden');
}

// Format time for display
function formatTime(minutes) {
  if (minutes < 1) {
    return 'Less than a minute';
  } else if (minutes === 1) {
    return '1 minute';
  } else if (minutes < 60) {
    return `${minutes} minutes`;
  } else {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hour${hours > 1 ? 's' : ''} ${mins > 0 ? `${mins} minute${mins > 1 ? 's' : ''}` : ''}`;
  }
}

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}