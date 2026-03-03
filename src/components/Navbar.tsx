import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Product",
    children: [
      { label: "How It Works", href: "/how-it-works", desc: "Multi-agent architecture" },
      { label: "Use Cases", href: "/use-cases", desc: "Real production scenarios" },
      { label: "Interactive Demo", href: "/demo", desc: "Try SENSO live" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "For Investors", href: "/investors" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-navy-deep/95 backdrop-blur-xl shadow-lg shadow-navy-deep/20"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between h-[72px] px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-teal flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-sm">S</span>
          </div>
          <span className="text-primary-foreground font-heading font-bold text-xl tracking-tight">
            SENSO
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="flex items-center gap-1.5 px-4 py-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors rounded-lg hover:bg-primary-foreground/5">
                  {item.label}
                  <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                </button>
                <AnimatePresence>
                  {openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-card rounded-xl shadow-elevated border border-border overflow-hidden"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="flex flex-col px-4 py-3 hover:bg-secondary transition-colors"
                        >
                          <span className="text-sm font-medium text-card-foreground">{child.label}</span>
                          <span className="text-xs text-muted-foreground mt-0.5">{child.desc}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.href!}
                className="px-4 py-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors rounded-lg hover:bg-primary-foreground/5"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden lg:block">
          <Link to="/contact">
            <Button variant="teal" size="sm">Request Pilot</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-primary-foreground p-2 rounded-lg hover:bg-primary-foreground/5"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-navy-deep/98 backdrop-blur-xl border-t border-primary-foreground/5 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.label} className="space-y-1">
                    <p className="text-[11px] uppercase tracking-[0.15em] text-primary-foreground/30 font-semibold mb-2">{item.label}</p>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block px-3 py-2 text-sm text-primary-foreground/70 hover:text-primary-foreground rounded-lg hover:bg-primary-foreground/5"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href!}
                    className="block px-3 py-2 text-sm text-primary-foreground/70 hover:text-primary-foreground rounded-lg hover:bg-primary-foreground/5"
                  >
                    {item.label}
                  </Link>
                )
              )}
              <Link to="/contact">
                <Button variant="teal" className="w-full mt-3">Request Pilot</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
