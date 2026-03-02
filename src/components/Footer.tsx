import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
      <div className="bg-accent py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-accent-foreground mb-4">
            Ready to see what your organization is hiding?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/contact">
              <Button variant="default" size="lg">Request Pilot</Button>
            </Link>
            <Link to="/investors">
              <Button variant="hero-ghost" size="lg" className="border-accent-foreground/30 text-accent-foreground">
                Schedule Investor Call
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-primary-foreground font-heading font-bold text-lg mb-4">SENSO</h3>
              <p className="text-primary-foreground/60 text-sm leading-relaxed">
                Multi-Agent Organizational Intelligence Platform
              </p>
            </div>
            {footerLinks.map((group) => (
              <div key={group.title}>
                <h4 className="text-primary-foreground/80 font-semibold text-sm uppercase tracking-wider mb-4">
                  {group.title}
                </h4>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-primary-foreground/50 text-sm hover:text-primary-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center">
            <p className="text-primary-foreground/40 text-sm">
              © {new Date().getFullYear()} SENSO. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
