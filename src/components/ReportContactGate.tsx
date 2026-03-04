import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2, FileDown, Mail } from "lucide-react";

type ContactData = {
  name: string;
  email: string;
  company: string;
  phone: string;
};

const EMPTY: ContactData = { name: "", email: "", company: "", phone: "" };

interface ReportContactGateProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ContactData) => void;
}

export default function ReportContactGate({ open, onClose, onSubmit }: ReportContactGateProps) {
  const [form, setForm] = useState<ContactData>(EMPTY);
  const [errors, setErrors] = useState<Partial<ContactData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const e: Partial<ContactData> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.company.trim()) e.company = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleField(field: keyof ContactData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    // Send to Formspree
    try {
      await fetch("https://formspree.io/f/xwvngvge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          phone: form.phone,
          source: "Diagnostic Booth Report",
        }),
      });
    } catch {
      // Continue even if Formspree fails — still give the report
    }

    setSubmitting(false);
    setSubmitted(true);

    // Trigger download after short delay
    setTimeout(() => {
      onSubmit(form);
    }, 1800);
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setForm(EMPTY);
      setErrors({});
      setSubmitted(false);
    }, 300);
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="sm:max-w-[480px] bg-card border-border/50 p-0 overflow-hidden backdrop-blur-xl">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center px-8 py-14 gap-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <CheckCircle2 className="w-14 h-14 text-accent" strokeWidth={1.5} />
              </motion.div>
              <h3 className="text-lg font-heading font-bold text-foreground mt-1">
                Report is on its way!
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                We'll send the full diagnostic report to{" "}
                <span className="text-foreground font-medium">{form.email}</span>.
                <br />Your PDF is downloading now.
              </p>
              <div className="flex items-center gap-2 text-accent text-xs mt-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Generating PDF...
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Gradient stripe */}
              <div className="h-1 w-full bg-gradient-to-r from-accent via-accent/60 to-transparent" />

              <div className="px-6 pt-6 pb-2">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <FileDown className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-foreground">
                      Get Your Action Plan
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Enter your details to receive the full diagnostic report
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="px-6 py-4 space-y-3.5">
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <Label htmlFor="rg-name" className="text-xs font-medium text-foreground/70">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="rg-name"
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={(e) => handleField("name", e.target.value)}
                        className={`bg-muted/30 border-border/40 ${errors.name ? "border-destructive" : ""}`}
                      />
                      {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="rg-email" className="text-xs font-medium text-foreground/70">
                        Work Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="rg-email"
                        type="email"
                        placeholder="jane@company.com"
                        value={form.email}
                        onChange={(e) => handleField("email", e.target.value)}
                        className={`bg-muted/30 border-border/40 ${errors.email ? "border-destructive" : ""}`}
                      />
                      {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <Label htmlFor="rg-company" className="text-xs font-medium text-foreground/70">
                        Company <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="rg-company"
                        placeholder="Acme Corp"
                        value={form.company}
                        onChange={(e) => handleField("company", e.target.value)}
                        className={`bg-muted/30 border-border/40 ${errors.company ? "border-destructive" : ""}`}
                      />
                      {errors.company && <p className="text-destructive text-xs">{errors.company}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="rg-phone" className="text-xs font-medium text-foreground/70">
                        Phone <span className="text-muted-foreground font-normal">(optional)</span>
                      </Label>
                      <Input
                        id="rg-phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={form.phone}
                        onChange={(e) => handleField("phone", e.target.value)}
                        className="bg-muted/30 border-border/40"
                      />
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 flex items-center justify-between gap-4 pt-2">
                  <p className="text-[10px] text-muted-foreground leading-relaxed max-w-[200px]">
                    We'll send the report to your email. No spam — ever.
                  </p>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-11 px-6 rounded-xl shadow-lg shadow-accent/15 shrink-0 group"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Send & Download
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
