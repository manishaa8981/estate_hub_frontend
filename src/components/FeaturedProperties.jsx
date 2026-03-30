import { Bath, Bed, Heart, MapPin, Square } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import { useAuth } from '../context/AuthContext'
import Spinner from './Spinner'

const properties = [
  { id: '1', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80', price: 'Rs. 3,50,00,000', title: 'Modern Family House', location: 'Budhanilkantha, Kathmandu', beds: 5, baths: 4, sqft: 4200, tag: 'For Sale' },
  
  { id: '2', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', price: 'Rs. 85,000/mo', title: 'Luxury Apartment', location: 'Jhamsikhel, Lalitpur', beds: 3, baths: 2, sqft: 2100, tag: 'For Rent' },
  
  { id: '3', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80', price: 'Rs. 2,20,00,000', title: 'Peaceful Residential Home', location: 'Pokhara Lakeside', beds: 4, baths: 3, sqft: 3100, tag: 'For Sale' },
  
  { id: '4', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80', price: 'Rs. 35,000/mo', title: 'City View Flat', location: 'New Baneshwor, Kathmandu', beds: 2, baths: 1, sqft: 950, tag: 'For Rent' },
  
  { id: '5', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80', price: 'Rs. 5,75,00,000', title: 'Premium Villa with Garden', location: 'Bhaisepati, Lalitpur', beds: 6, baths: 5, sqft: 6500, tag: 'For Sale' },
  
  { id: '6', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80', price: 'Rs. 18,000/mo', title: 'Compact Studio Room', location: 'Thamel, Kathmandu', beds: 1, baths: 1, sqft: 620, tag: 'For Rent' },
];

export default function FeaturedProperties() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [favouriteIds, setFavouriteIds] = useState(new Set())
  const [pending, setPending] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    if (user) {
      api.getFavourites()
        .then(favs => setFavouriteIds(new Set(favs.map(f => f.property_id))))
        .catch(() => {})
    }
  }, [user])

  const toggleFavourite = async (p) => {
    if (!user) return navigate('/login')
    if (pending) return
    setPending(p.id)
    try {
      if (favouriteIds.has(p.id)) {
        await api.removeFavourite(p.id)
        setFavouriteIds(prev => { const s = new Set(prev); s.delete(p.id); return s })
      } else {
        await api.addFavourite({
          property_id: p.id,
          property_title: p.title,
          property_price: p.price,
          property_location: p.location,
          property_image: p.image,
          property_beds: p.beds,
          property_baths: p.baths,
          property_sqft: p.sqft,
          property_tag: p.tag,
        })
        setFavouriteIds(prev => new Set([...prev, p.id]))
      }
    } catch (err) {
      console.error(err)
      setToast({ message: err.message || 'Something went wrong', type: 'error' })
    } finally {
      setPending(null)
    }
  }

  return (
    <section id="properties" className="py-20 bg-gray-50">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">Listings</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2">Featured Properties</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Hand-picked properties from our top agents across the country.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map(p => {
            const isFav = favouriteIds.has(p.id)
            return (
              <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group">
                <div className="relative overflow-hidden h-56">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${p.tag === 'For Sale' ? 'bg-primary text-white' : 'bg-accent text-white'}`}>
                    {p.tag}
                  </span>
                  <button
                    onClick={() => toggleFavourite(p)}
                    disabled={pending === p.id}
                    className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-red-50 transition-colors disabled:cursor-wait"
                    title={user ? (isFav ? 'Remove from favourites' : 'Add to favourites') : 'Login to save'}
                  >
                    {pending === p.id
                      ? <Spinner size="sm" color="accent" />
                      : <Heart className={`w-4 h-4 transition-colors ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                    }
                  </button>
                </div>
                <div className="p-5">
                  <p className="text-accent font-bold text-xl">{p.price}</p>
                  <h3 className="text-primary font-semibold text-lg mt-1">{p.title}</h3>
                  <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
                    <MapPin className="w-3.5 h-3.5" /> {p.location}
                  </div>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Bed className="w-4 h-4" /> {p.beds} Beds</span>
                    <span className="flex items-center gap-1"><Bath className="w-4 h-4" /> {p.baths} Baths</span>
                    <span className="flex items-center gap-1"><Square className="w-4 h-4" /> {p.sqft} sqft</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <button className="border-2 border-primary text-primary font-semibold px-8 py-3 rounded-xl hover:bg-primary hover:text-white transition-colors">
            View All Properties
          </button>
        </div>
      </div>
    </section>
  )
}
