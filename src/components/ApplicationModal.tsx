import { useState, useRef, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Check, Loader2, AlertCircle, Eraser, UploadCloud, FileText, Trash2, Info } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AttachmentFile {
  name: string;
  url: string;
  path: string;
  size: number;
  type: string;
}

interface Props {
  onClose: () => void;
}

const STEPS = [
  'Contact Info',
  'Company',
  'Strategy',
  'Financials',
  'Participation',
  'Demographics & Consent',
];

const INDUSTRIES = [
  'Aerospace & Defense',
  'Agriculture & Farming',
  'AgriTech',
  'AI & Machine Learning',
  'Automotive',
  'Biotechnology & Life Sciences',
  'CleanEnergy / CleanTech',
  'Construction & Engineering',
  'Consumer Goods',
  'Cybersecurity',
  'Data & Analytics',
  'E-Commerce & Retail',
  'EdTech',
  'Energy & Utilities',
  'Entertainment & Media',
  'Fashion & Apparel',
  'FinTech',
  'Food & Beverage',
  'Gaming & Esports',
  'Government & Public Sector',
  'Healthcare & Medical Devices',
  'HealthTech',
  'Hospitality & Tourism',
  'HR & Recruiting',
  'Insurance',
  'Internet of Things (IoT)',
  'Legal Tech',
  'Logistics & Supply Chain',
  'Manufacturing',
  'Marketing & Advertising',
  'Media & Entertainment',
  'Mining & Metals',
  'Non-Profit & Social Impact',
  'Oil & Gas',
  'Pharmaceuticals',
  'Real Estate / PropTech',
  'Retail / E-Commerce',
  'Robotics',
  'SaaS / Software',
  'Space Tech',
  'Sports & Fitness',
  'Telecommunications',
  'Transportation & Mobility',
  'Travel & Leisure',
  'Veterinary & Animal Health',
  'Wearables & Consumer Electronics',
  'Other',
];

const HQ_LOCATIONS = [
  'Austin, TX',
  'Dallas-Fort Worth, TX',
  'Houston, TX',
  'San Antonio, TX',
  'Other Texas Metro',
  'Outside Texas',
];

