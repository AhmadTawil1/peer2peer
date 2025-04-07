import { Header } from "@/components/layout/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileStats } from "@/components/profile-stats";
import { ExpertiseTags } from "@/components/expertise-tags";
import { Award, Edit, MessageSquare, Star, Users } from "lucide-react";

const ProfilePage = () => {
  // Mock user data
  const user = {
    name: "Alex Johnson",
    username: "alexj",
    bio: "Computer Science student at MIT. Passionate about helping others understand complex topics in math and programming. I believe that teaching is the best way to learn!",
    photoUrl: "https://i.pravatar.cc/300?img=8",
    stats: {
      answersCount: 42,
      averageRating: 4.8,
      helpedStudents: 31,
      bestSubject: "Computer Science",
      points: 150,
    },
    expertise: ["Mathematics", "Computer Science", "Physics"],
    badges: [
      { name: "Top Helper", description: "Among the top 5% of helpers" },
      { name: "Math Expert", description: "Provided excellent math explanations" },
      { name: "Quick Responder", description: "Responds within 30 minutes" },
    ],
    recentActivity: [
      {
        id: "1",
        type: "answer",
        title: "Explained binary search algorithm complexity",
        date: "2 days ago",
        rating: 5,
      },
      {
        id: "2",
        type: "answer",
        title: "Helped with calculus integration problem",
        date: "4 days ago",
        rating: 5,
      },
      {
        id: "3",
        type: "answer",
        title: "Explained quantum physics concepts",
        date: "1 week ago",
        rating: 4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="h-24 w-24 border-2 border-blue-100">
                  <AvatarImage src={user.photoUrl} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <div>
                      <h1 className="text-2xl font-bold">{user.name}</h1>
                      <p className="text-gray-500">@{user.username}</p>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2 md:mt-0">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                  <p className="text-gray-700 mb-4">{user.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      <Award className="h-3.5 w-3.5 mr-1" />
                      Top Helper
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                      <Star className="h-3.5 w-3.5 mr-1" />
                      {user.stats.averageRating} Rating
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                      <MessageSquare className="h-3.5 w-3.5 mr-1" />
                      {user.stats.answersCount} Answers
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs defaultValue="stats">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="stats">Stats</TabsTrigger>
                <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                <TabsTrigger value="badges">Badges & Rewards</TabsTrigger>
              </TabsList>
              <TabsContent value="stats" className="mt-4">
                <ProfileStats {...user.stats} />
              </TabsContent>
              <TabsContent value="activity" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your recent contributions and ratings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {user.recentActivity.map((activity) => (
                        <div key={activity.id} className="border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{activity.title}</h4>
                              <p className="text-sm text-gray-500">{activity.date}</p>
                            </div>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < activity.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="badges" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Badges & Rewards</CardTitle>
                    <CardDescription>Recognition for your contributions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {user.badges.map((badge, index) => (
                        <Card key={index} className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="bg-blue-100 p-2 rounded-full">
                                <Award className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{badge.name}</h4>
                                <p className="text-sm text-gray-600">{badge.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="bg-purple-100 p-2 rounded-full">
                              <Star className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold">+{user.stats.points} Points</h4>
                              <p className="text-sm text-gray-600">Redeem for rewards</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Areas of Expertise</CardTitle>
                <CardDescription>Subjects you're knowledgeable in</CardDescription>
              </CardHeader>
              <CardContent>
                <ExpertiseTags tags={user.expertise} />
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Your learning milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-1.5 rounded-full mr-3">
                        <MessageSquare className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-sm font-medium">Answers</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold text-sm">{user.stats.answersCount}/50</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(user.stats.answersCount / 50) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-1.5 rounded-full mr-3">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium">Students Helped</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold text-sm">{user.stats.helpedStudents}/40</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(user.stats.helpedStudents / 40) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;