import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { siteContent } from "@/src/content/site";

type Status = "idle" | "submitting" | "success" | "error";

const encode = (data: Record<string, string>) => new URLSearchParams(data).toString();

export default function HomeValuation() {
  const [status, setStatus] = useState<Status>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyAddress: "",
    city: "",
    timeline: "",
    message: "",
  });

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    try {
      const body = encode({
        "form-name": "seller-consultation",
        ...formData,
      });

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      if (!response.ok) throw new Error("Netlify form submission failed");

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        propertyAddress: "",
        city: "",
        timeline: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section id="valuation" className="bg-white py-28 px-[7vw] border-t border-line-light">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-16 items-start">
        <div className="space-y-8">
          <span className="section-label">Confidential Seller Consultation</span>
          <h2 className="text-4xl md:text-6xl font-serif leading-[1.08] text-navy">
            Request a pricing and exposure review before you list.
          </h2>
          <p className="body-editorial">
            Share the basics and Carlos will personally review the property, timing, and likely launch strategy. This is built for South Florida sellers who want a serious conversation before committing to market.
          </p>
          <div className="bg-bone border border-line-light p-8 space-y-4">
            <p className="text-mono-label text-gold">Direct Contact</p>
            <p className="text-sm leading-[1.8] text-muted">
              {siteContent.licenseDisplay}<br />
              {siteContent.brokerage}<br />
              <a className="text-gold hover:text-navy" href={siteContent.directPhoneHref}>{siteContent.directPhoneDisplay}</a> · <a className="text-gold hover:text-navy" href={`mailto:${siteContent.email}`}>{siteContent.email}</a>
            </p>
            <a href={siteContent.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-mono-label text-navy hover:text-gold">
              <MessageCircle className="w-4 h-4" /> WhatsApp Carlos
            </a>
          </div>
        </div>

        <div className="bg-bone p-8 md:p-12 border border-line shadow-3xl">
          {status === "success" ? (
            <div className="text-center py-16">
              <CheckCircle2 className="w-16 h-16 text-gold mx-auto mb-8" />
              <h3 className="text-3xl font-serif text-navy mb-4">Request received.</h3>
              <p className="text-muted leading-[1.8] max-w-md mx-auto mb-8">
                Thank you. Carlos will review your seller strategy request and respond directly.
              </p>
              <button className="btn-gold" onClick={() => setStatus("idle")}>Submit another property</button>
            </div>
          ) : (
            <form name="seller-consultation" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="form-name" value="seller-consultation" />
              <p className="hidden">
                <label>Do not fill this out: <input name="bot-field" /></label>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="input-label">Full Name</label>
                  <input required name="name" value={formData.name} onChange={(event) => updateField("name", event.target.value)} className="form-input" />
                </div>
                <div>
                  <label className="input-label">Email</label>
                  <input required type="email" name="email" value={formData.email} onChange={(event) => updateField("email", event.target.value)} className="form-input" />
                </div>
                <div>
                  <label className="input-label">Phone</label>
                  <input required name="phone" value={formData.phone} onChange={(event) => updateField("phone", event.target.value)} className="form-input" />
                </div>
                <div>
                  <label className="input-label">Timeline</label>
                  <select required name="timeline" value={formData.timeline} onChange={(event) => updateField("timeline", event.target.value)} className="form-input">
                    <option value="">Select timing</option>
                    <option>Now / already preparing</option>
                    <option>30-60 days</option>
                    <option>60-90 days</option>
                    <option>Just researching</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="input-label">Property Address</label>
                <input required name="propertyAddress" value={formData.propertyAddress} onChange={(event) => updateField("propertyAddress", event.target.value)} className="form-input" />
              </div>

              <div>
                <label className="input-label">City</label>
                <input required name="city" value={formData.city} onChange={(event) => updateField("city", event.target.value)} className="form-input" placeholder="Miami, Weston, Coral Gables, Fort Lauderdale..." />
              </div>

              <div>
                <label className="input-label">Message</label>
                <textarea name="message" rows={4} value={formData.message} onChange={(event) => updateField("message", event.target.value)} className="form-input resize-none" placeholder="Tell Carlos anything useful about the property, timing, or your goals." />
              </div>

              <button disabled={status === "submitting"} className="btn-gold w-full flex items-center justify-center gap-4 py-5">
                {status === "submitting" ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Request Seller Strategy Review <ArrowRight className="w-4 h-4" /></>}
              </button>

              {status === "error" && (
                <p className="text-sm text-red-600 leading-relaxed">
                  The form could not submit. Please use WhatsApp or email Carlos directly.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
