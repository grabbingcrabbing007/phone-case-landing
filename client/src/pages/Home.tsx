import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
  X
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const PURCHASE_LINK = "https://jim.com/a/jim_maceo-j-jr-jr-loving";

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  badge: string;
  image: string;
  features: string[];
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [cookieAccepted, setCookieNotice] = useState<boolean>(true);
  const [selectedColor, setSelectedColor] = useState<string>("pink");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Load cookie preference
  useEffect(() => {
    const accepted = localStorage.getItem("cookie_accepted");
    if (!accepted) {
      setCookieNotice(false);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_accepted", "true");
    setCookieNotice(true);
  };

  const products: Record<string, Product> = {
    pink: {
      id: "pink",
      name: "Maceo Y2K Transparent Pink 360° Rotating Case",
      price: "$139.00",
      originalPrice: "$278.00",
      badge: "-50% OFF",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663502537605/Qyzy3RyvqHf3UccjmEyF6N/maceo_pink_case-32tX8tz28WND3zKNb2cuh7.webp",
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
      price: "$139.00",
      originalPrice: "$278.00",
      badge: "-50% OFF",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663502537605/Qyzy3RyvqHf3UccjmEyF6N/maceo_purple_case-U58xYp6vLVD4hPdaxV3ZXv.webp",
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
      price: "$139.00",
      originalPrice: "$278.00",
      badge: "-50% OFF",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663502537605/Qyzy3RyvqHf3UccjmEyF6N/maceo_black_case-2Xe7GEV5Bj8hBAE4EbDbNq.webp",
      features: [
        "360° Full Rotation Mechanism",
        "Elegant Stealth-Black Transparent Shell",
        "Precision Multi-touch Trackpad",
        "Hidden Magnetic Pencil Slot",
        "Sleek & Durable Executive Finish"
      ]
    }
  };

  const currentProduct = products[selectedColor];

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
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Button asChild size="sm" className="hidden md:inline-flex bg-primary hover:bg-primary/90 font-semibold shadow-lg shadow-primary/20">
              <a href={PURCHASE_LINK} target="_blank" rel="noopener noreferrer">
                Buy Now
              </a>
            </Button>
            <button 
              className="md:hidden p-2" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
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
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-primary transition-colors py-2">FAQ</a>
            <Button asChild className="w-full bg-primary mt-4 py-6 text-base font-semibold">
              <a href={PURCHASE_LINK} target="_blank" rel="noopener noreferrer">
                Buy Now - 50% OFF
              </a>
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
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 rounded-full shadow-xl shadow-primary/25 text-base transition-all hover:scale-105 active:scale-95">
                <a href={PURCHASE_LINK} target="_blank" rel="noopener noreferrer">
                  Claim 50% Off Now
                </a>
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
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663502537605/Qyzy3RyvqHf3UccjmEyF6N/maceo_hero_banner-NmZvszWdGWKtXKYJYAEVpc.webp" 
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
            
            {/* Product Image Viewer */}
            <div className="lg:col-span-6 flex flex-col gap-6 sticky top-24">
              <div className="relative rounded-2xl overflow-hidden border border-border/80 shadow-xl bg-card">
                <img 
                  src={currentProduct.image} 
                  alt={currentProduct.name} 
                  className="w-full object-cover aspect-[4/3] transition-all duration-500"
                />
                <Badge className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white border-none font-bold px-3 py-1">
                  {currentProduct.badge}
                </Badge>
              </div>

              {/* Color Selectors */}
              <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold text-muted-foreground">CHOOSE YOUR TRANSPARENT COLOR:</span>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setSelectedColor("pink")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all ${
                      selectedColor === "pink" 
                        ? "border-primary bg-primary/10 text-primary shadow-sm" 
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <span className="h-4.5 w-4.5 rounded-full bg-pink-400 border border-black/10 inline-block" />
                    Y2K Pink
                  </button>
                  <button 
                    onClick={() => setSelectedColor("purple")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all ${
                      selectedColor === "purple" 
                        ? "border-purple-500 bg-purple-500/10 text-purple-500 shadow-sm" 
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <span className="h-4.5 w-4.5 rounded-full bg-purple-400 border border-black/10 inline-block" />
                    Y2K Purple
                  </button>
                  <button 
                    onClick={() => setSelectedColor("black")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all ${
                      selectedColor === "black" 
                        ? "border-slate-800 bg-slate-800/10 text-slate-800 dark:text-slate-200 dark:border-slate-200 shadow-sm" 
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <span className="h-4.5 w-4.5 rounded-full bg-slate-900 border border-black/10 inline-block" />
                    Stealth Black
                  </button>
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
                <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold py-7 rounded-full shadow-xl shadow-primary/30 text-lg transition-all hover:scale-[1.02] active:scale-98">
                  <a href={PURCHASE_LINK} target="_blank" rel="noopener noreferrer">
                    BUY NOW - SECURE LINK <ChevronRight className="ml-2 h-5 w-5" />
                  </a>
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
              <li><a href="#faq" className="hover:text-primary transition-colors">Refund Policy</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">Shipping Policy</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3 font-display text-xs tracking-wider uppercase">Contact</h4>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Have questions or need assistance? Reach out to our 24/7 support team at: <br />
              <strong className="text-foreground">support@maceo-case.com</strong>
            </p>
          </div>
        </div>
        <div className="container mt-8 pt-8 border-t border-border/40 text-center text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© 2026 Maceo. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#faq" className="hover:underline">Privacy</a>
            <a href="#faq" className="hover:underline">Terms</a>
            <a href="#faq" className="hover:underline">Cookies</a>
          </div>
        </div>
      </footer>

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
    </div>
  );
}
