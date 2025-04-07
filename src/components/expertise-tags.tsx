import { Badge } from "@/components/ui/badge";

interface ExpertiseTagsProps {
  tags: string[];
}

export function ExpertiseTags({ tags }: ExpertiseTagsProps) {
  const tagColors: Record<string, string> = {
    math: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    physics: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    chemistry: "bg-green-100 text-green-800 hover:bg-green-200",
    biology: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
    english: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    history: "bg-orange-100 text-orange-800 hover:bg-orange-200",
    "computer-science": "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
    economics: "bg-pink-100 text-pink-800 hover:bg-pink-200",
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const color = tagColors[tag.toLowerCase()] || "bg-gray-100 text-gray-800 hover:bg-gray-200";
        return (
          <Badge key={tag} variant="outline" className={`${color} cursor-default`}>
            {tag}
          </Badge>
        );
      })}
    </div>
  );
}