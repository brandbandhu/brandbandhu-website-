import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Target, BarChart3, Globe, Megaphone, Search, PenTool, Zap, CheckCircle2, BadgeCheck, LineChart, ShieldCheck } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";

const services = [
  { icon: Search, title: "SEO Services", desc: "Rank higher with technical SEO, content strategy, and authority growth.", path: "/services/seo" },
  { icon: Megaphone, title: "Social Media Marketing", desc: "Build awareness and consistent engagement across priority platforms.", path: "/services/social-media" },
  { icon: Target, title: "Meta Ads", desc: "Performance-focused Facebook and Instagram campaigns for qualified leads.", path: "/services/meta-ads" },
  { icon: BarChart3, title: "Google Ads (PPC)", desc: "High-intent paid search campaigns engineered for measurable ROI.", path: "/services/google-ads" },
  { icon: Globe, title: "Website Development", desc: "Fast, conversion-ready websites aligned with your brand and goals.", path: "/services/web-development" },
  { icon: TrendingUp, title: "Performance Marketing", desc: "Full-funnel optimization to scale predictable revenue growth.", path: "/services" },
  { icon: PenTool, title: "Branding", desc: "Positioning and identity systems that make your business memorable.", path: "/services" },
  { icon: Zap, title: "Content Marketing", desc: "Content that attracts, educates, and converts your target audience.", path: "/services" },
];


const process = [
  { step: "01", title: "Audit & Discovery", desc: "Business analysis, audience mapping, and growth opportunity identification." },
  { step: "02", title: "Marketing Blueprint", desc: "Channel plan, messaging architecture, and KPI targets before execution." },
  { step: "03", title: "Execute & Scale", desc: "Campaign launch with creative, media, and content synchronized." },
  { step: "04", title: "Optimize Weekly", desc: "Data-led improvements with transparent reporting and action priorities." },
];

const Index = () => {
  return (
    <Layout>
      <section className="relative min-h-screen flex items-center bg-hero overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.3s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-5xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-xs font-heading font-semibold uppercase tracking-wider mb-6 border border-secondary/30"
            >
              Performance-Led Digital Marketing Agency
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-heading font-extrabold text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.08] mb-6"
            >
              Turn Your Brand Into a
              <span className="text-gradient"> Revenue Engine</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="text-lg md:text-xl text-primary-foreground/75 max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              From SEO and paid media to social and conversion optimization, we build integrated growth systems that deliver measurable business outcomes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="shadow-button font-heading font-semibold text-base px-8 h-13">
                  Book Growth Audit
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
              <Link to="/case-studies">
                <Button size="lg" variant="outline" className="font-heading font-semibold text-base px-8 h-13 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  View Case Studies
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <div className="glass-panel rounded-xl px-4 py-3 text-sm text-primary-foreground/85">Weekly performance reporting</div>
              <div className="glass-panel rounded-xl px-4 py-3 text-sm text-primary-foreground/85">Dedicated growth strategist</div>
              <div className="glass-panel rounded-xl px-4 py-3 text-sm text-primary-foreground/85">ROI-first campaign execution</div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-background/50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <FadeIn>
              <SectionHeading
                label="What We Do"
                title="Everything Starts With a Marketing Plan"
                description="We do not run random campaigns. We build a strategic roadmap tailored to your business model, audience behavior, and sales goals."
                center={false}
              />
              <div className="space-y-4">
                {[
                  "Define campaign objectives and revenue targets",
                  "Research competitors and market opportunity",
                  "Map audience intent and funnel touchpoints",
                  "Build channel-wise KPI and budget framework",
                  "Execute with weekly optimization loops",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-secondary mt-0.5 shrink-0" />
                    <span className="text-foreground/90">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="section-surface rounded-3xl p-8 md:p-10">
                <h3 className="font-heading font-bold text-2xl text-foreground mb-6">Why Teams Choose BrandBandhu</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <BadgeCheck className="text-secondary mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Execution + Accountability</p>
                      <p className="text-sm text-muted-foreground">We plan, execute, track, and improve with clear ownership every week.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <LineChart className="text-secondary mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Growth Metrics That Matter</p>
                      <p className="text-sm text-muted-foreground">Focus on qualified leads, CAC efficiency, and revenue contribution.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <ShieldCheck className="text-secondary mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Transparent, Long-Term Partnership</p>
                      <p className="text-sm text-muted-foreground">No black-box reporting. You get clarity on every action and outcome.</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <FadeIn>
            <SectionHeading
              label="Our Services"
              title="Full-Stack Digital Growth Services"
              description="A complete service stack to attract, convert, and retain the right customers."
            />
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.05}>
                <Link to={s.path}>
                  <motion.div
                    whileHover={{ y: -7 }}
                    className="group p-6 rounded-2xl bg-card shadow-card hover:shadow-card-hover border border-border/50 transition-all duration-300 h-full"
                  >
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                      <s.icon size={22} className="text-secondary" />
                    </div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{s.desc}</p>
                    <span className="text-secondary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn more <ArrowRight size={14} />
                    </span>
                  </motion.div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-muted/40">
        <div className="container">
          <FadeIn>
            <SectionHeading
              label="Our Process"
              title="A 4-Step System for Predictable Growth"
              description="Simple, accountable, and optimized for momentum."
            />
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <FadeIn key={p.step} delay={i * 0.1}>
                <div className="relative p-6 rounded-2xl bg-card shadow-card border border-border/60 h-full">
                  <span className="font-heading font-extrabold text-5xl text-secondary/15 absolute top-4 right-4">{p.step}</span>
                  <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-heading font-bold text-sm mb-4">
                    {p.step}
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-hero">
        <div className="container text-center">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary-foreground mb-6">
              Ready to Scale with a Clear Plan?
            </h2>
            <p className="text-primary-foreground/75 text-lg max-w-2xl mx-auto mb-10">
              Start with a strategic growth audit and get a practical roadmap tailored to your business.
            </p>
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="shadow-button font-heading font-semibold text-base px-10 h-13">
                Get Free Consultation
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Index;


