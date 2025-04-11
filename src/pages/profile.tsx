import { Star, Award, BookOpen, ThumbsUp, Users, Medal, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";
import { ExpertiseTag } from "@/components/ui/expertise-tag";
import { StarRating } from "@/components/ui/star-rating";

const mockHelperProfile = {
  id: 1,
  name: "Alex Johnson",
  photo: "https://i.pravatar.cc/300?img=11",
  description: "Physics and Math tutor with 3 years of experience. I love helping students understand complex concepts in simple ways.",
  expertise: ["Mathematics", "Physics", "Calculus", "Mechanics", "Algebra"],
  stats: {
    answersCount: 127,
    averageRating: 4.8,
    helpedStudents: 89,
    pointsEarned: 1250,
  },
  badges: [
    { name: "Top Helper", icon: Award, color: "gold" },
    { name: "Quick Responder", icon: Zap, color: "blue" },
    { name: "Knowledge Master", icon: BookOpen, color: "purple" },
  ],
  recentActivity: [
    { type: "answer", subject: "Physics", title: "Explained Newton's Third Law" },
    { type: "answer", subject: "Mathematics", title: "Helped with integration problem" },
    { type: "review", rating: 5, comment: "Excellent explanation, very clear!" },
  ]
};

const HelperProfile = () => {
  const { name, photo, description, expertise, stats, badges, recentActivity } = mockHelperProfile;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Info */}
            <div className="md:col-span-1">
              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-32 w-32 mb-4">
                      <AvatarImage src={photo} alt={name} />
                      <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <h2 className="text-2xl font-bold text-center mb-1">{name}</h2>
                    
                    <div className="flex items-center mb-4">
                      <StarRating rating={stats.averageRating} />
                      <span className="ml-2 text-gray-600">{stats.averageRating.toFixed(1)}</span>
                    </div>
                    
                    <p className="text-gray-600 text-center mb-6">{description}</p>
                    
                    <div className="w-full">
                      <h3 className="font-semibold mb-2 text-gray-700">Areas of Expertise</h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {expertise.map((item) => (
                          <ExpertiseTag key={item} name={item} />
                        ))}
                      </div>
                    </div>
                    
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Contact for Help
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Stats and Badges */}
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 gap-6">
                {/* Stats */}
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl">Helper Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100 mr-4">
                          <BookOpen className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Answers Provided</p>
                          <p className="text-2xl font-bold">{stats.answersCount}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100 mr-4">
                          <Users className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Students Helped</p>
                          <p className="text-2xl font-bold">{stats.helpedStudents}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="p-3 rounded-full bg-yellow-100 mr-4">
                          <Star className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Average Rating</p>
                          <p className="text-2xl font-bold">{stats.averageRating.toFixed(1)}/5.0</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="p-3 rounded-full bg-purple-100 mr-4">
                          <ThumbsUp className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Points Earned</p>
                          <p className="text-2xl font-bold">{stats.pointsEarned}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Level Progress</span>
                        <span className="text-sm font-medium">Level 4</span>
                      </div>
                      <Progress value={75} className="h-2" />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">750/1000 points to Level 5</span>
                        <span className="text-xs text-gray-500">75%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Badges */}
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl">Achievements & Badges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {badges.map((badge, index) => (
                        <div key={index} className="flex flex-col items-center p-4 border rounded-lg">
                          <div className={`p-3 rounded-full bg-${badge.color}-100 mb-3`}>
                            <badge.icon className={`h-6 w-6 text-${badge.color}-600`} />
                          </div>
                          <span className="font-medium text-center">{badge.name}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex justify-center">
                      <Badge className="bg-blue-600 hover:bg-blue-700">
                        <Medal className="mr-1 h-4 w-4" />
                        Top 5% of Helpers
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Recent Activity */}
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <li key={index} className="border-b pb-3 last:border-0">
                          {activity.type === 'answer' ? (
                            <div>
                              <div className="flex items-center">
                                <BookOpen className="h-4 w-4 text-blue-600 mr-2" />
                                <span className="text-sm font-medium">Answered a question in {activity.subject}</span>
                              </div>
                              <p className="text-gray-600 ml-6 mt-1">{activity.title}</p>
                            </div>
                          ) : (
                            <div>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 mr-2" />
                                <span className="text-sm font-medium">Received a {activity.rating}-star review</span>
                              </div>
                              <p className="text-gray-600 ml-6 mt-1">"{activity.comment}"</p>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Navigation />
    </div>
  );
};

export default HelperProfile;