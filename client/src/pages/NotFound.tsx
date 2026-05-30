import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { HelpCircle, ChevronLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6">
      <div className="max-w-md w-full text-center flex flex-col items-center gap-6">
        <div className="p-4 bg-primary/10 text-primary rounded-full animate-bounce">
          <HelpCircle className="h-12 w-12" />
        </div>
        <h1 className="font-display text-4xl font-extrabold tracking-tight">404 - Page Not Found</h1>
        <p className="text-muted-foreground leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button asChild className="bg-primary hover:bg-primary/90 font-bold px-6 py-5 rounded-full shadow-lg shadow-primary/20">
          <Link href="/">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
