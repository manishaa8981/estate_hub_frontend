import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <section
      className="py-24 bg-cover bg-center relative"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(26,60,94,0.95) 0%, rgba(26,60,94,0.85) 100%), url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80')`,
      }}
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5">
          Ready to Find Your <span className="text-accent">Dream Home?</span>
        </h2>
        <p className="text-gray-300 text-lg mb-10">
          Join over 30,000 happy homeowners and renters who found their perfect place on EstateHub.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="bg-accent hover:bg-amber-500 text-white font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-lg"
          >
            Get Started Free <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="#properties"
            className="border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-lg"
          >
            Browse Listings
          </a>
        </div>
      </div>
    </section>
  )
}
