import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Search, Megaphone, Target, BarChart3, Globe, TrendingUp, PenTool, Zap, ChevronRight, Layers3, Workflow } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";

const services = [
  { icon: Search, title: "SEO Services", desc: "Technical, on-page, and authority-led SEO for long-term visibility.", path: "/services/seo" },
  { icon: Megaphone, title: "Social Media Marketing", desc: "Platform-specific creative and distribution strategy for engagement.", path: "/services/social-media" },
  { icon: Target, title: "Meta Ads Management", desc: "ROI-focused ad funnels across Facebook and Instagram.", path: "/services/meta-ads" },
  { icon: BarChart3, title: "Google Ads (PPC)", desc: "Intent-driven search, display, and remarketing campaigns.", path: "/services/google-ads" },
  { icon: Globe, title: "Website Development", desc: "Conversion-oriented websites with speed and UX at the core.", path: "/services/web-development" },
  { icon: TrendingUp, title: "Performance Marketing", desc: "Cross-channel growth systems optimized by real-time data.", path: "/services" },
  { icon: PenTool, title: "Branding", desc: "Identity, positioning, and narrative design for differentiation.", path: "/services" },
  { icon: Zap, title: "Content Marketing", desc: "Content frameworks that drive trust, traffic, and conversion.", path: "/services" },
];

const servicesGroups = [
  {
    icon: Layers3,
    title: "Strategy & Positioning",
    desc: "Audience insights, messaging architecture, and channel planning.",
  },
  {
    icon: Workflow,
    title: "Execution & Optimization",
    desc: "Campaign launch, testing cycles, and iterative performance improvement.",
  },
];

const Services = () => (
  <Layout>
    <section className="pt-32 pb-20 bg-hero relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-pulse-glow" />
      </div>
      <div className="container relative z-10 text-center max-w-5xl mx-auto">
        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs font-heading font-semibold uppercase tracking-wider mb-6 border border-secondary/20">
          Services
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-heading font-extrabold text-4xl md:text-6xl text-primary-foreground leading-tight mb-6">
          One Partner for
          <span className="text-gradient"> End-to-End Digital Growth</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-primary-foreground/75 leading-relaxed max-w-3xl mx-auto">
          We combine strategy, creative, paid media, SEO, and conversion optimization to help your business scale with clarity.
        </motion.p>
      </div>
    </section>

    <section className="py-16 bg-background/50">
      <div className="container grid md:grid-cols-2 gap-6">
        {servicesGroups.map((item, i) => (
          <FadeIn key={item.title} delay={i * 0.08}>
            <div className="section-surface rounded-2xl p-6 h-full flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                <item.icon className="text-secondary" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>

    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <FadeIn>
          <SectionHeading
            label="Service Stack"
            title="Designed for Every Stage of the Funnel"
            description="Choose individual services or combine them into a unified growth program."
          />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.05}>
              <Link to={s.path}>
                <motion.div whileHover={{ y: -6 }} className="group p-7 rounded-2xl bg-card shadow-card hover:shadow-card-hover border border-border/50 transition-all h-full flex flex-col">
                  <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-5 group-hover:bg-secondary/20 transition-colors">
                    <s.icon size={24} className="text-secondary" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4 flex-1">{s.desc}</p>
                  <span className="text-secondary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more <ChevronRight size={14} />
                  </span>
                </motion.div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-hero">
      <div className="container text-center">
        <FadeIn>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary-foreground mb-6">
            Need Help Picking the Right Mix?
          </h2>
          <p className="text-primary-foreground/75 text-lg max-w-2xl mx-auto mb-10">
            We’ll audit your current marketing and recommend a clear service roadmap.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="shadow-button font-heading font-semibold text-base px-10 h-13">
              Get Free Consultation <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
        </FadeIn>
      </div>
    </section>
  </Layout>
);

export default Services;
