import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Upload, 
  BookOpen, 
  Video, 
  Send, 
  ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/layout/header";
import { Navigation } from "@/components/layout/navigation";

const subjects = [
  "Mathematics", 
  "Physics", 
  "Chemistry", 
  "Biology", 
  "Computer Science", 
  "Literature", 
  "History", 
  "Geography", 
  "Economics"
];

const AskForHelp = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    helpType: "written",
    file: null
  });
  
  const [fileName, setFileName] = useState("");
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
      setFileName(file.name);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Your help request has been submitted!");
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Ask for Help</h1>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-center">What do you need help with?</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-gray-700">Question Title</Label>
                  <Input 
                    id="title"
                    name="title"
                    placeholder="E.g., How do I solve quadratic equations?"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="border-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-700">Detailed Description</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    placeholder="Provide details about your question..."
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="min-h-[150px] border-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-700">Subject</Label>
                  <Select 
                    name="subject" 
                    value={formData.subject} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}
                  >
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-gray-700">Upload File (Optional)</Label>
                  <div className="flex items-center gap-2">
                    <Label 
                      htmlFor="file" 
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <Upload size={18} />
                      <span>Choose File</span>
                    </Label>
                    <Input 
                      id="file"
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <span className="text-sm text-gray-500 truncate max-w-[200px]">
                      {fileName || "No file chosen"}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-gray-700">Help Type</Label>
                  <RadioGroup 
                    defaultValue="written"
                    value={formData.helpType}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, helpType: value }))}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="written" id="written" />
                      <Label htmlFor="written" className="flex items-center gap-2 cursor-pointer">
                        <BookOpen size={18} />
                        <span>Written Answer</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="live" id="live" />
                      <Label htmlFor="live" className="flex items-center gap-2 cursor-pointer">
                        <Video size={18} />
                        <span>Live Help Session</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Send size={18} className="mr-2" />
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="mt-6 text-center">
            <Link to="/feed" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              View help requests from other students
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </main>
      
      <Navigation />
    </div>
  );
};

export default AskForHelp;