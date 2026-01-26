import { Quote } from 'lucide-react';

export function TestimonialSection() {
  const testimonials = [
    {
      quote: 'We reduced failed payments and arrears follow-ups by 60% within two months.',
      role: 'Operations Manager, Childcare',
      featured: true,
      avatar: 'https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?w=150&h=150&fit=crop'
    },
    {
      quote: 'FairPay gave us confidence that payments would actually happen.',
      role: 'School Business Manager',
      avatar: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?w=150&h=150&fit=crop'
    },
    {
      quote: 'The transition from direct debit was seamless.',
      role: 'Treasurer, Community Organisation',
      avatar: 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?w=150&h=150&fit=crop'
    },
    {
      quote: 'Our clients trust the bank-approved process.',
      role: 'Practice Manager, Conveyancing',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4 text-3xl lg:text-4xl">
            Trusted by forward-thinking organisations
          </h2>
        </div>
        
        {/* All testimonials in grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-indigo-300 hover:shadow-xl transition-all"
            >
              <Quote className="w-10 h-10 text-indigo-600/20 mb-6" />
              
              <p className="text-lg text-gray-900 mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.avatar}
                  alt={testimonial.role}
                  className="w-14 h-14 rounded-full object-cover bg-gray-200"
                />
                <div>
                  <div className="text-gray-700">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}