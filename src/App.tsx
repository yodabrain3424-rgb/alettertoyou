/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ArrowLeft, Heart, Sparkles, Mail, MessageCircle, Calendar } from "lucide-react";

const MEMORY_CALENDAR = [
  {
    month: "October 2025",
    days: 31,
    startDay: 3, // Wed
    importantDates: {
      24: "The most magical night ever, from the weather to the coffee and the burgers. One of my favorite songs in the background and just us. Also, how you smiled when I said yes to you feeding me the ice cream you surprised me with.",
      29: "The most magical night ever, from the weather to the coffee and the burgers. One of my favorite songs in the background and just us. Also, how you smiled when I said yes to you feeding me the ice cream you surprised me with."
    }
  },
  {
    month: "November 2025",
    days: 30,
    startDay: 6, // Sat
    importantDates: {
      9: "You sent me a letter that day. I've re-read it a hundred times, and it still feels like the first time."
    }
  },
  {
    month: "December 2025",
    days: 31,
    startDay: 1, // Mon
    importantDates: {}
  },
  {
    month: "January 2026",
    days: 31,
    startDay: 4, // Thu
    importantDates: {
      1: "we spent the new years together that felt nice",
      31: "you surprised me by staying for longer in Lucknow im not gonna lie I had secretly hoped for it"
    }
  },
  {
    month: "February 2026",
    days: 28,
    startDay: 0, // Sun
    importantDates: {
      1: "The start of our favorite week.",
      2: "we stayed up watching key and peele for the first time that week (we were gonna watch that A LOT)",
      3: "I loved looking at your face when you slept (you caught me staring once eek)",
      4: "rain and white ferrari",
      5: "everything was so perfect",
      6: "I loved the way you looked in the morning with your ruffled hair and your sleepy eyes",
      7: "stay for longer",
      8: "you seemed almost perfect",
      9: "kept wishing it wasn't the last day"
    }
  },
  {
    month: "March 2026",
    days: 31,
    startDay: 0, // Sun
    importantDates: {}
  }
];

const PRE_FED_NOTES = [
  "I love your smile",
  "I smile thinking about the till on your left index finger",
  "idiot 😽",
  "you make me blush 😳",
  "you're so fine wth",
  "helloooo handsomeeee",
  "I love our hugs sm",
  "my chest remembers the weight of your head on it",
  "everything melts away when I'm with you",
  "I see all parts of you, even the not so shiny ones and it makes me want you more",
  "I love listening to you yap",
  "I kept every flower you gave me",
  "I remember our first conversation like it was yesterday",
  "Jaanvi DOESNT suck and Neil is not rude 😋",
  "I eat strawberry ice cream when I miss you because it has parts of both me and you. Your love for strawberries and my love for ice cream.",
  "ivy, destroy myself just for you and white ferrari remind me of you",
  "I sleep to white ferrari sometimes because I feel like I'm sleeping next to you",
  "I love your cheek kisses so so much",
  "ahhhhhhhhhh I hate you idhar ao I miss you",
  "that night on the roof changed everything for me"
];

const PRE_FED_LETTERS = [
  "Hi baby,\nYou came into my life when I was least expecting it. You became so important to me so so quickly. You drilled your way into my heart almost forcefully and I never stopped it, even though I was scared, I never stopped it. I found myself defying everyone and everything for a couple minutes with you, that told me you were something different to me. You'll forever have a small place in my heart because of how meaningful our little moments were for me. \n\nyours, \njammy",
  "To my favorite person,\n\nI wanted to write you something a bit longer today. Sometimes I find myself just watching you—watching you sleep the peace your face holds the way you were so so close to me, the way you laugh at your own jokes, the way you care so deeply about the people around you.\n\nyours, \njammy",
  "Hey Handsome,\n\nRemember our first conversation? I was so nervous, but you had this way of making everything feel so easy. I never expected that one chat would lead to... well, to this. To us. I'm so glad I took that chance.\n\nyours, \njammy",
  "I was listening to 'White Ferrari' today and it made me miss you so much it actually hurt a little. But then I remembered the weight of your head on my chest, and that feeling of absolute peace. It's crazy how much space you take up in my heart. I see all of you—the shiny parts and the ones you try to hide—and I want all of it. Every single bit.\n\nyours, \njammy",
  "To the one who makes me blush,\n\nYou really are something else, you know that? You're so fine it's actually a bit ridiculous, but it's your heart that really gets me. The way you listen to me yap about nothing, the way I keep every flower you give me... it's the little things. you idiot. Come here and give me a hug soon, okay?\n\nyours, \njammy",
  "hiiii babyyy,\n\nI was just thinking about your hair and how much I love running my fingers through it. It's so soft and I could honestly do it for hours. You always look so relaxed when I do, and it's my favorite way to just be near you.\n\nyours, \njammy",
  "hiiii babyyy,\n\nI saw a cat today that looked exactly like you when you're grumpy. It had the same little furrowed brow and everything. I almost took it home just so I could have a mini-you to yap at when you're not around. You're my favorite person to annoy, and I plan on doing it for a very long time.\n\nyours, \njammy",
  "Hey dork,\n\nI was just thinking about how you always manage to make me laugh even when I'm trying my best to be mad at you. It's actually really annoying how you can just look at me with that stupidly cute face and all my anger just melts away. You're my favorite distraction and my favorite person to yap to.\n\nyours, \njammy",
  "hiiii babyyy,\n\nI notice even the smallest things about you. I love the little line that shows up when you smile, or that tiny smile you get when you're trying not to laugh. It's those little details that make me so happy. You're just so special to me.\n\nyours, \njammy",
  "hiiii babyyy,\n\nI was just thinking about how much I love it when you get all excited about the things you like. You get this little sparkle in your eyes and it's honestly the cutest thing ever. I could listen to you talk about your favorite things for hours. You're just so special to me.\n\nyours, \njammy"
];

