export interface TopicFlashcard {
  id: string;
  topicId: string;
  title: string;
  answer: string;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface TopicResource {
  id: string;
  topicId: string;
  title: string;
  description: string;
  type: 'pdf' | 'document' | 'article' | 'video' | 'template';
  typeLabel: string;
  meta: string;
  actionText: string;
  url?: string;
  content?: string;
}

export const topicFlashcardsData: Record<string, TopicFlashcard[]> = {
  "topic-1": [
    {
      id: "fc-1",
      topicId: "topic-1",
      title: "What is a behavioural question?",
      answer: "Behavioral questions evaluate your past track record and verifiable performance by asking you to recount specific real experiences from your career ('Tell me about a time you...'). In modern hiring, past behavior is considered the single strongest predictor of future success. Always respond using the STAR framework (Situation, Task, Action, Result), focusing 60% of your response on the Actions YOU personally took.",
      tags: ["Behavioral", "STAR", "PastExperience", "VerbalCues"],
      difficulty: "Beginner"
    },
    {
      id: "fc-2",
      topicId: "topic-1",
      title: "What is a situational question?",
      answer: "Situational questions present prospective hypothetical scenarios ('What would you do if a key teammate resigned before launch?') to evaluate on-the-spot critical thinking, risk management, stakeholder empathy, and structured problem-solving under uncertainty. The interviewer is testing your thought process, ability to weigh trade-offs, and communication clarity.",
      tags: ["Situational", "Hypothetical", "ProblemSolving", "TradeOffs"],
      difficulty: "Beginner"
    },
    {
      id: "fc-3",
      topicId: "topic-1",
      title: "How can you identify a personal/motivational question?",
      answer: "Personal and motivational questions focus on your internal drivers, core work values, self-awareness, and cultural fit ('Why do you want to work here?', 'What type of work environment brings out your best?'). Identify these questions by listening for prompts inquiring about your passions, future aspirations, or reasoning behind major career transitions.",
      tags: ["Motivation", "Values", "CultureFit", "SelfAwareness"],
      difficulty: "Intermediate"
    },
    {
      id: "fc-4",
      topicId: "topic-1",
      title: "What are common cues for technical questions?",
      answer: "Technical and opinion questions probe your deep domain expertise, system architecture, analytical rigor, or specific industry tooling ('How would you design a distributed caching layer?', 'Compare SQL vs NoSQL for this use case'). They evaluate technical depth, trade-off analysis, and your capacity to explain complex concepts clearly.",
      tags: ["Technical", "DomainExpertise", "Architecture", "Engineering"],
      difficulty: "Intermediate"
    },
    {
      id: "fc-5",
      topicId: "topic-1",
      title: "Why is identifying question intent important?",
      answer: "Over 75% of interview mistakes stem from rushing into an answer without decoding what the interviewer is actually scoring. Identifying the underlying category (Behavioral vs Situational vs Fit vs Technical) ensures you deploy the right answering framework immediately (STAR for past evidence, stepwise logic for hypotheticals), saving time and preventing irrelevant rambling.",
      tags: ["Strategy", "IntentDecoding", "InterviewPrep", "Foundations"],
      difficulty: "Beginner"
    },
    {
      id: "fc-6",
      topicId: "topic-1",
      title: "What does the 'A' in STAR stand for and why is it crucial?",
      answer: "The 'A' stands for Action. It is the most heavily weighted component of the STAR model, accounting for roughly 60% of your answer. Interviewers want to hear what YOU specifically did—decisions made, conflicts resolved, analyses run, and cross-functional leadership shown—rather than passive 'we' statements.",
      tags: ["STAR", "Action", "Leadership", "Ownership"],
      difficulty: "Advanced"
    },
    {
      id: "fc-7",
      topicId: "topic-1",
      title: "How should you start answering a situational question?",
      answer: "Begin by clarifying assumptions or acknowledging key constraints ('To make sure I address the core concern, let me clarify the project timeline and team capacity...'). Then state your structured roadmap ('I would approach this in three phases: triage, team communication, and scope adjustment') before elaborating.",
      tags: ["Situational", "Roadmap", "Scoping", "ExecutivePresence"],
      difficulty: "Advanced"
    },
    {
      id: "fc-8",
      topicId: "topic-1",
      title: "What is the primary danger of mistaking a situational question for a behavioral one?",
      answer: "If you answer a situational question with a lengthy past story, the interviewer may think you cannot think on your feet or failed to listen to the prompt. Conversely, if you answer a behavioral question with a hypothetical future plan, the interviewer will feel you lack real verifiable experience.",
      tags: ["TrapAvoidance", "ActiveListening", "Strategy"],
      difficulty: "Intermediate"
    }
  ]
};

export const topicResourcesData: Record<string, TopicResource[]> = {
  "topic-1": [
    {
      id: "res-1",
      topicId: "topic-1",
      title: "Question Types Interview Guide",
      description: "A concise guide to identifying common interview question types and understanding the hidden evaluation rubrics hiring managers use.",
      type: "pdf",
      typeLabel: "PDF Guide",
      meta: "PDF • 2.4 MB • 12 Pages",
      actionText: "View PDF",
      url: "#"
    },
    {
      id: "res-2",
      topicId: "topic-1",
      title: "Behavioural Questions Explained",
      description: "Learn how past-experience questions evaluate your track record and how to systematically structure high-impact STAR answers.",
      type: "document",
      typeLabel: "Document",
      meta: "Doc • 5 min read • Comprehensive",
      actionText: "Read Document",
      url: "#"
    },
    {
      id: "res-3",
      topicId: "topic-1",
      title: "Situational Questions & Trade-Offs",
      description: "Understand how hypothetical scenarios test problem-solving, structured logic, risk mitigation, and communication under pressure.",
      type: "article",
      typeLabel: "Article",
      meta: "External Link • 4 min read",
      actionText: "Open Article",
      url: "#"
    },
    {
      id: "res-4",
      topicId: "topic-1",
      title: "Interview Question Examples & Case Studies",
      description: "Watch breakdown examples of common interview question categories with commentary from senior hiring directors.",
      type: "video",
      typeLabel: "Video Breakdown",
      meta: "Video • 8 min 45 sec • Full HD",
      actionText: "Watch Video",
      url: "#"
    },
    {
      id: "res-5",
      topicId: "topic-1",
      title: "STAR Response Architecture Template",
      description: "Interactive fillable worksheet to outline your top 5 career achievement stories across the Situation, Task, Action, and Result pillars.",
      type: "template",
      typeLabel: "Worksheet",
      meta: "Template • 1.1 MB • Notion / PDF",
      actionText: "Download Template",
      url: "#"
    },
    {
      id: "res-6",
      topicId: "topic-1",
      title: "Verbal Trigger Keywords Cheat Sheet",
      description: "Quick reference card listing opening verbal cues that immediately distinguish behavioral, situational, motivational, and technical prompts.",
      type: "pdf",
      typeLabel: "Cheat Sheet",
      meta: "PDF • 1 Page Quick Ref",
      actionText: "View Cheat Sheet",
      url: "#"
    }
  ]
};
