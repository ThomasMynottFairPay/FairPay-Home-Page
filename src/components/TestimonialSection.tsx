import { Quote, Star } from 'lucide-react';

export function TestimonialSection() {
  const testimonials = [
    {
      quote: 'We reduced failed payments by 60% and our admin team saves 10 hours a week. FairPay transformed how we collect fees.',
      name: 'Sarah Mitchell',
      role: 'Operations Manager',
      company: 'Bright Minds Childcare',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?w=150&h=150&fit=crop'
    },
    {
      quote: 'Parents love how easy it is to approve payments in their banking app. No more chasing failed direct debits.',
      name: 'David Chen',
      role: 'Principal',
      company: 'Sydney Grammar Academy',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?w=150&h=150&fit=crop'
    },
    {
      quote: 'The instant settlement is a game-changer for our cash flow. We switched from BECS and never looked back.',
      name: 'Emma Thompson',
      role: 'Strata Manager',
      company: 'Metro Property Services',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4 text-4xl lg:text-5xl">
            Why organisations choose FairPay
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real results from real organisations using PayTo® to collect payments
          </p>
        </div>
        
        {/* Stats bar */}
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
            <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
            <div className="text-gray-600">Organisations</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
            <div className="text-4xl font-bold text-indigo-600 mb-2">98%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
            <div className="text-4xl font-bold text-indigo-600 mb-2">$100M+</div>
            <div className="text-gray-600">Processed</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
            <div className="text-4xl font-bold text-indigo-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Customer Rating</div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-indigo-300 hover:shadow-xl transition-all"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              <Quote className="w-10 h-10 text-indigo-600/20 mb-4" />
              
              <p className="text-lg text-gray-900 mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <img 
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover bg-gray-200"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-gray-500">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}