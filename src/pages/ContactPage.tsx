/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MessageSquare,
  Building,
  Clock,
  MapPin,
  Shield,
  Lock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Send,
  Sparkles,
  HelpCircle,
  Copy,
  ExternalLink,
  RefreshCw,
  FileCheck
} from 'lucide-react';

import { Container } from '../components/common/Container';
import { SectionHeading } from '../components/common/SectionHeading';
import { PrimaryButton } from '../components/common/PrimaryButton';
import { SecondaryButton } from '../components/common/SecondaryButton';
import { FAQAccordion } from '../components/sections/FAQAccordion';
import { APPROVED_SERVICES } from '../data/foundationData';
import { NavRoute, PackageTier, FAQItem } from '../types';
import {
  trackContactFormStart,
  trackGenerateLead,
  trackWhatsAppClick,
  trackEmailClick
} from '../analytics/ga4';

interface ContactPageProps {
  onNavigate: (route: NavRoute) => void;
  selectedPackage?: PackageTier | null;
  selectedInquiryService?: string | null;
  onClearPreselections?: () => void;
}

interface FormState {
  fullName: string;
  businessName: string;
  email: string;
  phoneOrWhatsApp: string;
  requiredService: string;
  businessGoal: string;
  additionalMessage: string;
  marketingOptIn: boolean; // Must remain unchecked by default per governance rule
  agreeToEnquiryProcessing: boolean;
}

interface FormErrors {
  fullName?: string;
  businessName?: string;
  email?: string;
  phoneOrWhatsApp?: string;
  requiredService?: string;
  businessGoal?: string;
  agreeToEnquiryProcessing?: string;
}

const BUSINESS_GOALS = [
  'Generate Consistent Qualified Inquiries',
  'Scale High-Intent Google Search Inquiries',
  'Implement Speed-to-Lead & WhatsApp Automation',
  'Develop High-Converting Landing Page & Funnel',
  'Improve Direct-Response Creative & Ad Performance',
  'Full-Funnel Lead + Sales Growth System',
  'Audit & Optimize Current Media Spend',
  'Other Bespoke Commercial Objective'
];

const CONTACT_SPECIFIC_FAQS: FAQItem[] = [
  {
    id: 'c-faq-1',
    question: 'How quickly does ADVERUNE respond to preliminary inquiries?',
    answer: 'All commercial inquiries submitted through our official intake portal receive an initial qualification review and structured response within one business day (Monday to Friday, 09:00 – 18:00).'
  },
  {
    id: 'c-faq-2',
    question: 'What happens after I submit this inquiry form?',
    answer: 'A senior strategist reviews your business profile, target market, and requested service requirements. We verify commercial alignment, evaluate existing channel viability, and provide a clear discovery briefing outline or meeting invitation.'
  },
  {
    id: 'c-faq-3',
    question: 'Are discussions and preliminary business data protected under confidentiality?',
    answer: 'Yes. ADVERUNE treats all operational metrics, revenue figures, target audience briefs, and media budgets as strictly confidential business information under mutual non-disclosure standards.'
  },
  {
    id: 'c-faq-4',
    question: 'Will ADVERUNE require access to our ad accounts during the discovery phase?',
    answer: 'Preliminary discovery does not require direct account access. If an ad account audit is mutually requested later, we provide partner-delegated view-only access instructions. Clients always retain 100% direct ownership of their ad accounts and pixel assets.'
  },
  {
    id: 'c-faq-5',
    question: 'Can we enquire for custom service combinations outside the standard packages?',
    answer: 'Yes. While our Small Business (Lead Generation System) and Medium Business (Lead + Sales Growth System) packages provide proven foundations, enterprise and bespoke service scopes are architected to match specific commercial models.'
  }
];

