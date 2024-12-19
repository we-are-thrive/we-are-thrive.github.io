# Homepage Implementation Plan

## 1. Core Components Needed

1. **Navigation Component** (`/src/components/Nav.astro`)
   - Sticky navigation with subtle scroll animations
   - Links to: Home, About, Services, Blog, Contact
   - Mobile-responsive hamburger menu
   - Brand logo/text using the primary gradient

2. **Hero Section** (`/src/components/Hero.astro` + `HeroAnimation.tsx`)
   - Main heading: "Empowering Businesses with the Future of AI"
   - Sub-heading: Brief value proposition
   - Animated AI orb/sphere background (React component with partial hydration)
   - Two CTA buttons: "Explore Services" and "Contact Us"
   - Gradient background (#6E3ADB to #222222)

3. **Services Overview** (`/src/components/ServicesGrid.astro`)
   - Grid/card layout of main services
   - Each card with:
     - AI-themed icon (possibly generated/styled by AI)
     - Service title
     - Brief description
     - Hover animation with "spark effect"
   - Interactive elements hydrated with client:visible

4. **Testimonials Section** (`/src/components/TestimonialsSlider.tsx`)
   - Carousel/slider component
   - Client quotes with smooth transitions
   - Company logos if available
   - Hydrated only when scrolled into view (client:visible)

5. **Call-to-Action Banner** (`/src/components/CtaBanner.astro`)
   - Compelling headline about AI transformation
   - Action button with accent color (#5AEF8F or #45E5C4)
   - Optional animated background elements

## 2. File Structure

```text
src/
├── pages
│ └── index.astro
├── components/
│ ├── Nav.astro
│ ├── Hero.astro
│ ├── HeroAnimation.tsx
│ ├── ServicesGrid.astro
│ ├── ServiceCard.astro
│ ├── TestimonialsSlider.tsx
│ └── CtaBanner.astro
├── styles/
│ ├── global.css
│ └── variables.css
└── layouts/
└── MainLayout.astro


## 3. Starting Implementation Steps

1. **Initial Setup**
   ```bash
   # Create new Astro project with React integration
   npm create astro@latest
   npm install @astrojs/react
   ```

2. **Base Layout Implementation**
   ```astro:src/layouts/MainLayout.astro
   ---
   import Nav from '../components/Nav.astro';
   import '../styles/global.css';

   interface Props {
     title: string;
     description: string;
   }

   const { title, description } = Astro.props;
   ---

   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width" />
       <meta name="description" content={description} />
       <title>{title} | Thrive</title>
       <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
     </head>
     <body>
       <Nav />
       <main>
         <slot />
       </main>
     </body>
   </html>
   ```

3. **Homepage Base**
   ```astro:src/pages/index.astro
   ---
   import MainLayout from '../layouts/MainLayout.astro';
   import Hero from '../components/Hero.astro';
   import ServicesGrid from '../components/ServicesGrid.astro';
   import TestimonialsSlider from '../components/TestimonialsSlider';
   import CtaBanner from '../components/CtaBanner.astro';
   ---

   <MainLayout 
     title="Empowering Businesses with AI"
     description="Thrive helps businesses implement and leverage AI solutions for growth and innovation."
   >
     <Hero />
     <ServicesGrid />
     <TestimonialsSlider client:visible />
     <CtaBanner />
   </MainLayout>
   ```

## 4. Key Styling Considerations

1. **CSS Variables**
   ```css:src/styles/variables.css
   :root {
     /* Colors */
     --color-primary: #6E3ADB;
     --color-secondary: #222222;
     --color-accent: #5AEF8F;
     --color-accent-alt: #45E5C4;
     --color-background: #FFFFFF;
     --color-text: #000000;
     --color-gray: #F5F5F5;

     /* Gradients */
     --gradient-primary: linear-gradient(135deg, var(--color-primary), var(--color-secondary));

     /* Typography */
     --font-primary: 'Inter', system-ui, sans-serif;
     --font-size-base: 1rem;
     --line-height-base: 1.5;

     /* Spacing */
     --spacing-base: 1rem;
     --section-padding: clamp(3rem, 8vw, 8rem);

     /* Transitions */
     --transition-base: 0.3s ease-in-out;
   }
   ```

## 5. Next Steps

1. **Component Development Order**
   - Start with Nav.astro for site navigation
   - Implement Hero section with basic animation
   - Build ServicesGrid with hover effects
   - Add TestimonialsSlider
   - Finish with CtaBanner

2. **Performance Considerations**
   - Use Astro's built-in Image component for optimized images
   - Implement partial hydration strategically
   - Lazy load below-the-fold content
   - Minimize initial JavaScript bundle

3. **Accessibility Checklist**
   - Ensure proper heading hierarchy
   - Add ARIA labels to interactive elements
   - Test keyboard navigation
   - Verify color contrast ratios
