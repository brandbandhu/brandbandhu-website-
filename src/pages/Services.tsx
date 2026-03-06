import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Search, Megaphone, Target, BarChart3, Globe, TrendingUp, PenTool, Zap, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";

const services = [
  { icon: Search, title: "SEO Services", desc: "Dominate search rankings with technical SEO, on-page optimization, and link building strategies.", path: "/services/seo", color: "bg-secondary/10" },
  { icon: Megaphone, title: "Social Media Marketing", desc: "Build loyal communities and drive engagement across Instagram, Facebook, LinkedIn, and Twitter.", path: "/services/social-media", color: "bg-secondary/10" },
  { icon: Target, title: "Meta Ads Management", desc: "High-ROI Facebook & Instagram ad campaigns with precision targeting and creative optimization.", path: "/services/meta-ads", color: "bg-secondary/10" },
  { icon: BarChart3, title: "Google Ads (PPC)", desc: "Maximize your ad spend with data-driven search, display, and shopping campaigns.", path: "/services/google-ads", color: "bg-secondary/10" },
  { icon: Globe, title: "Website Development", desc: "Modern, fast, mobile-responsive websites designed for conversion and user experience.", path: "/services/web-development", color: "bg-secondary/10" },
  { icon: TrendingUp, title: "Performance Marketing", desc: "Full-funnel strategies combining paid and organic for maximum growth and ROI.", path: "/services", color: "bg-accent/20" },
  { icon: PenTool, title: "Branding", desc: "Create a powerful brand identity with logo design, guidelines, and visual storytelling.", path: "/services", color: "bg-accent/20" },
  { icon: Zap, title: "Content Marketing", desc: "Strategic content creation that attracts, engages, and converts your target audience.", path: "/services", color: "bg-accent/20" },
];

const Services = () => (
  <Layout>
    <section className="pt-32 pb-20 bg-hero relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" />
      </div>
      <div className="container relative z-10 text-center max-w-4xl mx-auto">
        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs font-heading font-semibold uppercase tracking-wider mb-6 border border-secondary/20">
          Our Services
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-heading font-extrabold text-4xl md:text-6xl text-primary-foreground leading-tight mb-6">
          Full-Stack <span className="text-gradient">Digital Marketing</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-primary-foreground/70 leading-relaxed">
          Everything your brand needs to dominate online. From strategy to execution, we've got you covered.
        </motion.p>
      </div>
    </section>

    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.05}>
              <Link to={s.path}>
                <motion.div whileHover={{ y: -6 }} className="group p-8 rounded-2xl bg-card shadow-card hover:shadow-card-hover border border-border/50 transition-all h-full flex flex-col">
                  <div className={`w-14 h-14 rounded-xl ${s.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <s.icon size={26} className="text-secondary" />
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
            Not Sure Which Service You Need?
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-10">
            Book a free strategy call and we'll create a custom marketing plan for your business.
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
