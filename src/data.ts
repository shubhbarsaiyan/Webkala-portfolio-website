import { Service, Project, Testimonial, PricingPlan, FAQ, Industry, Benefit, ProcessStep, TimelineEvent } from './types';

export const STATS = [
  { value: '12+', label: 'Happy clients we\'ve helped launch' },
  { value: '99.8%', label: 'Of projects launched right on time' },
  { value: '4.9/5', label: 'Stars from friendly client reviews' },
  { value: '95+', label: 'Average website speed score' }
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: '2023',
    title: 'Starting Out',
    description: 'A few friends who love building websites got together in a small room. We wanted to build web experiences that feel personal, fast, and crafted with care.'
  },
  {
    year: '2024',
    title: 'Growing & Learning',
    description: 'We started working with clients all over the world—from local bakeries to growing tech startups. We celebrated our 50th launch with a lot of coffee!'
  },
  {
    year: '2025',
    title: 'Polishing Our Craft',
    description: 'We realized that speed and accessibility make or break a business online. We started building more complex, ultra-fast tools that real people use every single day.'
  },
  {
    year: '2026',
    title: 'A Friendly Future',
    description: 'Today, we help you connect with your customers through modern tech, clean designs, and friendly AI assistants. We keep it simple and lightning fast.'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'business-websites',
    title: 'Business Websites',
    description: 'Websites that tell your story. Clean, beautiful pages designed to turn visitors into friends and customers.',
    category: 'core',
    features: ['Designs that fit your story', 'Easy updates (no coding needed)', 'Simple contact forms', 'Ready for your growth']
  },
  {
    id: 'portfolio-websites',
    title: 'Portfolio Websites',
    description: 'Portfolios that showcase your craft. Interactive, visual, and tailor-made to display your unique work beautifully.',
    category: 'core',
    features: ['Smooth transitions', 'Interactive galleries', 'Looks perfect on phones & laptops', 'Easy on the eyes day or night']
  },
  {
    id: 'ecommerce-stores',
    title: 'E-commerce Stores',
    description: 'Online shops that are a joy to use. Fast, secure checkout screens that make shopping simple and delightful.',
    category: 'core',
    features: ['Simple shopping cart', 'Easy product management', 'Blazing fast page loads', 'Secure checkout (Stripe/PayPal)']
  }
];

export const INDUSTRIES: Industry[] = [
  { name: 'Restaurants', iconName: 'Utensils', description: 'Warm digital menus and easy table reservations.' },
  { name: 'Hospitals', iconName: 'Activity', description: 'Friendly clinic booking and doctor directories.' },
  { name: 'Schools', iconName: 'GraduationCap', description: 'Lively portals for parent updates and school events.' },
  { name: 'Colleges', iconName: 'BookOpen', description: 'Simple resource sharing and student guidebooks.' },
  { name: 'Coaches', iconName: 'Compass', description: 'Personal landing pages and easy-to-book calendars.' },
  { name: 'Lawyers', iconName: 'Scale', description: 'Clear, reassuring legal hubs that build trust.' },
  { name: 'Gyms', iconName: 'Dumbbell', description: 'Class schedules and stress-free member sign-ups.' },
  { name: 'Salons', iconName: 'Sparkles', description: 'Beautiful service catalogs and quick booking.' },
  { name: 'Hotels', iconName: 'Building', description: 'Cozy room previews and seamless stay booking.' },
  { name: 'Real Estate', iconName: 'Home', description: 'Bright, photo-filled homes and simple search maps.' },
  { name: 'Manufacturing', iconName: 'Cpu', description: 'Clear product directories and B2B ordering.' },
  { name: 'NGOs', iconName: 'Heart', description: 'Inspiring story journals and simple donation boxes.' },
  { name: 'Startups', iconName: 'Rocket', description: 'Exciting, clear explanations of new ideas.' },
  { name: 'Personal Brands', iconName: 'User', description: 'Clean personal profiles and link hubs.' },
  { name: 'Freelancers', iconName: 'Laptop', description: 'Professional hubs to showcase work and client love.' },
  { name: 'Ecommerce', iconName: 'ShoppingBag', description: 'Smooth, friendly shopping checkouts.' }
];

