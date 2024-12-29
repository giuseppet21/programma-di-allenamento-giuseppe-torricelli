import { motion } from 'framer-motion'

export default function NutritionalAI() {
  const tips = [
    {
      title: "Colazione (300-400 kcal)",
      suggestions: [
        "Porridge di avena con frutti di bosco e mandorle (350 kcal)",
        "Yogurt greco, miele e granola con noci (300 kcal)",
        "Toast integrale con uova e avocado (400 kcal)",
        "Smoothie proteico con banana, latte di mandorle e burro d'arachidi (320 kcal)",
        "Pancake proteici con sciroppo d'acero (380 kcal)"
      ]
    },
    {
      title: "Spuntino Mattina (150-200 kcal)",
      suggestions: [
        "Una mela con 30g di mandorle (180 kcal)",
        "Barretta proteica e un kiwi (160 kcal)",
        "Yogurt magro con mirtilli (150 kcal)",
        "Due fette di pane integrale con ricotta (200 kcal)",
        "Frullato di frutta fresca (170 kcal)"
      ]
    },
    {
      title: "Pranzo (450-550 kcal)",
      suggestions: [
        "Petto di pollo grigliato con quinoa e verdure (450 kcal)",
        "Insalata di tonno con ceci, pomodorini e olive (480 kcal)",
        "Bowl di riso integrale con salmone e avocado (520 kcal)",
        "Pasta integrale al pesto con pinoli e parmigiano (500 kcal)",
        "Wrap di tacchino con hummus e verdure (470 kcal)"
      ]
    },
    {
      title: "Spuntino Pomeriggio (150-200 kcal)",
      suggestions: [
        "Protein shake con banana (180 kcal)",
        "Mix di frutta secca (30g) (170 kcal)",
        "Crackers integrali con hummus (160 kcal)",
        "Fette di mela con burro d'arachidi (190 kcal)",
        "Greek yogurt con miele (150 kcal)"
      ]
    },
    {
      title: "Cena (350-450 kcal)",
      suggestions: [
        "Filetto di pesce al vapore con patate dolci (380 kcal)",
        "Zuppa di legumi con verdure di stagione (320 kcal)",
        "Frittata di albumi con spinaci e funghi (300 kcal)",
        "Tofu saltato con verdure e riso basmati (400 kcal)",
        "Petto di tacchino con verdure grigliate (350 kcal)"
      ]
    },
    {
      title: "Consigli Extra",
      suggestions: [
        "Bevi almeno 2L di acqua al giorno",
        "Limita il sale e preferisci le erbe aromatiche",
        "Mangia lentamente e mastica bene",
        "Evita cibi processati e bevande zuccherate",
        "Prepara i pasti in anticipo per la settimana"
      ]
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/20"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Piano Nutrizionale Giornaliero
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {tips.map((section, i) => (
            <motion.div
              key={i}
              className="bg-black/20 rounded-lg p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="text-lg font-semibold text-indigo-400 mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.suggestions.map((tip, j) => (
                  <li key={j} className="text-gray-300 flex items-start gap-2 text-sm">
                    <span className="text-green-400 mt-1">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
} 