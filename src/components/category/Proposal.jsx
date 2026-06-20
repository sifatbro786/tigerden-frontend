import React from 'react'

/* ── DATA ── */
const timeline = [
  { num: '01', phase: 'Phase 1', name: 'Requirement Analysis', duration: '4 Days', desc: 'Stakeholder interviews, scope finalization, technical specification document' },
  { num: '02', phase: 'Phase 2', name: 'UI/UX Design', duration: '7 Days', desc: 'Wireframes, interactive mockups, design system, client review & approval' },
  { num: '03', phase: 'Phase 3', name: 'Development', duration: '15 Days', desc: 'Frontend, backend, database, API development, module integration' },
  { num: '04', phase: 'Phase 4', name: 'Testing', duration: '4 Days', desc: 'Functional testing, security audit, performance benchmarking, UAT' },
  { num: '05', phase: 'Phase 5', name: 'Deployment', duration: '2 Days', desc: 'Cloud deployment, handover, documentation, go-live support' },
]

const externalModules = [
  { icon: '🗺️', name: 'Geo-location Map', desc: 'Interactive cluster map across Bangladesh powered by Google Maps API' },
  { icon: '📊', name: 'Production Statistics', desc: 'Live charts and KPIs for SME production and output data' },
  { icon: '🏭', name: 'Cluster Overview', desc: 'At-a-glance summary of all registered SME clusters nationwide' },
  { icon: '🛍️', name: 'Product Showcase', desc: 'Public-facing product gallery for cluster enterprise products' },
  { icon: '🌱', name: 'Sustainability Dashboard', desc: 'Environmental and sustainability metrics for SME operations' },
  { icon: '🏆', name: 'Success Stories', desc: 'Highlighted case studies and impact stories from SME clusters' },
]

const internalModules = [
  { icon: '📡', name: 'Cluster Monitoring', desc: 'Real-time tracking of cluster activities and performance metrics' },
  { icon: '📋', name: 'Project Tracking', desc: 'End-to-end project management for SME Foundation initiatives' },
  { icon: '🏢', name: 'Enterprise Records', desc: 'Centralized database of all registered SME enterprises' },
  { icon: '🎓', name: 'Training Management', desc: 'Schedule, track, and report on training programs for SMEs' },
  { icon: '💰', name: 'Budget Monitoring', desc: 'Financial tracking, expenditure reports, and budget allocations' },
  { icon: '📝', name: 'Reporting Tools', desc: 'Automated report generation in PDF/Excel for all modules' },
]

const stacks = [
  { label: 'Frontend', pills: ['React.js', 'Next.js', 'Tailwind CSS'] },
  { label: 'Backend', pills: ['Node.js', 'Express.js', 'RESTful APIs'] },
  { label: 'Database', pills: ['PostgreSQL', 'MongoDB'] },
  { label: 'Security & Auth', pills: ['JWT Authentication', 'Role-Based Access Control', 'Data Encryption'] },
  { label: 'Visualization', pills: ['Chart.js', 'D3.js', 'Google Maps API'] },
  { label: 'Deployment', pills: ['Cloud Hosting', 'CI/CD Pipeline', 'Backup & Recovery'] },
]

const securityFeatures = [
  '🔐 JWT Authentication', '👥 Role-Based Access Control',
  '🔒 End-to-End Data Encryption', '🛡️ Secure API Access',
  '💾 Backup & Recovery Support', '🔑 Session Management',
]

const team = [
  { role: 'Project Manager', count: 1, icon: '🧑‍💼' },
  { role: 'Frontend Developer', count: 4, icon: '💻' },
  { role: 'Backend Developer', count: 5, icon: '⚙️' },
  { role: 'UI/UX Designer', count: 2, icon: '🎨' },
  { role: 'QA Engineer', count: 2, icon: '🧪' },
  { role: 'System Support Engineer', count: 1, icon: '🛠️' },
]

const prevProjects = [
  { name: 'Cumilla University Website', desc: 'Complete institutional website with CMS, responsive design, and department management system.', tags: ['Education', 'CMS', 'Responsive'] },
  { name: 'Law Firm Website', desc: 'Professional legal services platform with secure client interaction features and document management.', tags: ['Legal', 'Secure', 'Portal'] },
  { name: 'Logistics Solutions System', desc: 'Full operational dashboard for logistics tracking, real-time reporting, and data management.', tags: ['Dashboard', 'Tracking', 'Analytics'] },
]

