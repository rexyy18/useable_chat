import { motion } from "motion/react";
import { Brain, Heart, Apple, Sparkles } from "lucide-react";
import { ModuleType } from "./ChatScreen";

interface DashboardProps {
  onSelectModule: (module: ModuleType) => void;
}

const modules = [
  {
    id: "mental" as ModuleType,
    title: "Mental Health",
    description: "Stress management and emotional support with AI.",
    icon: Brain,
    color: "from-emerald-500 to-teal-600",
    glow: "group-hover:shadow-emerald-500/30",
  },
  {
    id: "health" as ModuleType,
    title: "Physical Health",
    description: "Monitor your physical activity and energy levels.",
    icon: Heart,
    color: "from-blue-500 to-indigo-600",
    glow: "group-hover:shadow-blue-500/30",
  },
  {
    id: "nutrition" as ModuleType,
    title: "Nutrition",
    description: "Personalized diet plans and nutritional tracking.",
    icon: Apple,
    color: "from-orange-500 to-rose-600",
    glow: "group-hover:shadow-orange-500/30",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Dashboard({ onSelectModule }: DashboardProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl w-full text-center z-10"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-emerald-500/20 text-emerald-400 text-sm font-medium tracking-wide">
            <Sparkles size={14} className="animate-pulse" />
            AI READY
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-glow">
            HealthTrack <span className="text-emerald-500">AI</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto font-light leading-relaxed">
            Your personal companion for a balanced lifestyle. Elevate your
            wellbeing with intelligent support.
          </p>
        </motion.div>

        {/* Moduless Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((module) => (
            <motion.button
              key={module.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -8 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectModule(module.id)}
              className="group relative flex flex-col items-start p-8 rounded-[32px] glass glass-hover text-left overflow-hidden transition-all duration-300"
            >
              {/* Card Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              <div
                className={`p-4 rounded-2xl mb-6 bg-gradient-to-br ${module.color} shadow-lg shadow-black/20 text-white`}
              >
                <module.icon size={28} strokeWidth={2.5} />
              </div>

              <h2 className="text-2xl font-display font-bold mb-3 group-hover:text-emerald-400 transition-colors">
                {module.title}
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8 group-hover:text-zinc-300 transition-colors">
                {module.description}
              </p>

              <div className="mt-auto flex items-center gap-2 text-emerald-500 font-semibold text-sm group-hover:gap-4 transition-all">
                Explore Module
                <div className="w-6 h-px bg-current opacity-30" />
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Footer Branding */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="mt-16 text-zinc-600 text-[10px] uppercase tracking-[0.3em] font-medium"
      >
        Empowering Student Health • 2024
      </motion.div>
    </div>
  );
}
