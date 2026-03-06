import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    title: "Solar Company Generated 400+ Leads in 3 Months",
    client: "SolarMax India",
    problem: "Low online visibility and minimal lead generation from digital channels. The company relied heavily on cold calling.",
    strategy: "Implemented a full-funnel strategy with Google Ads for high-intent keywords, Meta Ads for awareness, and SEO for long-term organic growth.",
    results: ["400+ qualified leads", "65% reduction in CPL", "3x return on ad spend", "Page 1 Google rankings for 15 keywords"],
    tags: ["Google Ads", "Meta Ads", "SEO"],
  },
  {
    title: "E-Commerce Brand Scaled Revenue 5x in 6 Months",
    client: "FashionHive",
    problem: "Stagnant online sales despite heavy spending on social media. Poor conversion rates and high cart abandonment.",
    strategy: "Redesigned the website for conversion, implemented retargeting campaigns, and created a content-driven social media strategy.",
    results: ["5x revenue increase", "40% higher conversion rate", "250% ROI on ad spend", "50K+ social media followers"],
    tags: ["Social Media", "Web Development", "Meta Ads"],
  },
  {
    title: "Real Estate Firm Booked 200+ Site Visits",
    client: "UrbanNest Realty",
    problem: "Difficulty reaching qualified buyers in a competitive real estate market. High cost per lead with poor lead quality.",
    strategy: "Created targeted Meta Ads campaigns with location-based targeting, built landing pages, and implemented a lead nurturing email sequence.",
    results: ["200+ site visits booked", "Cost per lead reduced by 55%", "30% lead-to-visit conversion", "₹2 Cr in attributed sales"],
    tags: ["Meta Ads", "Landing Pages", "Lead Nurture"],
  },
  {
    title: "Healthcare Clinic Grew Patient Bookings by 180%",
    client: "HealthPlus Clinics",
    problem: "Low online presence for a chain of clinics. Patients weren't finding them online despite good offline reputation.",
    strategy: "Local SEO optimization, Google Business Profile management, and targeted Google Ads for medical services.",
    results: ["180% increase in bookings", "Top 3 local pack rankings", "500+ Google reviews", "40% traffic increase"],
    tags: ["Local SEO", "Google Ads", "GMB"],
  },
];

const CaseStudies = () => (
  <Layout>
    <section className="pt-32 pb-20 bg-hero relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" />
      </div>
      <div className="container relative z-10 text-center max-w-4xl mx-auto">
        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs font-heading font-semibold uppercase tracking-wider mb-6 border border-secondary/20">
          Case Studies
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-heading font-extrabold text-4xl md:text-6xl text-primary-foreground leading-tight mb-6">
          Real Results for <span className="text-gradient">Real Businesses</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-primary-foreground/70">
          See how we've helped businesses across industries achieve measurable growth.
        </motion.p>
      </div>
    </section>

    <section className="py-20 md:py-28 bg-background">
      <div className="container max-w-5xl">
        <div className="space-y-8">
          {caseStudies.map((cs, i) => (
            <FadeIn key={cs.title} delay={i * 0.1}>
              <motion.div whileHover={{ y: -4 }} className="p-8 md:p-10 rounded-2xl bg-card shadow-card border border-border/50">
                <div className="flex flex-wrap gap-2 mb-4">
                  {cs.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-heading font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="font-heading font-bold text-2xl text-foreground mb-2">{cs.title}</h2>
                <p className="text-sm text-muted-foreground mb-6">Client: {cs.client}</p>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <h4 className="font-heading font-semibold text-sm text-foreground mb-2">Problem</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cs.problem}</p>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-sm text-foreground mb-2">Strategy</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cs.strategy}</p>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-sm text-foreground mb-2">Results</h4>
                    <ul className="space-y-1">
                      {cs.results.map((r) => (
                        <li key={r} className="flex items-center gap-2 text-sm">
                          <TrendingUp size={14} className="text-secondary shrink-0" />
                          <span className="text-foreground font-medium">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-hero">
      <div className="container text-center">
        <FadeIn>
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary-foreground mb-6">
            Want Similar Results?
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-10">
            Let's discuss how we can create a winning strategy for your business.
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

export default CaseStudies;