const costBreakdown = [
  { item: 'System Development', note: 'Full-stack frontend + backend development' },
  { item: 'Dashboard Design', note: 'UI/UX design, prototyping, design system' },
  { item: 'Database Setup', note: 'PostgreSQL + MongoDB architecture & configuration' },
  { item: 'API Development', note: 'RESTful API design, integration, and documentation' },
  { item: 'Testing & QA', note: 'Functional, performance, and security testing' },
  { item: 'Deployment Support', note: 'Cloud setup, CI/CD, go-live assistance' },
]

/* ── REUSABLE ── */
const Eyebrow = ({ children }) => (
  <p className="text-xs font-semibold uppercase mb-3" style={{ color: '#1a6b3c', letterSpacing: '0.22em' }}>{children}</p>
)
const SecTitle = ({ children, light }) => (
  <h2 className={`text-4xl font-semibold leading-tight mb-5 ${light ? 'text-white' : 'text-[#0d2818]'}`}
    style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '-0.5px' }}>
    {children}
  </h2>
)
const GreenRule = ({ light }) => (
  <div className="h-0.5 w-14 mb-8 rounded-full" style={{ background: light ? 'linear-gradient(90deg,rgba(74,222,128,0.7),transparent)' : 'linear-gradient(90deg,#1a6b3c,transparent)' }} />
)
const Sep = () => <hr className="border-t border-[#ddeee5] my-16" />

