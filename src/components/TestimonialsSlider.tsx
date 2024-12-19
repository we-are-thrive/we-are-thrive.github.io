import React, { useState } from 'react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Thrive helped us implement AI solutions that transformed our customer service operations. The results exceeded our expectations.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechFlow Solutions"
  },
  {
    quote: "Their expertise in machine learning helped us build predictive models that significantly improved our decision-making process.",
    author: "Michael Rodriguez",
    role: "Head of Innovation",
    company: "DataFirst Analytics"
  },
  {
    quote: "The AI strategy Thrive developed for us was comprehensive and practical. It's been instrumental in our digital transformation.",
    author: "Emma Thompson",
    role: "Director of Operations",
    company: "Global Innovations"
  }
];

const TestimonialsSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials">
      <div className="container">
        <h2>Client Success Stories</h2>
        <p className="section-intro">See how we've helped businesses transform with AI</p>

        <div className="slider-container">
          <button className="nav-button prev" onClick={prevTestimonial} aria-label="Previous testimonial">
            ←
          </button>

          <div className="testimonial-card">
            <blockquote>
              <p className="quote">{testimonials[currentIndex].quote}</p>
              <footer>
                <cite>
                  <span className="author">{testimonials[currentIndex].author}</span>
                  <span className="role">{testimonials[currentIndex].role}</span>
                  <span className="company">{testimonials[currentIndex].company}</span>
                </cite>
              </footer>
            </blockquote>
          </div>

          <button className="nav-button next" onClick={nextTestimonial} aria-label="Next testimonial">
            →
          </button>
        </div>

        <div className="dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider; 