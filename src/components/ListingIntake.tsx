import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, ArrowRight, ArrowLeft, Building2 } from "lucide-react";
import { submitLead } from "@/src/lib/leads";
import { cn } from "@/src/lib/utils";
import type { Translation } from "@/src/translations";

const schema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid institutional email is required"),
  phone: z.string().min(8, "Contact phone is required"),
  agency: z.string().min(2, "Agency or Company name is required"),
  country: z.string().min(2, "Country of record is required"),
  propertyType: z.string(),
  priceTier: z.string(),
  activeTimeline: z.string(),
  message: z.string().min(10, "Please provide a brief description of the mandate (min 10 chars)"),
});

type FormData = z.infer<typeof schema>;

type StepState = "PRINCIPAL" | "INVENTORY" | "MANDATE" | "REVIEW";

const STEPS: StepState[] = ["PRINCIPAL", "INVENTORY", "MANDATE", "REVIEW"];

interface ListingIntakeProps {
  t: Translation;
  locale: string;
}

export default function ListingIntake({ t, locale }: ListingIntakeProps) {
  const [currentStep, setCurrentStep] = useState<StepState>("PRINCIPAL");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, trigger } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  });

  const stepIndex = STEPS.indexOf(currentStep) + 1;
  const totalSteps = STEPS.length;

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];
    
    switch (currentStep) {
      case "PRINCIPAL":
        fieldsToValidate = ["name", "email", "phone", "country", "agency"];
        break;
      case "INVENTORY":
        fieldsToValidate = ["propertyType", "priceTier"];
        break;
      case "MANDATE":
        fieldsToValidate = ["activeTimeline", "message"];
        break;
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      const nextIdx = STEPS.indexOf(currentStep) + 1;
      if (nextIdx < totalSteps) {
        setCurrentStep(STEPS[nextIdx]);
      }
    }
  };

  const prevStep = () => {
    const prevIdx = STEPS.indexOf(currentStep) - 1;
    if (prevIdx >= 0) {
      setCurrentStep(STEPS[prevIdx]);
    }
  };

  const onSubmit = async (data: FormData) => {
    const result = await submitLead({
      type: 'listing_intake',
      name: data.name,
      email: data.email,
      phone: data.phone,
      country: data.country,
      message: data.message,
      propertyType: data.propertyType,
      priceTier: data.priceTier,
      timeline: data.activeTimeline,
      details: data
    });
    if (result.ok) setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-bone py-24 px-6 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md mx-auto">
          <CheckCircle className="w-20 h-20 text-gold mx-auto mb-8" />
          <h2 className="text-4xl font-serif mb-4">Intake Confirmed.</h2>
          <p className="text-graphite mb-10">Carlos will respond personally within one business day from Weston, Florida. An institutional activation summary has been sent to your email.</p>
          <button onClick={() => window.location.reload()} className="text-mono-label text-gold border-b border-gold/40 pb-1">Start New Mandate →</button>
        </motion.div>
      </div>
    );
  }

  return (
    <section id="list-property" className="bg-white py-24 border-t border-line">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          <div className="lg:col-span-4">
             <p className="text-mono-label text-gold mb-6 uppercase">STEP {stepIndex} OF {totalSteps}</p>
             <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                {currentStep === "PRINCIPAL" && "The Principal."}
                {currentStep === "INVENTORY" && "The Inventory."}
                {currentStep === "MANDATE" && "The Mandate."}
                {currentStep === "REVIEW" && "Review."}
             </h2>
             <div className="w-full bg-bone h-1 relative overflow-hidden">
                <motion.div 
                  animate={{ width: `${(stepIndex / totalSteps) * 100}%` }} 
                  className="absolute top-0 left-0 h-full bg-gold transition-all duration-500" 
                />
             </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-8 space-y-12">
            <AnimatePresence mode="wait">
              {currentStep === "PRINCIPAL" && (
                <motion.div key="step-principal" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputField label="Full Name" name="name" register={register} error={errors.name} />
                    <InputField label="Institutional Email" name="email" type="email" register={register} error={errors.email} />
                    <InputField label="Contact Phone" name="phone" register={register} error={errors.phone} />
                    <InputField label="Agency / Company" name="agency" register={register} error={errors.agency} />
                    <InputField label="Country of Record" name="country" register={register} error={errors.country} />
                  </div>
                </motion.div>
              )}

              {currentStep === "INVENTORY" && (
                <motion.div key="step-inventory" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <SelectField label="Property Type" name="propertyType" options={["Luxury Residential", "Condominium", "Estate Portfolio", "Commercial Asset"]} register={register} />
                      <SelectField label="Target Valuation Tier" name="priceTier" options={["$1M — $3M", "$3M — $10M", "$10M — $30M", "$30M+"]} register={register} />
                   </div>
                </motion.div>
              )}

              {currentStep === "MANDATE" && (
                <motion.div key="step-mandate" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                   <SelectField label="Activation Timeline" name="activeTimeline" options={["Immediate (Next 30 days)", "Active Q4 2026", "Institutional Planning"]} register={register} />
                   <TextAreaField label="Mandate Briefing" name="message" register={register} error={errors.message} placeholder="Describe the activation requirements or B2B referral context..." />
                </motion.div>
              )}

              {currentStep === "REVIEW" && (
                <motion.div key="step-review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-bone p-10 border border-line">
                   <h3 className="text-xl font-serif mb-6 text-navy">Briefing Summary</h3>
                   <div className="grid grid-cols-2 gap-y-4 text-sm">
                      <p className="text-graphite font-mono uppercase tracking-widest text-[9px]">Identity</p>
                      <p className="font-semibold text-navy">Institutional Verified</p>
                      <p className="text-graphite font-mono uppercase tracking-widest text-[9px]">Asset Class</p>
                      <p className="font-semibold text-navy">Luxury Mandate Defined</p>
                      <p className="text-graphite font-mono uppercase tracking-widest text-[9px]">B2B Status</p>
                      <p className="font-semibold text-navy text-gold">Ready for Principal Review</p>
                   </div>
                   <p className="mt-8 text-xs text-graphite/60 italic leading-relaxed">
                     By submitting, you confirm authorization to activate this international inventory into the U.S. MLS ecosystem through Carlos Uzcategui of United Realty Group.
                   </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-8 pt-16">
               {stepIndex > 1 && (
                 <button type="button" onClick={prevStep} className="flex items-center gap-3 text-muted/40 font-mono text-[9px] tracking-[3px] uppercase hover:text-gold transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back
                 </button>
               )}
               <div className="flex-1" />
               {currentStep !== "REVIEW" ? (
                 <button type="button" onClick={nextStep} className="btn-gold flex items-center justify-center gap-3">
                    Continue <ArrowRight className="w-4 h-4" />
                 </button>
               ) : (
                 <button type="submit" className="btn-gold flex items-center justify-center gap-3">
                    Submit Mandate <Building2 className="w-4 h-4" />
                 </button>
               )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function InputField({ label, name, type = "text", register, error }: any) {
  return (
    <div className="space-y-4 text-left">
      <label className="text-mono-label text-gold uppercase tracking-[2px]">{label}</label>
      <input 
        type={type} 
        {...register(name)}
        className={cn(
          "w-full border-line border-b focus:border-gold outline-none py-3 font-sans text-lg transition-all bg-transparent",
          error && "border-red-500"
        )}
      />
      {error && <p className="text-red-500 text-[10px] uppercase font-mono tracking-widest mt-1">{error.message}</p>}
    </div>
  );
}

function SelectField({ label, name, options, register }: any) {
    return (
      <div className="space-y-4 text-left">
        <label className="text-mono-label text-gold uppercase tracking-[2px]">{label}</label>
        <select 
          {...register(name)}
          className="w-full border-line border-b focus:border-gold outline-none py-3 font-sans text-lg bg-transparent appearance-none cursor-pointer"
        >
          {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
    );
}

function TextAreaField({ label, name, register, error, placeholder }: any) {
  return (
    <div className="space-y-4 text-left">
      <label className="text-mono-label text-gold uppercase tracking-[2px]">{label}</label>
      <textarea 
        {...register(name)}
        placeholder={placeholder}
        rows={4}
        className={cn(
          "w-full border-line border-b focus:border-gold outline-none py-3 font-sans text-lg transition-all bg-transparent resize-none",
          error && "border-red-500"
        )}
      />
      {error && <p className="text-red-500 text-[10px] uppercase font-mono tracking-widest mt-1">{error.message}</p>}
    </div>
  );
}
