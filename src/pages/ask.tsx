import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileUpload } from "@/components/file-upload";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const subjects = [
  { value: "math", label: "Mathematics" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "biology", label: "Biology" },
  { value: "english", label: "English" },
  { value: "history", label: "History" },
  { value: "computer-science", label: "Computer Science" },
  { value: "economics", label: "Economics" },
  { value: "other", label: "Other" },
];

const AskPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    helpType: "written",
  });
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Question submitted!",
        description: "Your question has been posted successfully.",
      });
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        subject: "",
        helpType: "written",
      });
      setFile(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Ask for Help</h1>
        <Card>
          <CardHeader>
            <CardTitle>Post Your Question</CardTitle>
            <CardDescription>
              Provide details about your question to get the best help from other students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Question Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="E.g., How do I solve this quadratic equation?"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Explain your question in detail. Include any relevant information that might help others understand your problem."
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => handleSelectChange("subject", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.value} value={subject.value}>
                        {subject.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Attach Files (Optional)</Label>
                <FileUpload onFileChange={setFile} />
              </div>

              <div className="space-y-3">
                <Label>Help Type</Label>
                <RadioGroup
                  value={formData.helpType}
                  onValueChange={(value) => handleSelectChange("helpType", value)}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="written" id="written" />
                    <Label htmlFor="written" className="font-normal">
                      Written Answer
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="live" id="live" />
                    <Label htmlFor="live" className="font-normal">
                      Live Help Session
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Question"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AskPage;