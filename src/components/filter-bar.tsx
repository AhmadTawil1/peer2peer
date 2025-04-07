import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FilterX, SlidersHorizontal } from "lucide-react";

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  subject: string;
  urgency: string;
  unansweredOnly: boolean;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    subject: "all",
    urgency: "all",
    unansweredOnly: false,
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: string | boolean) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      subject: "all",
      urgency: "all",
      unansweredOnly: false,
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-gray-700">Filter Questions</h2>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <FilterX className="h-4 w-4 mr-1" />
            Reset
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${isExpanded ? 'block' : 'hidden md:grid'}`}>
        <div>
          <Label htmlFor="subject-filter" className="text-sm font-medium mb-1.5 block">
            Subject
          </Label>
          <Select
            value={filters.subject}
            onValueChange={(value) => handleFilterChange("subject", value)}
          >
            <SelectTrigger id="subject-filter">
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="math">Mathematics</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="chemistry">Chemistry</SelectItem>
              <SelectItem value="biology">Biology</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="history">History</SelectItem>
              <SelectItem value="computer-science">Computer Science</SelectItem>
              <SelectItem value="economics">Economics</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="urgency-filter" className="text-sm font-medium mb-1.5 block">
            Urgency
          </Label>
          <Select
            value={filters.urgency}
            onValueChange={(value) => handleFilterChange("urgency", value)}
          >
            <SelectTrigger id="urgency-filter">
              <SelectValue placeholder="All Questions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Questions</SelectItem>
              <SelectItem value="urgent">Urgent Only</SelectItem>
              <SelectItem value="normal">Normal Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="unanswered-filter"
            checked={filters.unansweredOnly}
            onCheckedChange={(checked) => handleFilterChange("unansweredOnly", checked)}
          />
          <Label htmlFor="unanswered-filter" className="text-sm font-medium">
            Unanswered Only
          </Label>
        </div>
      </div>
    </div>
  );
}