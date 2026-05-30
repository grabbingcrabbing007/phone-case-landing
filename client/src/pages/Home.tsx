import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { 
  Check, 
  Rotate3d, 
  Keyboard, 
  MousePointerClick, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Star, 
  ChevronRight, 
  Moon, 
  Sun, 
  Eye, 
  Smartphone, 
  HelpCircle,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  ShoppingCart,
  AlertCircle,
  UserCheck,
  Video,
  Play,
  Pause,
  Volume2,
  VolumeX,
  CreditCard,
  Lock,
  ArrowRight,
  Info
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

// Updated final checkout URL
const FINAL_PAYMENT_URL = "https://pay.jim.com/jim_maceo-j-jr-jr-loving/Ri1D-YjA0YipxJJ-138.00";

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  badge: string;
  image: string;
  features: string[];
  colorName: string;
  colorClass: string;
}

interface iPadModel {
  id: string;
  name: string;
  numbers: string[];
  compatible: boolean;
}

interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  colorPurchased: string;
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [cookieAccepted, setCookieNotice] = useState<boolean>(true);
  const [selectedColor, setSelectedColor] = useState<string>("pink");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [showFloatingBtn, setShowFloatingBtn] = useState<boolean>(false);
  
  // Modal states for policies, contact, and checkout
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Newsletter signup state
  const [newsletterEmail, setNewsletterEmail] = useState("");

  // Compatibility Checker State
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [compatibilityResult, setCompatibilityResult] = useState<{
    status: "idle" | "success" | "fail";
    message: string;
    details?: string;
  }>({ status: "idle", message: "" });

  // Instagram Reel Video Player State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Checkout Form State
  const [checkoutColor, setCheckoutColor] = useState<string>("pink");
  const [checkoutModel, setCheckoutModel] = useState<string>("");
  const [shippingName, setShippingName] = useState<string>("");
  const [shippingEmail, setShippingEmail] = useState<string>("");
  const [shippingPhone, setShippingPhone] = useState<string>("");
  const [shippingAddress, setShippingAddress] = useState<string>("");
  const [shippingCity, setShippingCity] = useState<string>("");
  const [shippingZip, setShippingAddressZip] = useState<string>("");
  const [shippingCountry, setShippingCountry] = useState<string>("");
  const [checkoutSubmitting, setCheckoutSubmitting] = useState<boolean>(false);

  // Load cookie preference and scroll listener
  useEffect(() => {
    const accepted = localStorage.getItem("cookie_accepted");
    if (!accepted) {
      setCookieNotice(false);
    }

    const handleScroll = () => {
      // Show floating button after scrolling 400px down
      if (window.scrollY > 400) {
        setShowFloatingBtn(true);
      } else {
        setShowFloatingBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_accepted", "true");
    setCookieNotice(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      toast.error("Please fill out all fields.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Message sent successfully! We will get back to you within 24 hours.");
      setContactName("");
      setContactEmail("");
      setContactMessage("");
      setIsSubmitting(false);
      setActiveModal(null);
    }, 1200);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Thank you for subscribing! Check your inbox for your 10% discount code.");
    setNewsletterEmail("");
  };

  // Open Checkout Modal with pre-selected color and model
  const openCheckout = () => {
    setCheckoutColor(selectedColor);
    setCheckoutModel(selectedModel);
    setActiveModal("checkout");
  };

  // Handle Checkout Form Submission (redirect to pay.jim.com)
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingName || !shippingEmail || !shippingPhone || !shippingAddress || !shippingCity || !shippingZip || !shippingCountry) {
      toast.error("Please complete all shipping details.");
      return;
    }
    if (!checkoutModel) {
      toast.error("Please select your iPad model.");
      return;
    }

    setCheckoutSubmitting(true);
    toast.success("Shipping details saved! Redirecting to secure payment page...");
    
    setTimeout(() => {
      window.location.href = FINAL_PAYMENT_URL;
    }, 1500);
  };

  // iPad compatibility database
  const ipadModels: iPadModel[] = [
    { id: "pro-11-m4", name: "iPad Pro 11-inch (M4, 2024)", numbers: ["A2836", "A2837", "A3006"], compatible: true },
    { id: "pro-11-4", name: "iPad Pro 11-inch (4th Gen, 2022)", numbers: ["A2759", "A2435", "A2761", "A2762"], compatible: true },
    { id: "pro-11-3", name: "iPad Pro 11-inch (3rd Gen, 2021)", numbers: ["A2377", "A2459", "A2301", "A2460"], compatible: true },
    { id: "pro-11-2", name: "iPad Pro 11-inch (2nd Gen, 2020)", numbers: ["A2228", "A2068", "A2230", "A2231"], compatible: true },
    { id: "pro-11-1", name: "iPad Pro 11-inch (1st Gen, 2018)", numbers: ["A1980", "A2013", "A1934", "A1979"], compatible: true },
    { id: "air-11-m2", name: "iPad Air 11-inch (M2, 2024)", numbers: ["A2902", "A2903", "A2904"], compatible: true },
    { id: "air-5", name: "iPad Air (5th Gen, 2022)", numbers: ["A2588", "A2589", "A2591"], compatible: true },
    { id: "air-4", name: "iPad Air (4th Gen, 2020)", numbers: ["A2316", "A2324", "A2325", "A2072"], compatible: true },
    { id: "ipad-10", name: "iPad 10.9-inch (10th Gen, 2022)", numbers: ["A2696", "A2757", "A2777"], compatible: true },
    { id: "ipad-9", name: "iPad 10.2-inch (9th Gen, 2021)", numbers: ["A2602", "A2603", "A2604", "A2605"], compatible: false },
    { id: "ipad-8", name: "iPad 10.2-inch (8th Gen, 2020)", numbers: ["A2270", "A2428", "A2429", "A2430"], compatible: false },
    { id: "mini-6", name: "iPad mini (6th Gen, 2021)", numbers: ["A2567", "A2568", "A2569"], compatible: false }
  ];

  const handleModelChange = (value: string) => {
    setSelectedModel(value);
    const model = ipadModels.find((m) => m.id === value);
    if (model) {
      if (model.compatible) {
        setCompatibilityResult({
          status: "success",
          message: "🎉 Perfect Match!",
          details: `Your model (${model.name}) is 100% compatible with Maceo 360° cases. Model numbers: ${model.numbers.join(", ")}.`
        });
      } else {
        setCompatibilityResult({
          status: "fail",
          message: "⚠️ Not Compatible",
          details: `Unfortunately, ${model.name} is not compatible with our 11-inch 360° Rotating series. We currently only support iPad Pro 11\", iPad Air 10.9\"/11\", and iPad 10th Gen.`
        });
      }
    }
  };

  const products: Record<string, Product> = {
    pink: {
      id: "pink",
      name: "Maceo Y2K Transparent Pink 360° Rotating Case",
      price: "$138.00",
      originalPrice: "$278.00",
      badge: "-50% OFF",
      image: "/manus-storage/orig_pink_83fad1aa.webp",
      colorName: "Y2K Pink",
      colorClass: "bg-pink-400",
      features: [
        "360° Full Rotation Mechanism",
        "7-Color Backlit Keys (Mac-style layout)",
        "Precision Multi-touch Trackpad",
        "Hidden Magnetic Pencil Slot",
        "Shockproof Polycarbonate Protective Shell"
      ]
    },
    purple: {
      id: "purple",
      name: "Maceo Y2K Transparent Purple 360° Rotating Case",
      price: "$138.00",
      originalPrice: "$278.00",
      badge: "-50% OFF",
      image: "/manus-storage/orig_purple_d4f41d87.webp",
      colorName: "Y2K Purple",
      colorClass: "bg-purple-400",
      features: [
        "360° Full Rotation Mechanism",
        "7-Color Backlit Keys (Mac-style layout)",
        "Precision Multi-touch Trackpad",
        "Hidden Magnetic Pencil Slot",
        "Shockproof Polycarbonate Protective Shell"
      ]
    },
    blue: {
      id: "blue",
      name: "Maceo Y2K Transparent Blue 360° Rotating Case",
      price: "$138.00",
      originalPrice: "$278.00",
      badge: "-50% OFF",
      image: "/manus-storage/orig_blue_1f9a69c7.webp",
      colorName: "Y2K Blue",
      colorClass: "bg-blue-400",
      features: [
        "360° Full Rotation Mechanism",
        "7-Color Backlit Keys (Mac-style layout)",
        "Precision Multi-touch Trackpad",
        "Hidden Magnetic Pencil Slot",
        "Shockproof Polycarbonate Protective Shell"
      ]
    },
    black: {
      id: "black",
      name: "Maceo Premium Transparent Black 360° Rotating Case",
      price: "$138.00",
      originalPrice: "$278.00",
      badge: "-50% OFF",
      image: "/manus-storage/orig_black_f6dd41bf.webp",
      colorName: "Stealth Black",
      colorClass: "bg-slate-900",
      features: [
        "360° Full Rotation Mechanism",
        "Elegant Stealth-Black Transparent Shell",
        "Precision Multi-touch Trackpad",
        "Hidden Magnetic Pencil Slot",
        "Sleek & Durable Executive Finish"
      ]
    },
    white: {
      id: "white",
      name: "Maceo Y2K Transparent White 360° Rotating Case",
      price: "$138.00",
      originalPrice: "$278.00",
      badge: "-50% OFF",
      image: "/manus-storage/orig_white_552f149a.webp",
      colorName: "Y2K White",
      colorClass: "bg-slate-100 border-slate-300",
      features: [
        "360° Full Rotation Mechanism",
        "7-Color Backlit Keys (Mac-style layout)",
        "Precision Multi-touch Trackpad",
        "Hidden Magnetic Pencil Slot",
        "Sleek Crystal-Clear Transparent Shell"
      ]
    }
  };

  const reviews: Review[] = [
    {
      id: "rev-1",
      name: "Sarah M.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      rating: 5,
      date: "May 12, 2026",
      title: "Absolutely obsessed with the Y2K Pink!",
      comment: "This keyboard case exceeded all my expectations. The 360 degree rotation is super smooth, and the keys feel so satisfying to type on. It literally turned my iPad into a beautiful transparent mini-laptop. Shipping was fast too!",
      verified: true,
      colorPurchased: "Y2K Pink"
    },
    {
      id: "rev-2",
      name: "David K.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      rating: 5,
      date: "April 28, 2026",
      title: "Perfect fit for iPad Pro 11\"",
      comment: "I was worried about compatibility, but the checker tool was spot on. Fits my 2024 iPad Pro 11-inch like a glove. The trackpad is highly responsive and supports all iPadOS multi-touch gestures. Highly recommended!",
      verified: true,
      colorPurchased: "Stealth Black"
    },
    {
      id: "rev-3",
      name: "Emily L.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      rating: 5,
      date: "May 03, 2026",
      title: "Stunning purple glow",
      comment: "The transparent purple design looks so retro and cool. The 7-color backlighting is bright and matches the aesthetic perfectly. I get compliments on it every time I work at a coffee shop. Battery life is amazing!",
      verified: true,
      colorPurchased: "Y2K Purple"
    },
    {
      id: "rev-4",
      name: "Marcus T.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      rating: 5,
      date: "May 19, 2026",
      title: "Great protection and utility",
      comment: "As an illustrator, the ability to rotate the iPad flat for drawing and then snap it up for typing notes is a lifesaver. The polycarbonate shell is very sturdy and keeps my Apple Pencil secure. Best accessory purchase this year.",
      verified: true,
      colorPurchased: "Y2K Blue"
    }
  ];

  const togglePlay = () => {
    const videoElement = document.getElementById("instagram-reel-player") as HTMLVideoElement;
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
        setIsPlaying(false);
      } else {
        videoElement.play().catch(console.error);
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    const videoElement = document.getElementById("instagram-reel-player") as HTMLVideoElement;
    if (videoElement) {
      videoElement.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const currentProduct = products[selectedColor];
  const checkoutProduct = products[checkoutColor];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Top Banner */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-xs font-semibold tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="h-3 w-3 animate-pulse" />
        <span>🔥 SPECIAL LAUNCH OFFER: 50% OFF ENDING SOON! 🔥</span>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              MACEO
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#products" className="hover:text-primary transition-colors">Shop</a>
            <a href="#benefits" className="hover:text-primary transition-colors">Why Maceo</a>
            <a href="#reviews" className="hover:text-primary transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
            <button onClick={() => setActiveModal("contact")} className="hover:text-primary transition-colors text-left font-medium">Contact Us</button>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Button onClick={openCheckout} size="sm" className="hidden md:inline-flex bg-primary hover:bg-primary/90 font-semibold shadow-lg shadow-primary/20">
              Buy Now
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 z-30 bg-background border-b border-border p-6 animate-in fade-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col gap-4 text-lg font-medium">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors py-2">Features</a>
            <a href="#products" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors py-2">Shop</a>
            <a href="#benefits" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors py-2">Why Maceo</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors py-2">Reviews</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors py-2">FAQ</a>
            <button onClick={() => { setMobileMenuOpen(false); setActiveModal("contact"); }} className="hover:text-primary transition-colors py-2 text-left">Contact Us</button>
            <Button onClick={() => { setMobileMenuOpen(false); openCheckout(); }} className="w-full bg-primary mt-4 py-6 text-base font-semibold">
              Buy Now - 50% OFF
            </Button>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="container grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6 text-center lg:text-left">
            <Badge className="w-fit mx-auto lg:mx-0 px-3 py-1 text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 border-none">
              ✨ 2026 Next-Gen iPad Keyboard Case
            </Badge>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Your iPad. <br />
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Unbounded.
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Meet the Maceo 360° Rotating Transparent iPad Case. Transform your tablet into a fully versatile workstation instantly. Rotate, type, draw, and protect with style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button onClick={openCheckout} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 rounded-full shadow-xl shadow-primary/25 text-base transition-all hover:scale-105 active:scale-95">
                Claim 50% Off Now
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-border/80 hover:bg-muted font-semibold px-8 py-6 text-base">
                <a href="#products">Explore Colors</a>
              </Button>
            </div>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/40 max-w-md mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start gap-1">
                <span className="text-xl font-bold font-display">50k+</span>
                <span className="text-xs text-muted-foreground">Happy Customers</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <span className="text-xl font-bold font-display">4.9★</span>
                <span className="text-xs text-muted-foreground">Average Rating</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <span className="text-xl font-bold font-display">100%</span>
                <span className="text-xs text-muted-foreground">Satisfaction Guard</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-3xl blur-3xl opacity-30 -z-10" />
            <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-2xl bg-card">
              <img 
                src="/manus-storage/orig_hero_9ef6b916.webp" 
                alt="Maceo Transparent 360 Degree Rotating iPad Keyboard Case Banner" 
                className="w-full object-cover aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/10]"
              />
              <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5">
                <Rotate3d className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                360° Rotating Feature Shown
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="py-20 bg-muted/20 border-y border-border/30">
        <div className="container max-w-4xl text-center">
          <div className="mb-12 flex flex-col gap-4">
            <Badge className="w-fit mx-auto px-3 py-1 text-xs font-semibold bg-primary/10 text-primary border-none">
              SEE IT IN ACTION
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Watch How It Transforms Your Workflow
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              A quick demonstration of the seamless 360° rotation, tactile backlit typing, and instant protection.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl bg-black aspect-video">
            <video 
              src="/manus-storage/orig_video_52cb8baf.mp4" 
              controls 
              className="w-full h-full object-cover"
              poster="/manus-storage/orig_hero_9ef6b916.webp"
            />
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="py-20 bg-muted/30 relative">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4">
            <Badge className="w-fit mx-auto px-3 py-1 text-xs font-semibold bg-primary/10 text-primary border-none">
              ENGINEERED FOR EXCELLENCE
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              A Keyboard Case That Feels Like a Laptop
            </h2>
            <p className="text-muted-foreground">
              We reimagined what an iPad case could be. Crafted with Y2K transparent aesthetic and state-of-the-art tech.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <Card className="border-border/50 bg-card/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-xl w-fit">
                  <Rotate3d className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">360° Full Rotation</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Smooth full-rotation hinge lets you switch effortlessly between typing, drawing, browsing, and video calls. Adapts to how you work throughout the day.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-border/50 bg-card/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl w-fit">
                  <Keyboard className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">7-Color Backlit Keys</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Comfortable typing in any lighting with 7 adjustable backlight colors. Responsive scissor-switch keys follow a Mac-style layout for quiet, precise typing.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-border/50 bg-card/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl w-fit">
                  <MousePointerClick className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Built-In Trackpad</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Navigate iPadOS precisely with the multi-touch trackpad. No external mouse needed, full laptop-like control at your fingertips.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Showcase & Purchase Section */}
      <section id="products" className="py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            
            {/* Product Image Viewer - STICKY ONLY ON DESKTOP (lg:sticky) to prevent mobile overlay bug */}
            <div className="lg:col-span-6 flex flex-col gap-6 lg:sticky lg:top-24">
              <div className="relative rounded-2xl overflow-hidden border border-border/80 shadow-xl bg-muted/30 p-8 flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
                <img 
                  src={currentProduct.image} 
                  alt={currentProduct.name} 
                  className="max-h-[350px] sm:max-h-[450px] w-auto object-contain transition-all duration-500 hover:scale-105"
                />
                <Badge className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white border-none font-bold px-3 py-1">
                  {currentProduct.badge}
                </Badge>
              </div>

              {/* Color Selectors */}
              <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold text-muted-foreground">CHOOSE YOUR TRANSPARENT COLOR:</span>
                <div className="flex flex-wrap gap-3">
                  {Object.values(products).map((product) => (
                    <button 
                      key={product.id}
                      onClick={() => setSelectedColor(product.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all ${
                        selectedColor === product.id 
                          ? "border-primary bg-primary/10 text-primary shadow-sm" 
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      <span className={`h-4.5 w-4.5 rounded-full border border-black/10 inline-block ${product.colorClass}`} />
                      {product.colorName}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Purchase Options Info */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">(1,482 verified reviews)</span>
                </div>
                <h2 className="text-3xl font-bold font-display tracking-tight leading-tight">
                  {currentProduct.name}
                </h2>
              </div>

              {/* Interactive Compatibility Checker Widget */}
              <div className="p-5 rounded-2xl border border-border/80 bg-card flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <span className="text-sm font-bold tracking-tight">Check iPad Compatibility</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Select your iPad model below to confirm compatibility instantly before purchasing.
                </p>
                
                <Select value={selectedModel} onValueChange={handleModelChange}>
                  <SelectTrigger className="w-full rounded-xl bg-background border-border/80">
                    <SelectValue placeholder="Select your iPad model..." />
                  </SelectTrigger>
                  <SelectContent>
                    {ipadModels.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {compatibilityResult.status !== "idle" && (
                  <div className={`p-4 rounded-xl border text-xs flex gap-3 animate-in fade-in duration-200 ${
                    compatibilityResult.status === "success" 
                      ? "bg-green-500/5 border-green-500/20 text-green-700 dark:text-green-300" 
                      : "bg-red-500/5 border-red-500/20 text-red-700 dark:text-red-300"
                  }`}>
                    {compatibilityResult.status === "success" ? (
                      <Check className="h-5 w-5 text-green-500 shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />
                    )}
                    <div className="flex flex-col gap-1">
                      <span className="font-bold">{compatibilityResult.message}</span>
                      <p className="leading-relaxed opacity-90">{compatibilityResult.details}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing Box */}
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col gap-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-extrabold text-primary font-display">{currentProduct.price}</span>
                  <span className="text-lg text-muted-foreground line-through">{currentProduct.originalPrice}</span>
                  <Badge className="bg-red-500 text-white hover:bg-red-500 border-none font-bold">SAVE 50% TODAY</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  *Price includes free shipping and 30-day money-back guarantee. No hidden fees.
                </p>
              </div>

              {/* Product Features Checklist */}
              <div className="flex flex-col gap-3">
                <span className="text-sm font-bold tracking-wide text-muted-foreground uppercase">What's Included:</span>
                <ul className="grid gap-2.5">
                  {currentProduct.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm">
                      <div className="mt-0.5 p-0.5 bg-green-500/10 text-green-500 rounded-full">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Main CTA Button */}
              <div className="flex flex-col gap-3 pt-4 border-t border-border/60">
                <Button onClick={openCheckout} size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold py-7 rounded-full shadow-xl shadow-primary/30 text-lg transition-all hover:scale-[1.02] active:scale-98">
                  BUY NOW - SECURE LINK <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <div className="flex justify-center gap-6 text-xs text-muted-foreground font-medium">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4 text-green-500" /> Secure Checkout
                  </span>
                  <span className="flex items-center gap-1">
                    <Truck className="h-4 w-4 text-blue-500" /> Free Global Shipping
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-purple-500" /> Ships within 24 Hours
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Guarantee & Benefits Section */}
      <section id="benefits" className="py-20 bg-muted/40 border-y border-border/40">
        <div className="container grid gap-12 md:grid-cols-3 text-center">
          <div className="flex flex-col items-center gap-4 p-4">
            <div className="p-4 bg-primary/10 text-primary rounded-full">
              <Truck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold font-display">Free Worldwide Shipping</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We ship to over 100 countries absolutely free. Tracking code provided with every single order.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 p-4">
            <div className="p-4 bg-purple-500/10 text-purple-500 rounded-full">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold font-display">30-Day Guarantee</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Not in love with your Maceo case? Send it back within 30 days for a full, hassle-free refund.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 p-4">
            <div className="p-4 bg-blue-500/10 text-blue-500 rounded-full">
              <Sparkles className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold font-display">Premium Quality</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Engineered with durable, impact-resistant polycarbonate to protect your device from any drops.
            </p>
          </div>
        </div>
      </section>

      {/* Customer Reviews & Video Showcase Section */}
      <section id="reviews" className="py-20 bg-muted/20 border-b border-border/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-4">
            <Badge className="w-fit mx-auto px-3 py-1 text-xs font-semibold bg-primary/10 text-primary border-none">
              REAL CUSTOMER VIDEO
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Loved by 50,000+ iPad Users
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="font-bold text-sm">4.9 out of 5 stars rating</span>
            </div>
          </div>

          {/* Instagram Reel Video Player Widget */}
          <div className="max-w-md mx-auto mb-16">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold flex items-center justify-center gap-2 text-muted-foreground">
                <Video className="h-5 w-5 text-primary" /> Live Instagram Review
              </h3>
            </div>
            <div className="relative rounded-3xl overflow-hidden border border-border shadow-2xl bg-black aspect-[9/16] max-h-[650px] mx-auto group">
              <video 
                id="instagram-reel-player"
                src="/manus-storage/instagram_reel_769bf75e.mp4" 
                loop
                playsInline
                muted={isMuted}
                className="w-full h-full object-cover cursor-pointer"
                onClick={togglePlay}
              />
              
              {/* Play/Pause Overlay */}
              {!isPlaying && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer transition-all"
                >
                  <div className="p-5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 scale-100 hover:scale-110 transition-all">
                    <Play className="h-10 w-10 fill-current" />
                  </div>
                </div>
              )}

              {/* Controls overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white z-10">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-primary flex items-center gap-1">
                    <UserCheck className="h-3.5 w-3.5" /> @maceo_official
                  </span>
                  <p className="text-xs opacity-90 drop-shadow">
                    "My favorite Y2K transparent case setup!"
                  </p>
                </div>
                
                <div className="flex gap-2">
                  {/* Mute button */}
                  <button 
                    onClick={toggleMute}
                    className="p-2.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 transition-all"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                  {/* Mini play button */}
                  <button 
                    onClick={togglePlay}
                    className="p-2.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 transition-all"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Individual Reviews Cards */}
          <div className="grid gap-8 md:grid-cols-2">
            {reviews.map((review) => (
              <Card key={review.id} className="border-border/60 bg-card hover:shadow-md transition-all duration-300">
                <CardContent className="p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-border">
                        <AvatarImage src={review.avatar} alt={review.name} />
                        <AvatarFallback>{review.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">{review.name}</span>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <span>Purchased:</span>
                          <span className="font-semibold text-primary">{review.colorPurchased}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-right">
                      <div className="flex text-yellow-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] text-muted-foreground">{review.date}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm">{review.title}</h4>
                      {review.verified && (
                        <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-none text-[10px] px-2 py-0 font-bold flex items-center gap-0.5">
                          <UserCheck className="h-3 w-3" /> Verified Buyer
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      "{review.comment}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary/5 border-b border-border/40">
        <div className="container max-w-2xl text-center flex flex-col gap-6">
          <h2 className="text-3xl font-bold font-display">Join the Maceo Club</h2>
          <p className="text-muted-foreground">
            Subscribe to receive product updates, exclusive deals, and get 10% off your next purchase instantly.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input 
              type="email" 
              placeholder="Enter your email address" 
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="rounded-full px-6 py-6 bg-background border-border/80 text-sm focus-visible:ring-primary"
            />
            <Button type="submit" className="rounded-full bg-primary hover:bg-primary/90 font-bold px-8 py-6">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="container max-w-3xl">
          <div className="text-center mb-12 flex flex-col gap-4">
            <Badge className="w-fit mx-auto px-3 py-1 text-xs font-semibold bg-primary/10 text-primary border-none">
              Got Questions?
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Everything you need to know about our Maceo premium keyboard cases.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-border/80">
              <AccordionTrigger className="text-left font-semibold text-base">
                1. How do I check which iPad model I have?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                You can find the model number printed on the back of your iPad. It starts with the letter 'A' followed by four digits (e.g., A2377). Check this number against our compatibility list on the checkout page to ensure a perfect fit.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-border/80">
              <AccordionTrigger className="text-left font-semibold text-base">
                2. How long does shipping take?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                Standard free shipping typically takes 7-12 business days depending on your location. We process and ship all orders within 24 hours. Once shipped, you will receive a tracking link via email.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-border/80">
              <AccordionTrigger className="text-left font-semibold text-base">
                3. Do you accept returns or exchanges?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                Yes! We offer a 30-day money-back guarantee. If you are not satisfied with your purchase, simply contact our support team to initiate a return or exchange.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-border/80">
              <AccordionTrigger className="text-left font-semibold text-base">
                4. Does the keyboard require Bluetooth pairing?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                Our classic 360° Rotating Series connects seamlessly via ultra-fast, low-latency Bluetooth. We also offer Touch-Connect models that attach directly to the iPad's Smart Connector with no pairing required.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-border/80">
              <AccordionTrigger className="text-left font-semibold text-base">
                5. How do I pair or connect the keyboard?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                Turn on the keyboard power switch. Press the connect key combination (Fn + C) to enter pairing mode. Open your iPad's Settings &gt; Bluetooth, and select "Maceo Keyboard" to connect instantly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 border-t border-border/60">
        <div className="container grid gap-8 md:grid-cols-4 text-sm">
          <div className="flex flex-col gap-4">
            <span className="font-display text-xl font-bold tracking-tight text-primary">
              MACEO
            </span>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Premium Y2K-inspired tech accessories built to elevate your daily digital experience. Designed for professionals, creators, and students.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-3 font-display text-xs tracking-wider uppercase">Shop</h4>
            <ul className="flex flex-col gap-2 text-muted-foreground text-xs">
              <li><a href="#products" className="hover:text-primary transition-colors">Y2K Transparent Pink</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Y2K Transparent Purple</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Stealth Transparent Black</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 font-display text-xs tracking-wider uppercase">Policies</h4>
            <ul className="flex flex-col gap-2 text-muted-foreground text-xs">
              <li><button onClick={() => setActiveModal("refund")} className="hover:text-primary transition-colors text-left">Refund Policy</button></li>
              <li><button onClick={() => setActiveModal("shipping")} className="hover:text-primary transition-colors text-left">Shipping Policy</button></li>
              <li><button onClick={() => setActiveModal("privacy")} className="hover:text-primary transition-colors text-left">Privacy Policy</button></li>
              <li><button onClick={() => setActiveModal("terms")} className="hover:text-primary transition-colors text-left">Terms of Service</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 font-display text-xs tracking-wider uppercase">Contact</h4>
            <ul className="flex flex-col gap-2 text-muted-foreground text-xs">
              <li><button onClick={() => setActiveModal("contact")} className="hover:text-primary transition-colors text-left">Contact Form</button></li>
              <li><a href="mailto:support@maceo-case.com" className="hover:text-primary transition-colors">support@maceo-case.com</a></li>
            </ul>
          </div>
        </div>
        <div className="container mt-8 pt-8 border-t border-border/40 text-center text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© 2026 Maceo. All rights reserved.</span>
          <div className="flex gap-4">
            <button onClick={() => setActiveModal("privacy")} className="hover:underline">Privacy</button>
            <button onClick={() => setActiveModal("terms")} className="hover:underline">Terms</button>
            <button onClick={() => setActiveModal("cookies-policy")} className="hover:underline">Cookies</button>
          </div>
        </div>
      </footer>

      {/* Floating Buy Now Button with Tooltip and soft pulse ring wrapper */}
      {showFloatingBtn && (
        <div className="fixed bottom-6 right-6 z-40 animate-in slide-in-from-bottom-10 duration-300">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative group">
                  {/* Pulse wave background ring */}
                  <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping opacity-75 pointer-events-none" style={{ animationDuration: '2.5s' }} />
                  <Button onClick={openCheckout} size="lg" className="relative bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold px-6 py-6 rounded-full shadow-2xl shadow-primary/40 flex items-center gap-2 border border-white/20 hover:scale-105 active:scale-95 transition-all">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Buy Now - 50% OFF</span>
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" align="center" className="bg-red-500 text-white border-none font-bold text-xs px-3 py-1.5 rounded-lg shadow-lg mb-2">
                Limited Offer
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}

      {/* Cookie Consent Notice */}
      {!cookieAccepted && (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50 p-6 rounded-2xl glass-panel-heavy border border-border shadow-2xl animate-in slide-in-from-bottom-5 duration-300 flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <h4 className="font-bold text-sm">We value your privacy</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" size="sm" onClick={acceptCookies} className="text-xs">
              Decline
            </Button>
            <Button size="sm" onClick={acceptCookies} className="bg-primary hover:bg-primary/90 text-xs font-bold">
              Accept All
            </Button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* REDESIGNED SECURE CHECKOUT MODAL (Stripe-Like, Responsive) */}
      {/* ======================================================== */}
      <Dialog open={activeModal === "checkout"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-4xl max-h-[92vh] md:max-h-[85vh] overflow-y-auto p-0 rounded-2xl border border-border bg-background shadow-2xl">
          <div className="grid md:grid-cols-12 h-full">
            
            {/* Left Column: Form Details (7 cols) */}
            <div className="md:col-span-7 p-6 sm:p-8 space-y-8">
              
              {/* Secure Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border/40">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400 font-bold tracking-wider uppercase">
                    <Lock className="h-3.5 w-3.5 stroke-[2.5]" /> Secure Checkout
                  </div>
                  <DialogTitle className="font-display text-2xl font-extrabold tracking-tight">Maceo Order Form</DialogTitle>
                </div>
              </div>

              <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                
                {/* Section 1: Product Setup */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">1</div>
                    <h3 className="text-sm font-bold tracking-tight">Customize Your Device</h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="checkout-color" className="text-xs font-semibold text-muted-foreground">Select Color</Label>
                      <Select value={checkoutColor} onValueChange={setCheckoutColor}>
                        <SelectTrigger id="checkout-color" className="rounded-xl bg-background border-border/80 text-xs h-12 focus:ring-primary">
                          <SelectValue placeholder="Select Color" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(products).map((p) => (
                            <SelectItem key={p.id} value={p.id} className="text-xs">
                              {p.colorName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="checkout-model" className="text-xs font-semibold text-muted-foreground">iPad Model</Label>
                      <Select value={checkoutModel} onValueChange={setCheckoutModel}>
                        <SelectTrigger id="checkout-model" className="rounded-xl bg-background border-border/80 text-xs h-12 focus:ring-primary">
                          <SelectValue placeholder="Select iPad Model" />
                        </SelectTrigger>
                        <SelectContent>
                          {ipadModels.filter(m => m.compatible).map((m) => (
                            <SelectItem key={m.id} value={m.id} className="text-xs">
                              {m.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Section 2: Shipping details */}
                <div className="space-y-4 pt-4 border-t border-border/40">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">2</div>
                    <h3 className="text-sm font-bold tracking-tight">Shipping Information</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="shipping-name" className="text-xs font-semibold text-muted-foreground">Full Name</Label>
                      <Input 
                        id="shipping-name" 
                        placeholder="John Doe" 
                        value={shippingName} 
                        onChange={(e) => setShippingName(e.target.value)}
                        className="rounded-xl h-12 text-xs border-border/80 focus-visible:ring-primary"
                        required
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="shipping-email" className="text-xs font-semibold text-muted-foreground">Email Address</Label>
                        <Input 
                          id="shipping-email" 
                          type="email" 
                          placeholder="john@example.com" 
                          value={shippingEmail} 
                          onChange={(e) => setShippingEmail(e.target.value)}
                          className="rounded-xl h-12 text-xs border-border/80 focus-visible:ring-primary"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shipping-phone" className="text-xs font-semibold text-muted-foreground">Phone Number</Label>
                        <Input 
                          id="shipping-phone" 
                          type="tel" 
                          placeholder="+1 (555) 000-0000" 
                          value={shippingPhone} 
                          onChange={(e) => setShippingPhone(e.target.value)}
                          className="rounded-xl h-12 text-xs border-border/80 focus-visible:ring-primary"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shipping-address" className="text-xs font-semibold text-muted-foreground">Street Address</Label>
                      <Input 
                        id="shipping-address" 
                        placeholder="123 Tech Avenue, Apt 4B" 
                        value={shippingAddress} 
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="rounded-xl h-12 text-xs border-border/80 focus-visible:ring-primary"
                        required
                      />
                    </div>

                    <div className="grid gap-4 grid-cols-3">
                      <div className="space-y-2 col-span-1">
                        <Label htmlFor="shipping-city" className="text-xs font-semibold text-muted-foreground">City</Label>
                        <Input 
                          id="shipping-city" 
                          placeholder="New York" 
                          value={shippingCity} 
                          onChange={(e) => setShippingCity(e.target.value)}
                          className="rounded-xl h-12 text-xs border-border/80 focus-visible:ring-primary"
                          required
                        />
                      </div>
                      <div className="space-y-2 col-span-1">
                        <Label htmlFor="shipping-zip" className="text-xs font-semibold text-muted-foreground">ZIP Code</Label>
                        <Input 
                          id="shipping-zip" 
                          placeholder="10001" 
                          value={shippingZip} 
                          onChange={(e) => setShippingAddressZip(e.target.value)}
                          className="rounded-xl h-12 text-xs border-border/80 focus-visible:ring-primary"
                          required
                        />
                      </div>
                      <div className="space-y-2 col-span-1">
                        <Label htmlFor="shipping-country" className="text-xs font-semibold text-muted-foreground">Country</Label>
                        <Input 
                          id="shipping-country" 
                          placeholder="United States" 
                          value={shippingCountry} 
                          onChange={(e) => setShippingCountry(e.target.value)}
                          className="rounded-xl h-12 text-xs border-border/80 focus-visible:ring-primary"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit & Secure Payment Button */}
                <div className="pt-6 space-y-4">
                  <Button 
                    type="submit" 
                    disabled={checkoutSubmitting} 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold py-7 rounded-full shadow-xl shadow-primary/20 text-sm transition-all hover:scale-[1.01]"
                  >
                    {checkoutSubmitting ? (
                      "Saving Details..."
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Proceed to Secure Payment <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                  
                  {/* Trust Info */}
                  <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10 text-center flex flex-col gap-1 items-center">
                    <span className="text-[10px] text-green-700 dark:text-green-300 font-extrabold flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4" /> 100% SECURE 256-BIT SSL ENCRYPTED GATEWAY
                    </span>
                    <p className="text-[9px] text-muted-foreground max-w-sm">
                      We securely accept all credit/debit cards, Apple Pay, and Google Pay. Your details are processed safely and will never be shared.
                    </p>
                  </div>
                </div>

              </form>
            </div>

            {/* Right Column: Order Summary (5 cols) */}
            <div className="md:col-span-5 bg-muted/30 p-6 sm:p-8 border-t md:border-t-0 md:border-l border-border/40 flex flex-col justify-between">
              <div className="space-y-6">
                <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase block">Order Summary</span>
                
                {/* Premium Product Summary Card */}
                <div className="p-4 bg-background rounded-2xl border border-border/60 shadow-sm space-y-4">
                  <div className="h-40 bg-muted/40 rounded-xl p-4 flex items-center justify-center">
                    <img 
                      src={checkoutProduct.image} 
                      alt={checkoutProduct.name} 
                      className="max-h-full max-w-full object-contain transition-all duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-extrabold leading-tight block text-foreground">{checkoutProduct.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-primary font-extrabold">$138.00</span>
                      <span className="text-xs text-muted-foreground line-through">$278.00</span>
                      <Badge className="bg-red-500 text-white text-[9px] px-1.5 py-0 font-bold border-none">
                        50% OFF
                      </Badge>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <Badge className="bg-primary/10 text-primary border-none text-[10px] font-bold px-2 py-0.5">
                        {checkoutProduct.colorName}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] font-bold px-2 py-0.5 border-border/80">
                        11" Case
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 text-xs pt-4 border-t border-border/40">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-semibold text-foreground">$138.00</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="font-bold text-green-500">FREE</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span>
                    <span className="font-semibold text-foreground">$0.00</span>
                  </div>
                  <div className="pt-3 border-t border-border/40 flex justify-between text-sm font-bold">
                    <span>Total Amount</span>
                    <span className="text-primary text-lg font-extrabold">$138.00</span>
                  </div>
                </div>
              </div>

              {/* Secure guarantees list */}
              <div className="mt-8 pt-6 border-t border-border/40 space-y-4">
                <div className="flex items-start gap-3 text-[10px] text-muted-foreground leading-relaxed">
                  <Truck className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <span className="font-bold block text-foreground">Free Global Shipping</span>
                    Dispatched within 24 hours. Full tracking code sent via email.
                  </div>
                </div>
                <div className="flex items-start gap-3 text-[10px] text-muted-foreground leading-relaxed">
                  <ShieldCheck className="h-5 w-5 text-purple-500 shrink-0" />
                  <div>
                    <span className="font-bold block text-foreground">30-Day Money-Back Guarantee</span>
                    If you are not 100% satisfied, returns are completely free.
                  </div>
                </div>
              </div>

            </div>

          </div>
        </DialogContent>
      </Dialog>

      {/* Refund Policy Modal */}
      <Dialog open={activeModal === "refund"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold">Refund Policy</DialogTitle>
            <DialogDescription>Our commitment to your satisfaction.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-4">
            <p><strong>30-Day Money-Back Guarantee</strong></p>
            <p>We want you to be absolutely in love with your Maceo purchase. If you are not completely satisfied, you can return your item(s) within 30 days of delivery for a full refund or exchange.</p>
            <p><strong>Eligibility for Returns</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Items must be returned in their original packaging with all included accessories (cables, manuals, etc.).</li>
              <li>Items must show no signs of physical abuse, water damage, or extreme wear.</li>
            </ul>
            <p><strong>How to Initiate a Return</strong></p>
            <p>Simply contact our 24/7 support team via our Contact Form or email us at <strong>support@maceo-case.com</strong> with your order number. We will provide you with a pre-paid return shipping label and instructions on where to send your package.</p>
            <p><strong>Refund Processing</strong></p>
            <p>Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days.</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Shipping Policy Modal */}
      <Dialog open={activeModal === "shipping"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold">Shipping Policy</DialogTitle>
            <DialogDescription>Reliable, fast, and free global delivery.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-4">
            <p><strong>Free Worldwide Shipping</strong></p>
            <p>We are proud to offer free standard shipping on all orders to over 100 countries worldwide. No minimum purchase required.</p>
            <p><strong>Processing Times</strong></p>
            <p>All orders are processed, packed, and dispatched within 24 hours of payment verification (excluding weekends and holidays). Once shipped, you will automatically receive a tracking link via email.</p>
            <p><strong>Delivery Times</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>United States & Canada:</strong> 7 - 10 business days</li>
              <li><strong>United Kingdom & Europe:</strong> 7 - 12 business days</li>
              <li><strong>Australia & New Zealand:</strong> 8 - 12 business days</li>
              <li><strong>Other International:</strong> 10 - 15 business days</li>
            </ul>
            <p><strong>Tracking Your Order</strong></p>
            <p>Every single package is fully trackable. Your tracking link will update as soon as the package reaches the carrier's sorting facility. If you do not receive your tracking code within 48 hours, please contact us.</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Privacy Policy Modal */}
      <Dialog open={activeModal === "privacy"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold">Privacy Policy</DialogTitle>
            <DialogDescription>How we collect, protect, and use your data.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-4">
            <p><strong>Information We Collect</strong></p>
            <p>We collect information you provide directly to us when making a purchase, subscribing to our newsletter, or contacting us. This includes your name, email address, billing address, and shipping address.</p>
            <p><strong>Payment Security</strong></p>
            <p>All transactions are processed through secure, encrypted payment gateways. We never store or have access to your raw credit card details or financial information.</p>
            <p><strong>How We Use Your Information</strong></p>
            <p>We use your information to fulfill orders, process payments, arrange shipping, send tracking details, and respond to support inquiries. If you opt-in to our newsletter, we may also send you promotional updates.</p>
            <p><strong>Third-Party Sharing</strong></p>
            <p>We do not sell, trade, or transfer your personal data to outside parties, except for trusted third parties who assist us in operating our website, conducting our business, or shipping your order (such as Shopify and DHL/FedEx).</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Terms of Service Modal */}
      <Dialog open={activeModal === "terms"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold">Terms of Service</DialogTitle>
            <DialogDescription>Rules and guidelines for using our website.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-4">
            <p><strong>Agreement to Terms</strong></p>
            <p>By accessing and using this website, you agree to comply with and be bound by these Terms of Service. If you do not agree, please do not use our services.</p>
            <p><strong>Product Accuracy</strong></p>
            <p>We strive to display our product colors and features as accurately as possible. However, actual colors may vary slightly depending on your device's screen calibration.</p>
            <p><strong>Pricing and Orders</strong></p>
            <p>We reserve the right to change prices, cancel orders, or limit quantities at our sole discretion. In the event of a cancellation, we will immediately issue a full refund to your original payment method.</p>
            <p><strong>Limitation of Liability</strong></p>
            <p>Maceo shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our products or website.</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cookies Policy Modal */}
      <Dialog open={activeModal === "cookies-policy"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold">Cookies Policy</DialogTitle>
            <DialogDescription>Detailed information about how we use cookies.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-4">
            <p><strong>What Are Cookies?</strong></p>
            <p>Cookies are small text files placed on your device to collect standard internet log and visitor behavior information. They help us understand how you use our site and improve your experience.</p>
            <p><strong>How We Use Cookies</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Essential Cookies:</strong> Required for core site functions, such as keeping track of your selected product color and shopping cart state.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand which sections of our landing page are most popular and where users spend their time.</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver Google Ads that are relevant to your interests and measure the effectiveness of our campaigns.</li>
            </ul>
            <p><strong>Managing Cookies</strong></p>
            <p>You can set your browser to not accept cookies, or clear them entirely. However, some features of our website may not function correctly as a result.</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Form Modal */}
      <Dialog open={activeModal === "contact"} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" /> Contact Us
            </DialogTitle>
            <DialogDescription>Have a question? Send us a message and we'll reply shortly.</DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleContactSubmit} className="space-y-4 mt-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="John Doe" 
                value={contactName} 
                onChange={(e) => setContactName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="john@example.com" 
                value={contactEmail} 
                onChange={(e) => setContactEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message">Your Message</Label>
              <Textarea 
                id="message" 
                placeholder="How can we help you today? Please include your order number if applicable." 
                rows={4}
                value={contactMessage} 
                onChange={(e) => setContactMessage(e.target.value)}
                required
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full bg-primary font-bold py-5">
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border/60 text-xs text-muted-foreground flex flex-col gap-2">
            <span className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> support@maceo-case.com</span>
            <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> 24/7 Global Support Team</span>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
