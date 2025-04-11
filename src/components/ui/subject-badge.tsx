import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  Atom, 
  Flask, 
  Leaf, 
  Code, 
  BookOpen, 
  GraduationCap, 
  Globe, 
  BarChart4 
} from "lucide-react";

interface SubjectBadgeProps {
  subject: string;
}

export function SubjectBadge({ subject }: SubjectBadgeProps) {
  const getSubjectIcon = () => {
    switch (subject) {
      case "Mathematics":
        return <Calculator size={14} />;
      case "Physics":
        return <Atom size={14} />;
      case "Chemistry":
        return <Flask size={14} />;
      case "Biology":
        return <Leaf size={14} />;
      case "Computer Science":
        return <Code size={14} />;
      case "Literature":
        return <BookOpen size={14} />;
      case "History":
        return <GraduationCap size={14} />;
      case "Geography":
        return <Globe size={14} />;
      case "Economics":
        return <BarChart4 size={14} />;
      default:
        return <BookOpen size={14} />;
    }
  };
  
  const getSubjectColor = () => {
    switch (subject) {
      case "Mathematics":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Physics":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case "Chemistry":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Biology":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200";
      case "Computer Science":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-200";
      case "Literature":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "History":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "Geography":
        return "bg-cyan-100 text-cyan-800 hover:bg-cyan-200";
      case "Economics":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };
  
  return (
    <Badge variant="outline" className={`flex items-center gap-1 font-normal ${getSubjectColor()}`}>
      {getSubjectIcon()}
      {subject}
    </Badge>
  );
}