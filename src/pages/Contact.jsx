import { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import { MdSupportAgent, MdSend } from 'react-icons/md';

const contactMethods = [
  {
    icon: <FaPhoneAlt size={22} />,
    label: 'Phone Support',
    value: '+1 (800) 123-4567',
    sub: 'Mon–Fri, 9am–6pm EST',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: <FaEnvelope size={22} />,
    label: 'Email Us',
    value: 'support@cartify.com',
    sub: 'We reply within 24 hours',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: <FaMapMarkerAlt size={22} />,
    label: 'Our Office',
    value: '123 Commerce Ave, NY 10001',
    sub: 'United States',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
  {
    icon: <FaClock size={22} />,
    label: 'Live Chat',
    value: 'Available 24/7',
    sub: 'Average wait: under 2 minutes',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
];

const topics = [
  'Order Issue',
  'Shipping & Delivery',
  'Returns & Refunds',
  'Product Question',
  'Account & Billing',
  'Other',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // simulate API
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-linear-to-br from-blue-700 to-blue-900 text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
            <MdSupportAgent size={18} /> Customer Support
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">How Can We Help You?</h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            Our world-class support team is standing by. Reach out through any channel — we're always happy to help.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="max-w-5xl mx-auto px-4 -mt-10 relative z-10 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactMethods.map((m) => (
            <div
              key={m.label}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col gap-3"
            >
              <div className={`${m.bg} ${m.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                {m.icon}
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">{m.label}</div>
                <div className="font-bold text-gray-900 text-sm">{m.value}</div>
                <div className="text-gray-400 text-xs mt-0.5">{m.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form + FAQ */}
      <section className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-5 gap-10">
        {/* Contact Form */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Send Us a Message</h2>
            <p className="text-gray-500 text-sm mb-6">Fill out the form and we'll get back to you within 24 hours.</p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <FaCheckCircle size={32} className="text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Received!</h3>
                <p className="text-gray-500 max-w-xs">
                  Thank you for reaching out. Our team will review your message and respond within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', topic: '', message: '' }); }}
                  className="mt-6 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="contact-name">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="contact-email">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="contact-topic">
                    Topic <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="contact-topic"
                    name="topic"
                    required
                    value={form.topic}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                  >
                    <option value="">Select a topic...</option>
                    {topics.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="contact-message">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your issue or question in detail..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  id="contact-submit-btn"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <MdSend size={18} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quick FAQ Sidebar */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-extrabold text-gray-900">Quick Answers</h2>
          {[
            {
              q: 'How do I track my order?',
              a: 'Log in to your account, go to My Orders, and click on any order to see live tracking.',
            },
            {
              q: 'What is your return policy?',
              a: 'We offer free returns within 30 days of delivery. Items must be unused and in original packaging.',
            },
            {
              q: 'Do you ship internationally?',
              a: 'Currently we ship within the US. International shipping is coming soon!',
            },
            {
              q: 'How long does shipping take?',
              a: 'Standard: 3–5 business days. Express: 1–2 business days. Same-day available in select cities.',
            },
            {
              q: 'How do I cancel an order?',
              a: 'Orders can be cancelled within 1 hour of placement. After that, please contact support.',
            },
          ].map(({ q, a }) => (
            <FaqItem key={q} question={q} answer={a} />
          ))}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Need more help?</p>
            <a
              href="/faq"
              className="text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors"
            >
              View Full FAQ →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span>{question}</span>
        <span className={`text-blue-600 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      <div className={`transition-all duration-300 overflow-hidden ${open ? 'max-h-40' : 'max-h-0'}`}>
        <p className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}
