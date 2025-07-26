import { Button } from "@/components/ui/button";
import { Plane, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Plane className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">MiniNeeds</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Find Supplies
            </Link>
            <Link 
              to="/request" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/request') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Request Location
            </Link>
            <Button size="sm">
              Find a Location
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t">
            <Link 
              to="/" 
              className={`block px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/') ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Find Supplies
            </Link>
            <Link 
              to="/request" 
              className={`block px-3 py-2 text-sm font-medium transition-colors ${
                isActive('/request') ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Request Location
            </Link>
            <div className="px-3">
              <Button size="sm" className="w-full">
                Find a Location
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;