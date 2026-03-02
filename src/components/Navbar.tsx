import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  {
    label: "Product",
    children: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Use Cases", href: "/use-cases" },
      { label: "Interactive Demo", href: "/demo" },
    ],
  },
  {
    label: "Solutions",
    children: [
      { label: "ROI Calculator", href: "/roi-calculator" },
      { label: "Pricing", href: "/pricing" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Open Source", href: "/open-source" },
      { label: "About", href: "/about" },
    ],
  },
  { label: "For Investors", href: "/investors" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="text-primary-foreground font-heading font-bold text-xl tracking-tight">
          SENSO
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
                <button className="flex items-center gap-1 px-4 py-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {item.label}
                  <ChevronDown className="w-3 h-3" />
                </button>
                <AnimatePresence>
                  {openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-48 bg-card rounded-lg shadow-xl border border-border overflow-hidden"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-4 py-3 text-sm text-card-foreground hover:bg-secondary transition-colors"
                        >
                          {child.label}
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
                className="px-4 py-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
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
          className="lg:hidden text-primary-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-primary border-t border-primary-foreground/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <p className="text-xs uppercase tracking-wider text-primary-foreground/50 px-2 pt-2">{item.label}</p>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block px-2 py-2 text-sm text-primary-foreground/80 hover:text-primary-foreground"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href!}
                    className="block px-2 py-2 text-sm text-primary-foreground/80 hover:text-primary-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <Link to="/contact" onClick={() => setMobileOpen(false)}>
                <Button variant="teal" className="w-full mt-2">Request Pilot</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
