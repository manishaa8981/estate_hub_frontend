import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'First-time Buyer',
    avatar: 'https://i.pravatar.cc/80?img=47',
    text: 'EstateHub made buying my first home so much less stressful. The search tools are incredible and our agent was amazing.',
    stars: 5,
  },
  {
    name: 'James R.',
    role: 'Property Investor',
    avatar: 'https://i.pravatar.cc/80?img=12',
    text: 'I\'ve used several platforms and EstateHub is by far the most reliable. The market insights alone are worth it.',
    stars: 5,
  },
  {
    name: 'Priya K.',
    role: 'Renter',
    avatar: 'https://i.pravatar.cc/80?img=32',
    text: 'Found my dream apartment in 3 days. The instant alerts feature is a game changer in a competitive market.',
    stars: 5,
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Reviews</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">What Our Clients Say</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Real stories from real people who found their perfect home with us.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(({ name, role, avatar, text, stars }) => (
            <div key={name} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">"{text}"</p>
              <div className="flex items-center gap-3">
                <img src={avatar} alt={name} className="w-11 h-11 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-primary text-sm">{name}</p>
                  <p className="text-gray-400 text-xs">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