const COUNTRY_CODES = [
  { code: '+1', label: 'United States (+1)' },
  { code: '+1', label: 'Canada (+1)' },
  { code: '+44', label: 'United Kingdom (+44)' },
  { code: '+93', label: 'Afghanistan (+93)' },
  { code: '+355', label: 'Albania (+355)' },
  { code: '+213', label: 'Algeria (+213)' },
  { code: '+376', label: 'Andorra (+376)' },
  { code: '+244', label: 'Angola (+244)' },
  { code: '+672', label: 'Antarctica (+672)' },
  { code: '+54', label: 'Argentina (+54)' },
  { code: '+374', label: 'Armenia (+374)' },
  { code: '+297', label: 'Aruba (+297)' },
  { code: '+61', label: 'Australia (+61)' },
  { code: '+43', label: 'Austria (+43)' },
  { code: '+994', label: 'Azerbaijan (+994)' },
  { code: '+973', label: 'Bahrain (+973)' },
  { code: '+880', label: 'Bangladesh (+880)' },
  { code: '+375', label: 'Belarus (+375)' },
  { code: '+32', label: 'Belgium (+32)' },
  { code: '+501', label: 'Belize (+501)' },
  { code: '+229', label: 'Benin (+229)' },
  { code: '+975', label: 'Bhutan (+975)' },
  { code: '+591', label: 'Bolivia (+591)' },
  { code: '+387', label: 'Bosnia and Herzegovina (+387)' },
  { code: '+267', label: 'Botswana (+267)' },
  { code: '+55', label: 'Brazil (+55)' },
  { code: '+673', label: 'Brunei (+673)' },
  { code: '+359', label: 'Bulgaria (+359)' },
  { code: '+226', label: 'Burkina Faso (+226)' },
  { code: '+257', label: 'Burundi (+257)' },
  { code: '+855', label: 'Cambodia (+855)' },
  { code: '+237', label: 'Cameroon (+237)' },
  { code: '+238', label: 'Cape Verde (+238)' },
  { code: '+236', label: 'Central African Republic (+236)' },
  { code: '+235', label: 'Chad (+235)' },
  { code: '+56', label: 'Chile (+56)' },
  { code: '+86', label: 'China (+86)' },
  { code: '+57', label: 'Colombia (+57)' },
  { code: '+269', label: 'Comoros (+269)' },
  { code: '+682', label: 'Cook Islands (+682)' },
  { code: '+506', label: 'Costa Rica (+506)' },
  { code: '+385', label: 'Croatia (+385)' },
  { code: '+53', label: 'Cuba (+53)' },
  { code: '+357', label: 'Cyprus (+357)' },
  { code: '+420', label: 'Czech Republic (+420)' },
  { code: '+45', label: 'Denmark (+45)' },
  { code: '+253', label: 'Djibouti (+253)' },
  { code: '+670', label: 'East Timor (+670)' },
  { code: '+593', label: 'Ecuador (+593)' },
  { code: '+20', label: 'Egypt (+20)' },
  { code: '+503', label: 'El Salvador (+503)' },
  { code: '+240', label: 'Equatorial Guinea (+240)' },
  { code: '+291', label: 'Eritrea (+291)' },
  { code: '+372', label: 'Estonia (+372)' },
  { code: '+251', label: 'Ethiopia (+251)' },
  { code: '+500', label: 'Falkland Islands (+500)' },
  { code: '+298', label: 'Faroe Islands (+298)' },
  { code: '+679', label: 'Fiji (+679)' },
  { code: '+358', label: 'Finland (+358)' },
  { code: '+33', label: 'France (+33)' },
  { code: '+241', label: 'Gabon (+241)' },
  { code: '+220', label: 'Gambia (+220)' },
  { code: '+995', label: 'Georgia (+995)' },
  { code: '+49', label: 'Germany (+49)' },
  { code: '+233', label: 'Ghana (+233)' },
  { code: '+350', label: 'Gibraltar (+350)' },
  { code: '+30', label: 'Greece (+30)' },
  { code: '+299', label: 'Greenland (+299)' },
  { code: '+502', label: 'Guatemala (+502)' },
  { code: '+224', label: 'Guinea (+224)' },
  { code: '+245', label: 'Guinea-Bissau (+245)' },
  { code: '+592', label: 'Guyana (+592)' },
  { code: '+509', label: 'Haiti (+509)' },
  { code: '+504', label: 'Honduras (+504)' },
  { code: '+852', label: 'Hong Kong (+852)' },
  { code: '+36', label: 'Hungary (+36)' },
  { code: '+354', label: 'Iceland (+354)' },
  { code: '+91', label: 'India (+91)' },
  { code: '+62', label: 'Indonesia (+62)' },
  { code: '+98', label: 'Iran (+98)' },
  { code: '+964', label: 'Iraq (+964)' },
  { code: '+353', label: 'Ireland (+353)' },
  { code: '+972', label: 'Israel (+972)' },
  { code: '+39', label: 'Italy (+39)' },
  { code: '+225', label: 'Ivory Coast (+225)' },
  { code: '+81', label: 'Japan (+81)' },
  { code: '+962', label: 'Jordan (+962)' },
  { code: '+7', label: 'Kazakhstan (+7)' },
  { code: '+254', label: 'Kenya (+254)' },
  { code: '+686', label: 'Kiribati (+686)' },
  { code: '+965', label: 'Kuwait (+965)' },
  { code: '+996', label: 'Kyrgyzstan (+996)' },
  { code: '+856', label: 'Laos (+856)' },
  { code: '+371', label: 'Latvia (+371)' },
  { code: '+961', label: 'Lebanon (+961)' },
  { code: '+266', label: 'Lesotho (+266)' },
  { code: '+231', label: 'Liberia (+231)' },
  { code: '+218', label: 'Libya (+218)' },
  { code: '+423', label: 'Liechtenstein (+423)' },
  { code: '+370', label: 'Lithuania (+370)' },
  { code: '+352', label: 'Luxembourg (+352)' },
  { code: '+853', label: 'Macau (+853)' },
  { code: '+389', label: 'North Macedonia (+389)' },
  { code: '+261', label: 'Madagascar (+261)' },
  { code: '+265', label: 'Malawi (+265)' },
  { code: '+60', label: 'Malaysia (+60)' },
  { code: '+960', label: 'Maldives (+960)' },
  { code: '+223', label: 'Mali (+223)' },
  { code: '+356', label: 'Malta (+356)' },
  { code: '+692', label: 'Marshall Islands (+692)' },
  { code: '+222', label: 'Mauritania (+222)' },
  { code: '+230', label: 'Mauritius (+230)' },
  { code: '+52', label: 'Mexico (+52)' },
  { code: '+691', label: 'Micronesia (+691)' },
  { code: '+373', label: 'Moldova (+373)' },
  { code: '+377', label: 'Monaco (+377)' },
  { code: '+976', label: 'Mongolia (+976)' },
  { code: '+382', label: 'Montenegro (+382)' },
  { code: '+212', label: 'Morocco (+212)' },
  { code: '+258', label: 'Mozambique (+258)' },
  { code: '+95', label: 'Myanmar (+95)' },
  { code: '+264', label: 'Namibia (+264)' },
  { code: '+674', label: 'Nauru (+674)' },
  { code: '+977', label: 'Nepal (+977)' },
  { code: '+31', label: 'Netherlands (+31)' },
  { code: '+64', label: 'New Zealand (+64)' },
  { code: '+505', label: 'Nicaragua (+505)' },
  { code: '+227', label: 'Niger (+227)' },
  { code: '+234', label: 'Nigeria (+234)' },
  { code: '+47', label: 'Norway (+47)' },
  { code: '+968', label: 'Oman (+968)' },
  { code: '+92', label: 'Pakistan (+92)' },
  { code: '+680', label: 'Palau (+680)' },
  { code: '+507', label: 'Panama (+507)' },
  { code: '+675', label: 'Papua New Guinea (+675)' },
  { code: '+595', label: 'Paraguay (+595)' },
  { code: '+51', label: 'Peru (+51)' },
  { code: '+63', label: 'Philippines (+63)' },
  { code: '+48', label: 'Poland (+48)' },
  { code: '+351', label: 'Portugal (+351)' },
  { code: '+974', label: 'Qatar (+974)' },
  { code: '+40', label: 'Romania (+40)' },
  { code: '+7', label: 'Russia (+7)' },
  { code: '+250', label: 'Rwanda (+250)' },
  { code: '+685', label: 'Samoa (+685)' },
  { code: '+378', label: 'San Marino (+378)' },
  { code: '+966', label: 'Saudi Arabia (+966)' },
  { code: '+221', label: 'Senegal (+221)' },
  { code: '+381', label: 'Serbia (+381)' },
  { code: '+248', label: 'Seychelles (+248)' },
  { code: '+232', label: 'Sierra Leone (+232)' },
  { code: '+65', label: 'Singapore (+65)' },
  { code: '+421', label: 'Slovakia (+421)' },
  { code: '+386', label: 'Slovenia (+386)' },
  { code: '+677', label: 'Solomon Islands (+677)' },
  { code: '+252', label: 'Somalia (+252)' },
  { code: '+27', label: 'South Africa (+27)' },
  { code: '+82', label: 'South Korea (+82)' },
  { code: '+211', label: 'South Sudan (+211)' },
  { code: '+34', label: 'Spain (+34)' },
  { code: '+94', label: 'Sri Lanka (+94)' },
  { code: '+249', label: 'Sudan (+249)' },
  { code: '+597', label: 'Suriname (+597)' },
  { code: '+268', label: 'Eswatini (+268)' },
  { code: '+46', label: 'Sweden (+46)' },
  { code: '+41', label: 'Switzerland (+41)' },
  { code: '+963', label: 'Syria (+963)' },
  { code: '+886', label: 'Taiwan (+886)' },
  { code: '+992', label: 'Tajikistan (+992)' },
  { code: '+255', label: 'Tanzania (+255)' },
  { code: '+66', label: 'Thailand (+66)' },
  { code: '+228', label: 'Togo (+228)' },
  { code: '+676', label: 'Tonga (+676)' },
  { code: '+216', label: 'Tunisia (+216)' },
  { code: '+90', label: 'Turkey (+90)' },
  { code: '+993', label: 'Turkmenistan (+993)' },
  { code: '+256', label: 'Uganda (+256)' },
  { code: '+380', label: 'Ukraine (+380)' },
  { code: '+971', label: 'United Arab Emirates (+971)' },
  { code: '+598', label: 'Uruguay (+598)' },
  { code: '+998', label: 'Uzbekistan (+998)' },
  { code: '+678', label: 'Vanuatu (+678)' },
  { code: '+58', label: 'Venezuela (+58)' },
  { code: '+84', label: 'Vietnam (+84)' },
  { code: '+967', label: 'Yemen (+967)' },
  { code: '+260', label: 'Zambia (+260)' },
  { code: '+263', label: 'Zimbabwe (+263)' },
];

