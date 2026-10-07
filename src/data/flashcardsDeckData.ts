export interface FlashcardItem {
  id: string;
  title: string;
  question: string;
  answer: string;
  status: 'know' | 'dont-know' | 'unmarked';
  badge?: string; // e.g. "M"
}

export interface DeckStats {
  total: number;
  know: number;
  dontKnow: number;
  unmarked: number;
}

export const LOREM_ANSWER = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

export const INITIAL_DECK_STATS: DeckStats = {
  total: 524,
  know: 23,
  dontKnow: 25,
  unmarked: 55,
};

export const INITIAL_FLASHCARDS: FlashcardItem[] = [
  {
    id: "card-1",
    title: "Introduction to Databases and Database Management Systems (DBMS)...",
    question: "What is a Binary Search Tree?",
    answer: LOREM_ANSWER,
    status: "know",
  },
  {
    id: "card-2",
    title: "Introduction to Databases and Database Management Systems (DBMS)",
    question: "How does Database Normalization (1NF to 3NF) eliminate redundancy?",
    answer: LOREM_ANSWER,
    status: "dont-know",
    badge: "M",
  },
  {
    id: "card-3",
    title: "Introduction to Databases and Database Management Systems (DBMS)",
    question: "Explain the ACID properties in relational transaction processing.",
    answer: LOREM_ANSWER,
    status: "dont-know",
  },
  {
    id: "card-4",
    title: "Database Indexing & Query Optimization Techniques",
    question: "What is the difference between Clustered and Non-Clustered Indexes?",
    answer: "A clustered index defines the physical order of data in the table, meaning there can only be one clustered index per table. A non-clustered index stores data in one place and the index in another place, maintaining pointers to the actual storage addresses.",
    status: "know",
  },
  {
    id: "card-5",
    title: "Concurrency Control and Two-Phase Locking (2PL)",
    question: "What is a Deadlock and how does the Wait-For Graph detect it?",
    answer: "A deadlock occurs when two or more transactions are permanently blocked because each holds a lock on a resource that another transaction needs. A Wait-For Graph tracks transaction dependencies; cycles in the graph indicate deadlocks.",
    status: "unmarked",
    badge: "M",
  },
  {
    id: "card-6",
    title: "Distributed Databases & The CAP Theorem",
    question: "What are the core trade-offs expressed by the CAP Theorem?",
    answer: "The CAP Theorem states that a distributed data store can simultaneously provide at most two out of three guarantees: Consistency (all nodes see the same data at the same time), Availability (every non-failing node returns a response), and Partition Tolerance (the system continues to operate despite network partitions).",
    status: "know",
  },
  {
    id: "card-7",
    title: "NoSQL Architectures: Document vs Key-Value vs Graph",
    question: "When should you choose a Document Store over a Relational Database?",
    answer: "Choose Document Stores when data schemas are semi-structured or evolve rapidly, when horizontal scalability with high-throughput read/writes is paramount, and when queries naturally map to nested JSON-like hierarchies without complex multi-table JOINs.",
    status: "unmarked",
  },
  {
    id: "card-8",
    title: "Database Replication: Master-Slave vs Multi-Master",
    question: "What is Replication Lag and how does Eventual Consistency manage it?",
    answer: "Replication lag is the delay between a write committed on the primary database and its propagation to read replicas. Under eventual consistency, read replicas will eventually reflect the latest write, provided no further updates occur.",
    status: "dont-know",
    badge: "M",
  },
];