export function ContactPage({
  onNavigate,
  selectedPackage,
  selectedInquiryService,
  onClearPreselections
}: ContactPageProps) {
  // Form values
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    businessName: '',
    email: '',
    phoneOrWhatsApp: '',
    requiredService: selectedInquiryService || (selectedPackage ? selectedPackage.systemName : 'Meta Ads'),
    businessGoal: selectedPackage ? 'Full-Funnel Lead + Sales Growth System' : 'Generate Consistent Qualified Inquiries',
    additionalMessage: '',
    marketingOptIn: false, // Explicitly false by default per user requirement
    agreeToEnquiryProcessing: false
  });

  // Validation errors
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Submission statuses: 'idle' | 'loading' | 'success' | 'failure'
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'failure'>('idle');
  const [submissionReference, setSubmissionReference] = useState<string>('');
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(null);
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  const [emailDeliveryInfo, setEmailDeliveryInfo] = useState<string | null>(null);
  const [copiedPlaceholder, setCopiedPlaceholder] = useState<string | null>(null);
  const [whatsAppNotice, setWhatsAppNotice] = useState<string | null>(null);

  // Anti-Spam Tokens
  const [honeypot, setHoneypot] = useState<string>('');
  const [formLoadedAt] = useState<number>(() => Date.now());

  // Form Start Telemetry Guard (fires contact_form_start once per session)
  const formStartedRef = React.useRef<boolean>(false);

  // Validate fields
  const validateField = (name: keyof FormState, value: any): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required.';
        if (value.trim().length < 2) return 'Please enter at least 2 characters.';
        return undefined;
      case 'businessName':
        if (!value.trim()) return 'Business or company name is required.';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Business email address is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please provide a valid corporate email format (e.g. name@company.com).';
        }
        return undefined;
      case 'phoneOrWhatsApp':
        if (!value.trim()) return 'Phone / WhatsApp contact number is required.';
        if (value.trim().length < 7) return 'Please enter a valid telephone or WhatsApp number with country code.';
        return undefined;
      case 'requiredService':
        if (!value) return 'Please select a required service focus.';
        return undefined;
      case 'businessGoal':
        if (!value) return 'Please select your primary commercial goal.';
        return undefined;
      case 'agreeToEnquiryProcessing':
        if (!value) return 'You must acknowledge the processing of enquiry data to submit.';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    // Fire contact_form_start on first user interaction
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      trackContactFormStart(formData.requiredService);
    }

    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const val = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: val
    }));

    if (touched[name]) {
      const err = validateField(name as keyof FormState, val);
      setErrors((prev) => ({
        ...prev,
        [name]: err
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const val = type === 'checkbox' ? checked : value;

    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name as keyof FormState, val);
    setErrors((prev) => ({
      ...prev,
      [name]: err
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields
    const newErrors: FormErrors = {
      fullName: validateField('fullName', formData.fullName),
      businessName: validateField('businessName', formData.businessName),
      email: validateField('email', formData.email),
      phoneOrWhatsApp: validateField('phoneOrWhatsApp', formData.phoneOrWhatsApp),
      requiredService: validateField('requiredService', formData.requiredService),
      businessGoal: validateField('businessGoal', formData.businessGoal),
      agreeToEnquiryProcessing: validateField('agreeToEnquiryProcessing', formData.agreeToEnquiryProcessing)
    };

    setTouched({
      fullName: true,
      businessName: true,
      email: true,
      phoneOrWhatsApp: true,
      requiredService: true,
      businessGoal: true,
      agreeToEnquiryProcessing: true
    });

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err !== undefined);

    if (hasErrors) {
      // Find first error and scroll to it
      const firstErrorEl = document.querySelector('[aria-invalid="true"]');
      if (firstErrorEl) {
        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Set loading state & clear prior errors
    setStatus('loading');
    setServerErrorMessage(null);

    // Real API dispatch to backend endpoint
    fetch('/api/enquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        businessName: formData.businessName,
        email: formData.email,
        phoneOrWhatsApp: formData.phoneOrWhatsApp,
        requiredService: formData.requiredService,
        businessGoal: formData.businessGoal,
        additionalMessage: formData.additionalMessage,
        marketingOptIn: formData.marketingOptIn,
        agreeToEnquiryProcessing: formData.agreeToEnquiryProcessing,
        website_hp: honeypot,
        formLoadedAt
      })
    })
      .then(async (res) => {
        const data = await res.json().catch(() => null);
        if (!res.ok) {
          setStatus('failure');
          setServerErrorMessage(
            data?.message || `Server responded with status ${res.status}. Please check your connection and retry.`
          );
          if (data?.errors) {
            setErrors(data.errors);
          }
          return;
        }

        // Successfully received by server
        setIsDuplicate(Boolean(data?.duplicate));
        const refId = data?.referenceId || `ADV-${Math.floor(100000 + Math.random() * 900000)}`;
        setSubmissionReference(refId);
        setEmailDeliveryInfo(data?.deliveryDetail || null);

        // Track GA4 generate_lead conversion ONLY on verified successful server dispatch
        // Strictly no PII (names, phone numbers, email addresses) is passed
        trackGenerateLead(refId, formData.requiredService, formData.businessGoal);

        setStatus('success');
        window.scrollTo({ top: 350, behavior: 'smooth' });
      })
      .catch((netErr) => {
        console.error('[ENQUIRY SUBMISSION NETWORK ERROR]', netErr);
        setStatus('failure');
        setServerErrorMessage(
          'A network error occurred while transmitting your consultation request. Please ensure you are online and retry.'
        );
      });
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      businessName: '',
      email: '',
      phoneOrWhatsApp: '',
      requiredService: 'Meta Ads',
      businessGoal: 'Generate Consistent Qualified Inquiries',
      additionalMessage: '',
      marketingOptIn: false,
      agreeToEnquiryProcessing: false
    });
    setHoneypot('');
    setErrors({});
    setTouched({});
    setStatus('idle');
    setServerErrorMessage(null);
    setIsDuplicate(false);
    setEmailDeliveryInfo(null);
    formStartedRef.current = false;
    if (onClearPreselections) onClearPreselections();
  };

  const handleCopyNotice = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPlaceholder(identifier);
    setTimeout(() => setCopiedPlaceholder(null), 2500);
  };

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* 1. CONTACT HERO */}
      {/* ========================================================================= */}
      <section className="relative pt-16 pb-16 md:pt-24 md:pb-20 border-b border-[#1A1A22] overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

        <Container width="standard" className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16161D] border border-[#D4AF37]/30 text-xs text-[#D4AF37] font-medium tracking-wide mb-6">
            <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Strategic Consultation & Commercial Intake</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-heading mb-6">
            Initiate Strategic Contact. <br className="hidden sm:inline" />
            <span className="gold-text-gradient">Direct. Structured. Focused.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#9E9EA8] font-normal leading-relaxed mb-6">
            Engage directly with our strategy and digital advertising desk. Complete the structured intake below for an objective evaluation of your commercial growth objectives.
          </p>

          {/* Response commitment badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#121217] border border-[#22222E] text-xs text-[#A0A0B0]">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Executive Response Standard: Within 1 Business Day</span>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 2. SHORT INTRODUCTION & PRESELECTION BANNER */}
      {/* ========================================================================= */}
      <section className="py-8 bg-[#0D0D12] border-b border-[#1A1A22]">
        <Container width="standard">
          {/* Active Pre-selection Context Banner */}
          {(selectedPackage || selectedInquiryService) && (
            <div className="mb-6 p-4 rounded-xl bg-[#14141E] border border-[#D4AF37]/35 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                {selectedPackage && (
                  <div className="flex items-center gap-2">
                    <span className="text-[#8E8E98] uppercase font-mono text-[10px]">Configured Package:</span>
                    <span className="text-[#D4AF37] font-bold">{selectedPackage.systemName}</span>
                    <span className="text-[10px] text-[#A0A0B0] font-mono">({selectedPackage.name})</span>
                  </div>
                )}
                {selectedInquiryService && (
                  <div className="flex items-center gap-2">
                    <span className="text-[#8E8E98] uppercase font-mono text-[10px]">Target Service Focus:</span>
                    <span className="text-[#D4AF37] font-bold">{selectedInquiryService}</span>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  if (onClearPreselections) onClearPreselections();
                  setFormData((prev) => ({
                    ...prev,
                    requiredService: 'Meta Ads',
                    businessGoal: 'Generate Consistent Qualified Inquiries'
                  }));
                }}
                className="text-xs text-[#9E9EA8] hover:text-white underline cursor-pointer"
              >
                Clear Selection
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#8E8E98]">
            <div className="p-4 rounded-xl bg-[#111116] border border-[#1E1E28]">
              <span className="text-[#D4AF37] font-mono uppercase text-[10px] block mb-1 font-bold">
                01. No Aggressive Sales Calls
              </span>
              <p className="text-[#A5A5B2] leading-relaxed">
                Consultations are focused strictly on operational feasibility, unit economics, and pipeline architecture.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#111116] border border-[#1E1E28]">
              <span className="text-[#D4AF37] font-mono uppercase text-[10px] block mb-1 font-bold">
                02. Direct Client Account Ownership
              </span>
              <p className="text-[#A5A5B2] leading-relaxed">
                We never hold client ad accounts, tracking pixels, or data containers hostage. Full transparency is guaranteed.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#111116] border border-[#1E1E28]">
              <span className="text-[#D4AF37] font-mono uppercase text-[10px] block mb-1 font-bold">
                03. Zero Speculative Guarantees
              </span>
              <p className="text-[#A5A5B2] leading-relaxed">
                We do not manufacture fake ROI promises. Strategy proposals outline clear milestones and verifiable deliverables.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 3. MAIN INTAKE GRID (ENQUIRY FORM + DIRECT CHANNELS & PLACEHOLDERS) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24">
        <Container width="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* ===================================================================== */}
            {/* LEFT COLUMN: ENQUIRY FORM (Lg: 7 cols) */}
            {/* ===================================================================== */}
            <div className="lg:col-span-7">
              <div className="matte-card p-6 sm:p-10 rounded-2xl border border-[#262634] relative shadow-2xl">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
                      Commercial Intake Form
                    </span>
                    <span className="text-[11px] text-[#7E7E8B]">
                      * Required Fields
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white font-heading">
                    Structured Consultation Request
                  </h2>
                  <p className="text-xs text-[#8E8E98] mt-1 leading-relaxed">
                    Provide your commercial parameters. A senior strategist will review your intake within one business day.
                  </p>
                </div>

                {/* ----------------------------------------------------------------- */}
                {/* SUBMISSION STATE: SUCCESS */}
                {/* ----------------------------------------------------------------- */}
                {status === 'success' && (
                  <div className="p-8 rounded-2xl bg-[#121614] border border-emerald-500/40 text-left animate-fade-in space-y-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>

                    <div>
                      <span className={`text-[10px] font-mono uppercase tracking-widest block font-bold ${isDuplicate ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {isDuplicate ? 'Prior Submission Recognized' : 'Enquiry Recorded Successfully'}
                      </span>
                      <h3 className="text-2xl font-bold text-white font-heading mt-1">
                        {isDuplicate ? 'Inquiry Already Active in Review Queue' : 'Consultation Intake Registered'}
                      </h3>
                      <p className="text-xs text-[#A0B0A8] leading-relaxed mt-2">
                        {isDuplicate
                          ? `An identical consultation request for ${formData.businessName} was recorded recently. Our strategy team is actively reviewing your parameters.`
                          : `Thank you, ${formData.fullName}. Your inquiry on behalf of ${formData.businessName} has been logged in our secure review queue.`}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0D1210] border border-[#1A2620] space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#7A8A80] font-mono">Reference Code:</span>
                        <span className="text-[#D4AF37] font-mono font-bold">{submissionReference}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#7A8A80] font-mono">Selected Service:</span>
                        <span className="text-white font-medium">{formData.requiredService}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#7A8A80] font-mono">Target Goal:</span>
                        <span className="text-white font-medium">{formData.businessGoal}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#7A8A80] font-mono">Target Email:</span>
                        <span className="text-white font-medium">{formData.email}</span>
                      </div>
                    </div>

                    {emailDeliveryInfo && (
                      <div className="p-3.5 rounded-xl bg-[#0A100C] border border-[#18281E] text-[11px] text-[#809088] leading-relaxed">
                        <span className="text-white block font-semibold mb-0.5 font-mono text-[10px] uppercase text-[#D4AF37]">
                          Notification Dispatch Status:
                        </span>
                        <span>{emailDeliveryInfo}</span>
                      </div>
                    )}

                    <div className="p-4 rounded-xl bg-[#141916] text-xs text-[#8A9A90] space-y-1.5 leading-relaxed">
                      <div className="font-semibold text-white">Next Operational Steps:</div>
                      <div>1. Strategy desk reviews channel viability and competitive landscape.</div>
                      <div>2. A customized preliminary discovery brief is prepared within 1 business day.</div>
                      <div>3. Direct contact will be initiated via email or telephone to schedule briefing.</div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#1D2520] hover:bg-[#253028] text-white text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigate('packages')}
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>Review Approved Packages</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* SUBMISSION STATE: FAILURE (Dismissible Error Banner) */}
                {/* ----------------------------------------------------------------- */}
                {status === 'failure' && (
                  <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-200 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-1">
                      <div className="font-bold text-white">Transmission Notice</div>
                      <p className="text-red-300">
                        {serverErrorMessage ||
                          'We were unable to complete your inquiry submission. Your field entries have been preserved below.'}
                      </p>
                      <button
                        type="button"
                        onClick={() => setStatus('idle')}
                        className="text-xs text-red-300 hover:text-white underline font-semibold mt-1 inline-block"
                      >
                        Return to form and retry
                      </button>
                    </div>
                  </div>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* THE ACTIVE FORM (Rendered when idle or loading or failure) */}
                {/* ----------------------------------------------------------------- */}
                {status !== 'success' && (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Invisible Honeypot Field for Spam Prevention */}
                    <div className="opacity-0 absolute -z-50 pointer-events-none h-0 overflow-hidden" aria-hidden="true">
                      <label htmlFor="website_hp">Leave this field blank</label>
                      <input
                        id="website_hp"
                        name="website_hp"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    {/* Field 1 & 2: Full Name & Business Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-xs font-semibold text-[#B0B0BC] mb-1.5 uppercase tracking-wider"
                        >
                          Full Name <span className="text-[#D4AF37]">*</span>
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          required
                          disabled={status === 'loading'}
                          value={formData.fullName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="e.g. Marcus Vance"
                          aria-invalid={!!errors.fullName}
                          aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                          className={`
                            w-full min-h-[44px] px-4 py-3 rounded-xl bg-[#131318] border text-white text-xs placeholder:text-[#525260] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] transition-colors
                            ${
                              errors.fullName
                                ? 'border-red-500/80 focus:border-red-500 focus-visible:ring-red-400'
                                : 'border-[#242430] focus:border-[#D4AF37]'
                            }
                          `}
                        />
                        {errors.fullName && (
                          <p id="fullName-error" className="mt-1 text-[11px] text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                            <span>{errors.fullName}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="businessName"
                          className="block text-xs font-semibold text-[#B0B0BC] mb-1.5 uppercase tracking-wider"
                        >
                          Business Name <span className="text-[#D4AF37]">*</span>
                        </label>
                        <input
                          id="businessName"
                          name="businessName"
                          type="text"
                          required
                          disabled={status === 'loading'}
                          value={formData.businessName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="e.g. Apex Industrial Solutions"
                          aria-invalid={!!errors.businessName}
                          aria-describedby={errors.businessName ? 'businessName-error' : undefined}
                          className={`
                            w-full min-h-[44px] px-4 py-3 rounded-xl bg-[#131318] border text-white text-xs placeholder:text-[#525260] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] transition-colors
                            ${
                              errors.businessName
                                ? 'border-red-500/80 focus:border-red-500 focus-visible:ring-red-400'
                                : 'border-[#242430] focus:border-[#D4AF37]'
                            }
                          `}
                        />
                        {errors.businessName && (
                          <p id="businessName-error" className="mt-1 text-[11px] text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                            <span>{errors.businessName}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Field 3 & 4: Email & Phone/WhatsApp */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold text-[#B0B0BC] mb-1.5 uppercase tracking-wider"
                        >
                          Email Address <span className="text-[#D4AF37]">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          disabled={status === 'loading'}
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="marcus@company.com"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                          className={`
                            w-full min-h-[44px] px-4 py-3 rounded-xl bg-[#131318] border text-white text-xs placeholder:text-[#525260] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] transition-colors
                            ${
                              errors.email
                                ? 'border-red-500/80 focus:border-red-500 focus-visible:ring-red-400'
                                : 'border-[#242430] focus:border-[#D4AF37]'
                            }
                          `}
                        />
                        {errors.email && (
                          <p id="email-error" className="mt-1 text-[11px] text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="phoneOrWhatsApp"
                          className="block text-xs font-semibold text-[#B0B0BC] mb-1.5 uppercase tracking-wider"
                        >
                          Phone / WhatsApp <span className="text-[#D4AF37]">*</span>
                        </label>
                        <input
                          id="phoneOrWhatsApp"
                          name="phoneOrWhatsApp"
                          type="tel"
                          required
                          disabled={status === 'loading'}
                          value={formData.phoneOrWhatsApp}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="+1 (555) 000-0000"
                          aria-invalid={!!errors.phoneOrWhatsApp}
                          aria-describedby={errors.phoneOrWhatsApp ? 'phone-error' : undefined}
                          className={`
                            w-full min-h-[44px] px-4 py-3 rounded-xl bg-[#131318] border text-white text-xs placeholder:text-[#525260] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] transition-colors
                            ${
                              errors.phoneOrWhatsApp
                                ? 'border-red-500/80 focus:border-red-500 focus-visible:ring-red-400'
                                : 'border-[#242430] focus:border-[#D4AF37]'
                            }
                          `}
                        />
                        {errors.phoneOrWhatsApp && (
                          <p id="phone-error" className="mt-1 text-[11px] text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                            <span>{errors.phoneOrWhatsApp}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Field 5 & 6: Required Service & Business Goal */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="requiredService"
                          className="block text-xs font-semibold text-[#B0B0BC] mb-1.5 uppercase tracking-wider"
                        >
                          Required Service <span className="text-[#D4AF37]">*</span>
                        </label>
                        <select
                          id="requiredService"
                          name="requiredService"
                          disabled={status === 'loading'}
                          value={formData.requiredService}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-[#131318] border border-[#242430] focus:border-[#D4AF37] focus-visible:ring-2 focus-visible:ring-[#D4AF37] text-white text-xs focus:outline-none transition-colors"
                        >
                          <option value="Lead Generation System (Small Business)">
                            Package 1: Small Business (Lead Generation System)
                          </option>
                          <option value="Lead + Sales Growth System (Medium Business)">
                            Package 2: Medium Business (Lead + Sales Growth System)
                          </option>
                          <option disabled className="text-[#666675]">
                            ──────── Individual Services ────────
                          </option>
                          {APPROVED_SERVICES.map((srv) => (
                            <option key={srv.id} value={srv.name}>
                              {srv.name} ({srv.category})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="businessGoal"
                          className="block text-xs font-semibold text-[#B0B0BC] mb-1.5 uppercase tracking-wider"
                        >
                          Primary Business Goal <span className="text-[#D4AF37]">*</span>
                        </label>
                        <select
                          id="businessGoal"
                          name="businessGoal"
                          disabled={status === 'loading'}
                          value={formData.businessGoal}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full min-h-[44px] px-4 py-3 rounded-xl bg-[#131318] border border-[#242430] focus:border-[#D4AF37] focus-visible:ring-2 focus-visible:ring-[#D4AF37] text-white text-xs focus:outline-none transition-colors"
                        >
                          {BUSINESS_GOALS.map((goal, idx) => (
                            <option key={idx} value={goal}>
                              {goal}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Field 7: Additional Message (Optional) */}
                    <div>
                      <label
                        htmlFor="additionalMessage"
                        className="block text-xs font-semibold text-[#B0B0BC] mb-1.5 uppercase tracking-wider flex items-center justify-between"
                      >
                        <span>Additional Message / Context</span>
                        <span className="text-[10px] text-[#6E6E7A] font-normal lowercase">(optional)</span>
                      </label>
                      <textarea
                        id="additionalMessage"
                        name="additionalMessage"
                        rows={4}
                        disabled={status === 'loading'}
                        value={formData.additionalMessage}
                        onChange={handleChange}
                        placeholder="Tell us about your target market, monthly advertising budget expectations, or existing bottleneck..."
                        className="w-full px-4 py-3 rounded-xl bg-[#131318] border border-[#242430] focus:border-[#D4AF37] focus-visible:ring-2 focus-visible:ring-[#D4AF37] text-white text-xs placeholder:text-[#525260] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Explicit Consent Checkboxes */}
                    <div className="space-y-3 pt-2">
                      {/* Required Enquiry Processing Consent */}
                      <div>
                        <label htmlFor="agreeToEnquiryProcessing" className="flex items-start gap-3 cursor-pointer text-xs text-[#9E9EA8] select-none">
                          <input
                            type="checkbox"
                            id="agreeToEnquiryProcessing"
                            name="agreeToEnquiryProcessing"
                            checked={formData.agreeToEnquiryProcessing}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-4 h-4 rounded border-[#303040] bg-[#141419] text-[#D4AF37] focus:ring-[#D4AF37] focus-visible:ring-2 focus-visible:ring-[#D4AF37] mt-0.5"
                          />
                          <span className="leading-relaxed">
                            I understand and agree that ADVERUNE will process the business details submitted above strictly to evaluate and respond to this commercial inquiry in accordance with the{' '}
                            <button
                              type="button"
                              onClick={() => onNavigate('privacy')}
                              className="text-[#D4AF37] underline hover:text-white focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded"
                            >
                              Privacy Policy
                            </button>
                            . <span className="text-[#D4AF37]">*</span>
                          </span>
                        </label>
                        {errors.agreeToEnquiryProcessing && (
                          <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1 pl-7">
                            <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                            <span>{errors.agreeToEnquiryProcessing}</span>
                          </p>
                        )}
                      </div>

                      {/* Optional Marketing Opt-In (NEVER AUTO-CHECKED per user governance rule) */}
                      <div className="p-3 rounded-xl bg-[#0F0F14] border border-[#1A1A22]">
                        <label htmlFor="marketingOptIn" className="flex items-start gap-3 cursor-pointer text-xs text-[#7E7E8B] select-none">
                          <input
                            type="checkbox"
                            id="marketingOptIn"
                            name="marketingOptIn"
                            checked={formData.marketingOptIn}
                            onChange={handleChange}
                            className="w-4 h-4 rounded border-[#303040] bg-[#141419] text-[#D4AF37] focus:ring-[#D4AF37] focus-visible:ring-2 focus-visible:ring-[#D4AF37] mt-0.5"
                          />
                          <span className="leading-relaxed">
                            <strong className="text-white block font-medium">Optional Marketing Updates:</strong>
                            I would like to receive occasional executive research briefings and digital advertising insights. (Consent is entirely optional and is never required for submitting this inquiry).
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Confidentiality Reminder */}
                    <div className="p-3.5 rounded-xl bg-[#121217] border border-[#20202A] text-[11px] text-[#8A8A96] flex items-start gap-2.5">
                      <Shield className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>
                        Mutual Non-Disclosure: All business parameters, market targets, and commercial details submitted are held under strict confidentiality.
                      </span>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className={`
                        w-full min-h-[44px] py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0D] focus-visible:outline-none
                        ${
                          status === 'loading'
                            ? 'bg-[#1D1D28] text-[#808090] cursor-not-allowed'
                            : 'bg-gradient-to-r from-[#FFF0BE] via-[#D4AF37] to-[#B8860B] text-[#0B0B0D] hover:brightness-110 shadow-xl shadow-[#D4AF37]/15'
                        }
                      `}
                    >
                      {status === 'loading' ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" aria-hidden="true" />
                          <span>Dispatching Consultation Intake...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Strategic Consultation Request</span>
                          <Send className="w-4 h-4" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* ===================================================================== */}
            {/* RIGHT COLUMN: WHATSAPP, EMAIL & OFFICIAL PLACEHOLDERS (Lg: 5 cols) */}
            {/* ===================================================================== */}
            <div className="lg:col-span-5 space-y-6">
              {/* 4. WHATSAPP CONTACT CARD */}
              <div className="matte-card p-6 sm:p-7 rounded-2xl border border-[#252533] relative overflow-hidden group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold block">
                      Rapid Channel
                    </span>
                    <h3 className="text-base font-bold text-white font-heading">
                      Direct WhatsApp Desk
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-[#9595A2] leading-relaxed mb-4">
                  For immediate executive inquiries or urgent strategic briefs. Click below to initiate direct WhatsApp communication once configuration is live.
                </p>

                {/* Formal WhatsApp Placeholder per guidelines */}
                <div className="p-3.5 rounded-xl bg-[#0D120F] border border-emerald-900/30 mb-4 text-xs">
                  <span className="text-[10px] font-mono text-[#7A8A80] uppercase block mb-1">
                    Verified Number Placeholder:
                  </span>
                  <div className="flex items-center justify-between font-mono text-emerald-400 font-bold">
                    <span>[OFFICIAL WHATSAPP BUSINESS NUMBER TO BE CONFIGURED]</span>
                    <button
                      type="button"
                      onClick={() => handleCopyNotice('[OFFICIAL WHATSAPP BUSINESS NUMBER TO BE CONFIGURED]', 'whatsapp')}
                      className="p-1 text-[#8A9A90] hover:text-white"
                      title="Copy placeholder tag"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {copiedPlaceholder === 'whatsapp' && (
                    <span className="text-[10px] text-emerald-400 mt-1 block">Copied tag to clipboard!</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    trackWhatsAppClick('contact_page_card');
                    setWhatsAppNotice('Official WhatsApp Business channel configuration is pending production deployment. Please submit the structured consultation form or email our corporate inbox directly.');
                  }}
                  className="w-full min-h-[44px] py-3 px-4 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0D] focus-visible:outline-none"
                >
                  <MessageSquare className="w-4 h-4" aria-hidden="true" />
                  <span>Open WhatsApp Conversation</span>
                </button>
                {whatsAppNotice && (
                  <div className="mt-3 p-3 rounded-xl bg-[#0E1712] border border-emerald-500/40 text-[11px] text-emerald-200 leading-relaxed flex items-start gap-2 animate-fade-in" role="status">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{whatsAppNotice}</span>
                  </div>
                )}
              </div>

              {/* 5. OFFICIAL EMAIL PLACEHOLDER CARD */}
              <div className="matte-card p-6 sm:p-7 rounded-2xl border border-[#252533]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1A1A24] border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#D4AF37] font-bold block">
                      Formal Correspondence
                    </span>
                    <h3 className="text-base font-bold text-white font-heading">
                      Official Agency Email
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-[#9595A2] leading-relaxed mb-4">
                  Send requests for proposals (RFPs), enterprise briefs, and partnership documents directly to our corporate inbox.
                </p>

                {/* Formal Email Placeholder per guidelines */}
                <div className="p-3.5 rounded-xl bg-[#101016] border border-[#20202E] mb-3 text-xs">
                  <span className="text-[10px] font-mono text-[#707080] uppercase block mb-1">
                    Designated Corporate Inbox:
                  </span>
                  <div className="flex items-center justify-between font-mono text-white font-bold">
                    <span className="text-xs break-all">[OFFICIAL EMAIL ADDRESS TO BE CONFIGURED]</span>
                    <button
                      type="button"
                      onClick={() => {
                        trackEmailClick('contact_page_card');
                        handleCopyNotice('[OFFICIAL EMAIL ADDRESS TO BE CONFIGURED]', 'email');
                      }}
                      className="p-1 text-[#8A8A96] hover:text-white"
                      title="Copy placeholder tag"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {copiedPlaceholder === 'email' && (
                    <span className="text-[10px] text-[#D4AF37] mt-1 block">Copied tag to clipboard!</span>
                  )}
                </div>

                <div className="text-[11px] text-[#70707C] leading-normal italic">
                  * Dedicated domain-authenticated email infrastructure will be configured on customer production server.
                </div>
              </div>

              {/* 6. BUSINESS INFORMATION PLACEHOLDERS */}
              <div className="matte-card p-6 sm:p-7 rounded-2xl border border-[#252533] space-y-4">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-xl bg-[#161622] border border-[#262634] text-[#A0A0B0] flex items-center justify-center">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#8E8E98] font-bold block">
                      Corporate Registry
                    </span>
                    <h3 className="text-base font-bold text-white font-heading">
                      Business Entity Details
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#111116] border border-[#1E1E28]">
                    <span className="text-[10px] font-mono text-[#707080] uppercase block mb-0.5">
                      Registered Legal Entity:
                    </span>
                    <span className="text-white font-mono text-[11px] font-semibold">
                      [REGISTERED LEGAL ENTITY NAME TO BE CONFIGURED]
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#111116] border border-[#1E1E28]">
                    <span className="text-[10px] font-mono text-[#707080] uppercase block mb-0.5">
                      Corporate Registered Address:
                    </span>
                    <span className="text-white font-mono text-[11px]">
                      [REGISTERED CORPORATE ADDRESS TO BE CONFIGURED]
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#111116] border border-[#1E1E28]">
                    <span className="text-[10px] font-mono text-[#707080] uppercase block mb-0.5">
                      Commercial Registration / Tax Number:
                    </span>
                    <span className="text-white font-mono text-[11px]">
                      [BUSINESS REGISTRATION / VAT NUMBER TO BE CONFIGURED]
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#111116] border border-[#1E1E28] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#707080] uppercase block mb-0.5">
                        Operating Desk Hours:
                      </span>
                      <span className="text-white font-medium">Monday – Friday: 09:00 – 18:00</span>
                    </div>
                    <Clock className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 7. CONTACT SPECIFIC FAQS */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-t border-[#1A1A22] bg-[#0C0C10]">
        <Container width="narrow">
          <SectionHeading
            eyebrow="Consultation Protocols"
            title="Inquiry & Onboarding"
            goldGradientText="Frequently Asked Questions"
            description="Clear guidelines on how ADVERUNE reviews inquiries, schedules strategy sessions, and protects business privacy."
            className="mb-12 text-center"
          />

          <FAQAccordion items={CONTACT_SPECIFIC_FAQS} defaultOpenId="c-faq-1" />
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 8. FINAL CTA */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 border-t border-[#1A1A22] bg-[#0A0A0E] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

        <Container width="standard" className="relative z-10 text-center">
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-2 font-mono">
            Commercial Alignment
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            Prefer to Review Our Architecture <br />
            <span className="gold-text-gradient">Before Reaching Out?</span>
          </h2>

          <p className="text-sm sm:text-base text-[#92929D] max-w-xl mx-auto leading-relaxed mb-8">
            Explore our 8-stage operational methodology or compare our approved service packages to determine the ideal setup for your business.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <PrimaryButton size="lg" onClick={() => onNavigate('packages')}>
              Explore Approved Packages
            </PrimaryButton>
            <SecondaryButton size="lg" onClick={() => onNavigate('process')}>
              View 8-Stage Methodology
            </SecondaryButton>
          </div>
        </Container>
      </section>
    </div>
  );
}
