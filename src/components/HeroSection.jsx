
export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(10,30,50,0.7) 0%, rgba(10,30,50,0.5) 100%), url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80')`,
      }}
    >
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24">
        <span className="inline-block bg-accent/20 text-accent border border-accent/40 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          #1 Real Estate Platform
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          Find Your Dream Home <br />
          <span className="text-accent">Without the Hassle</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
           Discover properties across Nepal and find the right place to call home.
        </p> 
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  )
}