export default function Proposal() {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');`}</style>

      <div className="bg-[#f4faf6] w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl" style={{ fontFamily: "'Outfit', sans-serif" }}>

        {/* ══════ COVER ══════ */}
        <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d2818 0%, #0f3d22 60%, #145a30 100%)' }}>
          {/* decorative orbs */}
          <div className="absolute -top-40 -right-24 w-[560px] h-[560px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 65%)' }} />
          <div className="absolute -bottom-28 -left-20 w-[380px] h-[380px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 65%)' }} />
          {/* grid */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(rgba(74,222,128,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,0.04) 1px,transparent 1px)', backgroundSize: '56px 56px' }} />

          {/* top bar */}
          <div className="relative z-10 flex justify-between items-center px-14 py-10 border-b border-white/10">
            <img src="https://www.strsltd.com/assets/logo-oMYHvT_3.png" alt="STR Solutions Ltd."
              className="h-11" onError={e => e.target.style.display = 'none'} />
            <div className="flex items-center gap-5">
              <span className="text-xs tracking-widest uppercase text-white/30">Technical Proposal</span>
              <span className="text-xs tracking-widest uppercase text-white/40 border-l border-white/10 pl-5">20 April, 2026</span>
            </div>
          </div>

          {/* hero body — increased top padding by 20px (py-20 → pt-[100px]) */}
          <div className="relative z-10 px-14 pt-[100px] pb-20">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase font-medium px-5 py-2 rounded-full mb-10 border border-green-400/30 bg-green-400/08"
              style={{ color: '#4ade80', background: 'rgba(74,222,128,0.07)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              RFQ No: 36.12.0000.000.020.14.0007.251523
            </div>

            <h1 className="text-white leading-[1.05] mb-3 font-semibold"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(44px,6vw,74px)', letterSpacing: '-1px' }}>
              Integrated Cluster<br />
              <span style={{ color: '#4ade80' }}>Dashboard Development</span>
            </h1>
            <p className="text-white/40 text-lg font-light mb-2 tracking-wide">Submitted to: SME Foundation, Dhaka</p>
            <p className="text-white/25 text-base font-light mb-14">Parjatan Bhaban (6th–7th Floor), Plot E-5 C/1, Agargaon, Dhaka-1207</p>

            <div className="w-24 h-0.5 mb-12 rounded-full" style={{ background: 'linear-gradient(90deg,#4ade80,rgba(74,222,128,0.1))' }} />

            <div className="flex flex-wrap gap-y-6">
              {[
                { label: 'Submitted By', val: 'STR Solutions Ltd.' },
                { label: 'Contact Person', val: 'MD Shafiul Islam' },
                { label: 'Delivery Timeline', val: '32 Days' },
                { label: 'Total Quotation', val: 'BDT 3,00,000', accent: true },
              ].map((m, i, arr) => (
                <div key={m.label} className={`pr-12 mr-12 ${i < arr.length - 1 ? 'border-r border-white/10' : ''}`}>
                  <p className="text-[10px] tracking-[0.22em] uppercase text-white/30 font-medium mb-2">{m.label}</p>
                  <p className="text-lg font-semibold" style={{ color: m.accent ? '#4ade80' : '#fff' }}>{m.val}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex justify-between items-center px-14 py-6 border-t border-white/5">
            <span className="text-[11px] tracking-wider text-white/20">Confidential — For Client Use Only</span>
            <span className="text-[11px] tracking-wider text-white/20">strsltd.com · info@strsltd.com · +880 1332-802026</span>
          </div>
        </section>

        {/* ══════ COVER LETTER ══════ */}
        <div className="px-14 py-14 border-b border-[#ddeee5]" style={{ background: '#ffffff' }}>
          <div className="max-w-3xl">
            <p className="text-[15px] text-[#888] font-light mb-2">To</p>
            <p className="text-[16px] font-semibold text-[#0d2818] mb-1">Manager, SME Foundation</p>
            <p className="text-[14px] text-[#888] font-light mb-8">Parjatan Bhaban (6th–7th Floor), Plot: E-5 C/1, Agargaon, Sher-e-Bangla Nagar, Dhaka-1207</p>

            <p className="text-[14px] font-semibold text-[#0d2818] mb-4">Subject: Submission of Quotation for Developing an Integrated Cluster Dashboard</p>

            <p className="text-[16px] text-[#555] leading-[1.85] font-light mb-5">
              We, <strong className="text-[#0d2818] font-semibold">STR Solutions Ltd.</strong>, hereby submit our quotation for the development of an Integrated Cluster Dashboard in accordance with the requirements outlined in the Request for Quotation (RFQ No: 36.12.0000.000.020.14.0007.251523).
            </p>
            <p className="text-[16px] text-[#555] leading-[1.85] font-light mb-5">
              We have carefully reviewed the RFQ document and fully understand the scope and technical requirements of the project. Our team is capable of delivering a <strong className="text-[#0d2818] font-semibold">reliable, scalable, and secure</strong> dashboard solution tailored to SME Foundation's operational needs.
            </p>
            <p className="text-[16px] text-[#555] leading-[1.85] font-light mb-8">
              Our quotation shall remain valid for a period of <strong className="text-[#0d2818] font-semibold">30 days</strong> from the closing date of submission. We confirm that we possess the legal capacity to enter into this contract and have not been declared ineligible by any authority.
            </p>

            {/* Trade License / TIN / BIN */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { label: 'Trade License No', val: 'TRAD/DNCC/038966/2024' },
                { label: 'TIN No', val: 'C-200656/2025' },
                { label: 'BIN', val: '007438502-0401' },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#ddeee5] bg-[#f4faf6]">
                  <span className="text-[11px] tracking-widest uppercase font-semibold text-[#888]">{b.label}:</span>
                  <span className="text-[13px] font-semibold text-[#0d2818]">{b.val}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 pt-6 border-t border-[#ddeee5]">
              <div>
                <p className="text-[15px] font-semibold text-[#0d2818]">MD Shafiul Islam</p>
                <p className="text-[13px] text-[#888] font-light">Contact Person, STR Solutions Ltd.</p>
                <p className="text-[13px] font-light mt-1" style={{ color: '#1a6b3c' }}>info@strsltd.com · +880 1332-802026</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-[12px] text-[#aaa] font-light">Date</p>
                <p className="text-[14px] font-semibold text-[#0d2818]">20 April, 2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* ══════ BODY ══════ */}
        <div className="px-14 py-20">

          {/* 01 — Company Profile */}
          <div className="mb-20">
            <Eyebrow>01 — Company Profile</Eyebrow>
            <SecTitle>About STR Solutions Ltd.</SecTitle>
            <GreenRule />
            <p className="text-[17px] text-[#555] leading-[1.85] font-light mb-8">
              STR Solutions Ltd. is a modern technology company based in <strong className="text-[#0d2818] font-semibold">Dhaka, Bangladesh</strong>, specializing in full-stack web application development, enterprise dashboard systems, and scalable cloud-based platforms. Our team of 15 experienced professionals delivers high-quality digital solutions for government, public sector, and enterprise clients.
            </p>

            {/* key stats */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                { val: '2+', label: 'Years Experience' },
                { val: '15', label: 'Team Members' },
                { val: '10+', label: 'Projects Delivered' },
                { val: '3', label: 'Core Tech Domains' },
              ].map(s => (
                <div key={s.label} className="bg-white border border-[#ddeee5] rounded-xl py-7 px-5 text-center">
                  <p className="text-3xl font-bold mb-1" style={{ color: '#1a6b3c', fontFamily: "'Cormorant Garamond', serif" }}>{s.val}</p>
                  <p className="text-[13px] text-[#888] font-light">{s.label}</p>
                </div>
              ))}
            </div>

            {/* core services */}
            <div className="bg-white border border-[#ddeee5] rounded-2xl p-7">
              <p className="text-[11px] tracking-[0.22em] uppercase font-semibold mb-5" style={{ color: '#1a6b3c' }}>Core Services</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: '🌐', s: 'Web Application Development' },
                  { icon: '📊', s: 'Dashboard & Reporting Systems' },
                  { icon: '🏢', s: 'Enterprise Software Development' },
                  { icon: '🗄️', s: 'Database Design & Management' },
                  { icon: '🔌', s: 'API Development & Integration' },
                  { icon: '☁️', s: 'Cloud Deployment & Maintenance' },
                ].map(c => (
                  <div key={c.s} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#f4faf6] border border-[#ddeee5]">
                    <span className="text-xl flex-shrink-0">{c.icon}</span>
                    <span className="text-[13px] font-medium text-[#2a2a3e]">{c.s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Sep />

          {/* 02 — Project Understanding */}
          <div className="mb-20">
            <Eyebrow>02 — Technical Proposal</Eyebrow>
            <SecTitle>Project Understanding</SecTitle>
            <GreenRule />
            <p className="text-[17px] text-[#555] leading-[1.85] font-light mb-8">
              We understand that the objective is to develop a comprehensive <strong className="text-[#0d2818] font-semibold">Integrated Cluster Dashboard</strong> that enables SME Foundation to visualize, manage, and monitor SME clusters across Bangladesh. The system will serve both public-facing and internal administrative audiences.
            </p>

            {/* two-column system overview */}
            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-2xl overflow-hidden border border-[#ddeee5]">
                <div className="px-7 py-5 flex items-center gap-3" style={{ background: '#0d2818' }}>
                  <span className="text-2xl">🌍</span>
                  <div>
                    <p className="text-white font-semibold text-[15px]">External (Public) Dashboard</p>
                    <p className="text-white/40 text-[12px] font-light">Accessible by general public & SMEs</p>
                  </div>
                </div>
                <div className="bg-white p-6 space-y-2">
                  {externalModules.map(m => (
                    <div key={m.name} className="flex gap-3 items-start py-2 border-b border-[#f0f7f3] last:border-0">
                      <span className="text-xl flex-shrink-0">{m.icon}</span>
                      <div>
                        <p className="text-[14px] font-semibold text-[#0d2818]">{m.name}</p>
                        <p className="text-[12px] text-[#888] font-light leading-snug">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-[#ddeee5]">
                <div className="px-7 py-5 flex items-center gap-3" style={{ background: '#1a6b3c' }}>
                  <span className="text-2xl">🔒</span>
                  <div>
                    <p className="text-white font-semibold text-[15px]">Internal (Admin) Dashboard</p>
                    <p className="text-white/40 text-[12px] font-light">SME Foundation staff only</p>
                  </div>
                </div>
                <div className="bg-white p-6 space-y-2">
                  {internalModules.map(m => (
                    <div key={m.name} className="flex gap-3 items-start py-2 border-b border-[#f0f7f3] last:border-0">
                      <span className="text-xl flex-shrink-0">{m.icon}</span>
                      <div>
                        <p className="text-[14px] font-semibold text-[#0d2818]">{m.name}</p>
                        <p className="text-[12px] text-[#888] font-light leading-snug">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Sep />

          {/* 03 — System Architecture */}
          <div className="mb-20">
            <Eyebrow>03 — Architecture</Eyebrow>
            <SecTitle>Proposed System Architecture</SecTitle>
            <GreenRule />

            {/* 3-tier */}
            <div className="flex rounded-xl overflow-hidden border border-[#ddeee5] mb-8">
              {[
                { label: 'Frontend Layer', desc: 'React.js / Next.js · Responsive UI · Role-Based Interface', bg: '#0d2818', c: '#fff', ac: '#4ade80' },
                { label: 'Backend Layer', desc: 'Node.js + Express.js · RESTful APIs · Secure Auth', bg: '#1a6b3c', c: '#fff', ac: 'rgba(255,255,255,0.65)' },
                { label: 'Database Layer', desc: 'PostgreSQL (Primary) · MongoDB (Flexible)', bg: '#f0f9f4', c: '#0d2818', ac: '#1a6b3c' },
              ].map((t, i) => (
                <div key={i} className="flex-1 py-9 px-6 text-center" style={{ background: t.bg, borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-2.5" style={{ color: t.ac }}>{t.label}</p>
                  <p className="text-[13px] font-light leading-relaxed" style={{ color: t.c }}>{t.desc}</p>
                </div>
              ))}
            </div>

            {/* tech stack */}
            <div className="grid grid-cols-2 gap-5">
              {stacks.map(s => (
                <div key={s.label} className="bg-white border border-[#ddeee5] rounded-xl p-6">
                  <p className="text-[10px] tracking-[0.22em] uppercase font-semibold mb-4" style={{ color: '#1a6b3c' }}>{s.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.pills.map(p => (
                      <span key={p} className="text-[12px] font-medium text-[#4a4a5e] bg-[#f0f9f4] border border-[#ddeee5] px-3 py-1.5 rounded-full">{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Sep />

          {/* 04 — Security */}
          <div className="mb-20">
            <Eyebrow>04 — Security</Eyebrow>
            <SecTitle>Security Features</SecTitle>
            <GreenRule />
            <p className="text-[17px] text-[#555] leading-[1.85] font-light mb-7">
              Security is built into every layer of the system. All data transmitted and stored is protected by industry-standard encryption and access control mechanisms.
            </p>
            <div className="flex flex-wrap gap-3">
              {securityFeatures.map(f => (
                <span key={f} className="text-[14px] font-medium text-[#1a3d2a] bg-white border border-[#ddeee5] rounded-lg px-4 py-2.5">{f}</span>
              ))}
            </div>
          </div>

          <Sep />

          {/* 05 — Timeline */}
          <div className="mb-20">
            <Eyebrow>05 — Implementation Timeline</Eyebrow>
            <SecTitle>32-Day Delivery Plan</SecTitle>
            <GreenRule />

            {/* summary bar */}
            <div className="flex items-center justify-between rounded-2xl px-10 py-7 mb-8" style={{ background: '#0d2818' }}>
              {[
                { label: 'Total Duration', val: '32 Days' },
                { label: 'Total Phases', val: '5 Phases' },
                { label: 'Work Order', val: 'Upon Award' },
                { label: 'Delivery By', val: 'Day 32', accent: true },
              ].map((m, i, arr) => (
                <React.Fragment key={m.label}>
                  <div>
                    <p className="text-[10px] tracking-[0.22em] uppercase text-white/30 font-medium mb-1.5">{m.label}</p>
                    <p className="text-2xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: m.accent ? '#4ade80' : '#fff' }}>{m.val}</p>
                  </div>
                  {i < arr.length - 1 && <div className="h-10 w-px bg-white/10" />}
                </React.Fragment>
              ))}
            </div>

            {/* phase cards */}
            <div className="space-y-3">
              {timeline.map((p, i) => {
                const widths = ['w-[12%]', 'w-[34%]', 'w-[81%]', 'w-[93%]', 'w-full']
                const isLast = i === timeline.length - 1
                return (
                  <div key={p.num} className="bg-white border border-[#ddeee5] rounded-2xl overflow-hidden">
                    <div className="flex items-start gap-6 px-7 py-5">
                      <div className="w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center text-[13px] font-bold mt-0.5"
                        style={{ background: isLast ? '#1a6b3c' : '#0d2818', color: isLast ? '#fff' : '#4ade80', border: '2px solid #1a6b3c' }}>
                        {p.num}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-[16px] font-semibold text-[#0d2818]">{p.name}</h4>
                          <span className="text-[12px] font-semibold px-4 py-1 rounded-full flex-shrink-0 ml-4"
                            style={{ color: '#1a6b3c', background: 'rgba(26,107,60,0.1)' }}>{p.duration}</span>
                        </div>
                        <p className="text-[13px] text-[#888] font-light mb-3">{p.desc}</p>
                        <div className="h-1.5 w-full bg-[#e8f5ed] rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${widths[i]}`}
                            style={{ background: isLast ? 'linear-gradient(90deg,#1a6b3c,#4ade80)' : 'linear-gradient(90deg,#0d2818,#1a6b3c)' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <Sep />

          {/* 06 — Team */}
          <div className="mb-20">
            <Eyebrow>06 — Team Structure</Eyebrow>
            <SecTitle>Dedicated Project Team</SecTitle>
            <GreenRule />
            <p className="text-[17px] text-[#555] leading-[1.85] font-light mb-8">
              A dedicated team of <strong className="text-[#0d2818] font-semibold">15 professionals</strong> will be assigned to this project, covering all functional areas from design to deployment.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {team.map(t => (
                <div key={t.role} className="bg-white border border-[#ddeee5] rounded-xl px-6 py-5 flex items-center gap-4">
                  <span className="text-3xl flex-shrink-0">{t.icon}</span>
                  <div className="flex-1">
                    <p className="text-[14px] font-semibold text-[#0d2818]">{t.role}</p>
                    <p className="text-[12px] font-light text-[#888]">× {t.count} member{t.count > 1 ? 's' : ''}</p>
                  </div>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-[15px] font-bold flex-shrink-0"
                    style={{ background: 'rgba(26,107,60,0.1)', color: '#1a6b3c' }}>{t.count}</div>
                </div>
              ))}
            </div>
            {/* total bar */}
            <div className="mt-4 bg-white border-2 border-[#1a6b3c] rounded-xl px-6 py-4 flex justify-between items-center">
              <p className="text-[15px] font-bold text-[#0d2818]">Total Team</p>
              <p className="text-[22px] font-bold" style={{ color: '#1a6b3c' }}>15 Members</p>
            </div>
          </div>

          <Sep />

          {/* 07 — Previous Projects */}
          <div className="mb-20">
            <Eyebrow>07 — Portfolio</Eyebrow>
            <SecTitle>Previous Projects</SecTitle>
            <GreenRule />
            <div className="space-y-4">
              {prevProjects.map((p, i) => (
                <div key={i} className="bg-white border border-[#ddeee5] rounded-xl px-8 py-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex gap-2">
                      {p.tags.map(t => (
                        <span key={t} className="text-[11px] tracking-widest uppercase px-3 py-1 rounded-full font-semibold"
                          style={{ background: 'rgba(26,107,60,0.1)', color: '#1a6b3c' }}>{t}</span>
                      ))}
                    </div>
                    <span className="text-[22px]">✅</span>
                  </div>
                  <h4 className="text-[17px] font-semibold text-[#0d2818] mb-2">{p.name}</h4>
                  <p className="text-[14px] text-[#666] font-light leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <Sep />

          {/* 08 — Price */}
          <div className="mb-20">
            <Eyebrow>08 — Price Proposal</Eyebrow>
            <SecTitle>Cost Breakdown</SecTitle>
            <GreenRule />
            <p className="text-[17px] text-[#555] leading-[1.85] font-light mb-8">
              Our total quotation is all-inclusive. All applicable VAT and taxes are included. No hidden costs.
            </p>

            <div className="bg-white border border-[#ddeee5] rounded-2xl overflow-hidden shadow-sm mb-5">
              <div className="px-8 py-5 text-[11px] tracking-[0.22em] uppercase font-semibold" style={{ background: '#0d2818', color: '#4ade80' }}>Project Cost Includes</div>
              {costBreakdown.map((r, i) => (
                <div key={i} className={`flex gap-6 items-center px-8 py-5 ${i < costBreakdown.length - 1 ? 'border-b border-[#f0f7f3]' : ''}`}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#1a6b3c' }} />
                  <div>
                    <p className="text-[15px] font-semibold text-[#0d2818]">{r.item}</p>
                    <p className="text-[13px] text-[#888] font-light">{r.note}</p>
                  </div>
                  <span className="ml-auto text-[13px] font-medium px-3 py-1 rounded-full" style={{ background: 'rgba(26,107,60,0.08)', color: '#1a6b3c' }}>Included</span>
                </div>
              ))}
              {/* total */}
              <div className="flex justify-between items-center px-8 py-7 border-t-2" style={{ background: '#f0f9f4', borderTopColor: '#1a6b3c' }}>
                <div>
                  <p className="text-[12px] tracking-widest uppercase text-[#888] font-medium mb-1">Total Quotation Amount</p>
                  <p className="text-[14px] text-[#555] font-light">All inclusive · VAT & Taxes included</p>
                </div>
                <div className="text-right">
                  <p className="text-[32px] font-bold" style={{ color: '#1a6b3c', fontFamily: "'Cormorant Garamond', serif" }}>BDT 3,00,000</p>
                  <p className="text-[13px] text-[#888] font-light">Three Lakh Taka Only</p>
                </div>
              </div>
            </div>
          </div>

          <Sep />

          {/* 09 — Warranty & Support */}
          <div className="mb-20">
            <Eyebrow>09 — Warranty & Support</Eyebrow>
            <SecTitle>Post-Delivery Commitment</SecTitle>
            <GreenRule />
            <div className="grid grid-cols-3 gap-5">
              {[
                { icon: '🛡️', title: '3 Months Free Support', desc: 'Full technical support at no additional cost for 3 months after delivery' },
                { icon: '🐛', title: 'Bug Fixing', desc: 'All bugs and defects discovered post-launch are resolved at no charge' },
                { icon: '⚡', title: 'Performance Optimization', desc: 'Continuous monitoring and optimization of system performance' },
              ].map(w => (
                <div key={w.title} className="bg-white border border-[#ddeee5] rounded-xl p-7">
                  <span className="text-4xl mb-4 block">{w.icon}</span>
                  <h4 className="text-[16px] font-semibold text-[#0d2818] mb-2">{w.title}</h4>
                  <p className="text-[13px] text-[#777] font-light leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <Sep />

          {/* 10 — Declaration dark block */}
          <div className="relative rounded-2xl p-16 mb-6 overflow-hidden" style={{ background: '#0d2818' }}>
            <div className="absolute -top-28 -right-20 w-80 h-80 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle,rgba(74,222,128,0.1) 0%,transparent 70%)' }} />
            <div className="relative z-10">
              <Eyebrow>10 — Declaration</Eyebrow>
              <h2 className="text-4xl font-semibold leading-tight mb-5 text-white"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Our Commitment
              </h2>
              <GreenRule light />
              <p className="text-[17px] leading-[1.85] font-light text-white/55 mb-5">
                We hereby declare that STR Solutions Ltd. possesses the <strong className="text-white/80 font-medium">technical capability, financial capacity, and professional resources</strong> necessary to successfully complete the Integrated Cluster Dashboard project for SME Foundation.
              </p>
              <p className="text-[17px] leading-[1.85] font-light text-white/55 mb-10">
                We confirm that all submitted information is true and accurate. We assure timely delivery within <strong className="text-white/80 font-medium">32 days from the date of work order</strong> and commit to providing full technical support during implementation.
              </p>
              <div className="flex items-end justify-between pt-8 border-t border-white/10">
                <div>
                  <p className="text-white font-semibold text-[16px]">MD Shafiul Islam</p>
                  <p className="text-white/40 text-[13px] font-light mt-1">Authorized Signatory, STR Solutions Ltd.</p>
                  <p className="text-[13px] mt-1" style={{ color: '#4ade80' }}>info@strsltd.com · +880 1332-802026</p>
                </div>
                <div className="text-right">
                  <p className="text-white/30 text-[11px] tracking-widest uppercase mb-1">Date</p>
                  <p className="text-white font-semibold text-[15px]">20 April, 2026</p>
                  <div className="mt-3 border border-white/10 rounded-lg px-6 py-2">
                    <p className="text-white/20 text-[11px] tracking-widest uppercase">Seal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ══════ FOOTER ══════ */}
        <footer className="px-14 py-10 flex justify-between items-center border-t" style={{ background: '#0d2818', borderTopColor: 'rgba(74,222,128,0.12)' }}>
          <img src="https://www.strsltd.com/assets/logo-oMYHvT_3.png" alt="STR Solutions Ltd."
            className="h-10 opacity-60" onError={e => e.target.style.display = 'none'} />
          <p className="text-[13px] text-right text-white/25 leading-relaxed">
            © 2026 STR Solutions Ltd. All rights reserved.<br />
            970 East Shewrapara, Dhaka, Bangladesh · strsltd.com
          </p>
        </footer>

      </div>
    </>
  )
}