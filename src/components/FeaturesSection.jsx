import { BarChart2, Bell, Clock, HeartHandshake, Search, ShieldCheck } from 'lucide-react'

const features = [
  { icon: Search, title: 'Smart Search', desc: 'Filter by price, location, type, and more to find exactly what you need.' },
  { icon: ShieldCheck, title: 'Verified Listings', desc: 'Every property is verified by our team so you never deal with fake listings.' },
  { icon: HeartHandshake, title: 'Trusted Agents', desc: 'Connect with licensed, background-checked agents in your area.' },
  { icon: Bell, title: 'Instant Alerts', desc: 'Get notified the moment a property matching your criteria hits the market.' },
  { icon: BarChart2, title: 'Market Insights', desc: 'Access real-time data and trends to make smarter investment decisions.' },
  { icon: Clock, title: 'Fast Closing', desc: 'Our streamlined process helps you close deals up to 3x faster.' },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Why Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">Everything You Need in One Place</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">We've built the tools and network to make your real estate journey smooth from start to finish.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-7 rounded-2xl border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent transition-colors">
                <Icon className="w-6 h-6 text-accent group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-primary font-semibold text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
