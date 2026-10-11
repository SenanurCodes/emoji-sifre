'use client'

import { useState } from 'react'
import { encryptAndSaveMessage } from './actions'

export default function Home() {
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Butona basıldığında çalışacak fonksiyon
  async function handleEncrypt(formData: FormData) {
    setLoading(true)
    const saved = await encryptAndSaveMessage(formData) // Veritabanına gönder
    if (saved) {
      setResult(saved.encryptedEmoji) // Gelen şifreli mesajı ekranda göster
    }
    setLoading(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-900 text-white font-sans">
      <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400">
        🕵️‍♂️ Emoji Şifreleyici
      </h1>
      
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <form action={handleEncrypt}>
          <label className="block mb-3 text-sm font-medium text-gray-300">
            Gizli Mesajın:
          </label>
          <textarea 
            name="message"
            required
            className="w-full p-4 rounded-xl bg-gray-900 text-white border border-gray-600 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors mb-6 resize-none"
            rows={4}
            placeholder="Buraya şifrelenecek mesajı yaz..."
          ></textarea>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-xl transition-colors text-lg disabled:opacity-50"
          >
            {loading ? 'Şifreleniyor... ⏳' : 'Emojilere Çevir ve Şifrele 🪄'}
          </button>
        </form>

        {/* Sonuç Alanı: Eğer şifrelenmiş mesaj varsa ekranda görünür */}
        {result && (
          <div className="mt-8 p-4 bg-gray-900 rounded-xl border border-dashed border-yellow-400 text-center animate-pulse">
            <p className="text-sm text-gray-400 mb-2">Başarıyla Veritabanına Kaydedildi!</p>
            <p className="text-3xl break-words">{result}</p>
          </div>
        )}
      </div>
    </main>
  );
}