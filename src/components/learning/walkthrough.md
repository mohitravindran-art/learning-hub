# Walkthrough: Conversational Learning Journey & Rich Textbook Experience

We have updated the Learning Hub to adopt your exact recommended **conversational learning structure**, where interactive activities feel like real two-person interview dialogues that naturally break up the reading sections before transitioning into the Concept Check assessment.

---

## 1. Updated Pedagogical Learning Flow

```text
1. Topic Intro
   ├── What the student will learn (4 actionable bullet points)
   ├── Why it matters (75% of interview errors stem from rushed assumptions)
   ├── One simple example (Surface assumption vs. Real evaluation intent)
   └── START LEARNING →

2. Learning Material — Section 1: Intent Decoding
   ├── Textbook explanation & definition
   ├── Mistake question example
   ├── Key Takeaway callout box
   └── Right companion panel (Coach Pro-Tip & Verbal cues)

3. Learning Material — Section 2: Core Question Categories
   ├── 4 Categories: Behavioral, Situational, Personal & Fit, Technical & Opinion
   └── Verbal cues trigger framework

4. Interactive Activity #1 — Conversation
   ├── Two characters talking:
   │   ├── Interviewer: “Tell me about a time you handled a difficult project with tight deadlines.”
   │   └── Candidate (internal reflection): “Hmm… I think they want me to explain what I would do in that situation.”
   ├── Prompt: What is the interviewer really asking?
   │   ├── A. Tell me about your educational background
   │   ├── B. Describe something you actually experienced (Correct)
   │   ├── C. Explain what you would do in the future
   │   └── D. Share your opinion about project management
   ├── Immediate Inline Feedback: Explaining why it is Behavioral
   └── Continue Learning →

5. Learning Material — Section 3: Behavioral Framework
   ├── Deep-dive into the STAR framework (Situation 10%, Task 10%, Action 60%, Result 20%)
   └── Right companion coaching tips

6. Learning Material — Section 4: Situational Framework
   ├── Future hypothetical thinking & risk analysis
   └── Step-by-step logic under uncertainty

7. Interactive Activity #2 — Conversation / Scenario
   ├── Two characters talking:
   │   ├── Interviewer: “Imagine your project deadline is moved forward by one week. What would you do?”
   │   └── Candidate: “I would first assess our critical-path deliverables, gather the team to review trade-offs...”
   ├── Prompt: What type of question is the interviewer asking?
   │   ├── A. Behavioral (Past true story)
   │   ├── B. Situational (Hypothetical future problem-solving) (Correct)
   │   ├── C. Personal Motivation
   │   └── D. Technical Trivia
   ├── Immediate Inline Feedback
   └── Continue Learning →

8. Final Learning Material: Core Principles & Playbook
   └── 3 Golden Rules: Listen to first 5 words, frame before answering, highlight personal agency

9. Topic Complete Screen
   ├── 3 accomplishments checklist
   └── Start Concept Check →

10. Dedicated Study Complete Transition Screen
    ├── Celebratory mascot greeting & stats
    └── START CONCEPT CHECK 🚀

11. Concept Check (Full-Width Two-Panel Assessment)
    ├── Left Panel: Question context, Interviewer's Hidden Intent callout, Keywords, Matrix diagram
    ├── Right Panel: Vibrant response options with compact inline feedback
    └── 10 Mixed Question Types

12. Result Screen
    ├── Score & Accuracy %
    ├── Review All Answers mode
    ├── Retry Concept Check
    └── Continue Learning →
```

---

## 2. Key Components Updated

1. **`LessonPlayer.tsx` & `LessonPlayer.module.css`**:
   - Implemented the illustrated Intro screen featuring `bg image.png`, avatar greeting, **What You'll Learn**, **Why It Matters**, and **One Simple Example** breakdown.
   - Built the dedicated celebration transition screen between study material and assessment.
2. **`ConversationActivityScene.tsx`**:
   - Created the two-person dialogue interaction component featuring interviewer speech bubbles, candidate internal thoughts, selectable options, immediate feedback, and `Continue Learning →`.
3. **`ContentScene.tsx` & `StudyCards.module.css`**:
   - Full-width layout (`max-width: 1360px`) with companion coaching sidebar, eliminatng wasted whitespace.
4. **`ConceptCheckEngine.tsx` & `ConceptCheckEngine.module.css`**:
   - Full-width two-panel assessment (`max-width: 1400px`, `96% width`) with bigger questions, Interviewer's Hidden Intent tips, Keyword Cues, and Framework Matrix.

---

## 3. Verification
- **`npx tsc --noEmit`**: 0 errors.
- **`npm run lint`**: 0 errors.
- **Dev Server**: Running on `http://localhost:5173`.
