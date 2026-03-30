import { Home, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Home className="w-5 h-5 text-accent" />
            <span className="text-lg font-semibold">EstateHub</span>
          </div>
          <p className="text-sm text-gray-300">
            Find and explore properties across Nepal with ease.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-medium mb-3">Links</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><a href="#" className="hover:text-accent">Home</a></li>
            <li><a href="#" className="hover:text-accent">Properties</a></li>
            <li><a href="#" className="hover:text-accent">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-medium mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              Kathmandu, Nepal
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent" />
              +977 9800000000
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-accent" />
              info@estatehub.com
            </li>
          </ul>
        </div>

      </div>

      <div className="border-t border-white/10 text-center text-xs py-4 text-gray-400">
        © {new Date().getFullYear()} EstateHub
      </div>
    </footer>
  )
}