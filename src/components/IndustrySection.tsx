import { GraduationCap, Dumbbell, Building2, Church, Briefcase, Users } from 'lucide-react';

export function IndustrySection() {
  const industries = [
    {
      icon: GraduationCap,
      title: 'Schools & Childcare',
      description: 'Fees, excursions, activities, enrolments.',
      color: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
    },
    {
      icon: Church,
      title: 'Churches & Causes',
      description: 'Tithes, giving, recurring donations.',
      color: 'bg-purple-50 text-purple-600 hover:bg-purple-100'
    },
    {
      icon: Building2,
      title: 'Property, Strata & Conveyancing',
      description: 'Levies, rent, deposits, secure high-value transfers.',
      color: 'bg-cyan-50 text-cyan-600 hover:bg-cyan-100'
    },
    {
      icon: Dumbbell,
      title: 'Gyms & Memberships',
      description: 'Plans, upgrades, renewals.',
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100'
    },
    {
      icon: Briefcase,
      title: 'Professional Services',
      description: 'Retainers, once-off invoices.',
      color: 'bg-rose-50 text-rose-600 hover:bg-rose-100'
    },
    {
      icon: Users,
      title: 'Clubs & Associations',
      description: 'Membership renewals, event fees.',
      color: 'bg-amber-50 text-amber-600 hover:bg-amber-100'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4 text-3xl lg:text-4xl">
            FairPay is perfect for:
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <div 
              key={index}
              className={`${industry.color} rounded-2xl p-8 transition-all cursor-pointer border-2 border-transparent hover:border-current/20 hover:shadow-lg group`}
            >
              <industry.icon className="w-10 h-10 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-gray-900 mb-3">{industry.title}</h3>
              <p className="text-gray-600 text-sm">{industry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}