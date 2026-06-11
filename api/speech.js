export default async function handler(req, res) {
  // Security check: Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text payload is required' });
    }

    // Pulling keys securely from the Vercel server environment
    const voiceId = process.env.ELEVENLABS_VOICE_ID;
    const apiKey = process.env.ELEVENLABS_API_KEY;

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_turbo_v2_5',
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.85,
          },
        }),
      }
    );

    // Pass the quota error down to the frontend so your alert still triggers
    if (response.status === 402) {
      return res.status(402).json({ error: 'QUOTA_EXCEEDED' });
    }

    if (!response.ok) {
      throw new Error(`ElevenLabs API returned status ${response.status}`);
    }

    // Convert the audio stream into a buffer and send it back
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader('Content-Type', 'audio/mpeg');
    return res.status(200).send(buffer);

  } catch (error) {
    console.error("Audio Proxy Error:", error);
    return res.status(500).json({ error: 'Failed to generate speech' });
  }
}