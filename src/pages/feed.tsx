import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Filter, 
  Clock, 
  BookOpen, 
  AlertCircle, 
  CheckCircle, 
  ChevronDown, 
  Search 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { HelpRequestCard } from "@/components/ui/help-request-card";
import { SubjectBadge } from "@/components/ui/subject-badge";

const mockHelpRequests = [
  {
    id: 1,
    title: "Need help with calculus integration by parts",
    subject: "Mathematics",
    createdAt: "2023-10-15T14:30:00Z",
    urgent: true,
    answered: false,
  },
  {
    id: 2,
    title: "How do I balance chemical equations?",
    subject: "Chemistry",
    createdAt: "2023-10-15T10:15:00Z",
    urgent: false,
    answered: false,
  },
  {
    id: 3,
    title: "Explain the causes of World War I",
    subject: "History",
    createdAt: "2023-10-14T16:45:00Z",
    urgent: false,
    answered: true,
  },
  {
    id: 4,
    title: "Help with Python recursion problem",
    subject: "Computer Science",
    createdAt: "2023-10-14T09:20:00Z",
    urgent: true,
    answered: false,
  },
  {
    id: 5,
    title: "Analysis of Shakespeare's Macbeth themes",
    subject: "Literature",
    createdAt: "2023-10-13T13:10:00Z",
    urgent: false,
    answered: false,
  },
];

const subjects = [
  "All Subjects",
  "Mathematics", 
  "Physics", 
  "Chemistry", 
  "Biology", 
  "Computer Science", 
  "Literature", 
  "History", 
  "Geography", 
  "Economics"
];

const HelpRequestsFeed = () => {
  const [filters, setFilters] = useState({
    subject: "All Subjects",
    urgency: "all",
    unansweredOnly: false,
    searchQuery: "",
  });
  
  const [showFilters, setShowFilters] = useState(false);
  
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const filteredRequests = mockHelpRequests.filter(request => {
    // Subject filter
    if (filters.subject !== "All Subjects" && request.subject !== filters.subject) {
      return false;
    }
    
    // Urgency filter
    if (filters.urgency === "urgent" && !request.urgent) {
      return false;
    }
    
    // Unanswered only filter
    if (filters.unansweredOnly && request.answered) {
      return false;
    }
    
    // Search query
    if (filters.searchQuery && !request.title.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Help Requests</h1>
          
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search questions..."
                  className="pl-10 border-gray-300"
                  value={filters.searchQuery}
                  onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
                />
              </div>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2 whitespace-nowrap"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} />
                Filters
                <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>
            </div>
            
            {showFilters && (
              <Card className="mb-6 shadow-sm">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="subject-filter" className="text-sm font-medium text-gray-700">Subject</Label>
                      <Select 
                        value={filters.subject} 
                        onValueChange={(value) => handleFilterChange("subject", value)}
                      >
                        <SelectTrigger id="subject-filter" className="mt-1 border-gray-300">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="urgency-filter" className="text-sm font-medium text-gray-700">Urgency</Label>
                      <Select 
                        value={filters.urgency} 
                        onValueChange={(value) => handleFilterChange("urgency", value)}
                      >
                        <SelectTrigger id="urgency-filter" className="mt-1 border-gray-300">
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="urgent">Urgent only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-6">
                      <Checkbox 
                        id="unanswered-only" 
                        checked={filters.unansweredOnly}
                        onCheckedChange={(checked) => handleFilterChange("unansweredOnly", checked)}
                      />
                      <Label htmlFor="unanswered-only" className="text-sm font-medium text-gray-700">
                        Show unanswered only
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="space-y-4">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <Card key={request.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <SubjectBadge subject={request.subject} />
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock size={14} className="mr-1" />
                          <span>{formatDate(request.createdAt)}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2">{request.title}</h3>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {request.urgent && (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <AlertCircle size={14} />
                            Urgent
                          </Badge>
                        )}
                        
                        {request.answered ? (
                          <Badge variant="outline" className="flex items-center gap-1 text-green-600 border-green-600">
                            <CheckCircle size={14} />
                            Answered
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <BookOpen size={14} />
                            Needs Help
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex justify-end">
                        <Button 
                          disabled={request.answered}
                          className={request.answered ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}
                        >
                          Help Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No help requests match your filters.</p>
                <Button 
                  variant="link" 
                  className="mt-2"
                  onClick={() => setFilters({
                    subject: "All Subjects",
                    urgency: "all",
                    unansweredOnly: false,
                    searchQuery: "",
                  })}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/">
              <Button variant="outline" className="mr-2">Ask a Question</Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline">View Profile</Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Navigation />
    </div>
  );
};

export default HelpRequestsFeed;