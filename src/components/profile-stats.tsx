import { Card, CardContent } from "@/components/ui/card";
import { Award, MessageSquare, Star, ThumbsUp, Users } from "lucide-react";

interface ProfileStatsProps {
  answersCount: number;
  averageRating: number;
  helpedStudents: number;
  bestSubject: string;
  points: number;
}

export function ProfileStats({
  answersCount,
  averageRating,
  helpedStudents,
  bestSubject,
  points,
}: ProfileStatsProps) {
  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="h-4 w-4 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="bg-blue-100 p-2 rounded-full mr-4">
            <MessageSquare className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Answers Provided</p>
            <p className="text-xl font-semibold">{answersCount}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="bg-yellow-100 p-2 rounded-full mr-4">
            <Star className="h-5 w-5 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Average Rating</p>
            <div className="flex items-center">
              <p className="text-xl font-semibold mr-2">{averageRating.toFixed(1)}</p>
              <div className="flex">{renderStars()}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="bg-green-100 p-2 rounded-full mr-4">
            <Users className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Students Helped</p>
            <p className="text-xl font-semibold">{helpedStudents}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="bg-purple-100 p-2 rounded-full mr-4">
            <Award className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Points Earned</p>
            <p className="text-xl font-semibold">+{points}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}