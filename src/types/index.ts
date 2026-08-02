export type Area =
  | 'acceptance'
  | 'discipline'
  | 'no_complaining'
  | 'obstacle'
  | 'leap'
  | 'gratitude'
  | 'observe'
  | 'here_now'
  | 'voices'
  | 'mirror'
  | 'healthy_relationships'

export interface AreaDefinition {
  id: Area
  slug: string
  title: string
  subtitle: string
  teachings: string[]
  reflection: string
  inRelacion: string
  unlockNotice?: string
  practicalExercise?: {
    description: string
    prompt: string
  }
  secondExercise?: {
    description: string
    prompt: string
  }
  order: number
}

export interface QuizQuestion {
  id: number
  area: Area
  question: string
  options: [string, string, string, string]
}

export interface QuizResult {
  area: Area
  score: number
}

export interface UserProfile {
  id: string
  email: string
  quiz_completed: boolean
  area_order: Area[]
  current_level: number
  total_score: number
  advanced_unlocked: boolean
  created_at: string
}

export interface LevelProgress {
  id: string
  user_id: string
  area: Area
  reflection_text: string
  word_count: number
  score: number
  completed_at: string
}

export type Locale = 'es' | 'en'
