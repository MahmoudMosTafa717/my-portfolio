import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

export function Contact() {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!ACCESS_KEY) {
      console.error('Web3Forms Access Key is missing. Please add VITE_WEB3FORMS_ACCESS_KEY to your .env file.');
      setError('Form service is not configured. Please contact me directly via email.');
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData(e.target);
      formData.append("access_key", ACCESS_KEY);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        formRef.current.reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        console.error('Web3Forms Error:', data);
        setError(data.message || 'Failed to send message. Please try again later.');
      }
    } catch (err) {
      console.error('Fetch Error:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="connect" className="relative w-full py-24 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="bezel-shell mx-auto max-w-4xl bg-gradient-to-br from-zinc-900 to-zinc-950 dark:from-zinc-950 dark:to-black"
        >
          <div className="bezel-core p-8 md:p-12 lg:p-16">
            
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-extrabold tracking-tighter text-zinc-900 dark:text-white sm:text-4xl md:text-5xl transition-colors duration-500">
                Let's <span className="text-gradient">Connect</span>.
              </h2>
              <p className="mt-4 text-zinc-600 dark:text-zinc-400 transition-colors duration-500">
                Have a project in mind or looking for a full-stack engineer? I'd love to hear from you.
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-zinc-600 dark:text-zinc-300 transition-colors duration-500">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 outline-none transition-all hover:border-zinc-400 focus:border-brand-plum focus:ring-2 focus:ring-brand-plum/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-zinc-500 dark:hover:border-white/20 dark:focus:border-brand-plum dark:focus:bg-white/10 dark:focus:ring-brand-plum/20"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-zinc-600 dark:text-zinc-300 transition-colors duration-500">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 outline-none transition-all hover:border-zinc-400 focus:border-brand-plum focus:ring-2 focus:ring-brand-plum/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-zinc-500 dark:hover:border-white/20 dark:focus:border-brand-plum dark:focus:bg-white/10 dark:focus:ring-brand-plum/20"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-zinc-600 dark:text-zinc-300 transition-colors duration-500">Message</label>
                <textarea
                  name="message"
                  id="message"
                  required
                  rows={5}
                  className="w-full resize-none rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-400 outline-none transition-all hover:border-zinc-400 focus:border-brand-plum focus:ring-2 focus:ring-brand-plum/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-zinc-500 dark:hover:border-white/20 dark:focus:border-brand-plum dark:focus:bg-white/10 dark:focus:ring-brand-plum/20"
                  placeholder="Tell me about your project..."
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 dark:text-red-400 text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-zinc-900 dark:bg-white px-8 py-4 text-base font-bold text-white dark:text-black transition-transform duration-300 ease-[var(--ease-ui)] hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-600" />
                    <span>Message Sent!</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-8 transition-colors duration-500">
              <a href={`mailto:${PROFILE_DATA.contact.email}`} className="text-sm font-medium text-zinc-600 dark:text-zinc-400 transition-colors hover:text-brand-plum dark:hover:text-white">
                {PROFILE_DATA.contact.email}
              </a>
              <span className="hidden h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600 sm:block" />
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {PROFILE_DATA.contact.location}
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600 sm:block" />
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {PROFILE_DATA.contact.phone}
              </span>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
