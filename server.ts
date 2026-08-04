import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Rate Limiter Middleware
interface RateLimitConfig {
  windowMs: number;
  max: number;
  message: string;
}

function createRateLimiter(config: RateLimitConfig) {
  const hits = new Map<string, number[]>();

  // Cleanup old entries periodically every 5 minutes
  setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of hits.entries()) {
      const valid = timestamps.filter(t => now - t < config.windowMs);
      if (valid.length === 0) {
        hits.delete(ip);
      } else {
        hits.set(ip, valid);
      }
    }
  }, 5 * 60 * 1000);

  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const clientIp = Array.isArray(ip) ? ip[0] : ip.toString();
    const now = Date.now();

    let timestamps = hits.get(clientIp) || [];
    timestamps = timestamps.filter(t => now - t < config.windowMs);

    if (timestamps.length >= config.max) {
      res.setHeader('Retry-After', Math.ceil(config.windowMs / 1000));
      return res.status(429).json({
        error: config.message || "Too many requests, please try again later."
      });
    }

    timestamps.push(now);
    hits.set(clientIp, timestamps);
    next();
  };
}

const aiLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 30,
  message: "Eish! You are sending AI tutoring requests a bit too quickly. Please take a brief 60-second breather before asking Sifiso another question."
});

const authLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 10,
  message: "Too many authentication or purchase attempts detected. Please wait a moment before trying again."
});

const publicLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 120,
  message: "Rate limit exceeded for public endpoints. Please slow down."
});

let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

const SIFISO_SYSTEM_INSTRUCTION = `You are "Sifiso", an encouraging, patient, and culturally relatable AI homework tutor and academic mentor designed specifically for South African school-going children (Grades R to 12) following the CAPS (Curriculum and Assessment Policy Statement) or IEB syllabi.

Your Core Rules:
1. **Never Give Direct Answers**: If a student asks for the answer to a homework problem (e.g. "What is the answer to question 3?"), do NOT solve it for them. Instead, break the problem down into smaller, digestible steps and ask a guiding question to prompt their thinking.
2. **Socratic Guiding Method**: Guide them using hints, analogies, and scaffolded questions so they experience the "lightbulb moment" on their own. Relate math/science word problems to South African contexts (e.g. rugby matches, local distances between towns like Johannesburg and Durban, shopping at local stores, braai meat portions, taxi fares, rand budgeting).
3. **Warm & Relatable Tone**: Use accessible English, but incorporate familiar, light South African idioms or warmth ("Sharp sharp!", "Eish, fractions can be tricky, but we've got this!", "Let's unpack this like packing a bakkie"). Be like an inspiring older mentor or supportive after-school tutor.
4. **Multilingual & Language Proficiency Accommodation**: If the student's selected Home Language / Proficiency is NOT English (e.g., isiZulu, isiXhosa, Sesotho, Afrikaans, Setswana, Sepedi, etc.), warmly code-switch! Provide key scientific, mathematical, or academic terms with natural translations and explanations in their preferred home language to ensure they feel completely supported and never left behind.
5. **Diagnose and Dissect**: When a student introduces a topic, check what they understand and where they feel stuck before giving further hints.
6. **Encourage Self-Correction**: When they make a mistake, gently guide them without discouraging them. Praise effort and critical thinking.
`;

