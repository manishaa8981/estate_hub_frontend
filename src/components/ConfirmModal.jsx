import { AlertTriangle, LogOut, X } from 'lucide-react'

export default function ConfirmModal({ title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', variant = 'danger', onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 animate-fade-in">
        <button onClick={onCancel} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4
          ${variant === 'danger' ? 'bg-red-100' : 'bg-amber-100'}`}>
          {variant === 'logout'
            ? <LogOut className="w-6 h-6 text-amber-500" />
            : <AlertTriangle className="w-6 h-6 text-red-500" />}
        </div>

        <h3 className="text-lg font-bold text-primary text-center mb-2">{title}</h3>
        <p className="text-gray-500 text-sm text-center mb-6">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors
              ${variant === 'logout' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-red-500 hover:bg-red-600'}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
