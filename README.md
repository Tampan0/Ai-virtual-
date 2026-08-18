# AI Virtual Try-On (Next.js + Hugging Face)

Aplikasi web untuk mengganti pakaian pada foto secara otomatis menggunakan model AI IDM-VTON dari Hugging Face Spaces.

## Persiapan
1. Pastikan kamu memiliki token akses dari [Hugging Face](https://huggingface.co/settings/tokens).
2. Upload semua file dalam folder ini ke repositori GitHub kamu.

## Cara Deploy ke Vercel (Gratis)
1. Buka [Vercel](https://vercel.com) dan *Login* dengan akun GitHub kamu.
2. Klik **Add New...** lalu pilih **Project**.
3. Pilih repositori GitHub yang baru saja kamu upload.
4. Buka bagian **Environment Variables** sebelum klik deploy, tambahkan:
   - **Name:** `HF_TOKEN`
   - **Value:** `paste_token_hugging_face_kamu_di_sini`
5. Klik **Deploy**. Selesai!
