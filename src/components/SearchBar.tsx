import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";
import { usePopularAirports } from "@/hooks/usePopularAirports";
  
interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ 
  onSearch, 
  placeholder = "Enter airport name or code (e.g., JFK, LAX)", 
  className = "" 
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const { airports, loading: airportsLoading } = usePopularAirports(8);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-base"
            list="airports"
          />
          <datalist id="airports">
            {!airportsLoading && airports.map((airport) => (
              <option key={airport.airport_code} value={`${airport.airport_code} - ${airport.airport_name}`} />
            ))}
          </datalist>
        </div>
        <Button type="submit" size="lg" className="h-12 px-8">
          <Search className="mr-2 h-5 w-5" />
          Find Supplies
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;