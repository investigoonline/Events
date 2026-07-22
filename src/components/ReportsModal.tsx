import { useState, useEffect, useMemo, Fragment } from 'react';
import { X, Loader2, AlertCircle, FileText, Search, ChevronDown, ChevronUp, Download, Paperclip, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Props {
  onClose: () => void;
}

type Application = {
  id: string;
  created_at: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  phone_country_code: string | null;
  title_position: string | null;
  company_name: string | null;
  company_description: string | null;
  problem_solved: string | null;
  date_founded: string | null;
  headquarters_location: string | null;
  industry: string | null;
  founding_team_full_time: string | null;
  scalable_tech_enabled: string | null;
  social_business_venture: string | null;
  current_development_stage: string | null;
  top_competitors: string | null;
  competitive_differentiation: string | null;
  has_paying_clients: string | null;
  total_employees: number | null;
  monthly_recurring_revenue: number | null;
  participation_goals: string | null;
  how_heard: string | null;
  available_for_demo: string | null;
  founder_descriptions: string[] | null;
  founders_count: string | null;
  data_consent: boolean | null;
  info_accurate: boolean | null;
  understands_disqualification: boolean | null;
  declaration_agreed: boolean | null;
  signatory_name: string | null;
  signed_date: string | null;
  attachments: AttachmentItem[] | null;
};

type AttachmentItem = {
  name: string;
  url: string;
  path?: string;
  size?: number;
  type?: string;
};

type SortKey = keyof Application | 'applicant_name';

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: 'applicant_name', label: 'Applicant' },
  { key: 'company_name', label: 'Company' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'title_position', label: 'Title' },
  { key: 'industry', label: 'Industry' },
  { key: 'headquarters_location', label: 'HQ Location' },
  { key: 'date_founded', label: 'Date Founded' },
  { key: 'current_development_stage', label: 'Stage' },
  { key: 'has_paying_clients', label: 'Paying Clients' },
  { key: 'total_employees', label: 'Employees' },
  { key: 'monthly_recurring_revenue', label: 'MRR' },
  { key: 'founding_team_full_time', label: 'Full-Time Team' },
  { key: 'scalable_tech_enabled', label: 'Tech-Enabled' },
  { key: 'social_business_venture', label: 'Social Venture' },
  { key: 'top_competitors', label: 'Competitors' },
  { key: 'competitive_differentiation', label: 'Differentiation' },
  { key: 'participation_goals', label: 'Goals' },
  { key: 'how_heard', label: 'How Heard' },
  { key: 'available_for_demo', label: 'Demo Available' },
  { key: 'founders_count', label: 'Founders' },
  { key: 'founder_descriptions', label: 'Founder Descriptions' },
  { key: 'company_description', label: 'Company Description' },
  { key: 'problem_solved', label: 'Problem Solved' },
  { key: 'data_consent', label: 'Data Consent' },
  { key: 'info_accurate', label: 'Info Accurate' },
  { key: 'understands_disqualification', label: 'Understands DQ' },
  { key: 'declaration_agreed', label: 'Declaration' },
  { key: 'signatory_name', label: 'Signatory' },
  { key: 'signed_date', label: 'Signed Date' },
  { key: 'created_at', label: 'Submitted' },
  { key: 'attachments', label: 'Attachments' },
];

function fmt(val: unknown): string {
  if (val === null || val === undefined || val === '') return '—';
  if (typeof val === 'boolean') return val ? 'Yes' : 'No';
  if (Array.isArray(val)) return val.join(', ') || '—';
  if (typeof val === 'number') return val.toLocaleString();
  if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(val)) {
    const d = new Date(val);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }
  if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
    const d = new Date(val + 'T00:00:00');
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }
  return String(val);
}