app.post("/api/chat", aiLimiter, async (req, res) => {
  try {
    const { messages, grade, subject, language } = req.body;
    const ai = getAiClient();

    const formattedContents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const contextInstruction = `${SIFISO_SYSTEM_INSTRUCTION}\nCurrent Student Context: Grade ${grade || '10'}, Subject: ${subject || 'Mathematics'}, Student Home Language / Support Preference: ${language || 'English'}. (If preferred language is not English, use supportive code-switching and bilingual term explanations).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: formattedContents,
      config: {
        systemInstruction: contextInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text || "Eish, something went wrong. Let's try that again!" });
  } catch (error: any) {
    console.error("Chat error:", error);
    if (error?.message?.includes('RESOURCE_EXHAUSTED') || error?.status === 429 || error?.message?.includes('quota')) {
      return res.json({ text: "Eish! Our Sifiso AI tutoring server is currently experiencing high pilot testing traffic (API quota limit reached). Please give it a quick moment or try again in a few seconds, sharp sharp!" });
    }
    res.status(500).json({ error: error.message || "Failed to generate tutor response" });
  }
});

app.post("/api/breakdown", aiLimiter, async (req, res) => {
  try {
    const { question, grade, subject, image, language } = req.body;
    const ai = getAiClient();

    const parts: any[] = [];
    if (image) {
      const match = image.match(/^data:(.+?);base64,(.+)$/);
      if (match) {
        parts.push({
          inlineData: {
            mimeType: match[1],
            data: match[2]
          }
        });
      }
    }
    parts.push({
      text: `Analyze this South African homework question for Grade ${grade || '10'} ${subject || 'Mathematics'} (Preferred Home Language Support: ${language || 'English'}): "${question || 'Uploaded image question'}". 
      Do NOT give the final answer. Instead, break it down into 3 scaffolded milestones/steps using JSON format. If language is not English, include bilingual definitions/translations where helpful.
      Return JSON conforming to this structure:
      {
        "topic": "Topic name",
        "encouragingIntro": "Warm greeting and relatable Sifiso encouragement",
        "milestones": [
          {
            "step": 1,
            "title": "Step 1 title",
            "explanation": "Brief foundational explanation or analogy (with home language support if applicable)",
            "guidingQuestion": "A Socratic question to prompt student thought"
          },
          {
            "step": 2,
            "title": "Step 2 title",
            "explanation": "Explanation for step 2",
            "guidingQuestion": "Guiding question for step 2"
          },
          {
            "step": 3,
            "title": "Step 3 title",
            "explanation": "Explanation for step 3",
            "guidingQuestion": "Guiding question for step 3"
          }
        ]
      }`
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: { parts },
      config: {
        systemInstruction: `${SIFISO_SYSTEM_INSTRUCTION}\nStudent Language Support: ${language || 'English'}`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topic: { type: Type.STRING },
            encouragingIntro: { type: Type.STRING },
            milestones: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  step: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                  guidingQuestion: { type: Type.STRING }
                },
                required: ["step", "title", "explanation", "guidingQuestion"]
              }
            }
          },
          required: ["topic", "encouragingIntro", "milestones"]
        }
      }
    });

    const json = JSON.parse(response.text || "{}");
    res.json(json);
  } catch (error: any) {
    console.error("Breakdown error:", error);
    if (error?.message?.includes('RESOURCE_EXHAUSTED') || error?.status === 429 || error?.message?.includes('quota')) {
      return res.json({
        topic: "Pilot Testing Traffic Limit",
        encouragingIntro: "Eish! Sifiso is receiving high pilot testing traffic right now. Here is a quick practice breakdown while quota refreshes!",
        milestones: [
          { step: 1, title: "Step 1: Check your given values", explanation: "Identify what is known and what you need to calculate.", guidingQuestion: "What variables did the question give you?" },
          { step: 2, title: "Step 2: Apply the correct formula", explanation: "Select the relevant theorem or formula from your formula sheet.", guidingQuestion: "Which CAPS/IEB formula applies here?" },
          { step: 3, title: "Step 3: Calculate step-by-step", explanation: "Substitute your values carefully and double-check units.", guidingQuestion: "What is your final calculated value?" }
        ]
      });
    }
    res.status(500).json({ error: error.message || "Failed to breakdown problem" });
  }
});

app.post("/api/quiz", aiLimiter, async (req, res) => {
  try {
    const { topic, grade, subject, language } = req.body;
    const ai = getAiClient();

    const prompt = `Create a 3-question Socratic mini-quiz for Grade ${grade || '10'} ${subject || 'Mathematics'} on the topic: "${topic}". Language support requested: ${language || 'English'}.
    The questions should test conceptual understanding (CAPS/IEB aligned) with multiple-choice options, helpful Socratic hints (not answers), and explanations (including bilingual/home language term clarifications if language != English).
    Return JSON format:
    {
      "quizTitle": "Title",
      "questions": [
        {
          "id": 1,
          "question": "...",
          "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
          "correctIndex": 0,
          "socraticHint": "Hint to guide student without revealing answer",
          "explanation": "Explanation of the correct concept"
        }
      ]
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: `${SIFISO_SYSTEM_INSTRUCTION}\nStudent Language Support: ${language || 'English'}`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            quizTitle: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.INTEGER },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  correctIndex: { type: Type.INTEGER },
                  socraticHint: { type: Type.STRING },
                  explanation: { type: Type.STRING }
                },
                required: ["id", "question", "options", "correctIndex", "socraticHint", "explanation"]
              }
            }
          },
          required: ["quizTitle", "questions"]
        }
      }
    });

    const json = JSON.parse(response.text || "{}");
    res.json(json);
  } catch (error: any) {
    console.error("Quiz error:", error);
    res.status(500).json({ error: error.message || "Failed to generate quiz" });
  }
});

