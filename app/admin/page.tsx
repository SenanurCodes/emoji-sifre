import prisma from '@/lib/db'

// En sağlam yöntem: Sayfanın önbelleğini sıfırlar, her ziyarette veriyi canlı çeker
export const revalidate = 0;

export default async function AdminPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-900 text-white font-sans">
      <h1 className="text-4xl font-bold mb-2 text-yellow-400">
        📂 Şifre Arşivi
      </h1>
      <p className="text-gray-400 mb-8">Veritabanındaki tüm gizli mesajlar</p>

      <div className="w-full max-w-2xl space-y-6">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500 text-lg border border-dashed border-gray-600 p-8 rounded-xl">
            Henüz veritabanında şifreli mesaj bulunmuyor. Önce biraz şifrele! 🕵️‍♂️
          </p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg transition-all hover:border-gray-500">
              <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                <span className="text-xs text-gray-500">
                  Mesaj ID: #{msg.id}
                </span>
                <span className="text-xs text-gray-500">
                  {msg.createdAt.toLocaleDateString('tr-TR')} - {msg.createdAt.toLocaleTimeString('tr-TR')}
                </span>
              </div>
              
              <p className="text-3xl mb-6 break-words tracking-widest text-center">
                {msg.encryptedEmoji}
              </p>
              
              <details className="cursor-pointer group">
                <summary className="w-full text-center bg-gray-700 hover:bg-yellow-500 hover:text-gray-900 text-white font-bold py-3 px-4 rounded-xl inline-block transition-colors list-none select-none">
                  Şifreyi Çöz 🔓
                </summary>
                <div className="mt-4 p-5 bg-gray-900 rounded-xl border-l-4 border-yellow-500">
                  <p className="text-sm text-gray-400 mb-1">Orijinal Metin:</p>
                  <p className="text-2xl text-white font-medium break-words">
                    {msg.originalText}
                  </p>
                </div>
              </details>
            </div>
          ))
        )}
      </div>
    </main>
  );
}