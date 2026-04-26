import { Link } from 'react-router-dom';
import { LIVE_CASES } from '@/lib/subjects';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function LiveCasesSection() {
  return (
    <section className="mb-12">
      <div className="flex items-end justify-between mb-8 md:mb-10 pb-5 border-b border-border">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Unfolding now
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 leading-tight">
            Live Cases
          </h2>
        </div>
        <span className="hidden md:block text-sm text-muted-foreground italic font-serif">
          Real-world stories, examined.
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-7">
        {LIVE_CASES.map((liveCase, index) => (
          <motion.div
            key={liveCase.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
          >
            <Link
              to={`/live-case/${liveCase.id}`}
              className="group block rounded-xl bg-card overflow-hidden shadow-editorial hover:shadow-editorial-lg transition-all duration-300 h-full"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  src={liveCase.image}
                  alt={liveCase.title}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60" />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {liveCase.subjects.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#6B1F2A] bg-[#F2E0E3] px-2.5 py-1 rounded-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3 leading-snug tracking-tight group-hover:text-primary transition-colors">
                  {liveCase.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {liveCase.description}
                </p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80 group-hover:text-primary transition-colors">
                  <span>Read the case</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}