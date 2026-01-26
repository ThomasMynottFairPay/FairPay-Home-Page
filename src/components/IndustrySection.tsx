import { GraduationCap, Dumbbell, Building2, Heart, Briefcase, Users, CheckCircle } from 'lucide-react';

export function IndustrySection() {
  const industries = [
    {
      icon: GraduationCap,
      title: 'Schools & Childcare',
      description: 'Term fees, excursions, activities, enrolments',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Building2,
      title: 'Strata & Property',
      description: 'Quarterly levies, special assessments, deposits',
      color: 'from-cyan-500 to-teal-500'
    },
    {
      icon: Dumbbell,
      title: 'Health & Fitness',
      description: 'Memberships, personal training, class packages',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Briefcase,
      title: 'Professional Services',
      description: 'Retainers, project deposits, recurring invoices',
      color: 'from-rose-500 to-pink-500'
    },
    {
      icon: Heart,
      title: 'Churches & Nonprofits',
      description: 'Donations, tithes, fundraising campaigns',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Clubs & Associations',
      description: 'Annual memberships, event registrations, dues',
      color: 'from-amber-500 to-orange-500'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4 text-4xl lg:text-5xl">
            Trusted across industries
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From schools to strata managers, FairPay handles the payments that matter most
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 transition-all cursor-pointer border-2 border-gray-200 hover:border-indigo-300 hover:shadow-xl group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${industry.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{industry.title}</h3>
                <p className="text-gray-600">{industry.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}