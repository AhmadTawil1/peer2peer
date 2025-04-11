// Local storage management for StudyBuddy

// Flashcards
function getFlashcards() {
  const flashcardsJson = localStorage.getItem('studybuddy_flashcards');
  return flashcardsJson ? JSON.parse(flashcardsJson) : [];
}

function saveFlashcards(flashcards) {
  localStorage.setItem('studybuddy_flashcards', JSON.stringify(flashcards));
}

function addFlashcard(flashcard) {
  const flashcards = getFlashcards();
  
  // Generate a unique ID
  flashcard.id = Date.now().toString();
  
  // Set default values if not provided
  if (!flashcard.difficulty) flashcard.difficulty = 'medium';
  if (!flashcard.lastReviewed) flashcard.lastReviewed = null;
  
  flashcards.push(flashcard);
  saveFlashcards(flashcards);
  return flashcard;
}

function updateFlashcard(id, updates) {
  const flashcards = getFlashcards();
  const index = flashcards.findIndex(card => card.id === id);
  
  if (index !== -1) {
    flashcards[index] = { ...flashcards[index], ...updates };
    saveFlashcards(flashcards);
    return flashcards[index];
  }
  
  return null;
}

function deleteFlashcard(id) {
  const flashcards = getFlashcards();
  const filteredFlashcards = flashcards.filter(card => card.id !== id);
  
  if (filteredFlashcards.length !== flashcards.length) {
    saveFlashcards(filteredFlashcards);
    return true;
  }
  
  return false;
}

function getCategories() {
  const flashcards = getFlashcards();
  const categories = new Set(flashcards.map(card => card.category).filter(Boolean));
  return Array.from(categories);
}

// Study Sessions
function getStudySessions() {
  const sessionsJson = localStorage.getItem('studybuddy_sessions');
  return sessionsJson ? JSON.parse(sessionsJson) : [];
}

function saveStudySessions(sessions) {
  localStorage.setItem('studybuddy_sessions', JSON.stringify(sessions));
}

function addStudySession(session) {
  const sessions = getStudySessions();
  
  // Add timestamp if not provided
  if (!session.date) session.date = Date.now();
  
  sessions.push(session);
  saveStudySessions(sessions);
  return session;
}