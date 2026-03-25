import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Calculator, Scale, Home as HomeIcon, Gem, Building2, Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import ConsultationModal from './ConsultationModal';
import ObligationCheckModal from './ObligationCheckModal';
import { siteConfig } from '@/lib/site-config';

/**
 * Facade-pattern YouTube embed.
 * Shows a thumbnail + play button initially (no iframe loaded).
 * Clicking play swaps in the real iframe — works on localhost AND production.
 * A persistent "Watch on YouTube" link is always available as fallback.
 */
function YouTubeEmbed({ embedUrl, embedUrlUnmuted, thumbnailUrl, watchUrl }) {
  const [unmuted, setUnmuted] = useState(false);

  const handleUnmute = () => {
    setUnmuted(true);
  };

  return (
    <div className="relative w-full h-full">
      <iframe
        key={unmuted ? 'unmuted' : 'muted'}
        src={unmuted ? embedUrlUnmuted : embedUrl}
        title="AML Compliance Made Simple"
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      {/* Unmute button overlay — disappears after click */}
      {!unmuted && (
        <button
          onClick={handleUnmute}
          className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/70 hover:bg-black/90 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all hover:scale-105 shadow-lg"
          aria-label="Unmute video"
        >
          <VolumeX className="h-4 w-4 text-white" />
          Click to unmute
        </button>
      )}

      {/* Watch on YouTube */}
      <a
        href={watchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/70 hover:bg-black/90 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
      >
        <svg className="h-3.5 w-3.5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-2.47 12.58 12.58 0 0 0-8.45 0A4.83 4.83 0 0 1 3.6 6.69 49.32 49.32 0 0 0 3 12a49.32 49.32 0 0 0 .6 5.31 4.83 4.83 0 0 1 3.77 2.47 12.58 12.58 0 0 0 8.45 0 4.83 4.83 0 0 1 3.77-2.47A49.32 49.32 0 0 0 21 12a49.32 49.32 0 0 0-.41-5.31zM10 15V9l5 3z"/>
        </svg>
        Watch on YouTube
      </a>
    </div>
  );
}

const industries = [
  { label: 'Accountants', icon: Calculator, path: '/Sectors/Accountants' },
  { label: 'Lawyers', icon: Scale, path: '/Sectors/Lawyers' },
  { label: 'Conveyancers', icon: HomeIcon, path: '/Sectors/Conveyancers' },
  { label: 'Jewelers & Bullion', icon: Gem, path: '/Sectors/Jewellers' },
  { label: 'Real Estate Agents', icon: Building2, path: '/Sectors/RealEstate' },
];

/**
 * Extract YouTube video ID from any YouTube URL format.
 */
function getYouTubeVideoId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
}

// On localhost YouTube blocks embeds — fall back to the local MP4 for dev preview.
// On any real domain (Netlify, etc.) the YouTube embed is used as configured.
const isLocalhost = typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const heroVideoUrl = isLocalhost ? '/hero-video.mp4' : siteConfig.heroVideoUrl;
const youtubeVideoId = getYouTubeVideoId(heroVideoUrl);
const youtubeEmbedUrl = youtubeVideoId
  ? `https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1&mute=1&rel=0&modestbranding=1&cc_load_policy=1&cc_lang_pref=en`
  : null;
const youtubeEmbedUrlUnmuted = youtubeVideoId
  ? `https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1&mute=0&rel=0&modestbranding=1&cc_load_policy=1&cc_lang_pref=en`
  : null;
const youtubeThumbnail = youtubeVideoId
  ? `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`
  : null;
const isYouTube = !!youtubeVideoId;
const isLocalVideo = !isYouTube && !!heroVideoUrl;

