import { HEIGHT, WIDTH } from "@/constants";
import { RequestProps } from "@/interfaces";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const gptApiKey = process.env.NEXT_PUBLIC_GPT_API_KEY;
  // const gptApiKey = process.env.RAPIDAPI_KEY;  // ✅ FIXED
  const gptUrl = "https://chatgpt-42.p.rapidapi.com/texttoimage";

  console.log("Using API Key:", gptApiKey ? "✅ Loaded" : "❌ Missing");


  if (!gptApiKey || !gptUrl) {
    return response.status(500).json({ error: "API key or URL is missing in environment variables" });
  }

  try {
    const { prompt }: RequestProps = request.body;

    const res = await fetch(gptUrl, {
      method: "POST",
      body: JSON.stringify({
        text: prompt,
        width: WIDTH,
        height: HEIGHT
      }),
      headers: {
        'x-rapidapi-key': gptApiKey.trim(),
        'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
    });

    // if (!res.ok) {
    //   throw new Error("Failed to fetch from DALLE");
    // }


  if (!res.ok) {
  const errorText = await res.text();
  console.error("RapidAPI Error Response:", errorText);
  throw new Error(`Failed to fetch from DALLE: ${res.statusText}`);
}



    const data = await res.json();

    return response.status(200).json({
      message: data?.generated_image || "https://via.placeholder.com/600x400?text=Generated+Image",
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
}

export default handler;






// here’s an updated /api/generate-image.ts that logs exactly what RapidAPI sends back so we can see why it’s failing.

// pages/api/generate-image.ts
// import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { prompt } = req.body;
//   if (!prompt || typeof prompt !== "string") {
//     return res.status(400).json({ error: "Prompt is required" });
//   }

//   try {
//     const apiKey = process.env.RAPIDAPI_KEY; // changed from NEXT_PUBLIC_GPT_API_KEY
//     if (!apiKey) {
//       console.error("❌ RAPIDAPI_KEY is missing in .env.local");
//       return res.status(500).json({ error: "API key not configured" });
//     }

//     const response = await fetch("https://chatgpt-42.p.rapidapi.com/texttoimage", {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//         "x-rapidapi-key": apiKey.trim(),
//         "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
//       },
//       body: JSON.stringify({
//         text: prompt,
//         width: 1024,
//         height: 1024
//       }),
//     });

//     const data = await response.json();
//     console.log("📦 RapidAPI raw response:", data);

//     if (!response.ok) {
//       return res.status(response.status).json({
//         error: data.error?.message || "Image generation failed",
//         details: data,
//       });
//     }

//     // Adjust according to actual API response format
//     const imageUrl = data.generated_image || data.url || data.data?.[0]?.url;
//     if (!imageUrl) {
//       return res.status(500).json({
//         error: "No image URL returned",
//         details: data,
//       });
//     }

//     res.status(200).json({ imageUrl });
//   } catch (error: unknown) {
//   if (error instanceof Error) {
//     console.error("🔥 Server error:", error);
//     res.status(500).json({ error: error.message });
//   } else {
//     console.error("🔥 Server error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }
// }



