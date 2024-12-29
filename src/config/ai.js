// Configurazione per HuggingFace
export const HF_API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
export const HF_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY

export const NUTRITIONAL_SYSTEM_PROMPT = `
Fornisci consigli nutrizionali brevi e pratici in italiano.
` 