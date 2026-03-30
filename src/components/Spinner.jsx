export default function Spinner({ size = 'sm', color = 'white' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' }
  const colors = { white: 'border-white/30 border-t-white', primary: 'border-primary/20 border-t-primary', accent: 'border-accent/20 border-t-accent' }
  return (
    <span className={`inline-block ${sizes[size]} border-2 ${colors[color]} rounded-full animate-spin`} />
  )
}
