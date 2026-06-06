import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquareCode, Check, Award, Flame, ThumbsUp } from 'lucide-react';
import { Review } from '../types';

interface ReviewsProps {
  darkMode: boolean;
}

const INITIAL_TESTIMONIALS: Review[] = [
  {
    id: 't-1',
    author: 'Arch. Henrik Sterling',
    date: '2026-05-22',
    rating: 5,
    comment: 'The Brutalist Table Light is not merely an illuminant; it is a weight. The raw textured split basalt introduces a powerful geologic frequency into our modern concrete offices.',
    isVerified: true
  },
  {
    id: 't-2',
    author: 'Sébastien Rousseau',
    date: '2026-05-10',
    rating: 5,
    comment: 'Aether Dome Speaker completely changed the sonic properties of our architectural studio. High frequencies are purely weightless and floating; the aluminum spun dome is an incredibly beautiful sculpture.',
    isVerified: true
  },
  {
    id: 't-3',
    author: 'Yoko Takahashi',
    date: '2026-04-28',
    rating: 5,
    comment: 'Onyx Chronometer is an absolute exercise in mechanical restraint. The grade 5 titanium sandblasted body is featherlight and catches low museum spotlights with beautiful subtlety.',
    isVerified: true
  },
  {
    id: 't-4',
    author: 'Kaelen Vance',
    date: '2026-04-15',
    rating: 4,
    comment: 'Apex Keyboard has an incredibly woody, rich thock sound signature due to the thick hand-lubricated gaskets and raw copper heavy base. A sensory writer\'s modern poetic tool.',
    isVerified: true
  }
];