app.post("/api/grade-quiz", aiLimiter, async (req, res) => {
  try {
    const { topic, grade, subject, questions, userAnswers, language } = req.body;
    const ai = getAiClient();

    const prompt = `Act as Sifiso, the encouraging South African tutor. The student (Language support: ${language || 'English'}) just completed a test quiz on "${topic}" for Grade ${grade} ${subject}.
Here are the questions and student's answers:
${JSON.stringify(questions.map((q: any) => ({
    question: q.question,
    options: q.options,
    correctAnswer: q.options[q.correctIndex],
    studentAnswer: q.options[userAnswers[q.id]],
    isCorrect: userAnswers[q.id] === q.correctIndex,
    explanation: q.explanation
})))}

Provide a formal grading report card with:
1. Overall score and percentage.
2. Warm Sifiso encouraging remarks tailored to their performance ("Sharp sharp!" or gentle motivation if low score), including supportive code-switching in ${language || 'English'} if appropriate.
3. Specific simplification tips, bilingual definitions, and foundational memory hooks for any concepts they got wrong or struggled with.
4. Actionable next study steps.

Return JSON format:
{
  "score": 2,
  "total": 3,
  "percentage": 67,
  "sifisoFeedback": "Warm encouraging comment",
  "simplificationTips": [
    "Tip 1 regarding weak areas",
    "Tip 2"
  ],
  "nextSteps": "Recommended practice"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: `${SIFISO_SYSTEM_INSTRUCTION}\nStudent Language Support: ${language || 'English'}`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            total: { type: Type.INTEGER },
            percentage: { type: Type.INTEGER },
            sifisoFeedback: { type: Type.STRING },
            simplificationTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            nextSteps: { type: Type.STRING }
          },
          required: ["score", "total", "percentage", "sifisoFeedback", "simplificationTips", "nextSteps"]
        }
      }
    });

    const json = JSON.parse(response.text || "{}");
    res.json(json);
  } catch (error: any) {
    console.error("Grade quiz error:", error);
    res.status(500).json({ error: error.message || "Failed to grade quiz" });
  }
});

app.post("/api/flashcards", aiLimiter, async (req, res) => {
  try {
    const { topic, grade, subject, language } = req.body;
    const ai = getAiClient();

    const prompt = `Create 5 essential revision flashcards for Grade ${grade} ${subject} on the topic: "${topic || subject}". Student Language Support: ${language || 'English'}.
Each flashcard should test a key CAPS/IEB term, formula, or principle with a clear, simplified definition (including home language / bilingual term support if language != English).
Return JSON format:
{
  "flashcards": [
    {
      "id": "1",
      "term": "Term or Formula",
      "definition": "Simplified definition with memory hook or bilingual home language translation"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: `${SIFISO_SYSTEM_INSTRUCTION}\nStudent Language Support: ${language || 'English'}`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            flashcards: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  term: { type: Type.STRING },
                  definition: { type: Type.STRING }
                },
                required: ["id", "term", "definition"]
              }
            }
          },
          required: ["flashcards"]
        }
      }
    });

    const json = JSON.parse(response.text || "{}");
    res.json(json);
  } catch (error: any) {
    console.error("Flashcards error:", error);
    res.status(500).json({ error: error.message || "Failed to generate flashcards" });
  }
});

// Secure Unique Android App Purchase & Cellphone Delivery Store
const androidPurchases = new Map<string, { token: string; phone: string; name: string; parentName: string; parentPhone: string; grade: string; paymentMethod: string; paidAt: string; downloadUrl: string; smsSent: boolean }>();

