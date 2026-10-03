export type SceneType = 
  | 'explanation'
  | 'content'
  | 'comparison'
  | 'scenario'
  | 'interactive-choice'
  | 'conversation'
  | 'practice'
  | 'key-takeaways'
  | 'summary'
  | 'topic-complete'
  | 'audio'
  | 'ordering'
  | 'interactive-example'
  | 'challenge'
  | 'completion';

export type QuestionType =
  | 'single-select'
  | 'multi-select'
  | 'true-false'
  | 'matching'
  | 'dropdown'
  | 'likert'
  | 'scenario'
  | 'ordering'
  | 'image';

export interface ConceptCheckQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  context?: string;
  questionNumber?: number;
  options?: any[];
  correctAnswer?: any;
  explanation: string;
  hint?: string;
  image?: string;
}

export interface DialogueLine {
  speaker: 'interviewer' | 'candidate' | 'coach';
  speakerName: string;
  text: string;
  isThought?: boolean;
}

export interface SceneData {
  id: string;
  title: string;
  type: SceneType;
  backgroundAsset?: string;
  avatar?: string;
  content: any;
}

export interface LessonData {
  id: string;
  title: string;
  topic: string;
  topicId: string;
  whatYouWillLearn: string[];
  whyItMatters: string;
  introExample: {
    question: string;
    surfaceMeaning: string;
    realIntent: string;
  };
  accomplishments: string[];
  scenes: SceneData[];
  conceptCheck: ConceptCheckQuestion[];
}

