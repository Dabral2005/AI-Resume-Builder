import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;

let AIChatSession = null;

try {
  if (apiKey && apiKey.trim() !== '' && apiKey.length > 10) {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    };

    AIChatSession = model.startChat({
      generationConfig,
      history: [],
    });
  }
} catch (error) {
  console.error("AI Session Initialization Error:", error);
}

// Mock AI responses when no API key is configured
const mockSummaryResponse = (jobTitle) => {
  return JSON.stringify([
    {
      summary: `Results-driven ${jobTitle} with 5+ years of experience delivering high-quality solutions. Proven track record of leading cross-functional teams, optimizing performance, and implementing innovative strategies that drive business growth and user satisfaction.`,
      experience_level: "Senior"
    },
    {
      summary: `Motivated ${jobTitle} with 2-3 years of hands-on experience in developing and maintaining applications. Skilled in collaborating with teams to deliver projects on time while continuously learning and adopting new technologies.`,
      experience_level: "Mid Level"
    },
    {
      summary: `Enthusiastic and detail-oriented ${jobTitle} eager to launch a career in technology. Strong foundation in modern development practices with excellent problem-solving skills and a passion for creating impactful solutions.`,
      experience_level: "Fresher"
    }
  ]);
};

const mockExperienceResponse = (positionTitle) => {
  return `<ul>
    <li>Developed and maintained key features for production applications as a ${positionTitle}</li>
    <li>Collaborated with cross-functional teams to gather requirements and deliver solutions on time</li>
    <li>Implemented responsive and accessible user interfaces following modern best practices</li>
    <li>Optimized application performance resulting in 30% improvement in load times</li>
    <li>Participated in code reviews and mentored junior developers on best practices</li>
    <li>Wrote comprehensive unit and integration tests ensuring 90%+ code coverage</li>
  </ul>`;
};

export { AIChatSession, mockSummaryResponse, mockExperienceResponse };