export const BENEFITS: Benefit[] = [
  {
    title: 'Custom Made',
    description: 'We design everything from scratch to fit your voice. No boring templates here.',
    iconName: 'Paintbrush'
  },
  {
    title: 'No Waiting Around',
    description: 'We build clean, fast websites so your customers don\'t get frustrated and leave.',
    iconName: 'Zap'
  },
  {
    title: 'Looks Great Anywhere',
    description: 'From tiny phones to massive monitors, your site will look perfect and work flawlessly.',
    iconName: 'Smartphone'
  },
  {
    title: 'Easy to Find',
    description: 'We set up all the background details so people can find you easily on Google.',
    iconName: 'Search'
  },
  {
    title: 'Safe and Secure',
    description: 'We use modern security standards so you and your customers can sleep soundly.',
    iconName: 'ShieldCheck'
  },
  {
    title: 'Fair Pricing',
    description: 'No hidden fees or surprise costs. Just great work at a fair price.',
    iconName: 'Coins'
  },
  {
    title: 'Always Here to Help',
    description: 'You get a direct line to us on Slack—no robotic ticketing systems or long wait times.',
    iconName: 'HeartHandshake'
  },
  {
    title: 'Ready to Grow',
    description: 'Whether you have 10 visitors or 10,000, your site will handle it without breaking.',
    iconName: 'Layers'
  },
  {
    title: 'Modern Tools',
    description: 'We use the latest web technologies to make sure your site stays modern for years.',
    iconName: 'Terminal'
  },
  {
    title: 'Delivered on Time',
    description: 'We value your time. If we promise a launch date, we stick to it. No exceptions.',
    iconName: 'Clock'
  }
];

