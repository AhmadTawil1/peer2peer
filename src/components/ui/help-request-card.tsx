import { Clock, AlertCircle, CheckCircle, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SubjectBadge } from "@/components/ui/subject-badge";

interface HelpRequestCardProps {
  id: number;
  title: string;
  subject: string;
  createdAt: string;
  urgent: boolean;
  answered: boolean;
}

export function HelpRequestCard({ id, title, subject, createdAt, urgent, answered }: HelpRequestCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <SubjectBadge subject={subject} />
            <div className="flex items-center text-gray-500 text-sm">
              <Clock size={14} className="mr-1" />
              <span>{formatDate(createdAt)}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {urgent && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertCircle size={14} />
                Urgent
              </Badge>
            )}
            
            {answered ? (
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
              disabled={answered}
              className={answered ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}
            >
              Help Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}