import { Badge } from "@/components/ui/badge";

interface ExpertiseTagProps {
  name: string;
}

export function ExpertiseTag({ name }: ExpertiseTagProps) {
  return (
    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200">
      {name}
    </Badge>
  );
}