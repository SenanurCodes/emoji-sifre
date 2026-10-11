'use server'

import prisma from '@/lib/db'

// Harfleri emojilere çevireceğimiz gizli sözlüğümüz 🕵️‍♂️
const emojiMap: Record<string, string> = {
  'a': '🍎', 'b': '🍌', 'c': '🍒', 'ç': '🍓', 'd': '🍉',
  'e': '🍇', 'f': '🥝', 'g': '🥑', 'ğ': '🥦', 'h': '🥒',
  'ı': '🥖', 'i': '🍟', 'j': '🍔', 'k': '🌮', 'l': '🌯',
  'm': '🥗', 'n': '🍿', 'o': '🍩', 'ö': '🍪', 'p': '🎂',
  'r': '🍫', 's': '🍬', 'ş': '🍭', 't': '☕', 'u': '🍹',
  'ü': '🍷', 'v': '🍺', 'y': '🚀', 'z': '🛸', ' ': '☁️'
}

export async function encryptAndSaveMessage(formData: FormData) {
  const originalText = formData.get('message') as string;

  if (!originalText) return null;

  // Metni küçük harfe çevirip, harf harf emojilerle değiştiriyoruz
  const encryptedEmoji = originalText
    .toLowerCase()
    .split('')
    .map(char => emojiMap[char] || '❓') // Eğer sözlükte harf yoksa ❓ koy
    .join('');

  // Veritabanına kaydediyoruz
  const savedMessage = await prisma.message.create({
    data: {
      originalText,
      encryptedEmoji
    }
  });

  return savedMessage; // Kaydedilen mesajı ekrana döndürüyoruz
}