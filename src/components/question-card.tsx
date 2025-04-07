import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MessageCircle, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface QuestionCardProps {
  id: string;
  title: string;
  subject: string;
  createdAt: Date;
  answersCount: number;
  isUrgent?: boolean;
  onHelp: (id: string) => void;
}

export function QuestionCard({
  id,
  title,
  subject,
  createdAt,
  answersCount,
  isUrgent = false,
  onHelp,
}: QuestionCardProps) {
  const subjectColors: Record<string, string> = {
    math: "bg-blue-100 text-blue-800",
    physics: "bg-purple-100 text-purple-800",
    chemistry: "bg-green-100 text-green-800",
    biology: "bg-emerald-100 text-emerald-800",
    english: "bg-yellow-100 text-yellow-800",
    history: "bg-orange-100 text-orange-800",
    "computer-science": "bg-indigo-100 text-indigo-800",
    economics: "bg-pink-100 text-pink-800",
    other: "bg-gray-100 text-gray-800",
  };

  const subjectColor = subjectColors[subject] || subjectColors.other;
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <Badge className={`${subjectColor} font-medium`}>
            {subject.charAt(0).toUpperCase() + subject.slice(1)}
          </Badge>
          {isUrgent && (
            <Badge variant="destructive" className="flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              Urgent
            </Badge>
          )}
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
        <div className="flex items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{timeAgo}</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="h-3.5 w-3.5 mr-1" />
            <span>{answersCount} answers</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          onClick={() => onHelp(id)} 
          className="w-full"
          variant={answersCount === 0 ? "default" : "outline"}
        >
          Help Now
        </Button>
      </CardFooter>
    </Card>
  );
}