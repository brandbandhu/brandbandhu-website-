import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Target, Eye, Users, Award, Briefcase, Lightbulb } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Button } from "@/components/ui/button";

const team = [
  { name: "Arjun Deshmukh", role: "Founder & CEO", desc: "10+ years in digital marketing & growth strategy." },
  { name: "Sneha Kulkarni", role: "Head of Performance", desc: "Google & Meta certified ads specialist." },
  { name: "Rahul Joshi", role: "SEO Director", desc: "Scaled 100+ businesses to page 1 rankings." },
  { name: "Priya Nair", role: "Creative Lead", desc: "Award-winning designer & brand strategist." },
];

const achievements = [
  { value: 150, suffix: "+", label: "Clients Served" },
  { value: 500, suffix: "+", label: "Campaigns" },
  { value: 50, suffix: "Cr+", label: "Revenue Generated" },
  { value: 15, suffix: "+", label: "Team Members" },
];

const About = () => (
  <Layout>
    {/* Hero */}
    <section className="pt-32 pb-20 bg-hero relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" />
      </div>
      <div className="container relative z-10 text-center max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block px-4 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs font-heading font-semibold uppercase tracking-wider mb-6 border border-secondary/20"
        >
          About Us
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-heading font-extrabold text-4xl md:text-6xl text-primary-foreground leading-tight mb-6"
        >
          We're <span className="text-gradient">BrandBandhu</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-primary-foreground/70 leading-relaxed"
        >
          A premium digital marketing agency born in Pune, driven by data, and obsessed with results.
          We partner with ambitious brands to unlock their full growth potential.
        </motion.p>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="py-20 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn>
            <div className="p-8 rounded-2xl bg-card shadow-card border border-border/50 h-full">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                <Target size={22} className="text-secondary" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower businesses with transparent, data-driven digital marketing that delivers measurable growth. We believe every brand deserves a growth partner, not just a vendor.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="p-8 rounded-2xl bg-card shadow-card border border-border/50 h-full">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                <Eye size={22} className="text-accent-foreground" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-foreground mb-3">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become India's most trusted digital marketing agency, known for innovation, integrity, and exceptional results that transform businesses.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* Founder */}
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-secondary/10 to-accent/10 border border-border/50 flex items-center justify-center">
              <div className="text-center">
                <Lightbulb size={64} className="text-secondary mx-auto mb-4" />
                <p className="font-heading font-semibold text-foreground">Founder's Vision</p>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <SectionHeading label="Founder Story" title="Started With a Mission to Democratize Growth" center={false} />
            <p className="text-muted-foreground leading-relaxed mb-4">
              BrandBandhu was founded by Arjun Deshmukh in 2020 with a simple belief: every business, regardless of size, deserves access to world-class digital marketing.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Starting from a small office in Pune with just 2 team members, BrandBandhu has grown into a 15+ member team serving 150+ clients across India. Our approach combines cutting-edge technology with human creativity to deliver results that matter.
            </p>
            <div className="flex gap-4">
              <div className="p-4 rounded-xl bg-card shadow-card border border-border/50 text-center flex-1">
                <div className="font-heading font-bold text-2xl text-secondary">2020</div>
                <p className="text-xs text-muted-foreground mt-1">Founded</p>
              </div>
              <div className="p-4 rounded-xl bg-card shadow-card border border-border/50 text-center flex-1">
                <div className="font-heading font-bold text-2xl text-secondary">Pune</div>
                <p className="text-xs text-muted-foreground mt-1">Headquarters</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-20 bg-hero">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((a, i) => (
            <FadeIn key={a.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="font-heading font-extrabold text-4xl md:text-5xl text-secondary mb-2">
                  <AnimatedCounter end={a.value} suffix={a.suffix} />
                </div>
                <p className="text-primary-foreground/60 text-sm">{a.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <FadeIn>
          <SectionHeading label="Our Team" title="Meet the Growth Experts" description="A passionate team of marketers, strategists, and creatives dedicated to your success." />
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.05}>
              <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl bg-card shadow-card border border-border/50 text-center">
                <div className="w-20 h-20 rounded-full bg-secondary/10 mx-auto mb-4 flex items-center justify-center">
                  <Users size={28} className="text-secondary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground">{t.name}</h3>
                <p className="text-secondary text-sm font-medium mb-2">{t.role}</p>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-hero">
      <div className="container text-center">
        <FadeIn>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary-foreground mb-6">
            Want to Work With Us?
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-10">
            Let's discuss how we can help your brand grow. Book a free strategy call today.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="shadow-button font-heading font-semibold text-base px-10 h-13">
              Get in Touch <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
        </FadeIn>
      </div>
    </section>
  </Layout>
);

export default About;