export default function HeroSection() {
  const [showConsultation, setShowConsultation] = useState(false);
  const [showObligation, setShowObligation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasEnded, setHasEnded] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) { videoRef.current.pause(); } else { videoRef.current.play(); }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const replay = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
    setHasEnded(false);
  };

  return (
    <section className="relative overflow-hidden bg-[#1e2d45]">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 lg:pt-28 lg:pb-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="bg-[var(--brand-teal)]/20 text-zinc-50 mb-6 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest rounded-full inline-block border border-[var(--brand-teal)]/40">
                AML. DONE RIGHT.
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] mb-6"
              style={{ fontFamily: "'Barlow', 'Inter', sans-serif" }}>
              Professional AML consulting{' '}
              <span className="text-[var(--brand-teal)]">and compliance tools</span>{' '}
              for your business
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-blue-100/90 leading-relaxed mb-8 max-w-xl">
              Expert AML consulting solutions for accountants, lawyers, conveyancers, jewelers, bullion dealers, and real estate agents. Tranche 2 ready, practical, and audit-ready.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="flex flex-wrap gap-4 mb-10">
              <Button
                size="lg"
                onClick={() => setShowConsultation(true)}
                className="bg-white text-[#2D4059] hover:bg-blue-50 rounded-full px-7 h-11 text-base font-semibold shadow-lg transition-all duration-300">
                Book a Free 15-Min Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            {/* Industry Quick Links */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="flex flex-col sm:flex-wrap sm:flex-row gap-2">
              {industries.map((ind) => (
                <Link
                  key={ind.label}
                  to={ind.path}
                  className="group flex items-center gap-1.5 px-4 py-2.5 rounded-xl sm:rounded-full bg-white/10 border border-white/25 hover:bg-white/20 hover:border-white/50 transition-all duration-300 w-full sm:w-auto">
                  <ind.icon className="h-3.5 w-3.5 text-blue-200 group-hover:text-white transition-colors" />
                  <span className="text-sm font-medium text-blue-100 group-hover:text-white">{ind.label}</span>
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Right: Video */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 aspect-video shadow-2xl bg-gradient-to-br from-[var(--brand-navy)] to-[#1a3a5c]">

              {/* ── YouTube embed with thumbnail fallback ── */}
              {isYouTube && (
                <YouTubeEmbed
                  embedUrl={youtubeEmbedUrl}
                  embedUrlUnmuted={youtubeEmbedUrlUnmuted}
                  thumbnailUrl={youtubeThumbnail}
                  watchUrl={heroVideoUrl}
                />
              )}

              {/* ── Local / direct video file ── */}
              {isLocalVideo && (
                <>
                  <video
                    ref={videoRef}
                    src={heroVideoUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                    onEnded={() => { setIsPlaying(false); setHasEnded(true); }}
                  >
                    <track
                      kind="captions"
                      src="/hero-video.vtt"
                      srcLang="en"
                      label="English"
                      default
                    />
                  </video>
                  {hasEnded && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <button onClick={replay} className="flex flex-col items-center gap-2 text-white hover:text-[var(--brand-teal)] transition-colors">
                        <RotateCcw className="h-10 w-10" />
                        <span className="text-sm font-medium">Replay</span>
                      </button>
                    </div>
                  )}
                  {!hasEnded && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3 flex items-center gap-3">
                      <button onClick={togglePlay} className="text-white hover:text-[var(--brand-teal)] transition-colors">
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </button>
                      <button onClick={toggleMute} className="text-white hover:text-[var(--brand-teal)] transition-colors ml-auto">
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* ── Placeholder (no video configured) ── */}
              {!isYouTube && !isLocalVideo && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center px-8">
                    <div className="w-16 h-16 rounded-full bg-[var(--brand-teal)]/20 border-2 border-[var(--brand-teal)] flex items-center justify-center mx-auto mb-4">
                      <Play className="h-7 w-7 text-[var(--brand-teal)] ml-1" />
                    </div>
                    <p className="text-white font-semibold text-lg mb-1">AML Compliance Made Simple</p>
                    <p className="text-blue-300 text-sm">Watch our 2-minute explainer</p>
                    <p className="text-blue-400/60 text-xs mt-3">Video coming soon</p>
                  </div>
                </div>
              )}
            </div>

            {/* Download Guide button */}
            <div className="mt-6">
              <Link to={createPageUrl('Resources')}>
                <Button size="lg" variant="outline" className="w-full rounded-full px-8 h-12 text-base border-white/60 text-white font-semibold hover:bg-white/10 hover:border-white bg-transparent transition-all duration-300">
                  <Download className="mr-2 h-4 w-4" />
                  Download Free Guide
                </Button>
              </Link>
            </div>

          </motion.div>
        </div>

        {/* Check Obligation CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 p-5 rounded-2xl bg-white/[0.08] border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold text-base">Not sure if you're obligated?</p>
            <p className="text-blue-100/90 text-sm mt-0.5">Check your Tranche 2 AML obligations in 2 minutes.</p>
          </div>
          <Button
            onClick={() => setShowObligation(true)}
            className="bg-white text-[var(--brand-navy)] hover:bg-blue-50 rounded-full px-6 font-semibold text-sm whitespace-nowrap">
            Check My Obligation →
          </Button>
        </motion.div>
      </div>

      <ConsultationModal open={showConsultation} onClose={() => setShowConsultation(false)} />
      <ObligationCheckModal open={showObligation} onClose={() => setShowObligation(false)} />
    </section>
  );
}
