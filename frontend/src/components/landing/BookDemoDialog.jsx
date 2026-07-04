import React from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const initial = {
  name: "", email: "", company: "", entities: "", role: "", message: "",
};

export default function BookDemoDialog({ open, onOpenChange }) {
  const [form, setForm] = React.useState(initial);
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setDone(false);
      setForm(initial);
    }
  }, [open]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e?.target ? e.target.value : e }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) {
      toast.error("Name, email and company are required");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/demo-requests`, form);
      setDone(true);
      toast.success("Demo request received. We'll reach out shortly.");
    } catch (err) {
      const msg = err?.response?.data?.detail?.[0]?.msg || "Something went wrong. Please try again.";
      toast.error(typeof msg === "string" ? msg : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="book-demo-dialog"
        className="sm:max-w-[520px] bg-[#F5F0E8] border-line p-0 overflow-hidden"
      >
        {done ? (
          <div className="p-8 text-center" data-testid="book-demo-success">
            <div className="mx-auto h-12 w-12 rounded-full bg-white border border-line grid place-items-center">
              <CheckCircle2 size={22} />
            </div>
            <h3 className="mt-4 font-serif-display text-2xl tracking-tight">You're on our calendar.</h3>
            <p className="mt-2 text-sm text-[#0A0A0A]/70">
              Thanks {form.name?.split(" ")[0] || "there"}, our team will reach out to <span className="font-medium">{form.email}</span> within one business day.
            </p>
            <button
              onClick={() => onOpenChange(false)}
              data-testid="book-demo-close"
              className="mt-6 btn-primary"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <DialogHeader className="px-8 pt-8 pb-2">
              <DialogTitle className="font-serif-display text-2xl tracking-tight">Book a consultation</DialogTitle>
              <DialogDescription className="text-[#0A0A0A]/70">
                Tell us about your group. We&apos;ll tailor the consultation and follow up within one business day.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={submit} className="px-8 pb-8 pt-2 space-y-4" data-testid="book-demo-form">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="d-name" className="text-xs">Full name</Label>
                  <Input
                    id="d-name" value={form.name} onChange={set("name")} required
                    data-testid="book-demo-name"
                    className="bg-white border-line mt-1.5"
                    placeholder="Elena Marsh"
                  />
                </div>
                <div>
                  <Label htmlFor="d-email" className="text-xs">Work email</Label>
                  <Input
                    id="d-email" type="email" value={form.email} onChange={set("email")} required
                    data-testid="book-demo-email"
                    className="bg-white border-line mt-1.5"
                    placeholder="elena@meridian.co"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="d-company" className="text-xs">Company</Label>
                  <Input
                    id="d-company" value={form.company} onChange={set("company")} required
                    data-testid="book-demo-company"
                    className="bg-white border-line mt-1.5"
                    placeholder="Meridian Retail Group"
                  />
                </div>
                <div>
                  <Label htmlFor="d-role" className="text-xs">Your role</Label>
                  <Input
                    id="d-role" value={form.role} onChange={set("role")}
                    data-testid="book-demo-role"
                    className="bg-white border-line mt-1.5"
                    placeholder="CFO"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs">Number of entities</Label>
                <Select value={form.entities} onValueChange={set("entities")}>
                  <SelectTrigger data-testid="book-demo-entities" className="bg-white border-line mt-1.5">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3" data-testid="entities-1-3">1 – 3</SelectItem>
                    <SelectItem value="4-10" data-testid="entities-4-10">4 – 10</SelectItem>
                    <SelectItem value="11-25" data-testid="entities-11-25">11 – 25</SelectItem>
                    <SelectItem value="26-50" data-testid="entities-26-50">26 – 50</SelectItem>
                    <SelectItem value="50+" data-testid="entities-50-plus">50+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="d-msg" className="text-xs">What&apos;s the top thing you&apos;d like to see?</Label>
                <Textarea
                  id="d-msg" value={form.message} onChange={set("message")}
                  data-testid="book-demo-message"
                  className="bg-white border-line mt-1.5 min-h-[90px]"
                  placeholder="e.g. Inter-company eliminations across 12 entities"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                data-testid="book-demo-submit"
                className="btn-primary w-full disabled:opacity-60"
              >
                {loading ? "Submitting…" : "Request consultation"}
              </button>
              <p className="text-[11px] text-[#0A0A0A]/50 text-center">
                By submitting, you agree to be contacted by the FinBoard team.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
