import { Link } from 'react-router-dom';
import { LIVE_CASES } from '@/lib/subjects';
import { motion } from 'framer-motion';

export default function LiveCasesSection() {
  return (
    <div>
      <h2 className="font-serif text-xl font-bold text-foreground mb-4">Live Cases</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {LIVE_CASES.map((liveCase, index) => (
          <motion.div
            key={liveCase.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.08 }}
          >
            <Link
              to={`/live-case/${liveCase.id}`}
              className="group block rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-all duration-200"
            >
              <div className="h-36 overflow-hidden">
                <img
                  src={liveCase.image}
                  alt={liveCase.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-serif text-base font-bold text-foreground mb-1.5">{liveCase.title}</h3>
                <div className="flex gap-1.5 mb-2">
                  {liveCase.subjects.map((s) => (
                    <span key={s} className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{liveCase.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}