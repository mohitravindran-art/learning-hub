import universalCommBg from '../assets/learning-hub/Universal Communication.png';
import criticalThinkingBg from '../assets/learning-hub/Critical Thinking & Problem Solving.png';
import digitalLiteracyBg from '../assets/learning-hub/Digital Literacy & Technology.png';
import teamworkBg from '../assets/learning-hub/Teamwork & Collaboration.png';
import creativityBg from '../assets/learning-hub/Creativity & Innovation.png';
import professionalBg from '../assets/learning-hub/Professional & Ethical Skills.png';
import type { ChapterData } from './practicePageData';

export type TopicStatus = "completed" | "current" | "unlocked" | "locked";

export interface SubTopic {
  id: string;
  number: string;
  title: string;
  status: TopicStatus;
}

export interface Topic {
  id: string;
  code?: string;
  number: string;
  title: string;
  description?: string;
  status: TopicStatus;
  conceptCheckCompleted: boolean;
  practiceCount: number;
  subtopics?: SubTopic[];
  learningContent?: string[];
  interactiveActivities?: string[];
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  description: string;
  status: "completed" | "unlocked" | "locked";
  progress: number;
  destination?: string;
  lockReason?: string;
  topics: Topic[];
}

export interface Subject {
  id: string;
  name: string;
  tagline: string;
  description: string;
  worldName: string;
  finalDestination: string;
  backgroundImage: string;
  icon: string;
  progress: number;
  currentChapterId: string;
  chapters: Chapter[];
}

export const getPracticeChaptersForSubject = (subject: Subject): ChapterData[] => {
  return subject.chapters.map(ch => ({
    id: ch.id,
    chapterNumber: ch.number,
    name: ch.title,
    isLocked: ch.status === 'locked',
    lockReason: ch.lockReason || 'Complete previous chapter to unlock',
    topics: ch.topics.map(t => ({
      id: t.id,
      code: t.code || `${ch.number}.${t.number}`,
      name: t.title,
      isLocked: t.status === 'locked',
    })),
  }));
};

