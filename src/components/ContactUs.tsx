import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/src/lib/firebase"; 
import type { Translation } from "@/src/translations";
import { cn } from "@/src/lib/utils";

const ContactUs: React.FC<{ t: Translation }> = ({ t }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await addDoc(collection(db, "leads"), {
        ...formData,
        timestamp: serverTimestamp(),
      });
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Firestore Error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-32 px-[7vw] bg-navy overflow-hidden relative">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-[radial-gradient(circle_at_center,rgba(176,141,87,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <span className="font-mono text-[10px] tracking-[4px] uppercase text-gold mb-8 block">
            {t.contact.title}
          </span>
          <h2 className="text-5xl md:text-7xl font-serif text-white leading-[1.1] mb-8">
            Activate your <br />
            <span className="italic text-gold-light">Florida mandate</span>.
          </h2>
          <p className="text-white/40 text-lg leading-[1.8] font-light max-w-[480px]">
            {t.contact.sub}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-16 relative"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-10"
              >
                <CheckCircle2 className="w-16 h-16 text-gold mb-6" />
                <h3 className="text-2xl font-serif text-white mb-4">{t.contact.success}</h3>
                <button 
                  onClick={() => setStatus("idle")}
                  className="font-mono text-[9px] tracking-[2px] uppercase text-gold hover:text-white transition-colors"
                >
                  Submit another request
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-10"
              >
                <div className="space-y-2">
                  <label className="font-mono text-[9px] tracking-[2px] uppercase text-white/30">
                    {t.contact.name}
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white text-lg font-light focus:border-gold outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[9px] tracking-[2px] uppercase text-white/30">
                    {t.contact.email}
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white text-lg font-light focus:border-gold outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[9px] tracking-[2px] uppercase text-white/30">
                    {t.contact.message}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white text-lg font-light focus:border-gold outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-6">
                  <button
                    disabled={status === "submitting"}
                    className="btn-gold w-full flex items-center justify-center gap-4 py-6"
                  >
                    {status === "submitting" ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {t.contact.submit} <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  {status === "error" && (
                    <p className="flex items-center gap-2 text-red-400 text-[10px] uppercase font-mono mt-4 tracking-[1px]">
                      <AlertCircle className="w-3 h-3" /> {t.contact.error}
                    </p>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