const HOW_HEARD_OPTIONS = [
  'Social Media (LinkedIn, Instagram, etc.)',
  'Friend or Colleague Referral',
  'News Article / Media Coverage',
  'Chamber of Commerce Announcement',
  'Email Newsletter',
  'Event / Conference',
  'Other',
];

const FOUNDER_DESCRIPTION_OPTIONS = [
  'First time founder',
  'Person of color',
  'Woman',
  'Veteran',
  'Member of the LGBTQ+ community',
  'Migrant or refugee',
  'At or below the poverty line',
  'Prefer not to say',
  'None of the above',
];

// ── Signature Pad ──────────────────────────────────────────────
function SignaturePad({ value, onChange }: { value: string; onChange: (dataUrl: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const hasStrokes = useRef(false);

  useEffect(() => {
    if (!value && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      hasStrokes.current = false;
    }
  }, [value]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ('touches' in e) {
      const t = e.touches[0];
      return { x: (t.clientX - rect.left) * scaleX, y: (t.clientY - rect.top) * scaleY };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    drawing.current = true;
    lastPos.current = getPos(e);
    const ctx = canvasRef.current!.getContext('2d')!;
    ctx.beginPath();
    ctx.arc(lastPos.current.x, lastPos.current.y, 1, 0, Math.PI * 2);
    ctx.fillStyle = '#0c235e';
    ctx.fill();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!drawing.current || !lastPos.current) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const pos = getPos(e);
    ctx.strokeStyle = '#0c235e';
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
    hasStrokes.current = true;
  };

  const endDraw = () => {
    if (!drawing.current) return;
    drawing.current = false;
    lastPos.current = null;
    if (hasStrokes.current) onChange(canvasRef.current!.toDataURL('image/png'));
  };

  const clear = () => {
    const canvas = canvasRef.current!;
    canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height);
    hasStrokes.current = false;
    onChange('');
  };

  return (
    <div className="space-y-1.5">
      <div className="relative rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 overflow-hidden hover:border-amber-300 transition-colors"
        style={{ touchAction: 'none' }}>
        <canvas
          ref={canvasRef}
          width={600}
          height={160}
          className="w-full h-36 block cursor-crosshair"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
        {!value && (
          <span className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm pointer-events-none select-none">
            Sign here
          </span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">Draw your signature above using mouse or touch</span>
        <button
          type="button"
          onClick={clear}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors px-2 py-1 rounded hover:bg-red-50"
        >
          <Eraser className="w-3.5 h-3.5" /> Clear
        </button>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────

type FormData = {
  // Section 1
  first_name: string;
  last_name: string;
  email: string;
  phone_country_code: string;
  phone: string;
  title_position: string;
  // Section 2
  company_name: string;
  company_description: string;
  problem_solved: string;
  date_founded: string;
  headquarters_location: string;
  industry: string;
  // Section 3
  founding_team_full_time: string;
  scalable_tech_enabled: string;
  social_business_venture: string;
  current_development_stage: string;
  top_competitors: string;
  competitive_differentiation: string;
  // Section 4
  has_paying_clients: string;
  total_employees: string;
  monthly_recurring_revenue: string;
  // Section 5
  participation_goals: string;
  how_heard: string;
  available_for_demo: string;
  attachments: AttachmentFile[];
  // Section 6
  founder_descriptions: string[];
  founders_count: string;
  data_consent: boolean;
  info_accurate: boolean;
  understands_disqualification: boolean;
  declaration_agreed: boolean;
  // Signature block
  signatory_name: string;
  signed_date: string;
  signature_data_url: string;
};

const EMPTY: FormData = {
  first_name: '', last_name: '', email: '', phone_country_code: '+1', phone: '', title_position: '',
  company_name: '', company_description: '', problem_solved: '', date_founded: '', headquarters_location: '', industry: '',
  founding_team_full_time: '', scalable_tech_enabled: '', social_business_venture: '', current_development_stage: '', top_competitors: '', competitive_differentiation: '',
  has_paying_clients: '', total_employees: '', monthly_recurring_revenue: '',
  participation_goals: '', how_heard: '', available_for_demo: '',
  attachments: [],
  founder_descriptions: [], founders_count: '',
  data_consent: false, info_accurate: false, understands_disqualification: false, declaration_agreed: false,
  signatory_name: '', signed_date: '', signature_data_url: '',
};

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = 'w-full px-3.5 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-colors';
const selectCls = `${inputCls} appearance-none`;
const textareaCls = `${inputCls} resize-none min-h-[90px]`;

export default function ApplicationModal({ onClose }: Props) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB per file

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadError(null);
    setUploading(true);
    try {
      const newAttachments: AttachmentFile[] = [];
      for (const file of Array.from(files)) {
        if (file.size > MAX_FILE_SIZE) {
          setUploadError(`"${file.name}" exceeds the 10 MB limit.`);
          continue;
        }
        const ext = file.name.split('.').pop() || 'bin';
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const filePath = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;
        const { error: upErr } = await supabase.storage
          .from('application-attachments')
          .upload(filePath, file, { cacheControl: '3600', upsert: false });
        if (upErr) throw new Error(upErr.message);
        const { data: pub } = supabase.storage.from('application-attachments').getPublicUrl(filePath);
        newAttachments.push({ name: file.name, url: pub.publicUrl, path: filePath, size: file.size, type: file.type || ext });
      }
      if (newAttachments.length > 0) {
        setForm(prev => ({ ...prev, attachments: [...prev.attachments, ...newAttachments] }));
      }
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeAttachment = async (idx: number) => {
    const file = form.attachments[idx];
    if (file) {
      await supabase.storage.from('application-attachments').remove([file.path]);
    }
    setForm(prev => ({ ...prev, attachments: prev.attachments.filter((_, i) => i !== idx) }));
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const set = (field: keyof FormData, value: string | boolean | string[]) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const validateStep = (): string | null => {
    if (step === 0) {
      if (!form.first_name.trim()) return 'First name is required.';
      if (!form.last_name.trim()) return 'Last name is required.';
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        return 'A valid email address is required.';
      if (!form.phone_country_code.trim()) return 'Please select a country code.';
      if (!form.phone.trim()) return 'Business phone number is required.';
      if (!form.title_position.trim()) return 'Title / Position is required.';
    }
    if (step === 1) {
      if (!form.company_name.trim()) return 'Business name is required.';
      if (!form.company_description.trim()) return 'Company description is required.';
      if (!form.problem_solved.trim()) return 'Please describe the problem your startup aims to solve.';
      if (!form.date_founded.trim()) return 'Date founded is required.';
      if (!form.headquarters_location.trim()) return 'Headquarters location is required.';
      if (!form.industry.trim()) return 'Industry sector is required.';
    }
    if (step === 2) {
      if (!form.founding_team_full_time.trim()) return 'Please indicate if the founding team is working full-time.';
      if (!form.scalable_tech_enabled.trim()) return 'Please indicate if you are building a scalable, tech-enabled product or service.';
      if (!form.social_business_venture.trim()) return 'Please indicate if you consider your company a Social Business Venture.';
      if (!form.current_development_stage.trim()) return 'Please select your current development stage.';
      if (!form.top_competitors.trim()) return 'Please list your top three competitors.';
      if (!form.competitive_differentiation.trim()) return 'Please describe what differentiates your solution.';
    }
    if (step === 3) {
      if (!form.has_paying_clients.trim()) return 'Please indicate if you currently have paying clients or customers.';
      if (!form.total_employees.trim()) return 'Total employees is required.';
      if (form.has_paying_clients === 'Yes' && !form.monthly_recurring_revenue.trim()) return 'Monthly Recurring Revenue is required when you have paying clients.';
    }
    if (step === 4) {
      if (!form.participation_goals.trim()) return 'Participation goals are required.';
      if (!form.how_heard.trim()) return 'Please tell us how you heard about the forum.';
      if (!form.available_for_demo.trim()) return 'Please indicate if your team is available to demo at the October 17th event.';
    }
    if (step === 5) {
      if (form.founder_descriptions.length === 0) return 'Please select at least one option for founder descriptions.';
      if (!form.founders_count.trim()) return 'Please indicate the number of founders currently working in your startup.';
      if (!form.data_consent) return 'Please consent to the demographic data collection.';
      if (!form.info_accurate) return 'Please confirm the information is accurate.';
      if (!form.understands_disqualification) return 'Please acknowledge the false information policy.';
      if (!form.declaration_agreed) return 'You must agree to the applicant declaration to submit.';
      if (!form.signatory_name.trim()) return 'Please enter your full printed name.';
      if (!form.signed_date) return 'Please select the date of signing.';
      if (!form.signature_data_url) return 'Please draw your signature.';
    }
    return null;
  };

  const next = () => {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError(null);
    setStep(s => s + 1);
  };

  const back = () => { setError(null); setStep(s => s - 1); };

  const submit = async () => {
    const err = validateStep();
    if (err) { setError(err); return; }
    setError(null);
    setSubmitting(true);
    const { error: dbErr } = await supabase.from('applications').insert({
      ...form,
      attachments: form.attachments.length > 0 ? form.attachments : null,
      year_founded: form.date_founded ? new Date(form.date_founded).getFullYear() : null,
      monthly_recurring_revenue: form.monthly_recurring_revenue ? parseFloat(form.monthly_recurring_revenue) : null,
      total_employees: form.total_employees ? parseInt(form.total_employees, 10) : null,
    });
    setSubmitting(false);
    if (dbErr) {
      setError('Submission failed. Please try again.');
      return;
    }
    setSubmitted(true);
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm" />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="font-display text-xl font-bold text-navy-950">Application Submission</h2>
            <p className="text-sm text-gray-500 mt-0.5">Lone Star Investor Forum 2026</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress */}
        {!submitted && (
          <div className="px-6 py-3 border-b border-gray-100 shrink-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{STEPS[step]}</span>
              <span className="text-xs text-gray-400">Step {step + 1} of {STEPS.length}</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex mt-2 gap-1">
              {STEPS.map((s, i) => (
                <div key={s} className={`flex-1 h-0.5 rounded-full transition-colors ${i <= step ? 'bg-amber-500' : 'bg-gray-100'}`} />
              ))}
            </div>
          </div>
        )}

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-display text-2xl font-bold text-navy-950">Application Submitted!</h3>
              <p className="text-gray-500 max-w-sm text-sm leading-relaxed">
                Thank you for applying to the Lone Star Investor Forum 2026. We'll review your
                application and be in touch before the event on October 17th.
              </p>
              <button onClick={onClose} className="mt-2 px-8 py-3 bg-amber-500 hover:bg-amber-400 text-navy-950 font-semibold text-sm rounded-full transition-all">
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Error banner */}
              {error && (
                <div className="flex items-center gap-2 mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              {/* Step 0 – Contact & General Information */}
              {step === 0 && (
                <div className="space-y-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-navy-900">Section 1 — Contact &amp; General Information</h3>
                    <p className="text-xs text-gray-400 mt-1">Tell us about the primary contact for this application.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="First Name" required>
                      <input className={inputCls} placeholder="Jane" value={form.first_name} onChange={e => set('first_name', e.target.value)} />
                    </Field>
                    <Field label="Last Name" required>
                      <input className={inputCls} placeholder="Smith" value={form.last_name} onChange={e => set('last_name', e.target.value)} />
                    </Field>
                  </div>
                  <Field label="Email Address" required>
                    <input type="email" className={inputCls} placeholder="jane@company.com" value={form.email} onChange={e => set('email', e.target.value)} />
                  </Field>
                  <Field label="Business Phone" required>
                    <div className="grid grid-cols-[180px_1fr] gap-2">
                      <select
                        className={selectCls}
                        value={form.phone_country_code}
                        onChange={e => set('phone_country_code', e.target.value)}
                      >
                        {COUNTRY_CODES.map(c => (
                          <option key={c.label} value={c.code}>
                            {c.label}
                          </option>
                        ))}
                      </select>

                      <input
                        type="tel"
                        className={inputCls}
                        placeholder="(512) 555-0100"
                        value={form.phone}
                        onChange={e => set('phone', e.target.value)}
                      />
                    </div>
                  </Field>
                  <Field label="Title / Position" required>
                    <input className={inputCls} placeholder="CEO, Founder, etc." value={form.title_position} onChange={e => set('title_position', e.target.value)} />
                  </Field>
                </div>
              )}

              {/* Step 1 – Company Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-navy-900">Section 2 — Company Information</h3>
                    <p className="text-xs text-gray-400 mt-1">Basic details about your company or venture.</p>
                  </div>
                  <Field label="Business Name" required>
                    <input className={inputCls} placeholder="Acme Corp" value={form.company_name} onChange={e => set('company_name', e.target.value)} />
                  </Field>
                  <Field label="Please provide a 3–4 sentence description of your company, detailing who you are and what you do." required>
                    <textarea className={textareaCls} placeholder="We are a [type] company that [does X] for [audience]. Our mission is to [mission]. We currently [status/ traction]..." value={form.company_description} onChange={e => set('company_description', e.target.value)} />
                  </Field>
                  <Field label="Clearly describe the specific problem your startup aims to solve." required>
                    <textarea className={textareaCls} placeholder="Describe the specific problem your startup addresses, who is affected, and why existing solutions fall short..." value={form.problem_solved} onChange={e => set('problem_solved', e.target.value)} />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Date Founded" required>
                      <input type="date" className={inputCls} value={form.date_founded} onChange={e => set('date_founded', e.target.value)} />
                    </Field>
                    <Field label="Headquarters Location" required>
                      <select className={selectCls} value={form.headquarters_location} onChange={e => set('headquarters_location', e.target.value)}>
                        <option value="">Select location</option>
                        {HQ_LOCATIONS.map(l => <option key={l}>{l}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field label="Industry Sector" required>
                    <select className={selectCls} value={form.industry} onChange={e => set('industry', e.target.value)}>
                      <option value="">Select industry</option>
                      {INDUSTRIES.map(i => <option key={i}>{i}</option>)}
                    </select>
                  </Field>
                </div>
              )}

              {/* Step 2 – Business Strategy & Stage */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-navy-900">Section 3 — Business Strategy &amp; Stage</h3>
                    <p className="text-xs text-gray-400 mt-1">Help us understand your venture's strategy and competitive position.</p>
                  </div>
                  <Field label="Is the founding team working on this venture full-time?" required>
                    <select className={selectCls} value={form.founding_team_full_time} onChange={e => set('founding_team_full_time', e.target.value)}>
                      <option value="">Select an option</option>
                      {['Yes', 'No', 'Unsure'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field label="Are you building a scalable, tech-enabled product or service?" required>
                    <select className={selectCls} value={form.scalable_tech_enabled} onChange={e => set('scalable_tech_enabled', e.target.value)}>
                      <option value="">Select an option</option>
                      {['Yes', 'No', 'Unsure'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field label="Do you consider your company to be a Social Business Venture?" required>
                    <select className={selectCls} value={form.social_business_venture} onChange={e => set('social_business_venture', e.target.value)}>
                      <option value="">Select an option</option>
                      {['Yes', 'No', 'Unsure'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field label="Current Development Stage" required>
                    <select className={selectCls} value={form.current_development_stage} onChange={e => set('current_development_stage', e.target.value)}>
                      <option value="">Select stage</option>
                      <option value="Concept phase: On Paper concept only">Concept phase: "On Paper" concept only</option>
                      <option value="Prototyping: currently building a prototype">Prototyping: currently building a prototype</option>
                      <option value="Prototype complete: working prototype established">Prototype complete: working prototype established</option>
                      <option value="MVP Development: Building a minimum viable product (MVP)">MVP Development: Building a minimum viable product (MVP)</option>
                      <option value="MVP active: MVP launched with minimum clients/customers">MVP active: MVP launched with minimum clients/customers</option>
                      <option value="Market entry: Final product launched with clients/customers">Market entry: Final product launched with clients/customers</option>
                    </select>
                  </Field>
                  <Field label="Please list your top three competitors." required>
                    <textarea className={textareaCls} placeholder="List your top three competitors and briefly note what they do..." value={form.top_competitors} onChange={e => set('top_competitors', e.target.value)} />
                  </Field>
                  <Field label="What differentiates your solution from the competitors listed above?" required>
                    <textarea className={textareaCls} placeholder="Explain what sets you apart from the competitors listed above..." value={form.competitive_differentiation} onChange={e => set('competitive_differentiation', e.target.value)} />
                  </Field>
                </div>
              )}

              {/* Step 3 – Traction & Financials */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-navy-900">Section 4 — Traction &amp; Financials</h3>
                    <p className="text-xs text-gray-400 mt-1">Tell us about your current traction and financial status.</p>
                  </div>
                  <Field label="Do you currently have paying clients or customers?" required>
                    <select className={selectCls} value={form.has_paying_clients} onChange={e => set('has_paying_clients', e.target.value)}>
                      <option value="">Select an option</option>
                      {['Yes', 'No'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field label="Total Employees (Founders + Full-time employees)" required>
                    <input type="number" min="0" step="1" className={inputCls} placeholder="0" value={form.total_employees} onChange={e => set('total_employees', e.target.value)} />
                  </Field>
                  <Field label="Monthly Recurring Revenue (MRR)" required>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                      <input type="number" min="0" className={`${inputCls} pl-7`} placeholder="0" value={form.monthly_recurring_revenue} onChange={e => set('monthly_recurring_revenue', e.target.value)} />
                    </div>
                  </Field>
                  <div className="flex items-start gap-2 px-4 py-3 bg-amber-50/60 border border-amber-200/70 rounded-lg text-xs text-gray-600 leading-relaxed">
                    <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>If generating income, please indicate the monthly amount. If tracking annually, divide by 12. If the business is less than one year old, divide total revenue by months in operation.</span>
                  </div>
                </div>
              )}

              {/* Step 4 – Event Participation & Goals */}
              {step === 4 && (
                <div className="space-y-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-navy-900">Section 5 — Event Participation &amp; Goals</h3>
                    <p className="text-xs text-gray-400 mt-1">Tell us about your goals and availability for the event.</p>
                  </div>
                  <Field label="What do you hope to achieve by participating?" required>
                    <textarea className={textareaCls} placeholder="Describe your goals for the competition..." value={form.participation_goals} onChange={e => set('participation_goals', e.target.value)} />
                  </Field>
                  <Field label="How did you hear about the Lone Star Investor Forum?" required>
                    <select className={selectCls} value={form.how_heard} onChange={e => set('how_heard', e.target.value)}>
                      <option value="">Select an option</option>
                      {HOW_HEARD_OPTIONS.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field label="My team is available to demo our product at the Lone Star event on October 17th" required>
                    <select className={selectCls} value={form.available_for_demo} onChange={e => set('available_for_demo', e.target.value)}>
                      <option value="">Select an option</option>
                      {['Yes', 'No'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </Field>

                  <Field label="Attachments">
                    <div className="space-y-3">
                      <label
                        className={`flex flex-col items-center justify-center gap-2 px-4 py-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${uploading ? 'border-amber-400 bg-amber-50' : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'}`}
                      >
                        {uploading ? (
                          <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
                        ) : (
                          <UploadCloud className="w-6 h-6 text-gray-400" />
                        )}
                        <span className="text-sm text-gray-500 font-medium">
                          {uploading ? 'Uploading...' : 'Click to upload files'}
                        </span>
                        <span className="text-xs text-gray-400">PDF, images, docs — max 10 MB per file</span>
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                          onChange={e => { handleFileUpload(e.target.files); e.target.value = ''; }}
                          disabled={uploading}
                        />
                      </label>

                      {uploadError && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          {uploadError}
                        </div>
                      )}

                      {form.attachments.length > 0 && (
                        <div className="space-y-2">
                          {form.attachments.map((att, i) => (
                            <div key={i} className="flex items-center gap-3 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg">
                              <FileText className="w-5 h-5 text-amber-500 shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-700 truncate">{att.name}</p>
                                <p className="text-xs text-gray-400">{formatBytes(att.size)}</p>
                              </div>
                              <a href={att.url} target="_blank" rel="noopener noreferrer" className="text-xs text-amber-600 hover:text-amber-700 font-medium shrink-0">
                                View
                              </a>
                              <button
                                type="button"
                                onClick={() => removeAttachment(i)}
                                className="p-1 text-gray-400 hover:text-red-500 transition-colors shrink-0"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Field>
                </div>
              )}

              {/* Step 5 – Demographics, Consent & Declaration */}
              {step === 5 && (
                <div className="space-y-5">
                  {/* Demographics */}
                  <div>
                    <h3 className="font-semibold text-navy-900">Section 6 — Founder Demographics &amp; Data Consent</h3>
                    <p className="text-xs text-gray-400 mt-1">This information is used for diversity reporting only.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <Field label="Does anyone on your founding team identify with the following descriptions? (Select all that apply)" required>
                      <div className="grid grid-cols-2 gap-2">
                        {FOUNDER_DESCRIPTION_OPTIONS.map(o => {
                          const checked = form.founder_descriptions.includes(o);
                          return (
                            <label key={o} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors text-sm ${checked ? 'border-amber-400 bg-amber-50 text-navy-900' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                              <input type="checkbox" className="h-4 w-4 rounded border-gray-300 accent-amber-500 cursor-pointer shrink-0" checked={checked} onChange={e => {
                                set('founder_descriptions', e.target.checked ? [...form.founder_descriptions, o] : form.founder_descriptions.filter(x => x !== o));
                              }} />
                              {o}
                            </label>
                          );
                        })}
                      </div>
                    </Field>
                    <Field label="How many founders are currently working in your startup?" required>
                      <select className={selectCls} value={form.founders_count} onChange={e => set('founders_count', e.target.value)}>
                        <option value="">Select an option</option>
                        {['1', '2', '3', '4', '5 or more'].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </Field>
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-amber-500 cursor-pointer shrink-0" checked={form.data_consent} onChange={e => set('data_consent', e.target.checked)} />
                    <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                      <span className="text-red-500 mr-0.5">*</span>I consent to the Lone Star Investor Forum collecting and using my demographic data
                      for diversity reporting and program improvement purposes.
                    </span>
                  </label>

                  {/* Nominee Consent */}
                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="font-semibold text-navy-900 mb-3">Nominee Consent and Verification</h3>
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-amber-500 cursor-pointer shrink-0" checked={form.info_accurate} onChange={e => set('info_accurate', e.target.checked)} />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                          I confirm that the information provided is accurate and truthful to the best of my knowledge.<span className="text-red-500 ml-0.5">*</span>
                        </span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-amber-500 cursor-pointer shrink-0" checked={form.understands_disqualification} onChange={e => set('understands_disqualification', e.target.checked)} />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                          I understand that providing false information may result in disqualification.<span className="text-red-500 ml-0.5">*</span>
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Declaration */}
                  <div className="border-t border-gray-100 pt-4">
                    <h3 className="font-semibold text-navy-900 mb-2">Applicant Declaration and Release</h3>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs text-gray-500 leading-relaxed max-h-40 overflow-y-auto mb-3">
                      By submitting this application, I certify that all information provided is true, accurate, and complete to the best of my knowledge. I acknowledge that submission of this application does not guarantee selection, funding, investment, or participation in the Lone Star Investor Forum.
                      <br /><br />
                      I understand and agree that the Lone Star Investor Forum, its officers, directors, committee members, partners, sponsors, investors, judges, and affiliates do not provide legal, financial, investment, or business advice, and make no representations or warranties regarding potential investment outcomes.
                      <br /><br />
                      I further acknowledge that any discussions, feedback, introductions, or evaluations provided in connection with this competition are for informational purposes only, and that all investment decisions are made independently by participating investors.
                      <br /><br />
                      I agree to release, indemnify, and hold harmless the Lone Star Investor Forum and its officers, directors, volunteers, partners, sponsors, and affiliates from any and all claims, liabilities, losses, damages, costs, or expenses arising out of or related to my participation, application, presentation, or any resulting discussions or transactions.
                    </div>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-amber-500 cursor-pointer shrink-0" checked={form.declaration_agreed} onChange={e => set('declaration_agreed', e.target.checked)} />
                      <span className="text-sm font-medium text-gray-800 group-hover:text-gray-900 transition-colors">
                        I have read, understand, and voluntarily agree to this declaration and release.<span className="text-red-500 ml-0.5">*</span>
                      </span>
                    </label>
                  </div>

                  {/* Signature block */}
                  <div className="border-t border-gray-100 pt-5 space-y-4">
                    <div>
                      <h3 className="font-semibold text-navy-900">Signature</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Sign, print your name, and enter today's date to complete your application.</p>
                    </div>

                    <Field label="Signature" required>
                      <SignaturePad
                        value={form.signature_data_url}
                        onChange={dataUrl => set('signature_data_url', dataUrl)}
                      />
                    </Field>

                    <div className="grid grid-cols-2 gap-4">
                      <Field label="Printed Full Name" required>
                        <input
                          className={inputCls}
                          placeholder="Jane Smith"
                          value={form.signatory_name}
                          onChange={e => set('signatory_name', e.target.value)}
                        />
                      </Field>
                      <Field label="Date" required>
                        <input
                          type="date"
                          className={inputCls}
                          max={new Date().toISOString().split('T')[0]}
                          value={form.signed_date}
                          onChange={e => set('signed_date', e.target.value)}
                        />
                      </Field>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer nav */}
        {!submitted && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 shrink-0">
            <button
              onClick={back}
              disabled={step === 0}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded-lg hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            <div className="flex items-center gap-1">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${i === step ? 'bg-amber-500 w-5' : i < step ? 'bg-amber-300' : 'bg-gray-200'}`}
                />
              ))}
            </div>

            {step < STEPS.length - 1 ? (
              <button
                onClick={next}
                className="flex items-center gap-1.5 px-5 py-2 bg-navy-950 hover:bg-navy-800 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-2 bg-amber-500 hover:bg-amber-400 text-navy-950 text-sm font-bold rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
