import { useEffect, useRef, useState } from 'react';
import { FaShieldAlt, FaTruck, FaHeadset, FaLeaf, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { MdVerified, MdStars } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '10K+', label: 'Products Listed' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '24/7', label: 'Customer Support' },
];

const values = [
  {
    icon: <FaShieldAlt size={28} />,
    title: 'Trust & Security',
    description: 'Every transaction is secured with bank-grade encryption. Your data and payments are always protected.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: <FaTruck size={28} />,
    title: 'Fast Delivery',
    description: 'Lightning-fast shipping across the country. Same-day delivery available in select cities.',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: <FaHeadset size={28} />,
    title: '24/7 Support',
    description: 'Our dedicated support team is always here for you — chat, email, or phone, around the clock.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: <FaLeaf size={28} />,
    title: 'Sustainability',
    description: 'We are committed to eco-friendly packaging and working with sustainable supply chains.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
];

const team = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO & Co-Founder',
    bio: 'Former Goldman Sachs analyst turned e-commerce visionary. Passionate about democratizing retail.',
    initials: 'SM',
    color: 'from-blue-500 to-blue-700',
  },
  {
    name: 'James Okafor',
    role: 'CTO & Co-Founder',
    bio: '15 years in software engineering. Built platforms serving millions of users across 30+ countries.',
    initials: 'JO',
    color: 'from-purple-500 to-purple-700',
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Product',
    bio: 'UX expert obsessed with creating delightful customer experiences. Previously at Shopify.',
    initials: 'PS',
    color: 'from-pink-500 to-rose-600',
  },
  {
    name: 'Carlos Rivera',
    role: 'Head of Operations',
    bio: 'Supply chain specialist ensuring your orders arrive on time, every time, without compromise.',
    initials: 'CR',
    color: 'from-amber-500 to-orange-600',
  },
];

function AnimatedStat({ value, label }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">{value}</div>
      <div className="text-blue-200 text-sm font-medium uppercase tracking-widest">{label}</div>
    </div>
  );
}

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-700 via-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 py-24 text-center">
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <MdStars size={16} /> Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            Shopping, <span className="text-yellow-300">Reimagined</span><br />for the Modern World
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Cartify was born from a simple conviction — everyone deserves access to quality products
            at honest prices, with an experience that feels effortless and trustworthy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <NavLink
              to="/products"
              className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl hover:bg-yellow-300 hover:text-blue-900 transition-all duration-200 shadow-lg"
            >
              Shop Now
            </NavLink>
            <NavLink
              to="/contact"
              className="border-2 border-white/60 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/20 transition-all duration-200"
            >
              Contact Us
            </NavLink>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-linear-to-r from-blue-600 to-blue-800 py-16">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <AnimatedStat key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Our Mission</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-6 leading-tight">
              Built to make your life a little easier, every day
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We started Cartify in 2021 with a small team and a big dream — to create an e-commerce
              platform that truly puts customers first. No hidden fees, no misleading listings, no endless
              wait times.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Today we serve over 50,000 customers and stock more than 10,000 products across dozens of
              categories. But our DNA remains the same: radical transparency and relentless focus on
              the customer experience.
            </p>
            <div className="flex items-center gap-3 text-blue-700 font-semibold">
              <MdVerified size={22} />
              <span>Certified Trustworthy Retailer 2023 & 2024</span>
            </div>
          </div>
          <div className="relative">
            <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-3xl p-8 shadow-inner">
              <div className="grid grid-cols-2 gap-4">
                {['2021', '2022', '2023', '2024'].map((year, i) => (
                  <div key={year} className="bg-white rounded-2xl p-4 shadow-sm text-center">
                    <div className="text-blue-600 font-bold text-lg">{year}</div>
                    <div className="text-gray-500 text-xs mt-1">
                      {['Founded', '10K Users', 'Series A', '50K+ Customers'][i]}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center text-gray-500 text-sm">
                Growing stronger every year 🚀
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">What We Stand For</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
              >
                <div className={`${v.bg} ${v.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">The People Behind Cartify</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Meet the Team</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">A diverse group of builders, thinkers, and problem-solvers united by a passion for great retail.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className={`bg-linear-to-br ${member.color} h-40 flex items-center justify-center`}>
                <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-2xl border-2 border-white/50">
                  {member.initials}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-gray-900 font-bold text-base">{member.name}</h3>
                <p className="text-blue-600 text-xs font-semibold mb-3 uppercase tracking-wide">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                <div className="flex gap-3 mt-4">
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><FaLinkedin size={16} /></a>
                  <a href="#" className="text-gray-400 hover:text-sky-500 transition-colors"><FaTwitter size={16} /></a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-linear-to-br from-gray-900 to-blue-900 py-20 text-center text-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Experience Cartify?</h2>
          <p className="text-blue-200 text-lg mb-8">
            Join tens of thousands of happy shoppers and discover why Cartify is the smarter way to shop.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <NavLink
              to="/products"
              className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 shadow-lg"
            >
              Start Shopping
            </NavLink>
            <NavLink
              to="/register"
              className="bg-white text-gray-900 font-semibold px-8 py-3 rounded-xl hover:bg-yellow-300 transition-all duration-200"
            >
              Create Free Account
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}
