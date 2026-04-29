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
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { submitLead } from "@/src/lib/leads";
import type { Translation } from "@/src/translations";

const HomeValuation: React.FC<{ t: Translation }> = ({ t }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    address: "", city: "", zip: "",
    beds: "3", baths: "2", sqft: "", propertyType: "Single Family", yearBuilt: "",
    name: "", email: "", phone: "", timeline: "30-60 days", notes: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const cities = ["Miami", "Coral Gables", "Weston", "Plantation", "Pinecrest", "Bal Harbour", "Sunny Isles", "Aventura", "Key Biscayne", "Coconut Grove", "Brickell", "Doral", "Fort Lauderdale", "Other"];
  const propertyTypes = ["Single Family", "Condo", "Townhouse", "Land", "Multi-family"];
  const timelines = ["Active now", "30-60 days", "60-90 days", "Just researching"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
      return;
    }

    setStatus("submitting");
    try {
      const result = await submitLead({
        type: 'home_valuation',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        propertyType: formData.propertyType,
        timeline: formData.timeline,
        message: `${formData.address}, ${formData.city} ${formData.zip}. ${formData.beds} beds, ${formData.baths} baths, ${formData.sqft} sqft.`,
        details: formData
      });
      
      if (result.ok) setStatus("success");
      else setStatus("error");
    } catch (error) {
      console.error("Valuation Error:", error);
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
    <section id="valuation" className="py-40 bg-white border-t border-black/5">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-12">
          <div className="space-y-6">
            <span className="font-mono text-[9px] tracking-[4px] uppercase text-gold">{t.valuation.eyebrow}</span>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-light text-navy leading-[1.05] tracking-tight">
              {t.hero.title.line1} <br />
              <span className="italic">{t.valuation.title.split(' ')[0]}</span> {t.valuation.title.split(' ').slice(1).join(' ')}
            </h2>
          </div>
          <p className="font-serif text-xl text-slate opacity-60 leading-relaxed max-w-md">
            {t.valuation.sub}
          </p>
          
          <div className="editorial-pull">
            "For luxury sellers, a generic automated estimate is a liability. You require the principal's perspective."
          </div>
        </div>

        <div className="bg-bone p-10 md:p-16 rounded-3xl border border-black/5 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-8">
                  <CheckCircle2 className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-2xl font-serif text-navy mb-4">Request Received</h3>
                <p className="text-muted max-w-[320px]">{t.valuation.success}</p>
                <button 
                  onClick={() => { setStep(0); setStatus("idle"); }}
                  className="mt-8 font-mono text-[9px] tracking-[2px] uppercase text-gold hover:text-navy transition-colors"
                >
                  New valuation request
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} className="space-y-8">
                <div className="flex justify-between items-center mb-10">
                  {t.valuation.steps.map((s, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                       <div className={`w-1 h-1 rounded-full ${i <= step ? 'bg-gold' : 'bg-line'}`} />
                       <span className={`font-mono text-[7px] tracking-[1.5px] uppercase ${i === step ? 'text-gold' : 'text-line'}`}>{s.split(' ')[0]}</span>
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <div className="space-y-1">
                        <label className="input-label">{t.valuation.labels.address}</label>
                        <input required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="form-input" />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <label className="input-label">{t.valuation.labels.city}</label>
                          <select value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="form-input">
                            <option value="">Select City</option>
                            {cities.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="input-label">{t.valuation.labels.zip}</label>
                          <input required value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} className="form-input" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="space-y-1">
                          <label className="input-label">{t.valuation.labels.beds}</label>
                          <input type="number" value={formData.beds} onChange={e => setFormData({...formData, beds: e.target.value})} className="form-input" />
                        </div>
                        <div className="space-y-1">
                          <label className="input-label">{t.valuation.labels.baths}</label>
                          <input type="number" value={formData.baths} onChange={e => setFormData({...formData, baths: e.target.value})} className="form-input" />
                        </div>
                        <div className="space-y-1">
                          <label className="input-label">{t.valuation.labels.sqft}</label>
                          <input type="number" value={formData.sqft} onChange={e => setFormData({...formData, sqft: e.target.value})} className="form-input" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <label className="input-label">{t.valuation.labels.type}</label>
                          <select value={formData.propertyType} onChange={e => setFormData({...formData, propertyType: e.target.value})} className="form-input">
                            {propertyTypes.map(p => <option key={p} value={p}>{p}</option>)}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="input-label">{t.valuation.labels.year}</label>
                          <input type="number" value={formData.yearBuilt} onChange={e => setFormData({...formData, yearBuilt: e.target.value})} className="form-input" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <div className="space-y-1">
                        <label className="input-label">{t.valuation.labels.name}</label>
                        <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="form-input" />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <label className="input-label">{t.valuation.labels.email}</label>
                          <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="form-input" />
                        </div>
                        <div className="space-y-1">
                          <label className="input-label">{t.valuation.labels.phone}</label>
                          <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="form-input" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="input-label">{t.valuation.labels.timeline}</label>
                        <select value={formData.timeline} onChange={e => setFormData({...formData, timeline: e.target.value})} className="form-input">
                          {timelines.map(tl => <option key={tl} value={tl}>{tl}</option>)}
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center justify-between pt-6">
                  {step > 0 ? (
                    <button type="button" onClick={() => setStep(step - 1)} className="flex items-center gap-2 font-mono text-[9px] tracking-[2px] uppercase text-muted hover:text-navy transition-colors">
                      <ChevronLeft className="w-3 h-3" /> Back
                    </button>
                  ) : <div />}
                  
                  <button 
                    disabled={status === "submitting"}
                    className="btn-gold flex items-center gap-4 py-4 px-10"
                  >
                    {status === "submitting" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        {step === 2 ? t.valuation.submit : "Continue"} 
                        {step < 2 ? <ChevronRight className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
};

export default HomeValuation;
