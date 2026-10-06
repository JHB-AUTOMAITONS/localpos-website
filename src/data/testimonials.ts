export interface Testimonial {
  quote: string
  name: string
  role: string
  business: string
}

/**
 * Add real customer quotes here (with permission) and the testimonial section appears on the home page.
 * It is deliberately empty: the site never shows invented testimonials, ratings or customer counts.
 */
export const TESTIMONIALS: Testimonial[] = []