export const SUBJECTS_DATA: Subject[] = [
  // ==========================================
  // SUBJECT 01: Universal Communication
  // ==========================================
  {
    id: "universal-communication",
    name: "Universal Communication",
    tagline: "Communication, speaking & interaction",
    description: "The student starts at a small village and travels through rivers, forests and mountains before reaching the Communication Summit.",
    worldName: "Mountain World",
    finalDestination: "Communication Summit",
    backgroundImage: universalCommBg,
    icon: "🏔️",
    progress: 55,
    currentChapterId: "comm-ch-3",
    chapters: [
      {
        id: "comm-ch-1",
        number: 1,
        title: "Communication Basics",
        description: "Master the core communication process, sender-receiver dynamics, and overcoming barriers.",
        status: "completed",
        progress: 100,
        destination: "River Crossing",
        topics: [
          {
            id: "comm-1-1",
            code: "1.1",
            number: "01",
            title: "What is communication?",
            description: "Understanding the true nature and impact of interpersonal communication.",
            status: "completed",
            conceptCheckCompleted: true,
            practiceCount: 12,
            learningContent: [
              "Meaning of communication",
              "Communication process",
              "Verbal and non-verbal communication",
              "Basic communication barriers"
            ],
            subtopics: [
              { id: "comm-1-1-1", number: "1.1.1", title: "Definition & Principles", status: "completed" },
              { id: "comm-1-1-2", number: "1.1.2", title: "Verbal vs Non-Verbal", status: "completed" }
            ]
          },
          {
            id: "comm-1-2",
            code: "1.2",
            number: "02",
            title: "The communication process",
            description: "Step-by-step breakdown of encoding, transmission, and decoding messages.",
            status: "completed",
            conceptCheckCompleted: true,
            practiceCount: 10,
            learningContent: [
              "Encoding and decoding messages",
              "The role of feedback",
              "Noise in channels"
            ],
            subtopics: [
              { id: "comm-1-2-1", number: "1.2.1", title: "Encoding & Channels", status: "completed" },
              { id: "comm-1-2-2", number: "1.2.2", title: "Decoding & Feedback Loop", status: "completed" }
            ]
          },
          {
            id: "comm-1-3",
            code: "1.3",
            number: "03",
            title: "Sender, receiver and message",
            description: "Aligning expectations between the speaker and the listener for maximum clarity.",
            status: "completed",
            conceptCheckCompleted: true,
            practiceCount: 8,
            learningContent: [
              "Audience awareness",
              "Crafting the core message",
              "Overcoming listener distortion"
            ],
            subtopics: [
              { id: "comm-1-3-1", number: "1.3.1", title: "Audience Empathy", status: "completed" },
              { id: "comm-1-3-2", number: "1.3.2", title: "Message Distortion", status: "completed" }
            ]
          }
        ]
      },
      {
        id: "comm-ch-2",
        number: 2,
        title: "Speaking Clearly",
        description: "Learn to structure your thoughts, choose accessible language, and calibrate your vocal tone.",
        status: "completed",
        progress: 100,
        destination: "Pine Forest Camp",
        topics: [
          {
            id: "comm-2-1",
            code: "2.1",
            number: "01",
            title: "Structuring a message",
            description: "Organizing ideas with logical flow and signposting for effortless understanding.",
            status: "completed",
            conceptCheckCompleted: true,
            practiceCount: 14,
            learningContent: [
              "Organizing thoughts",
              "Headline-first method",
              "Chronological & thematic ordering"
            ],
            subtopics: [
              { id: "comm-2-1-1", number: "2.1.1", title: "Signposting Your Points", status: "completed" },
              { id: "comm-2-1-2", number: "2.1.2", title: "The 3-Part Structure", status: "completed" }
            ]
          },
          {
            id: "comm-2-2",
            code: "2.2",
            number: "02",
            title: "Choosing simple words",
            description: "Eliminating jargon, reducing filler words, and speaking with precision.",
            status: "completed",
            conceptCheckCompleted: true,
            practiceCount: 11,
            learningContent: [
              "Clear concise sentences",
              "Avoiding confusing language",
              "Eliminating filler words"
            ],
            subtopics: [
              { id: "comm-2-2-1", number: "2.2.1", title: "Plain English Guidelines", status: "completed" },
              { id: "comm-2-2-2", number: "2.2.2", title: "Pruning Clutter", status: "completed" }
            ]
          },
          {
            id: "comm-2-3",
            code: "2.3",
            number: "03",
            title: "Tone and clarity",
            description: "Calibrating inflection, warmth, cadence, and volume to engage your listeners.",
            status: "completed",
            conceptCheckCompleted: true,
            practiceCount: 9,
            learningContent: [
              "Tone of voice impact",
              "Pacing and intentional pauses",
              "Clarity under pressure"
            ],
            subtopics: [
              { id: "comm-2-3-1", number: "2.3.1", title: "Vocal Modulation", status: "completed" },
              { id: "comm-2-3-2", number: "2.3.2", title: "Intentional Pausing", status: "completed" }
            ]
          }
        ]
      },
      {
        id: "comm-ch-3",
        number: 3,
        title: "Listening & Understanding",
        description: "Transform listening into a superpower by identifying hidden intent and asking incisive questions.",
        status: "unlocked",
        progress: 60,
        destination: "Mountain Pass Base",
        topics: [
          {
            id: "comm-3-1",
            code: "3.1",
            number: "01",
            title: "Active listening",
            description: "Techniques to listen attentively, synthesize key points, and reflect understanding.",
            status: "completed",
            conceptCheckCompleted: true,
            practiceCount: 15,
            learningContent: [
              "Active listening techniques",
              "Reflective paraphrasing",
              "Overcoming internal distractions"
            ],
            subtopics: [
              { id: "comm-3-1-1", number: "3.1.1", title: "Whole-body listening", status: "completed" },
              { id: "comm-3-1-2", number: "3.1.2", title: "Reflective questioning", status: "completed" }
            ]
          },
          {
            id: "comm-3-2",
            code: "3.2",
            number: "02",
            title: "Understanding intent",
            description: "Deciphering what people genuinely mean beyond their literal words.",
            status: "current",
            conceptCheckCompleted: false,
            practiceCount: 12,
            learningContent: [
              "Identifying what someone really means",
              "Contextual clues and unspoken needs",
              "Distinguishing emotion from factual content"
            ],
            subtopics: [
              { id: "comm-3-2-1", number: "3.2.1", title: "Subtext and implied goals", status: "current" },
              { id: "comm-3-2-2", number: "3.2.2", title: "Emotional undercurrents", status: "unlocked" }
            ]
          },
          {
            id: "comm-3-3",
            code: "3.3",
            number: "03",
            title: "Asking better questions",
            description: "Using open-ended, probing, and clarifying inquiries to deepen conversation.",
            status: "unlocked",
            conceptCheckCompleted: false,
            practiceCount: 10,
            learningContent: [
              "Asking useful open questions",
              "Probing gently for clarity",
              "Avoiding leading questions"
            ],
            subtopics: [
              { id: "comm-3-3-1", number: "3.3.1", title: "Inquiry frameworks", status: "unlocked" },
              { id: "comm-3-3-2", number: "3.3.2", title: "Clarifying ambiguity", status: "unlocked" }
            ]
          }
        ]
      },
      {
        id: "comm-ch-4",
        number: 4,
        title: "Non-Verbal Communication",
        description: "Master body language, gestures, eye contact, and posture to project confidence.",
        status: "locked",
        lockReason: "Complete Chapter 03 to unlock this chapter",
        progress: 0,
        destination: "Highland Plateau",
        topics: [
          {
            id: "comm-4-1",
            code: "4.1",
            number: "01",
            title: "Facial expressions",
            description: "Recognizing micro-expressions and managing personal facial signals.",
            status: "locked",
            conceptCheckCompleted: false,
            practiceCount: 8,
            learningContent: ["Facial expressions", "Congruence with words"]
          },
          {
            id: "comm-4-2",
            code: "4.2",
            number: "02",
            title: "Gestures and posture",
            description: "Open body positioning and natural hand movements that enhance credibility.",
            status: "locked",
            conceptCheckCompleted: false,
            practiceCount: 8,
            learningContent: ["Open vs closed gestures", "Grounded posture"]
          },
          {
            id: "comm-4-3",
            code: "4.3",
            number: "03",
            title: "Eye contact and body language",
            description: "Maintaining balanced eye contact across in-person and digital camera environments.",
            status: "locked",
            conceptCheckCompleted: false,
            practiceCount: 8,
            learningContent: ["Eye contact comfort", "Body orientation", "Camera presence"]
          }
        ]
      },
      {
        id: "comm-ch-5",
        number: 5,
        title: "Communication in Different Situations",
        description: "Navigate formal vs informal workplace conversations, presentations, and difficult dialogues.",
        status: "locked",
        lockReason: "Complete Chapter 04 to unlock this chapter",
        progress: 0,
        destination: "Eagle's Nest Ridge",
        topics: [
          {
            id: "comm-5-1",
            code: "5.1",
            number: "01",
            title: "Formal vs informal communication",
            description: "Adapting your register, tone, and etiquette according to context and hierarchy.",
            status: "locked",
            conceptCheckCompleted: false,
            practiceCount: 7,
            learningContent: ["Professional registers", "Email vs chat etiquette"]
          },
          {
            id: "comm-5-2",
            code: "5.2",
            number: "02",
            title: "Workplace conversations",
            description: "Handling 1-on-1 updates, standups, and cross-functional collaborations smoothly.",
            status: "locked",
            conceptCheckCompleted: false,
            practiceCount: 8,
            learningContent: ["Workplace discussions", "Giving constructive updates"]
          },
          {
            id: "comm-5-3",
            code: "5.3",
            number: "03",
            title: "Difficult conversations",
            description: "De-escalating friction, managing disagreements, and resolving misunderstandings.",
            status: "locked",
            conceptCheckCompleted: false,
            practiceCount: 9,
            learningContent: ["De-escalation", "Handling defensive reactions", "Agreeing on next steps"]
          }
        ]
      },
      {
        id: "comm-ch-6",
        number: 6,
        title: "Effective Communication Challenge",
        description: "The ultimate synthesis challenge: solve complex communication scenarios and reach the Summit.",
        status: "locked",
        lockReason: "Complete Chapter 05 to unlock the final summit challenge",
        progress: 0,
        destination: "Communication Summit",
        topics: [
          {
            id: "comm-6-1",
            code: "6.1",
            number: "01",
            title: "Real-world communication scenarios",
            description: "Dissect complex communication breakdowns from enterprise case studies.",
            status: "locked",
            conceptCheckCompleted: false,
            practiceCount: 10,
            interactiveActivities: ["Rearrange a conversation", "Identify speaker intent"]
          },
          {
            id: "comm-6-2",
            code: "6.2",
            number: "02",
            title: "Workplace conversation simulation",
            description: "Interactive real-time roleplay simulation with simulated stakeholders.",
            status: "locked",
            conceptCheckCompleted: false,
            practiceCount: 12,
            interactiveActivities: ["Conversation simulation", "Live stakeholder mediation"]
          },
          {
            id: "comm-6-3",
            code: "6.3",
            number: "03",
            title: "Communication problem solving",
            description: "Rewrite unclear corporate memos and turn ambiguous instructions into clear action.",
            status: "locked",
            conceptCheckCompleted: false,
            practiceCount: 10,
            interactiveActivities: ["Rewrite unclear messages", "Comprehensive communication capstone"]
          }
        ]
      }
    ]
  },

  // ==========================================
  // SUBJECT 02: Critical Thinking & Problem Solving
  // ==========================================
  {
    id: "critical-thinking",
    name: "Critical Thinking & Problem Solving",
    tagline: "Reasoning, analysis & decision making",
    description: "The student travels through a desert and solves increasingly difficult problems before reaching the Problem-Solving Temple.",
    worldName: "Desert Expedition",
    finalDestination: "Problem-Solving Temple",
    backgroundImage: criticalThinkingBg,
    icon: "🏜️",
    progress: 35,
    currentChapterId: "crit-ch-2",
    chapters: [
      {
        id: "crit-ch-1",
        number: 1,
        title: "Understanding Problems",
        description: "Uncover the true root cause of issues instead of treating surface-level symptoms.",
        status: "completed",
        progress: 100,
        destination: "Oasis of Discovery",
        topics: [
          {
            id: "crit-1-1",
            code: "1.1",
            number: "01",
            title: "What is a problem?",
            description: "Defining problems objectively as the gap between current state and desired goal.",
            status: "completed",
            conceptCheckCompleted: true,
            practiceCount: 12,
            learningContent: ["Definition of a problem", "Goal states and obstacles"]
          },
          {
            id: "crit-1-2",
            code: "1.2",
            number: "02",
            title: "Symptoms vs root problems",
            description: "Separating immediate visible signs from underlying structural drivers.",
            status: "completed",
            conceptCheckCompleted: true,
            practiceCount: 14,
            learningContent: ["The 5-Whys technique", "Symptom masking dangers"]
          },
          {
            id: "crit-1-3",
            code: "1.3",
            number: "03",
            title: "Identifying the real problem",
            description: "Formulating precise, actionable problem statements that guide effective solutions.",
            status: "completed",
            conceptCheckCompleted: true,
            practiceCount: 10,
            learningContent: ["Problem framing", "Scope boundary definition"]
          }
        ]
      },
      {
        id: "crit-ch-2",
        number: 2,
        title: "Breaking Problems Down",
        description: "Decompose overwhelming challenges into manageable, testable components.",
        status: "unlocked",
        progress: 40,
        destination: "Dune Canyon",
        topics: [
          {
            id: "crit-2-1",
            code: "2.1",
            number: "01",
            title: "Problem decomposition",
            description: "Issue tree methodology and MECE (Mutually Exclusive, Collectively Exhaustive) breakdown.",
            status: "completed",
            conceptCheckCompleted: true,
            practiceCount: 15,
            learningContent: ["Issue trees", "MECE framework"]
          },
          {
            id: "crit-2-2",
            code: "2.2",
            number: "02",
            title: "Objectives and constraints",
            description: "Clarifying non-negotiables, trade-offs, budget, and time limits.",
            status: "current",
            conceptCheckCompleted: false,
            practiceCount: 11,
            learningContent: ["Hard vs soft constraints", "Defining success metrics"]
          },
          {
            id: "crit-2-3",
            code: "2.3",
            number: "03",
            title: "Breaking complex problems into smaller parts",
            description: "Modular thinking and prioritizing sub-problems with highest leverage.",
            status: "unlocked",
            conceptCheckCompleted: false,
            practiceCount: 9,
            learningContent: ["Sub-problem prioritization", "80/20 leverage points"]
          }
        ]
      },
      {
        id: "crit-ch-3",
        number: 3,
        title: "Evidence & Information",
        description: "Verify claims, spot cognitive biases, and distinguish solid facts from unverified assumptions.",
        status: "locked",
        lockReason: "Complete Chapter 02 to unlock",
        progress: 0,
        destination: "Sunken Ruin Archive",
        topics: [
          {
            id: "crit-3-1",
            code: "3.1",
            number: "01",
            title: "Facts vs assumptions",
            description: "Uncovering unstated premises and stress-testing foundational beliefs.",
            status: "locked",
            conceptCheckCompleted: false,
            practiceCount: 8
          },
          {
            id: "crit-3-2",
            code: "3.2",
            number: "02",
            title: "Finding reliable information",
            description: "Assessing source credibility, sample size, and detecting statistical fallacies.",
            status: "locked",
            conceptCheckCompleted: false,
            practiceCount: 9
          },
          {
            id: "crit-3-3",
            code: "3.3",
            number: "03",
            title: "Asking the right questions",
            description: "Socratic inquiry methods to stress-test assertions and find blind spots.",
            status: "locked",
            conceptCheckCompleted: false,
            practiceCount: 8
          }
        ]
      },
      {
        id: "crit-ch-4",
        number: 4,
        title: "Exploring Solutions",
        description: "Generate diverse alternatives, avoid premature convergence, and evaluate logical viability.",
        status: "locked",
        lockReason: "Complete Chapter 03 to unlock",
        progress: 0,
        destination: "Mirage Ridge",
        topics: [
          {
            id: "crit-4-1",
            code: "4.1",
            number: "01",
            title: "Brainstorming",
            description: "Structured ideation without premature critique.",
            status: "locked",
            conceptCheckCompleted: false,
            practiceCount: 7
          },
          {
            id: "crit-4-2",
            code: "4.2",
            number: "02",
            title: "Comparing alternatives",
            description: "Constructing decision matrices and weighted scoring models.",
            status: "locked",
            conceptCheckCompleted: false,
            practiceCount: 8
          },
          {
            id: "crit-4-3",
            code: "4.3",
            number: "03",
            title: "Logical reasoning",
            description: "Deductive, inductive, and abductive inference patterns.",
            status: "locked",
            conceptCheckCompleted: false,
            practiceCount: 8
          }
        ]
      },
      {
        id: "crit-ch-5",
        number: 5,
        title: "Decision Making",
        description: "Choose with conviction through risk-reward calculus, second-order thinking, and contingency plans.",
        status: "locked",
        lockReason: "Complete Chapter 04 to unlock",
        progress: 0,
        destination: "Pillar of Judgment",
        topics: [
          {
            id: "crit-5-1",
            code: "5.1",
            number: "01",
            title: "Evaluating options",
            description: "Comparing trade-offs under incomplete information.",
            status: "locked",
            conceptCheckCompleted: false,
            practiceCount: 8
          },
          {
            id: "crit-5-2",
            code: "5.2",
            number: "02",
            title: "Understanding consequences",
            description: "Anticipating second and third-order ripple effects.",
            status: "locked",
            conceptCheckCompleted: false,
            practiceCount: 8
          },
          {
            id: "crit-5-3",
            code: "5.3",
            number: "03",
            title: "Risk and reward",
            description: "Expected value calculation and downside mitigation.",
            status: "locked",
            conceptCheckCompleted: false,
            practiceCount: 8
          }
        ]
      },
      {
        id: "crit-ch-6",
        number: 6,
        title: "Real-World Problem Solving",
        description: "Apply your analytical toolkit to solve multi-variable ambiguous case studies at the Temple.",
        status: "locked",
        lockReason: "Complete Chapter 05 to unlock the final temple trial",
        progress: 0,
        destination: "Problem-Solving Temple",
        topics: [
          {
            id: "crit-6-1",
            code: "6.1",
            number: "01",
            title: "Case studies",
            description: "End-to-end breakdown of complex real-world dilemmas.",
            status: "locked",
            conceptCheckCompleted: false,
            practiceCount: 10
          },
          {
            id: "crit-6-2",
            code: "6.2",
            number: "02",
            title: "Ambiguous problems",
            description: "Navigating shifting goals, unclear parameters, and volatility.",
            status: "locked",
            conceptCheckCompleted: false,
            practiceCount: 11
          },
          {
            id: "crit-6-3",
            code: "6.3",
            number: "03",
            title: "Scenario-based challenges",
            description: "Rapid high-stakes decision making under strict constraints.",
            status: "locked",
            conceptCheckCompleted: false,
            practiceCount: 10
          }
        ]
      }
    ]
  },

  // ==========================================
  // SUBJECT 03: Digital Literacy & Technology
  // ==========================================
  {
    id: "digital-literacy",
    name: "Digital Literacy & Technology",
    tagline: "Digital skills, internet & AI",
    description: "The student enters a digital city and unlocks different technology districts before accessing the Digital Core.",
    worldName: "Cyber World",
    finalDestination: "Digital Core",
    backgroundImage: digitalLiteracyBg,
    icon: "💻",
    progress: 40,
    currentChapterId: "dig-ch-3",
    chapters: [
      {
        id: "dig-ch-1",
        number: 1,
        title: "Digital Foundations",
        description: "Demystify modern computing devices, file architectures, and hardware-software synergy.",
        status: "completed",
        progress: 100,
        destination: "Gateway Substation",
        topics: [
          { id: "dig-1-1", code: "1.1", number: "01", title: "Digital devices", status: "completed", conceptCheckCompleted: true, practiceCount: 10 },
          { id: "dig-1-2", code: "1.2", number: "02", title: "Hardware vs software", status: "completed", conceptCheckCompleted: true, practiceCount: 12 },
          { id: "dig-1-3", code: "1.3", number: "03", title: "Operating systems", status: "completed", conceptCheckCompleted: true, practiceCount: 9 },
          { id: "dig-1-4", code: "1.4", number: "04", title: "Files and folders", status: "completed", conceptCheckCompleted: true, practiceCount: 8 }
        ]
      },
      {
        id: "dig-ch-2",
        number: 2,
        title: "Internet & Information",
        description: "Understand network protocols, search engine indexing, and critical evaluation of online sources.",
        status: "completed",
        progress: 100,
        destination: "Fiber Optic Hub",
        topics: [
          { id: "dig-2-1", code: "2.1", number: "01", title: "How the internet works", status: "completed", conceptCheckCompleted: true, practiceCount: 14 },
          { id: "dig-2-2", code: "2.2", number: "02", title: "Browsers and search", status: "completed", conceptCheckCompleted: true, practiceCount: 11 },
          { id: "dig-2-3", code: "2.3", number: "03", title: "Evaluating online information", status: "completed", conceptCheckCompleted: true, practiceCount: 10 }
        ]
      },
      {
        id: "dig-ch-3",
        number: 3,
        title: "Digital Productivity",
        description: "Master modern workplace suites: collaborative docs, spreadsheets, slides, and cloud ecosystems.",
        status: "unlocked",
        progress: 25,
        destination: "Cloud Towers",
        topics: [
          { id: "dig-3-1", code: "3.1", number: "01", title: "Documents", status: "completed", conceptCheckCompleted: true, practiceCount: 12 },
          { id: "dig-3-2", code: "3.2", number: "02", title: "Spreadsheets", status: "current", conceptCheckCompleted: false, practiceCount: 15 },
          { id: "dig-3-3", code: "3.3", number: "03", title: "Presentations", status: "unlocked", conceptCheckCompleted: false, practiceCount: 10 },
          { id: "dig-3-4", code: "3.4", number: "04", title: "Cloud storage and collaboration", status: "unlocked", conceptCheckCompleted: false, practiceCount: 9 }
        ]
      },
      {
        id: "dig-ch-4",
        number: 4,
        title: "Digital Safety",
        description: "Protect sensitive data, craft impenetrable credentials, and detect sophisticated cyber threats.",
        status: "locked",
        lockReason: "Complete Chapter 03 to unlock",
        progress: 0,
        destination: "Firewall Bastion",
        topics: [
          { id: "dig-4-1", code: "4.1", number: "01", title: "Password security", status: "locked", conceptCheckCompleted: false, practiceCount: 8 },
          { id: "dig-4-2", code: "4.2", number: "02", title: "Phishing and scams", status: "locked", conceptCheckCompleted: false, practiceCount: 9 },
          { id: "dig-4-3", code: "4.3", number: "03", title: "Privacy and personal data", status: "locked", conceptCheckCompleted: false, practiceCount: 8 }
        ]
      },
      {
        id: "dig-ch-5",
        number: 5,
        title: "AI & Emerging Technology",
        description: "Harness generative AI tools, engineer high-precision prompts, and understand machine learning limits.",
        status: "locked",
        lockReason: "Complete Chapter 04 to unlock",
        progress: 0,
        destination: "Neural Sector",
        topics: [
          { id: "dig-5-1", code: "5.1", number: "01", title: "What is AI?", status: "locked", conceptCheckCompleted: false, practiceCount: 9 },
          { id: "dig-5-2", code: "5.2", number: "02", title: "Generative AI", status: "locked", conceptCheckCompleted: false, practiceCount: 11 },
          { id: "dig-5-3", code: "5.3", number: "03", title: "Writing better prompts", status: "locked", conceptCheckCompleted: false, practiceCount: 12 },
          { id: "dig-5-4", code: "5.4", number: "04", title: "AI limitations", status: "locked", conceptCheckCompleted: false, practiceCount: 8 }
        ]
      },
      {
        id: "dig-ch-6",
        number: 6,
        title: "Digital Problem Solving",
        description: "Diagnose tech glitches, select optimal SaaS tools, and resolve modern workplace tech challenges.",
        status: "locked",
        lockReason: "Complete Chapter 05 to unlock the core mainframe",
        progress: 0,
        destination: "Digital Core",
        topics: [
          { id: "dig-6-1", code: "6.1", number: "01", title: "Choosing the right digital tool", status: "locked", conceptCheckCompleted: false, practiceCount: 10 },
          { id: "dig-6-2", code: "6.2", number: "02", title: "Troubleshooting", status: "locked", conceptCheckCompleted: false, practiceCount: 12 },
          { id: "dig-6-3", code: "6.3", number: "03", title: "Technology-based scenarios", status: "locked", conceptCheckCompleted: false, practiceCount: 10 }
        ]
      }
    ]
  },

  // ==========================================
  // SUBJECT 04: Teamwork & Collaboration
  // ==========================================
  {
    id: "teamwork-collaboration",
    name: "Teamwork & Collaboration",
    tagline: "Working effectively with others",
    description: "The student travels through forests, bridges and camps with a team towards The Great Team Camp.",
    worldName: "Giant Forest",
    finalDestination: "The Great Team Camp",
    backgroundImage: teamworkBg,
    icon: "🌲",
    progress: 30,
    currentChapterId: "team-ch-2",
    chapters: [
      {
        id: "team-ch-1",
        number: 1,
        title: "Understanding Teams",
        description: "Align individual talents with team objectives and establish psychological safety.",
        status: "completed",
        progress: 100,
        destination: "Forest Trailhead",
        topics: [
          { id: "team-1-1", code: "1.1", number: "01", title: "What makes a team?", status: "completed", conceptCheckCompleted: true, practiceCount: 10 },
          { id: "team-1-2", code: "1.2", number: "02", title: "Roles and responsibilities", status: "completed", conceptCheckCompleted: true, practiceCount: 12 },
          { id: "team-1-3", code: "1.3", number: "03", title: "Individual vs team goals", status: "completed", conceptCheckCompleted: true, practiceCount: 9 }
        ]
      },
      {
        id: "team-ch-2",
        number: 2,
        title: "Working With Others",
        description: "Embrace diverse working styles, practice transparent sharing, and build mutual trust.",
        status: "unlocked",
        progress: 75,
        destination: "Canopy Bridge",
        topics: [
          { id: "team-2-1", code: "2.1", number: "01", title: "Cooperation", status: "completed", conceptCheckCompleted: true, practiceCount: 12 },
          { id: "team-2-2", code: "2.2", number: "02", title: "Sharing information", status: "completed", conceptCheckCompleted: true, practiceCount: 11 },
          { id: "team-2-3", code: "2.3", number: "03", title: "Different perspectives", status: "current", conceptCheckCompleted: false, practiceCount: 10 }
        ]
      },
      {
        id: "team-ch-3",
        number: 3,
        title: "Collaboration & Communication",
        description: "Run crisp syncs, deliver concise status updates, and seek assistance without hesitation.",
        status: "locked",
        lockReason: "Complete Chapter 02 to unlock",
        progress: 0,
        destination: "Whispering Pines",
        topics: [
          { id: "team-3-1", code: "3.1", number: "01", title: "Team communication", status: "locked", conceptCheckCompleted: false, practiceCount: 8 },
          { id: "team-3-2", code: "3.2", number: "02", title: "Meetings", status: "locked", conceptCheckCompleted: false, practiceCount: 9 },
          { id: "team-3-3", code: "3.3", number: "03", title: "Asking for help", status: "locked", conceptCheckCompleted: false, practiceCount: 8 },
          { id: "team-3-4", code: "3.4", number: "04", title: "Giving updates", status: "locked", conceptCheckCompleted: false, practiceCount: 7 }
        ]
      },
      {
        id: "team-ch-4",
        number: 4,
        title: "Conflict & Differences",
        description: "Transform interpersonal disagreements into constructive fuel for innovative consensus.",
        status: "locked",
        lockReason: "Complete Chapter 03 to unlock",
        progress: 0,
        destination: "Rapids Crossing",
        topics: [
          { id: "team-4-1", code: "4.1", number: "01", title: "Sources of conflict", status: "locked", conceptCheckCompleted: false, practiceCount: 8 },
          { id: "team-4-2", code: "4.2", number: "02", title: "Disagreement", status: "locked", conceptCheckCompleted: false, practiceCount: 9 },
          { id: "team-4-3", code: "4.3", number: "03", title: "Listening to different views", status: "locked", conceptCheckCompleted: false, practiceCount: 8 },
          { id: "team-4-4", code: "4.4", number: "04", title: "Resolving issues", status: "locked", conceptCheckCompleted: false, practiceCount: 9 }
        ]
      },
      {
        id: "team-ch-5",
        number: 5,
        title: "Leadership & Ownership",
        description: "Step up when ambiguity arises, delegate responsibly, and uplift your peers.",
        status: "locked",
        lockReason: "Complete Chapter 04 to unlock",
        progress: 0,
        destination: "Elder Redwood Grove",
        topics: [
          { id: "team-5-1", code: "5.1", number: "01", title: "Taking responsibility", status: "locked", conceptCheckCompleted: false, practiceCount: 9 },
          { id: "team-5-2", code: "5.2", number: "02", title: "Delegation", status: "locked", conceptCheckCompleted: false, practiceCount: 8 },
          { id: "team-5-3", code: "5.3", number: "03", title: "Decision making", status: "locked", conceptCheckCompleted: false, practiceCount: 8 },
          { id: "team-5-4", code: "5.4", number: "04", title: "Supporting teammates", status: "locked", conceptCheckCompleted: false, practiceCount: 8 }
        ]
      },
      {
        id: "team-ch-6",
        number: 6,
        title: "Team Challenge",
        description: "Navigate real-time collaborative crises and reach The Great Team Camp united.",
        status: "locked",
        lockReason: "Complete Chapter 05 to unlock the final expedition",
        progress: 0,
        destination: "The Great Team Camp",
        topics: [
          { id: "team-6-1", code: "6.1", number: "01", title: "Team scenarios", status: "locked", conceptCheckCompleted: false, practiceCount: 10 },
          { id: "team-6-2", code: "6.2", number: "02", title: "Team decisions", status: "locked", conceptCheckCompleted: false, practiceCount: 11 },
          { id: "team-6-3", code: "6.3", number: "03", title: "Conflict simulations", status: "locked", conceptCheckCompleted: false, practiceCount: 10 },
          { id: "team-6-4", code: "6.4", number: "04", title: "Collaboration challenges", status: "locked", conceptCheckCompleted: false, practiceCount: 12 }
        ]
      }
    ]
  },

  // ==========================================
  // SUBJECT 05: Creativity & Innovation
  // ==========================================
  {
    id: "creativity-innovation",
    name: "Creativity & Innovation",
    tagline: "Creative thinking & new ideas",
    description: "The student travels between floating islands and discovers new ways to solve challenges on Innovation Island.",
    worldName: "Fantasy Island",
    finalDestination: "Innovation Island",
    backgroundImage: creativityBg,
    icon: "🏝️",
    progress: 10,
    currentChapterId: "creat-ch-1",
    chapters: [
      {
        id: "creat-ch-1",
        number: 1,
        title: "Creative Mindset",
        description: "Cultivate relentless curiosity, break rigid mental patterns, and embrace ambiguity.",
        status: "unlocked",
        progress: 30,
        destination: "Floating Harbor",
        topics: [
          { id: "creat-1-1", code: "1.1", number: "01", title: "What is creativity?", status: "completed", conceptCheckCompleted: true, practiceCount: 10 },
          { id: "creat-1-2", code: "1.2", number: "02", title: "Curiosity", status: "current", conceptCheckCompleted: false, practiceCount: 12 },
          { id: "creat-1-3", code: "1.3", number: "03", title: "Exploring possibilities", status: "unlocked", conceptCheckCompleted: false, practiceCount: 8 },
          { id: "creat-1-4", code: "1.4", number: "04", title: "Working with ambiguity", status: "unlocked", conceptCheckCompleted: false, practiceCount: 9 }
        ]
      },
      {
        id: "creat-ch-2",
        number: 2,
        title: "Generating Ideas",
        description: "Master divergent thinking, lateral brainstorming, and multiplying concept variations.",
        status: "locked",
        lockReason: "Complete Chapter 01 to unlock",
        progress: 0,
        destination: "Windmill Atoll",
        topics: [
          { id: "creat-2-1", code: "2.1", number: "01", title: "Brainstorming", status: "locked", conceptCheckCompleted: false, practiceCount: 8 },
          { id: "creat-2-2", code: "2.2", number: "02", title: "Divergent thinking", status: "locked", conceptCheckCompleted: false, practiceCount: 9 },
          { id: "creat-2-3", code: "2.3", number: "03", title: "Expanding ideas", status: "locked", conceptCheckCompleted: false, practiceCount: 8 },
          { id: "creat-2-4", code: "2.4", number: "04", title: "Combining ideas", status: "locked", conceptCheckCompleted: false, practiceCount: 8 }
        ]
      },
      {
        id: "creat-ch-3",
        number: 3,
        title: "Connecting Ideas",
        description: "Bridge disparate disciplines through analogies, metaphors, and cross-domain pollination.",
        status: "locked",
        lockReason: "Complete Chapter 02 to unlock",
        progress: 0,
        destination: "Crystal Arch Archipelago",
        topics: [
          { id: "creat-3-1", code: "3.1", number: "01", title: "Connecting unrelated ideas", status: "locked", conceptCheckCompleted: false, practiceCount: 8 },
          { id: "creat-3-2", code: "3.2", number: "02", title: "Analogies", status: "locked", conceptCheckCompleted: false, practiceCount: 8 },
          { id: "creat-3-3", code: "3.3", number: "03", title: "Cross-domain thinking", status: "locked", conceptCheckCompleted: false, practiceCount: 9 }
        ]
      },
      {
        id: "creat-ch-4",
        number: 4,
        title: "Building Solutions",
        description: "Turn raw ideas into rapid prototypes, stress-test concepts, and refine iteratively.",
        status: "locked",
        lockReason: "Complete Chapter 03 to unlock",
        progress: 0,
        destination: "Sky Workshop",
        topics: [
          { id: "creat-4-1", code: "4.1", number: "01", title: "Selecting ideas", status: "locked", conceptCheckCompleted: false, practiceCount: 8 },
          { id: "creat-4-2", code: "4.2", number: "02", title: "Improving ideas", status: "locked", conceptCheckCompleted: false, practiceCount: 8 },
          { id: "creat-4-3", code: "4.3", number: "03", title: "Prototyping", status: "locked", conceptCheckCompleted: false, practiceCount: 9 },
          { id: "creat-4-4", code: "4.4", number: "04", title: "Experimentation", status: "locked", conceptCheckCompleted: false, practiceCount: 8 }
        ]
      },
      {
        id: "creat-ch-5",
        number: 5,
        title: "Risk & Experimentation",
        description: "Normalize failure as data, test bold hypotheses, and pivot without losing momentum.",
        status: "locked",
        lockReason: "Complete Chapter 04 to unlock",
        progress: 0,
        destination: "Lightning Spire",
        topics: [
          { id: "creat-5-1", code: "5.1", number: "01", title: "Trying new approaches", status: "locked", conceptCheckCompleted: false, practiceCount: 8 },
          { id: "creat-5-2", code: "5.2", number: "02", title: "Learning from failure", status: "locked", conceptCheckCompleted: false, practiceCount: 9 },
          { id: "creat-5-3", code: "5.3", number: "03", title: "Iteration", status: "locked", conceptCheckCompleted: false, practiceCount: 8 }
        ]
      },
      {
        id: "creat-ch-6",
        number: 6,
        title: "Innovation Challenge",
        description: "Complete the creative capstone: define, ideate, prototype, test, and pitch at Innovation Island.",
        status: "locked",
        lockReason: "Complete Chapter 05 to unlock the final floating island",
        progress: 0,
        destination: "Innovation Island",
        topics: [
          { id: "creat-6-1", code: "6.1", number: "01", title: "Define the problem", status: "locked", conceptCheckCompleted: false, practiceCount: 9 },
          { id: "creat-6-2", code: "6.2", number: "02", title: "Generate ideas", status: "locked", conceptCheckCompleted: false, practiceCount: 11 },
          { id: "creat-6-3", code: "6.3", number: "03", title: "Test a solution", status: "locked", conceptCheckCompleted: false, practiceCount: 10 },
          { id: "creat-6-4", code: "6.4", number: "04", title: "Improve the solution", status: "locked", conceptCheckCompleted: false, practiceCount: 10 },
          { id: "creat-6-5", code: "6.5", number: "05", title: "Present the solution", status: "locked", conceptCheckCompleted: false, practiceCount: 12 }
        ]
      }
    ]
  },

  // ==========================================
  // SUBJECT 06: Professional & Ethical Skills
  // ==========================================
  {
    id: "professional-ethical-skills",
    name: "Professional & Ethical Skills",
    tagline: "Workplace behaviour, ethics & responsibility",
    description: "The student travels through an ancient city and academy while learning professional behaviour and decision-making.",
    worldName: "Ancient Civilization",
    finalDestination: "The Grand Academy",
    backgroundImage: professionalBg,
    icon: "🏛️",
    progress: 60,
    currentChapterId: "prof-ch-4",
    chapters: [
      {
        id: "prof-ch-1",
        number: 1,
        title: "Professional Foundations",
        description: "Build unshakeable personal reliability, punctuality, ownership, and workplace etiquette.",
        status: "completed",
        progress: 100,
        destination: "Pillar Plaza",
        topics: [
          { id: "prof-1-1", code: "1.1", number: "01", title: "Professional behaviour", status: "completed", conceptCheckCompleted: true, practiceCount: 10 },
          { id: "prof-1-2", code: "1.2", number: "02", title: "Responsibility", status: "completed", conceptCheckCompleted: true, practiceCount: 12 },
          { id: "prof-1-3", code: "1.3", number: "03", title: "Reliability", status: "completed", conceptCheckCompleted: true, practiceCount: 9 },
          { id: "prof-1-4", code: "1.4", number: "04", title: "Workplace expectations", status: "completed", conceptCheckCompleted: true, practiceCount: 11 }
        ]
      },
      {
        id: "prof-ch-2",
        number: 2,
        title: "Workplace Communication",
        description: "Write executive-ready communications, conduct high-value meetings, and flag blockers constructively.",
        status: "completed",
        progress: 100,
        destination: "Forum of Commerce",
        topics: [
          { id: "prof-2-1", code: "2.1", number: "01", title: "Professional email", status: "completed", conceptCheckCompleted: true, practiceCount: 14 },
          { id: "prof-2-2", code: "2.2", number: "02", title: "Meetings", status: "completed", conceptCheckCompleted: true, practiceCount: 12 },
          { id: "prof-2-3", code: "2.3", number: "03", title: "Asking for help", status: "completed", conceptCheckCompleted: true, practiceCount: 10 },
          { id: "prof-2-4", code: "2.4", number: "04", title: "Reporting progress", status: "completed", conceptCheckCompleted: true, practiceCount: 11 }
        ]
      },
      {
        id: "prof-ch-3",
        number: 3,
        title: "Integrity & Ethics",
        description: "Navigate moral gray zones, protect proprietary confidentiality, and steer clear of conflicts of interest.",
        status: "completed",
        progress: 100,
        destination: "Hall of Truth",
        topics: [
          { id: "prof-3-1", code: "3.1", number: "01", title: "Honesty", status: "completed", conceptCheckCompleted: true, practiceCount: 11 },
          { id: "prof-3-2", code: "3.2", number: "02", title: "Responsibility", status: "completed", conceptCheckCompleted: true, practiceCount: 10 },
          { id: "prof-3-3", code: "3.3", number: "03", title: "Confidentiality", status: "completed", conceptCheckCompleted: true, practiceCount: 12 },
          { id: "prof-3-4", code: "3.4", number: "04", title: "Conflicts of interest", status: "completed", conceptCheckCompleted: true, practiceCount: 9 },
          { id: "prof-3-5", code: "3.5", number: "05", title: "Ethical choices", status: "completed", conceptCheckCompleted: true, practiceCount: 11 }
        ]
      },
      {
        id: "prof-ch-4",
        number: 4,
        title: "Respect & Inclusion",
        description: "Foster psychological safety, honor cultural nuances, and maintain healthy professional boundaries.",
        status: "unlocked",
        progress: 50,
        destination: "Rotunda of Accord",
        topics: [
          { id: "prof-4-1", code: "4.1", number: "01", title: "Respectful behaviour", status: "completed", conceptCheckCompleted: true, practiceCount: 12 },
          { id: "prof-4-2", code: "4.2", number: "02", title: "Different perspectives", status: "completed", conceptCheckCompleted: true, practiceCount: 10 },
          { id: "prof-4-3", code: "4.3", number: "03", title: "Inclusion", status: "current", conceptCheckCompleted: false, practiceCount: 11 },
          { id: "prof-4-4", code: "4.4", number: "04", title: "Workplace boundaries", status: "unlocked", conceptCheckCompleted: false, practiceCount: 9 }
        ]
      },
      {
        id: "prof-ch-5",
        number: 5,
        title: "Decision Making at Work",
        description: "Resolve complex multi-stakeholder ethical dilemmas with transparent accountability.",
        status: "locked",
        lockReason: "Complete Chapter 04 to unlock",
        progress: 0,
        destination: "High Tribunal",
        topics: [
          { id: "prof-5-1", code: "5.1", number: "01", title: "Ethical dilemmas", status: "locked", conceptCheckCompleted: false, practiceCount: 9 },
          { id: "prof-5-2", code: "5.2", number: "02", title: "Competing priorities", status: "locked", conceptCheckCompleted: false, practiceCount: 8 },
          { id: "prof-5-3", code: "5.3", number: "03", title: "Consequences", status: "locked", conceptCheckCompleted: false, practiceCount: 8 },
          { id: "prof-5-4", code: "5.4", number: "04", title: "Accountability", status: "locked", conceptCheckCompleted: false, practiceCount: 9 }
        ]
      },
      {
        id: "prof-ch-6",
        number: 6,
        title: "Professional Challenge",
        description: "Demonstrate mastery across simulated boardrooms and workplace crises at The Grand Academy.",
        status: "locked",
        lockReason: "Complete Chapter 05 to unlock the Grand Academy",
        progress: 0,
        destination: "The Grand Academy",
        topics: [
          { id: "prof-6-1", code: "6.1", number: "01", title: "Workplace scenarios", status: "locked", conceptCheckCompleted: false, practiceCount: 10 },
          { id: "prof-6-2", code: "6.2", number: "02", title: "Ethical dilemmas", status: "locked", conceptCheckCompleted: false, practiceCount: 12 },
          { id: "prof-6-3", code: "6.3", number: "03", title: "Communication situations", status: "locked", conceptCheckCompleted: false, practiceCount: 10 },
          { id: "prof-6-4", code: "6.4", number: "04", title: "Decision-making scenarios", status: "locked", conceptCheckCompleted: false, practiceCount: 12 }
        ]
      }
    ]
  }
];
