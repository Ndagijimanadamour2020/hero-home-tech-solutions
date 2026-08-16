import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Hero Home Tech Solutions transformed our billing and payment flows completely. Integrating localized APIs like IremboPay gave our business reliable automated operations.",
    author: "Executive Team",
    company: "Forexera NUD LMS"
  },
  {
    quote: "Professional, fast, and highly technical. They built a custom e-commerce solution and payment engine tailored exactly to our hybrid marketing structure.",
    author: "Operations Management",
    company: "Ubuzima Hybrid Marketing Ltd"
  },
  {
    quote: "Their grasp on full-stack architecture and technical execution is exceptional. Our web presence and student portal run flawlessly.",
    author: "IT Directorship",
    company: "Cyondo TSS Portal"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">Client Feedback</h2>
          <p className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Trusted by Enterprise Clients & Growing Organizations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic mb-6">"{t.quote}"</p>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">{t.author}</h4>
                <p className="text-xs text-blue-400">{t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
