import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Use Cases", href: "/use-cases" },
      { label: "Interactive Demo", href: "/demo" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Open Source", href: "/open-source" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "For Investors", href: "/investors" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer>
      {/* CTA Band */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-teal/5" />
        <div className="absolute top-0 left-1/3 w-[600px] h-[300px] rounded-full bg-teal/5 blur-[100px]" />

        <div className="relative container mx-auto px-6 py-20 text-center">
          <h2 className="text-headline md:text-display-sm text-primary-foreground mb-4">
            Ready to see what your
            <br />
            organization is hiding?
          </h2>
          <p className="text-body-lg text-primary-foreground/50 mb-10 max-w-xl mx-auto">
            Join the executives who chose visibility over assumptions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="hero" size="lg" className="group">
                Request Pilot
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/investors">
              <Button variant="hero-ghost" size="lg">
                Schedule Investor Call
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="bg-navy-deep py-14 border-t border-primary-foreground/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-md bg-gradient-teal flex items-center justify-center">
                  <span className="text-accent-foreground font-bold text-xs">S</span>
                </div>
                <span className="text-primary-foreground font-heading font-bold text-lg">SENSO</span>
              </div>
              <p className="text-primary-foreground/35 text-sm leading-relaxed">
                Multi-Agent Organizational Intelligence Platform
              </p>
            </div>
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h4 className="text-primary-foreground/50 font-semibold text-xs uppercase tracking-[0.15em] mb-5">
                  {group.title}
                </h4>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-primary-foreground/35 text-sm hover:text-primary-foreground/70 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-primary-foreground/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/25 text-sm">
              © {new Date().getFullYear()} SENSO. All rights reserved.
            </p>
            <p className="text-primary-foreground/25 text-xs">
              eugene@aiworkforceos.org
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
