import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users, Target, BarChart3, Globe, Megaphone, Search, PenTool, Zap, Star, CheckCircle2, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Button } from "@/components/ui/button";

const services = [
  { icon: Search, title: "SEO Services", desc: "Dominate search rankings with data-driven SEO strategies.", path: "/services/seo" },
  { icon: Megaphone, title: "Social Media Marketing", desc: "Build engaging communities across all social platforms.", path: "/services/social-media" },
  { icon: Target, title: "Meta Ads", desc: "Precision-targeted Facebook & Instagram ad campaigns.", path: "/services/meta-ads" },
  { icon: BarChart3, title: "Google Ads (PPC)", desc: "High-converting PPC campaigns that maximize ROI.", path: "/services/google-ads" },
  { icon: Globe, title: "Website Development", desc: "Modern, fast websites built for conversion.", path: "/services/web-development" },
  { icon: TrendingUp, title: "Performance Marketing", desc: "Full-funnel performance strategies for rapid growth.", path: "/services" },
  { icon: PenTool, title: "Branding", desc: "Create a memorable brand identity that resonates.", path: "/services" },
  { icon: Zap, title: "Content Marketing", desc: "Strategic content that attracts and converts.", path: "/services" },
];

const stats = [
  { value: 150, suffix: "+", label: "Clients Served" },
  { value: 500, suffix: "+", label: "Campaigns Launched" },
  { value: 10, suffix: "M+", label: "Leads Generated" },
  { value: 98, suffix: "%", label: "Client Retention" },
];

const testimonials = [
  { name: "Rajesh Sharma", role: "CEO, SolarTech India", text: "BrandBandhu transformed our digital presence. We saw a 300% increase in qualified leads within 3 months." },
  { name: "Priya Mehta", role: "Founder, FashionHive", text: "Their social media strategy was game-changing. Our engagement rates tripled and sales followed." },
  { name: "Amit Patel", role: "Director, UrbanNest Realty", text: "The Google Ads campaigns delivered ROI we never thought possible. Truly data-driven approach." },
];

const process = [
  { step: "01", title: "Discovery", desc: "We analyze your business, competitors, and audience deeply." },
  { step: "02", title: "Strategy", desc: "Custom marketing strategy aligned with your growth goals." },
  { step: "03", title: "Execute", desc: "Launch campaigns with precision across chosen channels." },
  { step: "04", title: "Optimize", desc: "Continuously refine with real-time data and insights." },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-hero overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs font-heading font-semibold uppercase tracking-wider mb-6 border border-secondary/20">
                🚀 #1 Digital Marketing Agency
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading font-extrabold text-4xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.1] mb-6"
            >
              Grow Your Brand with{" "}
              <span className="text-gradient">Data-Driven</span>{" "}
              Marketing
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              We help ambitious brands scale with SEO, paid ads, social media, and
              performance marketing. Real results. Real growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="shadow-button font-heading font-semibold text-base px-8 h-13">
                  Get Free Consultation
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="font-heading font-semibold text-base px-8 h-13 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  View Services
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

      </section>

      {/* Trusted By */}
      <section className="py-16 bg-background">
        <div className="container">
          <p className="text-center text-sm font-heading font-semibold uppercase tracking-wider text-muted-foreground mb-8">
            Trusted by 150+ Businesses Across Industries
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-40">
            {["TechCorp", "SolarMax", "UrbanNest", "FashionHive", "HealthPlus", "EduGrowth"].map((name) => (
              <span key={name} className="font-heading font-bold text-xl text-foreground">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <FadeIn>
            <SectionHeading
              label="Our Services"
              title="Everything You Need to Grow Online"
              description="From SEO to paid ads, we offer full-stack digital marketing services tailored to your business goals."
            />
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.05}>
                <Link to={s.path}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="group p-6 rounded-2xl bg-card shadow-card hover:shadow-card-hover border border-border/50 transition-all duration-300 h-full"
                  >
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                      <s.icon size={22} className="text-secondary" />
                    </div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{s.desc}</p>
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

      {/* Stats */}
      <section className="py-20 bg-hero">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="font-heading font-extrabold text-4xl md:text-5xl text-secondary mb-2">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-primary-foreground/60 text-sm font-medium">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <SectionHeading
                label="Why BrandBandhu"
                title="We Don't Just Market. We Grow Brands."
                center={false}
              />
              <div className="space-y-5">
                {[
                  "Data-driven strategies with measurable ROI",
                  "Dedicated account manager for every client",
                  "Transparent reporting & real-time dashboards",
                  "5+ years of industry expertise",
                  "Full-stack digital marketing under one roof",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-secondary mt-0.5 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="relative">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-secondary/10 to-accent/10 border border-border/50 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="font-heading font-extrabold text-6xl md:text-8xl text-gradient mb-4">5+</div>
                    <p className="font-heading font-semibold text-xl text-foreground">Years of Growth</p>
                    <p className="text-muted-foreground mt-2">Helping brands succeed online</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent rounded-2xl flex items-center justify-center animate-float shadow-lg">
                  <Star size={32} className="text-accent-foreground" />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28 bg-muted/50">
        <div className="container">
          <FadeIn>
            <SectionHeading
              label="Our Process"
              title="How We Deliver Results"
              description="A proven 4-step framework that drives consistent, measurable growth for every client."
            />
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <FadeIn key={p.step} delay={i * 0.1}>
                <div className="relative p-6 rounded-2xl bg-card shadow-card border border-border/50">
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

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <FadeIn>
            <SectionHeading
              label="Testimonials"
              title="What Our Clients Say"
              description="Real feedback from real clients who've experienced transformative growth."
            />
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-8 rounded-2xl bg-card shadow-card border border-border/50 h-full flex flex-col"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={16} className="text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed mb-6 flex-1">"{t.text}"</p>
                  <div>
                    <p className="font-heading font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-hero">
        <div className="container text-center">
          <FadeIn>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary-foreground mb-6">
              Ready to Scale Your Brand?
            </h2>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-10">
              Get a free marketing audit and discover how we can help you grow. No commitment, just insights.
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
