import { useState } from 'react'
import { CheckCircle2, ChevronDown, Send } from 'lucide-react'
import Dropdown from '../components/ui/Dropdown.jsx'

const FAQS = [
  {
    q: 'How do I add a new club to my network?',
    a: 'Open Studios and use the club filter to review capacity. To onboard a new location, contact Franchise Ops from the workspace switcher — once approved, the club appears on your Club Map and dashboard KPIs.',
  },
  {
    q: 'How is studio utilization calculated?',
    a: 'Utilization is the share of studios currently Booked across the selected clubs. It updates when a studio is held, booked, or released from the Studios page.',
  },
  {
    q: 'Can I export membership and spend reports?',
    a: 'Yes. Operating Spend and membership summaries can be exported as CSV or PDF from each module menu, filtered by the date range you select.',
  },
  {
    q: 'How do I change a team member’s permissions?',
    a: 'Open the Team page, find the member, and use the role dropdown on their card to switch between Admin and Member. Owners keep full access and cannot be demoted.',
  },
  {
    q: 'What happens when a membership is about to expire?',
    a: 'You will receive an alert 60 days before expiry (configurable in Settings → Notifications). The member is flagged on Memberships so coaches can start renewal outreach in time.',
  },
]

const TOPICS = ['Billing', 'Technical Issue', 'Membership Question', 'Other']

const inputBase = 'w-full rounded-xl border bg-shell/50 px-3 py-2 text-sm outline-none transition-colors'

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState(0)

  const [form, setForm] = useState({ name: '', email: '', topic: TOPICS[0], message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const setField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: false }))
  }

  const handleSubmit = () => {
    const next = {
      name: !form.name.trim(),
      email: !form.email.trim(),
      message: !form.message.trim(),
    }
    setErrors(next)
    if (Object.values(next).some(Boolean)) return
    setSent(true)
  }

  const resetForm = () => {
    setForm({ name: '', email: '', topic: TOPICS[0], message: '' })
    setErrors({})
    setSent(false)
  }

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-bold text-ink">Support</h1>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* FAQ accordion */}
        <div className="rounded-card bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <h2 className="text-base font-semibold text-ink">Frequently Asked Questions</h2>
          <div className="mt-4 divide-y divide-black/5">
            {FAQS.map((faq, i) => {
              const open = openIndex === i
              return (
                <div key={faq.q}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? -1 : i)}
                    className="flex w-full items-center justify-between gap-3 py-3 text-left transition-colors hover:text-accent"
                  >
                    <span className={`text-sm font-medium ${open ? 'text-accent' : 'text-ink'}`}>
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`shrink-0 text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {open && (
                    <p className="border-t border-black/5 py-3 text-sm text-muted">{faq.a}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Contact form / confirmation */}
        <div className="rounded-card bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 py-10 text-center">
              <CheckCircle2 size={40} className="text-up" />
              <h2 className="text-base font-semibold text-ink">Message sent!</h2>
              <p className="text-sm text-muted">
                Thanks for reaching out — our team will get back to you within 24 hours.
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="mt-3 text-sm font-medium text-accent transition-colors hover:text-ink"
              >
                Send another message
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-base font-semibold text-ink">Contact Support</h2>
              <div className="mt-4 flex flex-col gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setField('name', e.target.value)}
                    placeholder="Jane Cooper"
                    className={`${inputBase} ${errors.name ? 'border-accent' : 'border-black/10 focus:border-accent'}`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-accent">Please enter your name.</p>}
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-muted">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setField('email', e.target.value)}
                    placeholder="jane@example.com"
                    className={`${inputBase} ${errors.email ? 'border-accent' : 'border-black/10 focus:border-accent'}`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-accent">Please enter your email.</p>}
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-muted">Topic</label>
                  <Dropdown
                    options={TOPICS}
                    value={form.topic}
                    onChange={(v) => setField('topic', v)}
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-muted">Message</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setField('message', e.target.value)}
                    placeholder="How can we help?"
                    className={`${inputBase} resize-none ${errors.message ? 'border-accent' : 'border-black/10 focus:border-accent'}`}
                  />
                  {errors.message && <p className="mt-1 text-xs text-accent">Please write a message.</p>}
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  <Send size={14} />
                  Send Message
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
