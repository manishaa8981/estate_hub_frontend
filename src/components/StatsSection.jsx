const stats = [
  { value: '50K+', label: 'Properties Listed' },
  { value: '30K+', label: 'Happy Clients' },
  { value: '1,200+', label: 'Verified Agents' },
  { value: '98%', label: 'Satisfaction Rate' },
]

export default function StatsSection() {
  return (
    <section className="bg-primary py-14">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map(({ value, label }) => (
          <div key={label}>
            <p className="text-3xl md:text-4xl font-extrabold text-accent">{value}</p>
            <p className="text-gray-300 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
