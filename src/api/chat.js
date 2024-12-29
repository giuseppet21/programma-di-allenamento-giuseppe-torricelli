import { HF_API_URL, HF_API_KEY } from '../config/ai'

export async function chatWithNutritionalAI(messages) {
  try {
    const lastMessage = messages[messages.length - 1].content
    const prompt = `Domanda sulla nutrizione: ${lastMessage}\nRisposta:`

    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 100,
          min_length: 30,
          do_sample: false
        }
      }),
    })

    if (!response.ok) {
      throw new Error('Errore nella risposta')
    }

    const data = await response.json()
    return Array.isArray(data) ? data[0].summary_text : data.summary_text

  } catch (error) {
    console.error('Errore:', error)
    return "Scusa, al momento non sono disponibile. Riprova più tardi."
  }
} 