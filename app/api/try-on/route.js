import { Client } from "@gradio/client";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { personImage, garmentImage } = await req.json();
    
    const client = await Client.connect("yisol/IDM-VTON", {
      hf_token: process.env.HF_TOKEN,
    });

    const result = await client.predict("/tryon", [
      { background: personImage, layers: [], composite: null },
      garmentImage,
      "a photo of a shirt",
      true,
      false,
      30,
      42
    ]);
    
    return NextResponse.json({ resultUrl: result.data[0].url });

  } catch (error) {
    console.error("Error Hugging Face:", error);
    return NextResponse.json(
      { error: "Gagal memproses gambar. Server AI mungkin sedang sibuk." }, 
      { status: 500 }
    );
  }
}