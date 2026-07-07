import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Mail, Phone, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  budget: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: 'Under ₹6k',
    preferredDate: '',
    preferredTime: 'Morning (9 AM - 12 PM)',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailjsStatus, setEmailjsStatus] = useState<'success' | 'error' | 'unconfigured' | null>(null);
  const [step, setStep] = useState(1);

  const budgetOptions = [
    'Under ₹6k',
    '₹6k - ₹15k',
    '₹15k - ₹40k',
    'Above ₹40k'
  ];

  const timeSlotOptions = [
    'Morning (9 AM - 12 PM)',
    'Afternoon (12 PM - 5 PM)',
    'Evening (5 PM - 8 PM)'
  ];

  const validateStep = (currentStep: number): boolean => {
    const tempErrors: FormErrors = {};

    if (currentStep === 1) {
      if (!form.name.trim()) tempErrors.name = 'Full name is required.';

      if (!form.email.trim()) {
        tempErrors.email = 'Email address is required.';
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        tempErrors.email = 'Please provide a valid email address.';
      }

      if (!form.phone.trim()) {
        tempErrors.phone = 'Phone number is required.';
      } else if (!/^\+?[0-9\s-]{7,15}$/.test(form.phone.trim())) {
        tempErrors.phone = 'Please provide a valid phone number.';
      }
    }

    if (currentStep === 2) {
      if (!form.preferredDate) {
        tempErrors.preferredDate = 'Please select a preferred date for the call.';
      }
    }

    if (currentStep === 3) {
      if (!form.message.trim()) tempErrors.message = 'Please input a brief project message.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error immediately on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    try {
      // 1. Submit to local backend for logging
      try {
        await fetch('/api/book-call', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        });
      } catch (backendErr) {
        console.warn('Backend logging failed, continuing with EmailJS...', backendErr);
      }

      // 2. Submit to EmailJS
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_0qmbvoj';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!templateId || !publicKey || templateId.includes('YOUR_') || publicKey.includes('YOUR_')) {
        console.warn('EmailJS template ID or public key is not configured in environment variables.');
        setEmailjsStatus('unconfigured');
        setIsSubmitted(true);
        return;
      }

      const emailjsData = {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          name: form.name,
          from_name: form.name,
          email: form.email,
          from_email: form.email,
          phone: form.phone,
          company: form.company,
          budget: form.budget,
          preferredDate: form.preferredDate,
          preferred_date: form.preferredDate,
          preferredTime: form.preferredTime,
          preferred_time: form.preferredTime,
          message: form.message
        }
      };

      const emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailjsData)
      });

      if (!emailjsResponse.ok) {
        const errorText = await emailjsResponse.text();
        throw new Error(`EmailJS send failed: ${errorText}`);
      }

      setEmailjsStatus('success');
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error booking call via EmailJS:', err);
      setEmailjsStatus('error');
      // Fallback: show success state to client even if EmailJS failed, but set status to error
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-blue-500/5 dark:bg-blue-600/2 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Side Info Text & Visual Details */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-3 block">
                03 / Collaborate
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight text-slate-950 dark:text-white leading-tight">
                Ready to elevate <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">your digital presence?</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-4 leading-relaxed">
                Tell us about your brand goals. Select a preferred date and time, and we'll connect for a casual, no-obligation conversation.
              </p>
            </div>

            {/* What to expect list */}
            <div className="space-y-6">
              <h4 className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                What to expect next
              </h4>

              <ul className="space-y-4">
                <li className="flex gap-3 text-left">
                  <span className="h-5 w-5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">Casual 30-Min Discovery</h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      No generic pitches or sales slides. Just an open talk about your vision, technical features, and timeline.
                    </p>
                  </div>
                </li>

                <li className="flex gap-3 text-left">
                  <span className="h-5 w-5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">Tailored Architecture Proposal</h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      We deliver a comprehensive roadmap, transparent milestone pricing, and tech recommendations tailored to your scale.
                    </p>
                  </div>
                </li>

                <li className="flex gap-3 text-left">
                  <span className="h-5 w-5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">Direct Creator Access</h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      No middle management. You get a direct Slack line to the builders designing and engineering your product.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Quick Contact Footer Line */}
            <div className="pt-6 border-t border-slate-200/50 dark:border-white/5 text-left space-y-2.5">
              <span className="text-[10px] font-mono font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wide block">
                Direct Channels
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Prefer email? Drop us a line at <a href="mailto:hello@webkala.com" className="font-bold text-slate-850 dark:text-slate-250 hover:text-blue-500 transition-colors">hello@webkala.com</a> or phone <a href="tel:+917224012727" className="font-bold text-slate-850 dark:text-slate-250 hover:text-blue-500 transition-colors">+91 72240 12727</a>.
              </p>
            </div>

            {/* Privacy Compliance Indicator */}
            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-[10px] font-mono pt-2">
              <ShieldCheck className="h-4 w-4 text-blue-500 shrink-0" />
              <span>Your ideas are always safe and private with us</span>
            </div>
          </div>

          {/* Form Area */}
          <div className="lg:col-span-7 relative">
            {/* Soft decorative background glow behind the glass card */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-blue-600/10 to-indigo-500/10 dark:from-blue-600/5 dark:to-indigo-500/5 blur-lg pointer-events-none" />
            <div className="backdrop-blur-md bg-white/70 dark:bg-slate-950/75 border border-slate-200/50 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden min-h-[500px] flex flex-col justify-center">

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6 text-left"
                    noValidate
                  >
                    {/* Live Availability Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold tracking-wider uppercase w-fit mb-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      Slots Available This Week
                    </div>

                    {/* Step Progress Bar */}
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                          Step {step} of 3 — {step === 1 ? 'Your Details' : step === 2 ? 'Schedule' : 'Project Vision'}
                        </span>
                        <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                          {Math.round((step / 3) * 100)}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-blue-600 to-indigo-500"
                          initial={{ width: '33.33%' }}
                          animate={{ width: `${(step / 3) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>

                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div
                          key="step-1"
                          initial={{ x: 15, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -15, opacity: 0 }}
                          className="space-y-6"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="flex flex-col gap-1.5">
                              <label htmlFor="name" className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                                Full Name *
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 bg-white dark:bg-[#050505] border rounded-xl text-xs outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 transition-all text-slate-800 dark:text-slate-200 ${errors.name ? 'border-red-500/80 font-semibold' : 'border-slate-200 dark:border-white/10'
                                  }`}
                                placeholder="Jane Doe"
                              />
                              {errors.name && <span className="text-[10px] text-red-500 font-mono mt-1">{errors.name}</span>}
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-1.5">
                              <label htmlFor="email" className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                                Email Address *
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 bg-white dark:bg-[#050505] border rounded-xl text-xs outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 transition-all text-slate-800 dark:text-slate-200 ${errors.email ? 'border-red-500/80 font-semibold' : 'border-slate-200 dark:border-white/10'
                                  }`}
                                placeholder="jane@company.com"
                              />
                              {errors.email && <span className="text-[10px] text-red-500 font-mono mt-1">{errors.email}</span>}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Phone */}
                            <div className="flex flex-col gap-1.5">
                              <label htmlFor="phone" className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                                Phone Number *
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={form.phone}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 bg-white dark:bg-[#050505] border rounded-xl text-xs outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 transition-all text-slate-800 dark:text-slate-200 ${errors.phone ? 'border-red-500/80 font-semibold' : 'border-slate-200 dark:border-white/10'
                                  }`}
                                placeholder="+1 234 567 8900"
                              />
                              {errors.phone && <span className="text-[10px] text-red-500 font-mono mt-1">{errors.phone}</span>}
                            </div>

                            {/* Company */}
                            <div className="flex flex-col gap-1.5">
                              <label htmlFor="company" className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                                Company Name
                              </label>
                              <input
                                type="text"
                                id="company"
                                name="company"
                                value={form.company}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-xl text-xs outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 transition-all text-slate-800 dark:text-slate-200"
                                placeholder="Stripe Inc"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step-2"
                          initial={{ x: 15, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -15, opacity: 0 }}
                          className="space-y-6"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Preferred Date */}
                            <div className="flex flex-col gap-1.5 text-left">
                              <label htmlFor="preferredDate" className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                                Preferred Date *
                              </label>
                              <input
                                type="date"
                                id="preferredDate"
                                name="preferredDate"
                                min={new Date().toISOString().split('T')[0]}
                                value={form.preferredDate}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 bg-white dark:bg-[#050505] border rounded-xl text-xs outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 transition-all text-slate-800 dark:text-slate-200 ${errors.preferredDate ? 'border-red-500/80 font-semibold' : 'border-slate-200 dark:border-white/10'
                                  }`}
                              />
                              {errors.preferredDate && <span className="text-[10px] text-red-500 font-mono mt-1">{errors.preferredDate}</span>}
                            </div>

                            {/* Preferred Time Slot */}
                            <div className="flex flex-col gap-1.5 text-left">
                              <label htmlFor="preferredTime" className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                                Preferred Time Slot *
                              </label>
                              <select
                                id="preferredTime"
                                name="preferredTime"
                                value={form.preferredTime}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white dark:bg-[#050505] border border-slate-200 dark:border-white/10 rounded-xl text-xs outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 transition-all text-slate-800 dark:text-slate-200"
                              >
                                {timeSlotOptions.map((opt) => (
                                  <option key={opt} value={opt} className="bg-white dark:bg-[#050505] text-slate-800 dark:text-slate-200">
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          key="step-3"
                          initial={{ x: 15, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -15, opacity: 0 }}
                          className="space-y-6"
                        >
                          {/* Interactive Predefined Budget picker */}
                          <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                              Project Budget Range
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {budgetOptions.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => setForm((prev) => ({ ...prev, budget: opt }))}
                                  className={`py-3 text-[11px] font-bold uppercase tracking-wider rounded-xl border transition-all cursor-pointer ${form.budget === opt
                                    ? 'bg-blue-600 dark:bg-white dark:text-black dark:border-white text-white border-blue-600 shadow-md shadow-blue-500/15'
                                    : 'bg-white dark:bg-[#050505] border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10'
                                    }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Message */}
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="message" className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                              Tell us about your project *
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              rows={5}
                              value={form.message}
                              onChange={handleInputChange}
                              className={`w-full px-4 py-3 bg-white dark:bg-[#050505] border rounded-xl text-xs outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 transition-all text-slate-800 dark:text-slate-200 resize-none ${errors.message ? 'border-red-500/80 font-semibold' : 'border-slate-200 dark:border-white/10'
                                }`}
                              placeholder="What are you looking to build? (A new shop, a portfolio, or just modernizing a slow site?)"
                            />
                            {errors.message && <span className="text-[10px] text-red-500 font-mono mt-1">{errors.message}</span>}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Step Navigation Controls */}
                    <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-white/10 mt-8">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-6 py-3.5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
                        >
                          Back
                        </button>
                      ) : (
                        <div />
                      )}

                      {step < 3 ? (
                        <button
                          type="button"
                          onClick={nextStep}
                          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 dark:bg-white dark:text-black dark:hover:bg-slate-200 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md shadow-blue-500/10 cursor-pointer"
                        >
                          Next Step
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 dark:bg-none dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <div className="h-4.5 w-4.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          ) : (
                            <>
                              Book Call Slot
                              <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-10 flex flex-col items-center justify-center space-y-6"
                  >
                    {/* Success Ring Indicator */}
                    <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center border-2 border-emerald-500/30">
                      <Check className="h-8 w-8 stroke-[3]" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-950 dark:text-slate-100 font-sans">
                        Call Booking Requested
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                        Thank you, <span className="font-semibold text-slate-900 dark:text-slate-200">{form.name}</span>! We have received your booking request for <span className="font-bold">{form.preferredDate}</span> during <span className="font-bold">{form.preferredTime}</span>.
                      </p>
                    </div>

                    {emailjsStatus === 'success' && (
                      <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 max-w-xs text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        We will reach out to confirm your booking slot via email within 12 hours.
                      </div>
                    )}
                    {emailjsStatus === 'unconfigured' && (
                      <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 max-w-xs text-xs font-medium text-amber-600 dark:text-amber-400">
                        ⚠️ EmailJS is partially configured. Set your VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY in .env to receive live emails.
                      </div>
                    )}
                    {emailjsStatus === 'error' && (
                      <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10 max-w-xs text-xs font-medium text-red-600 dark:text-red-400">
                        ⚠️ EmailJS failed to send. Please check your credentials and console logs.
                      </div>
                    )}

                    <button
                      onClick={() => {
                        setForm({
                          name: '',
                          email: '',
                          phone: '',
                          company: '',
                          budget: 'Under ₹6k',
                          preferredDate: '',
                          preferredTime: 'Morning (9 AM - 12 PM)',
                          message: ''
                        });
                        setIsSubmitted(false);
                        setEmailjsStatus(null);
                        setStep(1);
                      }}
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:underline cursor-pointer"
                    >
                      Book Another Slot
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
