import { CalendarCheck, KeyRound, Search, UserPlus } from 'lucide-react'

const steps = [
  { icon: UserPlus, step: '01', title: 'Create an Account', desc: 'Sign up for free and set up your profile in under 2 minutes.' },
  { icon: Search, step: '02', title: 'Search Properties', desc: 'Use our smart filters to browse thousands of verified listings.' },
  { icon: CalendarCheck, step: '03', title: 'Schedule a Visit', desc: 'Book a tour directly with the agent at a time that works for you.' },
  { icon: KeyRound, step: '04', title: 'Close the Deal', desc: 'Finalize paperwork and get the keys to your new home.' },
]

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Process</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">How It Works</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Four simple steps to finding and securing your perfect property.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-accent/20 z-0" />

          {steps.map(({ icon: Icon, step, title, desc }) => (
            <div key={step} className="relative z-10 text-center">
              <div className="w-20 h-20 bg-white border-2 border-accent/30 rounded-full flex items-center justify-center mx-auto mb-5 shadow-md">
                <Icon className="w-8 h-8 text-accent" />
              </div>
              <span className="text-xs font-bold text-accent tracking-widest">{step}</span>
              <h3 className="text-primary font-semibold text-lg mt-1 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
