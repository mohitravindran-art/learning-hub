export type TopicStatus = "completed" | "current" | "unlocked" | "locked";

export interface SubTopic {
  id: string;
  number: string;
  title: string;
  status: TopicStatus;
}

export interface Topic {
  id: string;
  number: string;
  title: string;
  description?: string;
  status: TopicStatus;
  conceptCheckCompleted: boolean;
  practiceCount: number;
  subtopics: SubTopic[];
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  description: string;
  status: "completed" | "unlocked" | "locked";
  topics: Topic[];
}

export interface ModuleData {
  id: string;
  title: string;
  description: string;
  progress: number;
  chapters: Chapter[];
}

export const moduleData: ModuleData = {
  id: "universal-communication",
  title: "Universal Communication",
  description: "Better communication. Brighter opportunities.",
  progress: 50,
  chapters: [
    {
      id: "question-understanding",
      number: 1,
      title: "Question Understanding",
      description: "Interpret what interviewers are really asking.",
      status: "unlocked",
      topics: [
        {
          id: "topic-1-1",
          number: "01",
          title: "What is the real intent?",
          status: "completed",
          conceptCheckCompleted: true,
          practiceCount: 12,
          subtopics: [
            {
              id: "sub-1-1",
              number: "1.1",
              title: "Core intent vs literal phrasing",
              status: "completed",
            },
            {
              id: "sub-1-2",
              number: "1.2",
              title: "Decoding hidden evaluation signals",
              status: "completed",
            },
            {
              id: "sub-1-3",
              number: "1.3",
              title: "Interviewer mindset & expectations",
              status: "completed",
            },
          ],
        },
        {
          id: "topic-1-2",
          number: "02",
          title: "Identify question types",
          status: "current",
          conceptCheckCompleted: false,
          practiceCount: 15,
          subtopics: [
            {
              id: "sub-2-1",
              number: "2.1",
              title: "Behavioral questions (STAR cues)",
              status: "completed",
            },
            {
              id: "sub-2-2",
              number: "2.2",
              title: "Situational & hypothetical queries",
              status: "current",
            },
            {
              id: "sub-2-3",
              number: "2.3",
              title: "Technical depth & architecture",
              status: "unlocked",
            },
            {
              id: "sub-2-4",
              number: "2.4",
              title: "Motivation & culture alignment",
              status: "unlocked",
            },
          ],
        },
        {
          id: "topic-1-3",
          number: "03",
          title: "Handle multi-part questions",
          status: "locked",
          conceptCheckCompleted: false,
          practiceCount: 10,
          subtopics: [
            {
              id: "sub-3-1",
              number: "3.1",
              title: "Deconstructing layered questions",
              status: "locked",
            },
            {
              id: "sub-3-2",
              number: "3.2",
              title: "Signposting & structuring parts",
              status: "locked",
            },
            {
              id: "sub-3-3",
              number: "3.3",
              title: "Checking in with the interviewer",
              status: "locked",
            },
          ],
        },
        {
          id: "topic-1-4",
          number: "04",
          title: "Practice with real examples",
          status: "locked",
          conceptCheckCompleted: false,
          practiceCount: 8,
          subtopics: [
            {
              id: "sub-4-1",
              number: "4.1",
              title: "Senior engineer conflict case study",
              status: "locked",
            },
            {
              id: "sub-4-2",
              number: "4.2",
              title: "Production outage response critique",
              status: "locked",
            },
          ],
        },
        {
          id: "topic-1-5",
          number: "05",
          title: "Quick recap",
          status: "locked",
          conceptCheckCompleted: false,
          practiceCount: 5,
          subtopics: [
            {
              id: "sub-5-1",
              number: "5.1",
              title: "High-yield framework summary",
              status: "locked",
            },
            {
              id: "sub-5-2",
              number: "5.2",
              title: "Final chapter mastery check",
              status: "locked",
            },
          ],
        },
      ],
    },
    {
      id: "thinking-before-speaking",
      number: 2,
      title: "Thinking Before Speaking",
      description: "Organize your thoughts before delivering an answer.",
      status: "locked",
      topics: [
        {
          id: "topic-2-1",
          number: "01",
          title: "Active Listening",
          status: "locked",
          conceptCheckCompleted: false,
          practiceCount: 12,
          subtopics: [
            { id: "sub-2-1-1", number: "1.1", title: "Focused hearing", status: "locked" },
            { id: "sub-2-1-2", number: "1.2", title: "Non-verbal cues", status: "locked" },
          ],
        },
        {
          id: "topic-2-2",
          number: "02",
          title: "Pause Before Answering",
          status: "locked",
          conceptCheckCompleted: false,
          practiceCount: 10,
          subtopics: [
            { id: "sub-2-2-1", number: "2.1", title: "The power of 2 seconds", status: "locked" },
            { id: "sub-2-2-2", number: "2.2", title: "Breathing techniques", status: "locked" },
          ],
        },
        {
          id: "topic-2-3",
          number: "03",
          title: "Organize Your Thoughts",
          status: "locked",
          conceptCheckCompleted: false,
          practiceCount: 8,
          subtopics: [
            { id: "sub-2-3-1", number: "3.1", title: "Mental templates", status: "locked" },
            { id: "sub-2-3-2", number: "3.2", title: "Eliminating filler words", status: "locked" },
          ],
        },
      ],
    },
    {
      id: "structuring-your-answer",
      number: 3,
      title: "Structuring Your Answer",
      description: "Build a clear and logical response.",
      status: "locked",
      topics: [
        {
          id: "topic-3-1",
          number: "01",
          title: "Build a Clear Structure",
          status: "locked",
          conceptCheckCompleted: false,
          practiceCount: 10,
          subtopics: [
            { id: "sub-3-1-1", number: "1.1", title: "Headline answers", status: "locked" },
          ],
        },
        {
          id: "topic-3-2",
          number: "02",
          title: "Situation & Task",
          status: "locked",
          conceptCheckCompleted: false,
          practiceCount: 8,
          subtopics: [
            { id: "sub-3-2-1", number: "2.1", title: "Setting context crisply", status: "locked" },
          ],
        },
        {
          id: "topic-3-3",
          number: "03",
          title: "Action & Ownership",
          status: "locked",
          conceptCheckCompleted: false,
          practiceCount: 14,
          subtopics: [
            { id: "sub-3-3-1", number: "3.1", title: "The 60% rule", status: "locked" },
          ],
        },
      ],
    },
    {
      id: "confidence-and-delivery",
      number: 4,
      title: "Confidence & Delivery",
      description: "Speak with conviction and authority.",
      status: "locked",
      topics: [
        {
          id: "topic-4-1",
          number: "01",
          title: "Speak Clearly",
          status: "locked",
          conceptCheckCompleted: false,
          practiceCount: 6,
          subtopics: [
            { id: "sub-4-1-1", number: "1.1", title: "Vocal cadence & pitch", status: "locked" },
          ],
        },
      ],
    },
    {
      id: "handling-follow-up-questions",
      number: 5,
      title: "Handling Follow-up Questions",
      description: "Respond effectively to probes.",
      status: "locked",
      topics: [
        {
          id: "topic-5-1",
          number: "01",
          title: "Listen Carefully",
          status: "locked",
          conceptCheckCompleted: false,
          practiceCount: 6,
          subtopics: [
            { id: "sub-5-1-1", number: "1.1", title: "Decoding probing intent", status: "locked" },
          ],
        },
      ],
    },
  ],
};