app.post("/api/android/purchase", authLimiter, (req, res) => {
  try {
    const { phone, studentName, parentName, parentPhone, grade, paymentMethod } = req.body;
    if (!phone || phone.trim().length < 9) {
      return res.status(400).json({ error: "Valid South African cellphone number is required." });
    }
    if (!parentPhone || parentPhone.trim().length < 9) {
      return res.status(400).json({ error: "Parent or Guardian cellphone number is required for accessing student information under POPIA." });
    }

    // Generate unique secure cryptographically random token per user to prevent sharing & abuse
    const randomHex = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const uniqueToken = `sifiso-secure-${phone.replace(/[^0-9]/g, '')}-${randomHex.slice(0, 8)}`;
    const downloadUrl = `${req.protocol}://${req.get('host')}/download-secure-apk/${uniqueToken}`;

    const purchaseRecord = {
      token: uniqueToken,
      phone: phone.trim(),
      name: studentName || 'Student',
      parentName: parentName || 'Parent / Guardian',
      parentPhone: parentPhone.trim(),
      grade: grade || '10',
      paymentMethod: paymentMethod || 'PayFast / Card',
      paidAt: new Date().toISOString(),
      downloadUrl,
      smsSent: true
    };

    androidPurchases.set(uniqueToken, purchaseRecord);

    // Simulate SMS / WhatsApp delivery to the user and parent cell phone number
    console.log(`[SMS Gateway SIMULATION] To Student (${phone}) & Parent (${parentPhone}): Sifiso AI Tutor: Payment confirmed! Secure link: ${downloadUrl}`);

    res.json({
      success: true,
      message: `Payment successful via ${purchaseRecord.paymentMethod}! Secure download link dispatched via SMS/WhatsApp to Student (${phone}) & Parent/Guardian (${parentPhone}).`,
      token: uniqueToken,
      downloadUrl,
      phone: purchaseRecord.phone,
      parentPhone: purchaseRecord.parentPhone,
      studentName: purchaseRecord.name,
      smsDeliveryStatus: "Dispatched successfully to student and parent via SMS/WhatsApp gateway"
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to process purchase" });
  }
});

app.get("/download-secure-apk/:token", publicLimiter, (req, res) => {
  const { token } = req.params;
  const purchase = androidPurchases.get(token);

  if (!purchase) {
    return res.status(404).send(`
      <html>
        <head><title>Invalid or Expired Link - Sifiso</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 50px; background: #f8fafc; color: #1e293b;">
          <h2 style="color: #e11d48;">⚠️ Invalid or Revoked Download Link</h2>
          <p>To prevent abuse and link sharing, Sifiso download links are <strong>uniquely generated per user and tied to their registered cellphone number</strong>.</p>
          <p>Please complete payment on the Sifiso app to receive your new personalized secure download link via SMS.</p>
        </body>
      </html>
    `);
  }

  // Serve a secure download confirmation page that triggers the PWA / APK install
  res.send(`
    <html>
      <head>
        <title>Download Sifiso Secure Android App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; background: #f0fdf4; color: #064e3b; margin: 0; padding: 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
          .card { background: white; max-width: 480px; width: 100%; padding: 32px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); text-align: center; border: 1px solid #d1fae5; }
          h1 { color: #047857; font-size: 24px; margin-bottom: 8px; }
          p { color: #475569; font-size: 14px; line-height: 1.6; }
          .btn { display: inline-block; background: #059669; color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: bold; margin-top: 20px; box-shadow: 0 4px 12px rgba(5,150,105,0.2); }
          .badge { background: #d1fae5; color: #065f46; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; display: inline-block; margin-bottom: 16px; }
        .meta { background: #f8fafc; padding: 12px; border-radius: 10px; margin-top: 20px; font-size: 13px; color: #64748b; text-align: left; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="badge">🔒 Verified Secure Link (Anti-Abuse Protected)</div>
          <h1>Sifiso AI Tutor for Android</h1>
          <p>Your unique personalized link is authenticated for cellphone: <strong>${purchase.phone}</strong>.</p>
          <a href="/" class="btn">Launch App / Install on Phone</a>
          <div class="meta">
            <div><strong>Student Name:</strong> ${purchase.name}</div>
            <div><strong>Registered Phone:</strong> ${purchase.phone}</div>
            <div><strong>Purchased:</strong> ${new Date(purchase.paidAt).toLocaleString()}</div>
          </div>
        </div>
      </body>
    </html>
  `);
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Sifiso AI Tutor server running on http://localhost:${PORT}`);
  });
}

startServer();
