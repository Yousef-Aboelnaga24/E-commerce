import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdHelp } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const faqCategories = [
  {
    id: 'orders',
    label: 'Orders & Payments',
    icon: '🛒',
    faqs: [
      {
        q: 'How do I place an order?',
        a: 'Browse our products, add items to your cart, and proceed to checkout. You\'ll need to sign in or create a free account to complete your purchase.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards (Visa, Mastercard, Amex, Discover), PayPal, Apple Pay, and Google Pay.',
      },
      {
        q: 'Can I change or cancel my order?',
        a: 'Orders can be modified or cancelled within 1 hour of placement. After that, the order enters processing and cannot be changed. Contact support immediately if needed.',
      },
      {
        q: 'How do I track my order?',
        a: 'Once your order ships, you\'ll receive an email with a tracking number. You can also track your order in the "My Orders" section of your account dashboard.',
      },
      {
        q: 'Will I receive an order confirmation?',
        a: 'Yes! An order confirmation email is sent to your registered email address immediately after a successful purchase.',
      },
    ],
  },
  {
    id: 'shipping',
    label: 'Shipping & Delivery',
    icon: '📦',
    faqs: [
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping takes 3–5 business days. Express shipping takes 1–2 business days. Same-day delivery is available in select cities (New York, Los Angeles, Chicago, Houston).',
      },
      {
        q: 'How much does shipping cost?',
        a: 'Standard shipping is FREE on all orders over $50. For orders under $50, shipping costs $4.99. Express shipping is $12.99 regardless of order size.',
      },
      {
        q: 'Do you offer international shipping?',
        a: 'Currently, we only ship within the United States. We are actively working on expanding to Canada and the UK in 2024. Stay tuned!',
      },
      {
        q: 'What if my package is delayed?',
        a: 'While rare, delays can occur due to high demand or weather. If your order is more than 3 days late, contact our support team and we will investigate and offer a resolution.',
      },
      {
        q: 'Can I change my shipping address after ordering?',
        a: 'Address changes are possible within 30 minutes of placing your order. Contact us immediately via live chat for the fastest resolution.',
      },
    ],
  },
  {
    id: 'returns',
    label: 'Returns & Refunds',
    icon: '↩️',
    faqs: [
      {
        q: 'What is your return policy?',
        a: 'We offer FREE returns within 30 days of delivery. Items must be unused, undamaged, and in their original packaging with all tags attached.',
      },
      {
        q: 'How do I start a return?',
        a: 'Go to My Orders in your account, select the order, click "Request Return," and follow the prompts. You\'ll receive a prepaid return label via email within 24 hours.',
      },
      {
        q: 'How long does a refund take?',
        a: 'Once we receive and inspect your return (1–2 business days), refunds are processed within 3–5 business days. It may take an additional 3–5 days to appear on your statement.',
      },
      {
        q: 'Are there items that cannot be returned?',
        a: 'Yes. For hygiene and safety reasons, underwear, swimwear, earrings, and opened personal care products cannot be returned. Customized or personalized items are also final sale.',
      },
      {
        q: 'What if I received a damaged or wrong item?',
        a: 'We sincerely apologize! Contact us within 72 hours with a photo of the damage or incorrect item. We\'ll send a replacement at no cost and arrange a free return.',
      },
    ],
  },
  {
    id: 'account',
    label: 'Account & Privacy',
    icon: '👤',
    faqs: [
      {
        q: 'How do I create an account?',
        a: 'Click "Sign In" in the top navigation, then select "Create Account." You only need your name, email, and a secure password.',
      },
      {
        q: 'I forgot my password. What do I do?',
        a: 'On the login page, click "Forgot Password?" and enter your email address. You\'ll receive a reset link within a few minutes.',
      },
      {
        q: 'How do you protect my personal data?',
        a: 'We use industry-standard SSL/TLS encryption and never sell or share your personal information with third parties. Read our full Privacy Policy for details.',
      },
      {
        q: 'Can I delete my account?',
        a: 'Yes. Go to Account Settings > Privacy > Delete My Account. Note that this action is permanent and all order history will be removed.',
      },
      {
        q: 'How do I update my email or password?',
        a: 'Log in and go to your Account Settings. You can update your email, password, address, and notification preferences from there.',
      },
    ],
  },
];

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between py-4 text-left gap-4 hover:text-blue-700 transition-colors"
        aria-expanded={open}
      >
        <span className={`text-sm font-semibold ${open ? 'text-blue-700' : 'text-gray-900'} transition-colors`}>
          {question}
        </span>
        <span className={`text-blue-600 flex-shrink-0 mt-0.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-56 pb-4' : 'max-h-0'}`}>
        <p className="text-sm text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('orders');
  const [searchQuery, setSearchQuery] = useState('');

  const currentCategory = faqCategories.find((c) => c.id === activeCategory);

  const filteredFaqs = searchQuery.trim()
    ? faqCategories
        .flatMap((c) => c.faqs.map((f) => ({ ...f, category: c.label })))
        .filter(
          (f) =>
            f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : null;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-linear-to-br from-blue-700 to-blue-900 text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
            <MdHelp size={18} /> Frequently Asked Questions
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Find Your Answer
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Browse our comprehensive FAQ or search for exactly what you need.
          </p>
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-gray-900 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="faq-search-input"
            />
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {searchQuery.trim() ? (
          // Search Results
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} for "{searchQuery}"
            </h2>
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🔍</div>
                <p className="text-gray-600 font-medium">No results found.</p>
                <p className="text-gray-400 text-sm mt-1">Try different keywords or{' '}
                  <NavLink to="/contact" className="text-blue-600 hover:underline">contact support</NavLink>.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 divide-y divide-gray-100">
                {filteredFaqs.map((f) => (
                  <div key={f.q}>
                    <div className="pt-4 pb-1">
                      <span className="text-xs font-semibold text-blue-600 uppercase tracking-widest">{f.category}</span>
                    </div>
                    <FaqItem question={f.q} answer={f.a} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Categorized view
          <div className="grid md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-all border-b border-gray-50 last:border-0 text-left ${
                      activeCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">{category.icon}</span>
                    {category.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5 text-center">
                <p className="text-sm font-semibold text-gray-900 mb-1">Still need help?</p>
                <p className="text-xs text-gray-500 mb-4">Our team responds in under 24 hours.</p>
                <NavLink
                  to="/contact"
                  className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contact Support
                </NavLink>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{currentCategory?.icon}</span>
                  <h2 className="text-xl font-extrabold text-gray-900">{currentCategory?.label}</h2>
                </div>
                <div>
                  {currentCategory?.faqs.map((faq) => (
                    <FaqItem key={faq.q} question={faq.q} answer={faq.a} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
