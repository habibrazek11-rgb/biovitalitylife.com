import { Settings } from 'lucide-react'

export default function AdminSettingsPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Store configuration and preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Store info */}
        <div className="rounded-xl bg-white border border-gray-100 p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Store Information</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">Store Name</label>
              <input
                type="text"
                defaultValue="BioVitality™"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900
                           focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">Currency</label>
              <input
                type="text"
                defaultValue="AED"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900
                           focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">Contact Email</label>
              <input
                type="email"
                defaultValue="contact@biovitalitylife.com"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900
                           focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">Phone</label>
              <input
                type="tel"
                defaultValue="+971 50 185 9905"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900
                           focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Shipping */}
        <div className="rounded-xl bg-white border border-gray-100 p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Shipping</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">Free Shipping Threshold (AED)</label>
              <input
                type="number"
                defaultValue={200}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900
                           focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-gray-700">Flat Shipping Rate (AED)</label>
              <input
                type="number"
                defaultValue={25}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900
                           focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Danger zone */}
        <div className="rounded-xl bg-white border border-red-100 p-6 shadow-sm">
          <h2 className="mb-2 text-lg font-bold text-red-600">Danger Zone</h2>
          <p className="mb-4 text-sm text-gray-500">
            These actions are irreversible. Proceed with caution.
          </p>
          <button className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors">
            Clear All Orders
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Settings size={16} className="text-gray-400" />
        <p className="text-xs text-gray-400">
          Settings are currently display-only. Backend save functionality coming soon.
        </p>
      </div>
    </div>
  )
}
