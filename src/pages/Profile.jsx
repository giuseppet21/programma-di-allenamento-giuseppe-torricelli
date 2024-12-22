import { motion } from 'framer-motion'

export default function Profile() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Profilo</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="space-y-4">
          <ProfileField label="Nome" value="Giuseppe" />
          <ProfileField label="Obiettivo" value="Aumento Massa Muscolare" />
          <ProfileField label="Peso Iniziale" value="80 kg" />
          <ProfileField label="Peso Target" value="75 kg" />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
        >
          Modifica Profilo
        </motion.button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Preferenze Allenamento</h2>
        <div className="space-y-4">
          <ProfileField label="Giorni alla settimana" value="4" />
          <ProfileField label="Durata sessione" value="60 minuti" />
          <ProfileField label="Focus principale" value="Ipertrofia" />
        </div>
      </div>
    </div>
  )
}

function ProfileField({ label, value }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <p className="text-gray-800 font-medium">{value}</p>
    </div>
  )
} 