export default function Reviews({ darkMode }: ReviewsProps) {
  const [list, setList] = useState<Review[]>(INITIAL_TESTIMONIALS);
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [likes, setLikes] = useState<Record<string, number>>({});

  const handleLike = (id: string) => {
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newItem: Review = {
      id: `t-custom-${Date.now()}`,
      author: author.trim(),
      date: new Date().toISOString().split('T')[0],
      rating,
      comment: comment.trim(),
      isVerified: true
    };

    setList([newItem, ...list]);
    setAuthor('');
    setRating(5);
    setComment('');
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <section 
      id="customer-reflections-section"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 font-sans select-none"
    >
      
      {/* Title */}
      <div className="text-center mb-16">
        <span className="text-[10px] uppercase tracking-[0.35em] text-amber-500 font-bold mb-3 flex items-center justify-center gap-1.5">
          <MessageSquareCode className="w-3.5 h-3.5" />
          Testimonial Wall
        </span>
        <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight text-stone-900 dark:text-white">
          Sartorial Reflections
        </h2>
        <p className="text-xs text-neutral-400 mt-2 font-mono uppercase tracking-widest">
          Critics and architects write on AURA’s geometries
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side Metrics Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className={`p-6 rounded-3xl backdrop-blur-xl ${
            darkMode ? 'immersive-card-dark' : 'immersive-card-light'
          }`}>
            <h3 className="font-display font-bold text-lg mb-4">Rating Index</h3>
            
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-mono font-bold">4.9</span>
              <span className="text-neutral-400 text-sm">out of 5.0</span>
            </div>

            <div className="flex items-center space-x-1 my-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
            </div>

            <span className="text-xs text-neutral-400 block font-light">
              Cumulative score based on 145 active international verified acquisitions.
            </span>

            {/* Simulated bar percentages graphs */}
            <div className="space-y-3 mt-6">
              {[
                { stars: 5, pct: '92%' },
                { stars: 4, pct: '6%' },
                { stars: 3, pct: '2%' }
              ].map((row) => (
                <div key={row.stars} className="flex items-center text-xs text-neutral-400 font-mono">
                  <span className="w-12 text-left">{row.stars} Stars</span>
                  <div className="flex-grow h-1.5 bg-neutral-100 dark:bg-zinc-800 rounded mx-3 overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: row.pct }} />
                  </div>
                  <span className="w-8 text-right font-medium text-stone-850 dark:text-neutral-200">{row.pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Review write block */}
          <div className={`p-6 rounded-3xl backdrop-blur-xl ${
            darkMode ? 'immersive-card-dark' : 'immersive-card-light'
          }`}>
            <h3 className="font-display font-bold text-base mb-2">Pen a reflection</h3>
            <p className="text-xs text-neutral-400 mb-4 font-light">
              Add your experience with AURA’s devices immediately onto the permanent collection.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  id="wall-review-author"
                  type="text"
                  placeholder="Your Name / Organization"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className={`w-full px-4 py-2.5 text-xs rounded-xl border focus:ring-1 focus:ring-amber-500 outline-none ${
                    darkMode ? 'bg-black/50 border-white/10 text-white' : 'bg-neutral-50 border-neutral-300 text-stone-900'
                  }`}
                />
              </div>

              <div className="flex items-center space-x-1 py-1">
                <span className="text-xs text-neutral-400 font-mono mr-2">Stars:</span>
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    className="focus:outline-white"
                  >
                    <Star className={`w-4 h-4 ${
                      s <= rating ? 'fill-amber-500 text-amber-500' : 'text-neutral-200 dark:text-zinc-800'
                    }`} />
                  </button>
                ))}
              </div>

              <div>
                <textarea
                  id="wall-review-comment"
                  placeholder="Express your aesthetic, tactile, or vibrational audit..."
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className={`w-full px-4 py-2.5 text-xs rounded-xl border focus:ring-1 focus:ring-amber-500 outline-none ${
                    darkMode ? 'bg-black/50 border-white/10 text-white' : 'bg-neutral-50 border-neutral-300 text-stone-900'
                  }`}
                />
              </div>

              <button
                id="submit-wall-reflection-btn"
                type="submit"
                className="w-full py-3 bg-stone-900 text-white dark:bg-white dark:text-stone-950 text-xs font-bold tracking-widest uppercase rounded-xl hover:opacity-90 transition-opacity"
              >
                Assemble Record
              </button>

              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500 text-[10px] font-mono flex items-center justify-center space-x-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Reflection logged to museum walls.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>

        {/* Right Testimonial Grid wall (Masonry representation) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <AnimatePresence>
            {list.map((item) => (
              <motion.div
                id={`wall-testimonial-${item.id}`}
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-3xl backdrop-blur-xl space-y-4 hover:shadow-md transition-shadow relative ${
                  darkMode ? 'immersive-card-dark' : 'immersive-card-light'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${
                        i < item.rating ? 'fill-amber-500 text-amber-500' : 'text-neutral-200 dark:text-zinc-850'
                      }`} />
                    ))}
                  </div>

                  <span className="text-[10px] font-mono text-neutral-400">
                    {item.date}
                  </span>
                </div>

                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light leading-relaxed italic">
                  "{item.comment}"
                </p>

                <div className="border-t border-neutral-100 dark:border-white/10 pt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[8px] font-mono font-bold text-amber-500 uppercase">
                      {item.author.charAt(0)}
                    </div>
                    <span className="text-[11px] font-bold font-mono text-stone-850 dark:text-neutral-200">
                      {item.author}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <button
                      id={`like-testimonial-btn-${item.id}`}
                      onClick={() => handleLike(item.id)}
                      className="p-1 px-2.5 rounded-full border border-neutral-200 dark:border-white/10 hover:border-amber-500 dark:hover:border-amber-500 text-[10px] font-mono text-neutral-400 flex items-center space-x-1 transition-colors"
                      aria-label="Approve reflection"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{likes[item.id] || Math.floor(Math.random() * 8 + 1)}</span>
                    </button>
                    {item.isVerified && <span className="text-[9px] text-emerald-500 font-mono">Verified</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
