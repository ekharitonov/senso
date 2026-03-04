import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { useContactModal } from "@/context/ContactModalContext";

type FormData = {
  name: string;
  email: string;
  company: string;
  size: string;
  role: string;
  message: string;
};

const EMPTY: FormData = { name: "", email: "", company: "", size: "", role: "", message: "" };

export default function ContactModal() {
  const { isOpen, close } = useContactModal();
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.company.trim()) e.company = "Required";
    if (!form.size) e.size = "Required";
    if (!form.role) e.role = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleField(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200)); // placeholder for real API call
    setSubmitting(false);
    setSubmitted(true);
  }

  function handleClose() {
    close();
    setTimeout(() => {
      setForm(EMPTY);
      setErrors({});
      setSubmitted(false);
    }, 300);
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[520px] bg-background border-border p-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center text-center px-8 py-16 gap-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              >
                <CheckCircle2 className="w-16 h-16 text-teal" strokeWidth={1.5} />
              </motion.div>
              <motion.h3
                className="text-xl font-heading font-bold text-foreground mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                Request received
              </motion.h3>
              <motion.p
                className="text-muted-foreground text-sm leading-relaxed max-w-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                We'll reach out to <span className="text-foreground font-medium">{form.email}</span> within 24 hours to schedule your briefing.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-4"
              >
                <Button variant="teal" onClick={handleClose}>
                  Done
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header gradient stripe */}
              <div className="h-1 w-full bg-gradient-teal" />

              <div className="px-6 pt-6 pb-2">
                <DialogHeader>
                  <DialogTitle className="text-xl font-heading font-bold text-foreground">
                    Request a Pilot
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tell us about your organization. We'll reach out within 24 hours.
                  </p>
                </DialogHeader>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="px-6 py-4 space-y-4">
                  {/* Name + Email */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="cf-name" className="text-xs font-medium">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="cf-name"
                        placeholder="Jane Smith"
                        value={form.name}
                        onChange={(e) => handleField("name", e.target.value)}
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && <p className="text-destructive text-xs">{errors.name}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="cf-email" className="text-xs font-medium">
                        Work Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="cf-email"
                        type="email"
                        placeholder="jane@company.com"
                        value={form.email}
                        onChange={(e) => handleField("email", e.target.value)}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && <p className="text-destructive text-xs">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Company */}
                  <div className="space-y-1.5">
                    <Label htmlFor="cf-company" className="text-xs font-medium">
                      Company <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="cf-company"
                      placeholder="Acme Corp"
                      value={form.company}
                      onChange={(e) => handleField("company", e.target.value)}
                      className={errors.company ? "border-destructive" : ""}
                    />
                    {errors.company && <p className="text-destructive text-xs">{errors.company}</p>}
                  </div>

                  {/* Size + Role */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium">
                        Company Size <span className="text-destructive">*</span>
                      </Label>
                      <Select value={form.size} onValueChange={(v) => handleField("size", v)}>
                        <SelectTrigger className={errors.size ? "border-destructive" : ""}>
                          <SelectValue placeholder="Employees" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50-200">50 – 200</SelectItem>
                          <SelectItem value="200-1000">200 – 1,000</SelectItem>
                          <SelectItem value="1000-5000">1,000 – 5,000</SelectItem>
                          <SelectItem value="5000+">5,000+</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.size && <p className="text-destructive text-xs">{errors.size}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium">
                        Your Role <span className="text-destructive">*</span>
                      </Label>
                      <Select value={form.role} onValueChange={(v) => handleField("role", v)}>
                        <SelectTrigger className={errors.role ? "border-destructive" : ""}>
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ceo">CEO / Founder</SelectItem>
                          <SelectItem value="csuite">C-Suite (COO, CFO, CTO…)</SelectItem>
                          <SelectItem value="vp">VP / Director</SelectItem>
                          <SelectItem value="hr">HR / People Leader</SelectItem>
                          <SelectItem value="ops">Operations</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.role && <p className="text-destructive text-xs">{errors.role}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <Label htmlFor="cf-message" className="text-xs font-medium">
                      What's the challenge? <span className="text-muted-foreground font-normal">(optional)</span>
                    </Label>
                    <Textarea
                      id="cf-message"
                      placeholder="Briefly describe what's not working in your organization..."
                      rows={3}
                      value={form.message}
                      onChange={(e) => handleField("message", e.target.value)}
                      className="resize-none"
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 flex items-center justify-between gap-4">
                  <p className="text-xs text-muted-foreground">
                    No spam. We'll only contact you about your request.
                  </p>
                  <Button
                    type="submit"
                    variant="teal"
                    size="lg"
                    disabled={submitting}
                    className="group shrink-0"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Submit
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
