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
};

export default HomeValuation;
