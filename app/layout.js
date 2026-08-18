import "./globals.css";

export const metadata = {
  title: "AI Virtual Try-On",
  description: "Ganti pakaian pada fotomu secara otomatis menggunakan AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}