type Page = "landing" | "notes" | "letters" | "calendar";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [currentNote, setCurrentNote] = useState<string | null>(null);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [selectedCalendarNote, setSelectedCalendarNote] = useState<{date: string, note: string} | null>(null);

  const getRandomNote = () => {
    const randomIndex = Math.floor(Math.random() * PRE_FED_NOTES.length);
    if (PRE_FED_NOTES[randomIndex] === currentNote && PRE_FED_NOTES.length > 1) {
      getRandomNote();
      return;
    }
    setCurrentNote(PRE_FED_NOTES[randomIndex]);
  };

  const openRandomLetter = () => {
    const randomIndex = Math.floor(Math.random() * PRE_FED_LETTERS.length);
    setSelectedLetter(PRE_FED_LETTERS[randomIndex]);
    setIsLetterOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#f5f2eb] font-playfair overflow-x-hidden">
      <AnimatePresence mode="wait">
        {currentPage === "landing" && (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen w-full flex flex-col items-center justify-center p-6"
          >
            <div className="relative w-full max-w-3xl flex items-center justify-center mb-12">
              {/* Vintage Kraft Paper Envelope (Behind) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, rotate: -6, x: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: -4, x: -10 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute w-[85%] aspect-[3/2] bg-[#c4a484] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-black/5 overflow-hidden"
                style={{
                  backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png')`,
                  backgroundBlendMode: 'multiply'
                }}
              >
                <div className="absolute inset-0 border-[10px] border-transparent border-t-black/5 border-l-black/5 opacity-20 pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 48%)', borderBottom: '2px solid black' }}></div>
              </motion.div>

              {/* Cream-Colored Card (In Front) */}
              <motion.div 
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-[80%] aspect-[1.6/1] bg-[#fffdfa] shadow-[0_12px_45px_rgba(0,0,0,0.08)] rounded-xl flex flex-col items-center justify-center p-8 overflow-hidden"
                style={{
                  backgroundImage: `url('https://www.transparenttextures.com/patterns/paper-fibers.png')`,
                  backgroundBlendMode: 'soft-light'
                }}
              >
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_20%_30%,#8b7355_0%,transparent_40%),radial-gradient(circle_at_80%_70%,#8b7355_0%,transparent_30%)]"></div>
                <div className="absolute inset-0 border border-black/[0.03] rounded-xl pointer-events-none"></div>
                
                <div className="relative z-20 text-center flex flex-col items-center">
                  <h1 className="italic text-[#8b7355] text-xl md:text-2xl lg:text-3xl tracking-wide opacity-80 select-none">
                    My letter to you
                  </h1>
                  
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="mt-4"
                  >
                    <Heart size={24} fill="#d64545" stroke="#d64545" className="drop-shadow-sm" />
                  </motion.div>
                </div>

                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[95%] h-12 bg-black/5 blur-3xl rounded-full pointer-events-none"></div>
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 z-20">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentPage("notes");
                  getRandomNote();
                }}
                className="flex items-center gap-3 px-8 py-4 bg-[#fffdfa] text-[#8b7355] rounded-full shadow-md border border-black/5 group"
              >
                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-lg italic">Notes</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage("letters")}
                className="flex items-center gap-3 px-8 py-4 bg-[#c4a484] text-white rounded-full shadow-md group"
              >
                <Mail size={20} className="group-hover:rotate-12 transition-transform" />
                <span className="text-lg italic">Letters</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage("calendar")}
                className="flex items-center gap-3 px-8 py-4 bg-[#fffdfa] text-[#8b7355] rounded-full shadow-md border border-black/5 group"
              >
                <Calendar size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-lg italic">Moments</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {currentPage === "calendar" && (
          <motion.div
            key="calendar"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100) {
                setCurrentPage("letters");
              }
            }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="min-h-screen w-full max-w-6xl mx-auto p-6 md:p-12 flex flex-col items-center cursor-grab active:cursor-grabbing"
          >
            <div className="w-full flex justify-start mb-8">
              <button 
                onClick={() => setCurrentPage("landing")}
                className="p-2 hover:bg-black/5 rounded-full transition-colors group"
              >
                <ArrowLeft size={24} className="text-[#8b7355] opacity-60 group-hover:opacity-100" />
              </button>
            </div>

            <h2 className="italic text-[#8b7355] text-2xl md:text-3xl opacity-80 mb-12">Moments</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
              {MEMORY_CALENDAR.map((monthData, mIdx) => (
                <div key={mIdx} className="bg-white/40 backdrop-blur-sm p-6 rounded-2xl border border-[#8b7355]/10 shadow-sm">
                  <h3 className="text-[#8b7355] font-medium mb-4 text-center">{monthData.month}</h3>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                      <div key={d} className="text-[10px] uppercase tracking-widest text-[#8b7355]/40 mb-2 font-sans">{d}</div>
                    ))}
                    {[...Array(monthData.startDay)].map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                    {[...Array(monthData.days)].map((_, i) => {
                      const day = i + 1;
                      const isImportant = monthData.importantDates[day as keyof typeof monthData.importantDates];
                      return (
                        <div 
                          key={day}
                          onClick={() => isImportant && setSelectedCalendarNote({ date: `${monthData.month} ${day}`, note: isImportant })}
                          className={`aspect-square flex flex-col items-center justify-center text-sm rounded-lg transition-all ${isImportant ? 'cursor-pointer hover:bg-[#c4a484]/10 text-[#8b7355] font-medium' : 'text-[#8b7355]/40'}`}
                        >
                          <span className="relative">
                            {day}
                            {isImportant && (
                              <span className="absolute -top-1 -right-3 text-[10px]">💗</span>
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-12 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#8b7355]/20"></div>
              <div className="w-2 h-2 rounded-full bg-[#8b7355]/20"></div>
              <div className="w-2 h-2 rounded-full bg-[#8b7355]"></div>
            </div>
            <p className="text-[#8b7355]/30 text-[10px] uppercase tracking-widest">Swipe right for letters</p>

            {/* Calendar Note Modal */}
            <AnimatePresence>
              {selectedCalendarNote && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
                  onClick={() => setSelectedCalendarNote(null)}
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 20, opacity: 0 }}
                    className="bg-[#fffdfa] w-full max-w-md p-8 rounded-2xl shadow-2xl relative"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      backgroundImage: `url('https://www.transparenttextures.com/patterns/paper-fibers.png')`,
                      backgroundBlendMode: 'soft-light'
                    }}
                  >
                    <div className="text-[#8b7355]/40 text-xs uppercase tracking-widest mb-4 font-sans">{selectedCalendarNote.date}</div>
                    <div className="text-[#8b7355] italic text-lg leading-relaxed">
                      {selectedCalendarNote.note}
                    </div>
                    <button 
                      onClick={() => setSelectedCalendarNote(null)}
                      className="mt-8 w-full py-3 border border-[#8b7355]/20 text-[#8b7355]/60 hover:text-[#8b7355] hover:border-[#8b7355]/40 rounded-full transition-all italic"
                    >
                      Close
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {currentPage === "notes" && (
          <motion.div 
            key="notes"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -100) setCurrentPage("letters");
            }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="min-h-screen w-full max-w-2xl mx-auto p-6 md:p-12 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing"
          >
            <div className="absolute top-12 left-6 md:left-12">
              <button 
                onClick={() => setCurrentPage("landing")}
                className="p-2 hover:bg-black/5 rounded-full transition-colors group"
              >
                <ArrowLeft size={24} className="text-[#8b7355] opacity-60 group-hover:opacity-100" />
              </button>
            </div>

            <h2 className="italic text-[#8b7355] text-2xl md:text-3xl opacity-80 mb-12">from me to you</h2>

            <div className="w-full relative mb-12">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentNote}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-[#fffdfa] p-10 md:p-16 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.05)] border border-black/[0.02] relative overflow-hidden flex items-center justify-center min-h-[300px] text-center"
                  style={{
                    backgroundImage: `url('https://www.transparenttextures.com/patterns/paper-fibers.png')`,
                    backgroundBlendMode: 'soft-light'
                  }}
                >
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#8b7355_0%,transparent_70%)]"></div>
                  <p className="text-[#8b7355] italic text-xl md:text-2xl lg:text-3xl leading-relaxed relative z-10">"{currentNote}"</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={getRandomNote}
              className="flex items-center justify-center px-10 py-4 bg-[#c4a484] text-white rounded-full hover:bg-[#b39373] transition-all shadow-lg shadow-[#c4a484]/20 group mb-8"
            >
              <span className="text-lg tracking-wide">more pyaar</span>
            </motion.button>

            <div className="flex gap-2 mt-auto">
              <div className="w-2 h-2 rounded-full bg-[#8b7355]"></div>
              <div className="w-2 h-2 rounded-full bg-[#8b7355]/20"></div>
              <div className="w-2 h-2 rounded-full bg-[#8b7355]/20"></div>
            </div>
            <p className="mt-2 text-[#8b7355]/30 text-[10px] uppercase tracking-widest">Swipe left for letters</p>
          </motion.div>
        )}

        {currentPage === "letters" && (
          <motion.div 
            key="letters"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -100) setCurrentPage("calendar");
              if (info.offset.x > 100) setCurrentPage("notes");
            }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="min-h-screen w-full max-w-4xl mx-auto p-6 md:p-12 flex flex-col items-center cursor-grab active:cursor-grabbing"
          >
            <div className="absolute top-12 left-6 md:left-12">
              <button 
                onClick={() => setCurrentPage("landing")}
                className="p-2 hover:bg-black/5 rounded-full transition-colors group"
              >
                <ArrowLeft size={24} className="text-[#8b7355] opacity-60 group-hover:opacity-100" />
              </button>
            </div>

            <h2 className="italic text-[#8b7355] text-2xl md:text-3xl opacity-80 mb-12">Letters</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 w-full max-w-3xl">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openRandomLetter}
                  className="aspect-[3/2] bg-[#c4a484] rounded-lg shadow-md cursor-pointer relative overflow-hidden group"
                  style={{
                    backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png')`,
                    backgroundBlendMode: 'multiply'
                  }}
                >
                  <div className="absolute inset-0 border-t-[30px] border-black/5 opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Mail size={24} className="text-white/40 group-hover:text-white/60 transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="mt-12 text-[#8b7355]/40 text-sm italic">Click an envelope to read a random letter</p>

            <div className="flex gap-2 mt-auto mb-2">
              <div className="w-2 h-2 rounded-full bg-[#8b7355]/20"></div>
              <div className="w-2 h-2 rounded-full bg-[#8b7355]"></div>
              <div className="w-2 h-2 rounded-full bg-[#8b7355]/20"></div>
            </div>
            <p className="text-[#8b7355]/30 text-[10px] uppercase tracking-widest">Swipe left for moments, right for notes</p>

            {/* Letter Modal */}
            <AnimatePresence>
              {isLetterOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
                  onClick={() => setIsLetterOpen(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.9, y: 20, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="bg-[#fffdfa] w-full max-w-xl p-10 md:p-16 rounded-lg shadow-2xl relative overflow-hidden max-h-[80vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      backgroundImage: `url('https://www.transparenttextures.com/patterns/paper-fibers.png')`,
                      backgroundBlendMode: 'soft-light'
                    }}
                  >
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#8b7355_0%,transparent_70%)]"></div>
                    <div className="relative z-10 whitespace-pre-wrap text-[#8b7355] italic text-lg leading-relaxed font-serif">
                      {selectedLetter}
                    </div>
                    <button 
                      onClick={() => setIsLetterOpen(false)}
                      className="mt-12 w-full py-3 border border-[#8b7355]/20 text-[#8b7355]/60 hover:text-[#8b7355] hover:border-[#8b7355]/40 rounded-full transition-all italic"
                    >
                      Close Letter
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      <footer className="w-full py-8 flex justify-center items-center">
        <p className="text-[#8b7355]/40 italic text-sm tracking-widest">from jammy to neil</p>
      </footer>
    </div>
  );
}