function downloadCsv(rows: Application[]) {
  const header = COLUMNS.map(c => `"${c.label}"`).join(',');
  const body = rows.map(row => {
    const applicantName = [row.first_name, row.last_name].filter(Boolean).join(' ') || '—';
    return COLUMNS.map(c => {
      let v: unknown;
      if (c.key === 'applicant_name') v = applicantName;
      else if (c.key === 'attachments') {
        v = row.attachments && row.attachments.length > 0
          ? row.attachments.map(a => a.url).join(' | ')
          : '';
      } else v = row[c.key as keyof Application];
      const s = fmt(v);
      return `"${s.replace(/"/g, '""')}"`;
    }).join(',');
  }).join('\n');
  const csv = `${header}\n${body}`;
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `applications-report-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function ReportsModal({ onClose }: Props) {
  const [rows, setRows] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('created_at');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      const { data, error: dbErr } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });
      if (cancelled) return;
      if (dbErr) {
        setError(dbErr.message || 'Failed to load applications.');
        setRows([]);
      } else {
        setRows((data as Application[]) || []);
      }
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(r => {
      const haystack = [
        r.first_name, r.last_name, r.email, r.phone, r.company_name,
        r.industry, r.headquarters_location, r.title_position,
        r.current_development_stage, r.problem_solved, r.company_description,
        r.participation_goals, r.signatory_name,
      ].filter(Boolean).join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [rows, search]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      let av: unknown;
      let bv: unknown;
      if (sortKey === 'applicant_name') {
        av = [a.first_name, a.last_name].filter(Boolean).join(' ').toLowerCase();
        bv = [b.first_name, b.last_name].filter(Boolean).join(' ').toLowerCase();
      } else {
        av = a[sortKey as keyof Application];
        bv = b[sortKey as keyof Application];
      }
      const as = fmt(av);
      const bs = fmt(bv);
      const cmp = as.localeCompare(bs, undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const withAttachments = rows.filter(r => r.attachments && r.attachments.length > 0).length;

  const summary = useMemo(() => {
    const total = rows.length;
    const withRevenue = rows.filter(r => r.monthly_recurring_revenue && Number(r.monthly_recurring_revenue) > 0).length;
    const payingClients = rows.filter(r => r.has_paying_clients === 'Yes').length;
    const industries = new Set(rows.map(r => r.industry).filter(Boolean));
    const avgEmployees = rows.length > 0
      ? Math.round(rows.reduce((sum, r) => sum + (r.total_employees || 0), 0) / rows.length)
      : 0;
    return { total, withRevenue, payingClients, industries: industries.size, avgEmployees, withAttachments };
  }, [rows]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm" />

      <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="font-display text-xl font-bold text-navy-950 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-500" /> Applications Report
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              All submitted applications for the Lone Star Investor Forum 2026
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Summary cards */}
        {!loading && !error && (
          <div className="px-6 py-4 border-b border-gray-100 shrink-0">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Total</p>
                <p className="text-2xl font-bold text-navy-950 mt-0.5">{summary.total}</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Paying Clients</p>
                <p className="text-2xl font-bold text-navy-950 mt-0.5">{summary.payingClients}</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">With Revenue</p>
                <p className="text-2xl font-bold text-navy-950 mt-0.5">{summary.withRevenue}</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Industries</p>
                <p className="text-2xl font-bold text-navy-950 mt-0.5">{summary.industries}</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Avg Employees</p>
                <p className="text-2xl font-bold text-navy-950 mt-0.5">{summary.avgEmployees}</p>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">With Attachments</p>
                <p className="text-2xl font-bold text-navy-950 mt-0.5">{summary.withAttachments}</p>
              </div>
            </div>
          </div>
        )}

        {/* Toolbar */}
        {!loading && !error && rows.length > 0 && (
          <div className="px-6 py-3 border-b border-gray-100 shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search applicants, companies, industries..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-colors"
              />
            </div>
            <button
              onClick={() => downloadCsv(sorted)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-navy-950 hover:bg-navy-800 text-white text-sm font-semibold rounded-lg transition-colors shrink-0"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        )}

        {/* Body */}
        <div className="overflow-auto flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
              <p className="text-sm">Loading applications...</p>
            </div>
          ) : error ? (
            <div className="flex items-center gap-2 mx-6 my-6 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
              <FileText className="w-10 h-10 text-gray-300" />
              <p className="text-sm">No applications have been submitted yet.</p>
            </div>
          ) : sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-2">
              <Search className="w-8 h-8 text-gray-300" />
              <p className="text-sm">No results match "{search}".</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-gray-50 z-10">
                <tr>
                  {COLUMNS.slice(0, 7).map(col => (
                    <th
                      key={col.key}
                      onClick={() => toggleSort(col.key)}
                      className="text-left px-3 py-2.5 font-semibold text-gray-600 cursor-pointer select-none whitespace-nowrap hover:text-amber-600 transition-colors"
                    >
                      <span className="inline-flex items-center gap-1">
                        {col.label}
                        {sortKey === col.key && (
                          sortDir === 'asc'
                            ? <ChevronUp className="w-3 h-3" />
                            : <ChevronDown className="w-3 h-3" />
                        )}
                      </span>
                    </th>
                  ))}
                  <th
                    className="text-left px-3 py-2.5 font-semibold text-gray-600 whitespace-nowrap"
                  >
                    Attachments
                  </th>
                  <th className="px-3 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {sorted.map(row => {
                  const applicantName = [row.first_name, row.last_name].filter(Boolean).join(' ') || '—';
                  const phone = [row.phone_country_code, row.phone].filter(Boolean).join(' ') || '—';
                  const isOpen = expanded === row.id;
                  return (
                    <Fragment key={row.id}>
                      <tr
                        onClick={() => setExpanded(isOpen ? null : row.id)}
                        className="border-b border-gray-100 hover:bg-amber-50/40 cursor-pointer transition-colors"
                      >
                        <td className="px-3 py-2.5 font-medium text-navy-900 whitespace-nowrap">{applicantName}</td>
                        <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{fmt(row.company_name)}</td>
                        <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">{fmt(row.email)}</td>
                        <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">{phone}</td>
                        <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">{fmt(row.title_position)}</td>
                        <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">{fmt(row.industry)}</td>
                        <td className="px-3 py-2.5 text-gray-600 whitespace-nowrap">{fmt(row.headquarters_location)}</td>
                        <td className="px-3 py-2.5 text-gray-600">
                          {row.attachments && row.attachments.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {row.attachments.map((att, i) => (
                                <a
                                  key={i}
                                  href={att.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={e => e.stopPropagation()}
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-700 hover:bg-amber-100 hover:border-amber-300 transition-colors max-w-[180px]"
                                  title={att.url}
                                >
                                  <Paperclip className="w-3 h-3 shrink-0" />
                                  <span className="truncate">{att.name || att.url}</span>
                                  <ExternalLink className="w-3 h-3 shrink-0 opacity-60" />
                                </a>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                        <td className="px-3 py-2.5 text-gray-400">
                          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </td>
                      </tr>
                      {isOpen && (
                        <tr className="bg-gray-50/60">
                          <td colSpan={9} className="px-6 py-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                              {COLUMNS.slice(7).map(col => (
                                <div key={col.key}>
                                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-0.5">{col.label}</p>
                                  {col.key === 'attachments' ? (
                                    row.attachments && row.attachments.length > 0 ? (
                                      <div className="space-y-1.5">
                                        {row.attachments.map((att, i) => (
                                          <a
                                            key={i}
                                            href={att.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-700 hover:bg-amber-100 hover:border-amber-300 transition-colors break-all"
                                          >
                                            <Paperclip className="w-3.5 h-3.5 shrink-0" />
                                            <span>{att.name || att.url}</span>
                                            <ExternalLink className="w-3 h-3 shrink-0 opacity-60" />
                                          </a>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-sm text-gray-300">—</p>
                                    )
                                  ) : (
                                    <p className="text-sm text-gray-700 break-words whitespace-pre-wrap">{fmt(row[col.key as keyof Application])}</p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        {!loading && !error && rows.length > 0 && (
          <div className="px-6 py-3 border-t border-gray-100 shrink-0 flex items-center justify-between text-xs text-gray-400">
            <span>Showing {sorted.length} of {rows.length} applications</span>
            <span>Click a row to expand full details</span>
          </div>
        )}
      </div>
    </div>
  );
}
