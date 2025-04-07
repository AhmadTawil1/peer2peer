import { useState } from "react";
import { Header } from "@/components/layout/header";
import { QuestionCard } from "@/components/question-card";
import { FilterBar } from "@/components/filter-bar";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for questions
const mockQuestions = [
  {
    id: "1",
    title: "How do I solve this quadratic equation: 2x² + 5x - 3 = 0?",
    subject: "math",
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    answersCount: 0,
    isUrgent: true,
  },
  {
    id: "2",
    title: "Can someone explain the process of photosynthesis in simple terms?",
    subject: "biology",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    answersCount: 3,
    isUrgent: false,
  },
  {
    id: "3",
    title: "What are the main causes of World War I?",
    subject: "history",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    answersCount: 2,
    isUrgent: false,
  },
  {
    id: "4",
    title: "How do I calculate the force of gravity between two objects?",
    subject: "physics",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    answersCount: 1,
    isUrgent: false,
  },
  {
    id: "5",
    title: "Can someone help me analyze this poem by Robert Frost?",
    subject: "english",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    answersCount: 0,
    isUrgent: true,
  },
  {
    id: "6",
    title: "How do I implement a binary search tree in JavaScript?",
    subject: "computer-science",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    answersCount: 4,
    isUrgent: false,
  },
];

interface FilterState {
  subject: string;
  urgency: string;
  unansweredOnly: boolean;
}

const FeedPage = () => {
  const [questions, setQuestions] = useState(mockQuestions);
  const [filters, setFilters] = useState<FilterState>({
    subject: "all",
    urgency: "all",
    unansweredOnly: false,
  });
  const { toast } = useToast();

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // In a real app, you would fetch filtered data from the server
    // For now, we'll just filter the mock data
  };

  const handleHelp = (id: string) => {
    toast({
      title: "Help Offered",
      description: "You've offered to help with this question!",
    });
  };

  // Apply filters to questions
  const filteredQuestions = mockQuestions.filter((question) => {
    // Filter by subject
    if (filters.subject !== "all" && question.subject !== filters.subject) {
      return false;
    }

    // Filter by urgency
    if (filters.urgency === "urgent" && !question.isUrgent) {
      return false;
    }
    if (filters.urgency === "normal" && question.isUrgent) {
      return false;
    }

    // Filter by unanswered
    if (filters.unansweredOnly && question.answersCount > 0) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800">Help Requests</h1>
          <Button asChild>
            <Link to="/ask">
              <PlusCircle className="h-4 w-4 mr-2" />
              Ask Question
            </Link>
          </Button>
        </div>

        <FilterBar onFilterChange={handleFilterChange} />

        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-500">No questions match your filters</h3>
            <p className="text-gray-400 mt-2">Try adjusting your filters or check back later</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                id={question.id}
                title={question.title}
                subject={question.subject}
                createdAt={question.createdAt}
                answersCount={question.answersCount}
                isUrgent={question.isUrgent}
                onHelp={handleHelp}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default FeedPage;