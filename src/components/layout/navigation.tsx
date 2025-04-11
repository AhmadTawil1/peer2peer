import { Link, useLocation } from "react-router-dom";
import { Home, Search, PlusCircle, User } from "lucide-react";

export function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Browse", path: "/feed" },
    { icon: PlusCircle, label: "Ask", path: "/ask" },
    { icon: User, label: "Profile", path: "/profile" },
  ];
  
  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path === "/feed" && location.pathname === "/feed") return true;
    if (path === "/ask" && location.pathname === "/") return true;
    if (path === "/profile" && location.pathname === "/profile") return true;
    return false;
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.label}
                to={item.path === "/ask" ? "/" : item.path}
                className={`flex flex-col items-center py-3 px-2 ${
                  active ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <item.icon size={20} />
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}