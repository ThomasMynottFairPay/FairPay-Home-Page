import { Briefcase, Building2, Globe, GraduationCap, Heart, Users } from "lucide-react";

export function UseCases() {
  const cases = [
    { icon: Heart, title: "Charities & community groups" },
    { icon: Users, title: "Clubs, associations & memberships" },
    { icon: GraduationCap, title: "Schools, tutoring & programs" },
    { icon: Briefcase, title: "Professional services & trades" },
    { icon: Building2, title: "Property, strata & facilities" },
    { icon: Globe, title: "Any small business under $2M" },
  ];

  return (
    <section id="use-cases" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Made for small businesses and not-for-profits.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cases.map((item, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center hover:bg-teal-50 hover:border-teal-100 transition-colors cursor-default group"
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-600 mb-4 group-hover:text-teal-600 group-hover:scale-110 transition-all">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
