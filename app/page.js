"use client";
import { useState } from "react";

export default function Home() {
  const [personFile, setPersonFile] = useState(null);
  const [garmentFile, setGarmentFile] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!personFile || !garmentFile) {
      setError("Harap unggah foto orang dan foto baju terlebih dahulu!");
      return;
    }

    setLoading(true);
    setError("");
    setResultUrl(null);

    try {
      const personBase64 = await toBase64(personFile);
      const garmentBase64 = await toBase64(garmentFile);

      const res = await fetch("/api/try-on", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personImage: personBase64,
          garmentImage: garmentBase64,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal memproses gambar");
      }

      setResultUrl(data.resultUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8 text-gray-800">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Virtual Try-On</h1>
          <p className="text-gray-600">Ganti pakaian pada fotomu secara otomatis menggunakan AI.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block font-semibold text-sm">1. Unggah Foto Orang</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPersonFile(e.target.files[0])}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-semibold text-sm">2. Unggah Foto Baju</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setGarmentFile(e.target.files[0])}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-xl text-white font-bold transition-all ${
              loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
            }`}
          >
            {loading ? "AI sedang memproses (Bisa memakan waktu 1-2 menit)..." : "Coba Pakaian!"}
          </button>
        </form>

        {resultUrl && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border text-center space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Hasil Try-On</h2>
            <div className="flex justify-center">
              <img src={resultUrl} alt="Hasil AI Try-On" className="rounded-xl max-h-[500px] object-contain shadow-md" />
            </div>
            <a href={resultUrl} download target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-blue-600 font-semibold hover:underline">
              Buka Gambar Resolusi Penuh
            </a>
          </div>
        )}
      </div>
    </main>
  );
}