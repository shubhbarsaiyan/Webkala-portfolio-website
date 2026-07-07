export interface Service {
  id: string;
  title: string;
  description: string;
  category: 'core' | 'specialized' | 'optimization';
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  clientName: string;
  industry: string;
  category: 'Business' | 'Ecommerce' | 'Healthcare' | 'Education' | 'Portfolio' | 'Restaurant';
  technologies: string[];
  image: string;
  description: string;
  details: string;
  liveUrl: string;
  githubUrl: string;
  stats: { label: string; value: string };
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  rating: number;
  review: string;
  avatar: string;
}

export interface PricingPlan {
  name: string;
  tagline: string;
  priceMonthly: number;
  priceAnnual: number;
  features: string[];
  isRecommended: boolean;
  ctaText: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Industry {
  name: string;
  iconName: string;
  description: string;
}

export interface Benefit {
  title: string;
  description: string;
  iconName: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  duration: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}