export const questionUnderstandingLesson: LessonData = {
  id: "1-2",
  title: "Identify Question Types",
  topic: "Question Understanding",
  topicId: "topic-1",
  whatYouWillLearn: [
    "Decode the interviewer's hidden intent before you begin speaking",
    "Rapidly classify questions into the 4 core categories",
    "Deploy the proven STAR framework and step-by-step logic",
    "Interpret real-life dialogue cues in high-stakes interviews"
  ],
  whyItMatters: "75% of interview missteps happen because candidates rush to answer without understanding what the interviewer is actually testing.",
  introExample: {
    question: "“Tell me about a time you made a critical mistake at work.”",
    surfaceMeaning: "They want to know if I am incompetent or make bad decisions.",
    realIntent: "They are evaluating my self-awareness, personal accountability, and capacity to learn and adapt from failures."
  },
  accomplishments: [
    "Decoded interviewer intent (surface vs evaluation criteria)",
    "Mastered the 4 core categories: Behavioral, Situational, Fit, Technical",
    "Interpreted real interview dialogues and conversational cues"
  ],
  scenes: [
    // 1. Learning Material — Section 1
    {
      id: "scene-1",
      title: "Question Intent",
      type: "content",
      content: {
        subtopic: "SECTION 1 • INTENT DECODING",
        heading: "What is the interviewer really asking?",
        body: "Every question an interviewer poses is designed to evaluate specific traits: your past track record, your future critical thinking, your personal motivations, or your domain knowledge. The secret to interview mastery is not memorizing answers—it's decoding what the interviewer is really testing before you formulate your response.",
        example: "When an interviewer asks, 'Tell me about a time you made a mistake,' they aren't looking for proof of failure—they are testing your self-awareness, accountability, and ability to learn from setbacks.",
        takeaway: "Always pause to identify the underlying intent: Are they assessing past evidence, hypothetical thinking, or cultural fit?"
      }
    },
    // 2. Learning Material — Section 2
    {
      id: "scene-2",
      title: "Core Question Categories",
      type: "content",
      content: {
        subtopic: "SECTION 2 • CORE CATEGORIES",
        heading: "The Four Core Question Categories",
        body: "During professional interviews, virtually every question falls into one of four primary categories. Recognizing these categories in real-time allows you to deploy the exact answering strategy tailored to each type:",
        bullets: [
          "Behavioral Questions — Focus on concrete past actions and verifiable track record ('Tell me about a time you...')",
          "Situational Questions — Present hypothetical future scenarios to assess problem-solving and critical thinking ('What would you do if...')",
          "Personal & Motivational Questions — Assess your values, passions, work ethics, and long-term career alignment ('Why this role?')",
          "Technical & Opinion Questions — Probe your deep domain expertise, industry perspective, and analytical rigor ('How would you design...')"
        ],
        takeaway: "Mastering the verbal cues for each category allows you to trigger the right answering framework within seconds."
      }
    },
    // 3. Interactive Activity #1 — Illustrated Scenario
    {
      id: "scene-3",
      title: "Identify Intent in Conversation",
      type: "scenario",
      backgroundAsset: "scene-2",
      content: {
        subtopic: "INTERACTIVE SCENARIO • INTENT DECODING",
        interviewerText: "Tell me about a time you handled a difficult project with tight deadlines.",
        thoughtText: "Notice the prompt starts with 'Tell me about a time...' — this is asking for concrete past evidence!",
        question: "What is the interviewer really asking?",
        options: [
          { id: "a", text: "Describe something you actually experienced and did in the past" },
          { id: "b", text: "Explain what you would theoretically do in a future hypothetical scenario" }
        ],
        correctId: "a",
        feedbackCorrect: "Correct! 'Tell me about a time you...' is a behavioral question because the interviewer is asking for concrete past evidence of what YOU actually did.",
        feedbackIncorrect: "Look closely at the opening words: 'Tell me about a time you...' asks for an event that already occurred in your past career, not a hypothetical future."
      }
    },
    // 4. Learning Material — Section 3
    {
      id: "scene-4",
      title: "Behavioral Framework",
      type: "content",
      content: {
        subtopic: "SECTION 3 • BEHAVIORAL FRAMEWORK",
        heading: "Behavioral Questions: The STAR Framework",
        body: "Hiring managers rely heavily on behavioral questions because past behavior is proven to be the single best predictor of future performance. When responding, avoid speaking in generalities or hypotheticals. You must anchor your response in a specific, tangible event.",
        example: "“Tell me about a time you had a serious disagreement with a stakeholder or coworker.”",
        bullets: [
          "Situation (10%) — Set the context, team dynamics, and specific challenge briefly.",
          "Task (10%) — Define your specific objective and personal responsibility.",
          "Action (60%) — Detail the exact actions YOU took, including decisions, conversations, and trade-offs.",
          "Result (20%) — Quantify the outcome, impact on the business, and key lessons learned."
        ],
        takeaway: "Structure all behavioral answers using the STAR framework, allocating 60% of your speaking time to the Actions YOU personally took."
      }
    },
    // 5. Learning Material — Section 4
    {
      id: "scene-5",
      title: "Situational Framework",
      type: "content",
      content: {
        subtopic: "SECTION 4 • SITUATIONAL THINKING",
        heading: "Situational Questions: Future & Critical Thinking",
        body: "Situational questions present hypothetical dilemmas you may never have encountered before. The interviewer is not grading whether you have a pre-packaged memory; they are observing how you think on your feet, assess risks, prioritize competing demands, and communicate under uncertainty.",
        example: "“What would you do if your project deadline was abruptly moved forward by three weeks?”",
        bullets: [
          "Clarify & Scope — Ask clarifying questions or state reasonable assumptions.",
          "Analyze Options — Weigh trade-offs between scope, quality, timeline, and resources.",
          "Communicate Proactively — Keep stakeholders and team members informed early.",
          "Execute & Follow-up — Define concrete mitigation steps and check-in milestones."
        ],
        takeaway: "Situational answers test your structured logic and collaborative judgment. Walk the interviewer step-by-step through your thinking."
      }
    },
    // 6. Interactive Activity #2 — Real Scenario Simulation (Exact Match to Screenshot)
    {
      id: "scene-6",
      title: "Classify Interview Question",
      type: "scenario",
      backgroundAsset: "scene-2",
      content: {
        subtopic: "INTERACTIVE SCENARIO • INTERVIEW SIMULATION",
        interviewerText: "What would you do if a key team member resigned right before product launch?",
        thoughtText: "Notice the prompt starts with 'What would you do if...' — this is a hypothetical situation!",
        question: "How should you classify this interview question?",
        options: [
          { id: "a", text: "Behavioral (Past Experience Story)" },
          { id: "b", text: "Situational (Hypothetical Approach)" }
        ],
        correctId: "b",
        feedbackCorrect: "Correct! Questions starting with 'What would you do if...' present a hypothetical scenario to evaluate your structured problem-solving under pressure.",
        feedbackIncorrect: "Notice the opening trigger: 'What would you do if...' describes a hypothetical future event, not a past experience. That makes it Situational."
      }
    },
    // 7. Final Learning Material
    {
      id: "scene-7",
      title: "Answering Playbook",
      type: "content",
      content: {
        subtopic: "SECTION 5 • RECAP & PRINCIPLES",
        heading: "Core Answering Principles & Playbook",
        body: "To consistently deliver standout answers across any interview stage, internalize these three foundational rules of universal communication:",
        bullets: [
          "Listen to the First 5 Words — The opening trigger ('Tell me about a time' vs 'What would you do if') immediately reveals whether you need a past STAR story or step-by-step hypothetical logic.",
          "Frame Before Diving In — Announce your structure in one sentence before elaborating (e.g. 'I approached this in three phases...').",
          "Highlight Your Personal Agency — Regardless of question type, interviewers score what YOU decided, negotiated, and executed."
        ],
        takeaway: "Mastering question understanding empowers you to answer with clarity, executive presence, and zero hesitation."
      }
    }
  ],
  conceptCheck: [
    {
      id: "cc-1",
      questionNumber: 1,
      type: "single-select",
      context: "“Tell me about a time you resolved a conflict at work with a difficult team member.”",
      prompt: "What type of question is this?",
      options: [
        { id: "personal", text: "Personal background" },
        { id: "behavioral", text: "Behavioral (Past experience)" },
        { id: "situational", text: "Situational (Hypothetical)" },
        { id: "opinion", text: "Opinion based" }
      ],
      correctAnswer: "behavioral",
      explanation: "Behavioral questions focus on past experiences and actions. The prompt 'Tell me about a time...' is the classic behavioral trigger."
    },
    {
      id: "cc-2",
      questionNumber: 2,
      type: "multi-select",
      context: "Review each of the questions below and identify all that represent situational prompts.",
      prompt: "Which of the following are examples of situational questions?",
      options: [
        { id: "q1", text: "What would you do if a team member disagreed with your decision?" },
        { id: "q2", text: "Tell me about a time you managed multiple conflicting priorities." },
        { id: "q3", text: "How would you handle a sudden 50% drop in project budget?" },
        { id: "q4", text: "Why did you choose software engineering as your career path?" }
      ],
      correctAnswer: ["q1", "q3"],
      explanation: "Situational questions present hypothetical future scenarios. Both 'What would you do if...' and 'How would you handle...' ask how you would react to prospective challenges."
    },
    {
      id: "cc-3",
      questionNumber: 3,
      type: "true-false",
      context: "“A situational interview question asks about specific actions you have already taken in past roles.”",
      prompt: "Is the statement above True or False?",
      options: [
        { id: "true", text: "TRUE" },
        { id: "false", text: "FALSE" }
      ],
      correctAnswer: "false",
      explanation: "Situational questions explore hypothetical future scenarios ('What would you do if...'), whereas behavioral questions ask about what you have already done."
    },
    {
      id: "cc-4",
      questionNumber: 4,
      type: "matching",
      context: "Match each interview opening stem to its correct question category.",
      prompt: "Match the prompt stem to the question category:",
      options: [
        { id: "l1", text: "Tell me about a time you led a team through a crisis...", side: "left" },
        { id: "l2", text: "What would you do if a key milestone slipped by a month?", side: "left" },
        { id: "l3", text: "What drew you to apply to our company culture?", side: "left" },
        { id: "l4", text: "How would you architect a distributed caching layer?", side: "left" },
        { id: "r1", text: "Behavioral", side: "right" },
        { id: "r2", text: "Situational", side: "right" },
        { id: "r3", text: "Personal & Fit", side: "right" },
        { id: "r4", text: "Technical & Domain", side: "right" }
      ],
      correctAnswer: { "l1": "r1", "l2": "r2", "l3": "r3", "l4": "r4" },
      explanation: "Past tense prompts align with Behavioral; 'What would you do' stems align with Situational; motivation stems align with Personal & Fit; system/domain questions align with Technical."
    },
    {
      id: "cc-5",
      questionNumber: 5,
      type: "dropdown",
      context: "A question asking how you would handle an unexpected future challenge is classified as [DROPDOWN].",
      prompt: "Complete the sentence with the correct classification:",
      options: [
        { id: "o1", text: "a behavioral question" },
        { id: "o2", text: "a situational question" },
        { id: "o3", text: "a personal motivation question" },
        { id: "o4", text: "an informal check-in" }
      ],
      correctAnswer: "o2",
      explanation: "Situational interview questions assess hypothetical problem solving by asking how you would react to prospective challenges."
    },
    {
      id: "cc-6",
      questionNumber: 6,
      type: "likert",
      context: "“When responding to a behavioral question, using the STAR method (Situation, Task, Action, Result) provides the most effective answer structure.”",
      prompt: "To what degree do you agree with this statement?",
      correctAnswer: "5",
      explanation: "The STAR framework is the industry-standard structure for answering behavioral interview questions thoroughly and concisely."
    },
    {
      id: "cc-7",
      questionNumber: 7,
      type: "scenario",
      context: "Your interviewer asks:\n“What would you do if your senior teammate strongly disagreed with your proposed architecture?”\n\nYou need to demonstrate structured problem-solving, collaboration, and critical thinking.",
      prompt: "Choose the response that best demonstrates structured situational thinking:",
      options: [
        { id: "a", text: "Immediately yield to the senior teammate since seniority always takes precedence." },
        { id: "b", text: "Ask clarifying questions to understand their technical concerns, evaluate trade-offs together with data, and escalate to the lead only if alignment cannot be reached." },
        { id: "c", text: "Tell a 10-minute story about how you argued with someone at your last company and won." },
        { id: "d", text: "Push your architecture to production anyway and prove its superiority through benchmarks." }
      ],
      correctAnswer: "b",
      explanation: "The best situational answers show curiosity, structured evaluation of trade-offs, objective data-driven decision-making, and constructive collaboration."
    },
    {
      id: "cc-8",
      questionNumber: 8,
      type: "ordering",
      context: "Interview experts recommend a 4-step sequence from the moment a question is asked to the conclusion of your response.",
      prompt: "Arrange the 4 steps in the correct chronological order:",
      options: [
        { id: "s1", text: "Listen actively & decode the question's true intent" },
        { id: "s2", text: "Identify the question category (e.g., Behavioral vs Situational)" },
        { id: "s3", text: "Select the appropriate framework (e.g., STAR or Step-by-Step)" },
        { id: "s4", text: "Deliver a structured response emphasizing personal actions & results" }
      ],
      correctAnswer: ["s1", "s2", "s3", "s4"],
      explanation: "First listen and understand the intent, then identify the category, select the answering structure, and finally deliver your answer clearly."
    },
    {
      id: "cc-9",
      questionNumber: 9,
      type: "image",
      context: "Interview Framework Matrix:\nQuadrant A: Past Evidence + Real Experience (STAR)\nQuadrant B: Future Scenarios + Hypothetical Logic (Step-by-Step)\nQuadrant C: Self-reflection & Career Alignment\nQuadrant D: System Architecture & Technical Deep-dive",
      prompt: "Which quadrant directly represents the domain of Behavioral Questions?",
      options: [
        { id: "quadA", text: "Quadrant A: Past Evidence & Real Experience" },
        { id: "quadB", text: "Quadrant B: Future Scenarios & Hypothetical Logic" },
        { id: "quadC", text: "Quadrant C: Self-reflection & Career Alignment" },
        { id: "quadD", text: "Quadrant D: System Architecture & Technical Deep-dive" }
      ],
      correctAnswer: "quadA",
      explanation: "Behavioral questions sit squarely in Quadrant A: past verifiable evidence and real experiences best answered with STAR."
    },
    {
      id: "cc-10",
      questionNumber: 10,
      type: "single-select",
      context: "“Where do you see your professional career heading in the next three to five years?”",
      prompt: "What type of interview question is this?",
      options: [
        { id: "beh", text: "Behavioral (Past Experience)" },
        { id: "sit", text: "Situational (Hypothetical Dilemma)" },
        { id: "pers", text: "Personal Motivation & Career Goals" },
        { id: "tech", text: "Technical Architecture" }
      ],
      correctAnswer: "pers",
      explanation: "Questions about your future aspirations, professional passions, and motivations fall under Personal & Career Alignment."
    }
  ]
};

export const lessonData = questionUnderstandingLesson;