export const PROCESS: ProcessStep[] = [
  {
    number: 1,
    title: 'Let\'s Chat',
    description: 'We sit down (virtually) to chat about your dream, your customers, and how we can bring it to life.',
    duration: '1-2 Days'
  },
  {
    number: 2,
    title: 'Mapping It Out',
    description: 'We figure out exactly how the site will work, what tools we need, and how to keep it super simple.',
    duration: '2-3 Days'
  },
  {
    number: 3,
    title: 'Drafting Ideas',
    description: 'We draw up simple blueprints of your pages so you can see the layout before we style it.',
    duration: '3-4 Days'
  },
  {
    number: 4,
    title: 'Adding Color & Life',
    description: 'We design the visual style—colors, fonts, and images—making it feel uniquely yours.',
    duration: '4-7 Days'
  },
  {
    number: 5,
    title: 'Bringing It to Life',
    description: 'Our developers write clean, fast code to turn those designs into a working website.',
    duration: '1-3 Weeks'
  },
  {
    number: 6,
    title: 'Checking Every Detail',
    description: 'We test your site on phones, tablets, and computers, making sure it loads fast and works perfectly.',
    duration: '3-4 Days'
  },
  {
    number: 7,
    title: 'Launch Day!',
    description: 'We put your website live on a fast, reliable network and celebrate the launch with you.',
    duration: '1 Day'
  },
  {
    number: 8,
    title: 'Growing Together',
    description: 'We don\'t just disappear after launch. We are here to update, optimize, and support you as you grow.',
    duration: 'Continuous'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'quantum-clinic',
    title: 'Quantum Medical Hub',
    clientName: 'Quantum Healthcare Group',
    industry: 'Healthcare',
    category: 'Healthcare',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    description: 'A warm, fast, and easy-to-use booking website that helps patients schedule visits without any stress.',
    details: 'We worked closely with the team at Quantum to replace their complicated booking forms. The new site loads in the blink of an eye, making it incredibly easy for patients to find a specialist, check availability, and schedule an appointment on their phones. It\'s fully accessible and designed to feel warm and reassuring.',
    liveUrl: '#',
    githubUrl: '#',
    stats: { label: 'Increase in patient bookings', value: '+45%' }
  },
  {
    id: 'aurora-checkout',
    title: 'Aurora Clothing Shop',
    clientName: 'Aurora Apparel Ltd',
    industry: 'E-commerce',
    category: 'Ecommerce',
    technologies: ['React', 'Headless Stripe', 'Tailwind', 'Motion'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
    description: 'A smooth, beautiful online store where pages swap instantly and checking out is a breeze.',
    details: 'Aurora wanted an online shopping experience that felt as elegant as their clothes. We built a custom checkout system that loads items instantly, reducing cart abandonment and making it simple for customers to select sizes, add to cart, and check out securely in seconds.',
    liveUrl: '#',
    githubUrl: '#',
    stats: { label: 'More completed checkouts', value: '+22%' }
  },
  {
    id: 'elena-creative',
    title: 'Elena Vance Portfolio',
    clientName: 'Elena Vance Studio',
    industry: 'Personal Brand',
    category: 'Portfolio',
    technologies: ['React', 'Framer Motion', 'Sleek Gradients', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
    description: 'A creative digital space featuring playful micro-animations and smooth page transitions.',
    details: 'We helped creative director Elena Vance showcase her work. The portfolio features fluid page movements, subtle hover effects, and crisp typography that highlights her artistic vision without getting in the way of her stunning projects.',
    liveUrl: '#',
    githubUrl: '#',
    stats: { label: 'Average reading time', value: '3.4m' }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    company: 'Quantum Healthcare Group',
    role: 'Director of Technology',
    rating: 5,
    review: 'Webकला completely revitalized our booking systems. They were professional, incredibly fast, and felt like a true extension of our own team. Our patients love the new experience.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: '2',
    name: 'Marcus Vance',
    company: 'Aurora Apparel Ltd',
    role: 'CEO & Founder',
    rating: 5,
    review: 'Our checkout speed literally halved overnight, and checkouts jumped by 22%. They walked us through every step of the process and made it completely stress-free.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: '3',
    name: 'Dr. Evelyn Carter',
    company: 'Vertex Education Alliance',
    role: 'Head of Academics',
    rating: 5,
    review: 'We needed a highly accessible portal for our parents and students. The team delivered way ahead of schedule and took the time to train our staff so we could make updates ourselves.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Starter',
    tagline: 'Perfect for establishing a friendly, premium online presence.',
    priceMonthly: 6000,
    priceAnnual: 58000,
    features: [
      'Bespoke single-page website design',
      'Fully responsive on phones and tablets',
      'Easy updates (up to 3 blog sections)',
      'Built-in Google search optimizations',
      'Custom icons that fit your brand',
      'Contact forms with friendly validation',
      '3 months of continuous support'
    ],
    isRecommended: false,
    ctaText: 'Start Building Today'
  },
  {
    name: 'Professional',
    tagline: 'Our most popular choice, built for growing brands that need a custom website.',
    priceMonthly: 15000,
    priceAnnual: 144000,
    features: [
      'Up to 8 custom pages designed from scratch',
      'Stunning visual designs and transitions',
      'Easy-to-use editor setup & step-by-step training',
      'Local search engine optimization setup',
      'Optimized load speeds (no frustration)',
      'Calendar and booking systems integration',
      'Secure payment integrations (Stripe/PayPal)',
      'Priority support whenever you need us'
    ],
    isRecommended: true,
    ctaText: 'Deploy My Growth Platform'
  },
  {
    name: 'Enterprise',
    tagline: 'Completely custom web apps with dedicated support and advanced integrations.',
    priceMonthly: 40000,
    priceAnnual: 380000,
    features: [
      'Bespoke, scalable React web applications',
      'Unlimited dynamic customer portal pages',
      'Internal dashboard and CRM synchronization',
      'Deep connections with your business APIs',
      'Hardened security and custom webhooks',
      'Direct line to us on Slack',
      'Monthly design & layout review updates',
      'Full ownership of all custom code'
    ],
    isRecommended: false,
    ctaText: 'Partner with our Experts'
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: 'How long does it typically take to launch a website?',
    answer: 'Simple sites like landing pages or portfolios usually take about 1 to 2 weeks. More customized setups—like online shops, member portals, or custom business apps—take about 3 to 6 weeks, depending on what we are building together.'
  },
  {
    id: 'faq-2',
    question: 'Will I be able to edit the website content on my own later?',
    answer: 'Yes, absolutely! We configure a very simple, visual editor portal (like Sanity, Strapi, or Contentful) so your team can change text, add blog entries, and update portfolio pictures without writing a single line of code.'
  },
  {
    id: 'faq-3',
    question: 'Do you offer maintenance plans after the project launches?',
    answer: 'Yes, we do. We offer support packages that cover regular backup checks, security updates, minor adjustments, and performance tuning so you can focus on running your business.'
  },
  {
    id: 'faq-4',
    question: 'What technologies do you use to build platforms?',
    answer: 'We build with modern, future-proof tools including React, Vite, and Tailwind CSS. This ensures your website loads instantly, looks beautiful, and remains stable for years. We never use clunky template page builders.'
  },
  {
    id: 'faq-5',
    question: 'Can you migrate our legacy, slow WordPress site?',
    answer: 'Yes, we do this all the time. We can completely redesign your site, keeping your existing Google rankings while making the page load instantly and feel wonderful to use.'
  },
  {
    id: 'faq-6',
    question: 'How does your payment structure work?',
    answer: 'We typically split the cost into two milestones: 50% upfront to kick off the design phase, and 50% upon successful live launch on your domain. For larger projects, we are happy to discuss custom phase-by-phase billing.'
  }
];
