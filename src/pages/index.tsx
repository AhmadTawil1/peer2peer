import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BookOpen, Users, UserCircle } from "lucide-react";

const Index = () => {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="container max-w-4xl px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">StudyBuddy</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A peer-to-peer platform where students can request homework help and offer explanations to others.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Ask for Help</h2>
              <p className="text-gray-500 mb-4">Post your question and get help from other students</p>
              <Button asChild className="mt-auto w-full bg-blue-600 hover:bg-blue-700">
                <Link to="/ask">Ask Question</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Users className="h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Help Requests</h2>
              <p className="text-gray-500 mb-4">Browse questions from other students and offer your help</p>
              <Button asChild className="mt-auto w-full bg-blue-600 hover:bg-blue-700">
                <Link to="/feed">View Requests</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <UserCircle className="h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Helper Profile</h2>
              <p className="text-gray-500 mb-4">View your profile, stats, and expertise areas</p>
              <Button asChild className="mt-auto w-full bg-blue-600 hover:bg-blue-700">
                <Link to="/profile">My Profile</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-gray-500 mb-2">Class project prototype</p>
          <p className="text-sm text-gray-400">Connect with students and get the help you need</p>
        </div>
      </div>
    </main>
  );
};

export default Index;