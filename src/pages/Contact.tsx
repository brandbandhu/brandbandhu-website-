import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91-9876543210", href: "tel:+919876543210" },
  { icon: Mail, label: "Email", value: "hello@brandbandhu.com", href: "mailto:hello@brandbandhu.com" },
  { icon: MapPin, label: "Address", value: "Pune, Maharashtra, India", href: "#" },
  { icon: Clock, label: "Business Hours", value: "Mon-Sat: 10 AM - 7 PM", href: "#" },
];

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
    }, 1000);
  };

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" />
        </div>
        <div className="container relative z-10 text-center max-w-4xl mx-auto">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-1.5 rounded-full bg-secondary/15 text-secondary text-xs font-heading font-semibold uppercase tracking-wider mb-6 border border-secondary/20">
            Contact Us
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-heading font-extrabold text-4xl md:text-6xl text-primary-foreground leading-tight mb-6">
            Let's <span className="text-gradient">Grow Together</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-primary-foreground/70">
            Book a free strategy call or drop us a message. We respond within 24 hours.
          </motion.p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <FadeIn>
                <div className="p-8 md:p-10 rounded-2xl bg-card shadow-card border border-border/50">
                  <h2 className="font-heading font-bold text-2xl text-foreground mb-2">Get Free Consultation</h2>
                  <p className="text-muted-foreground mb-8">Fill out the form and our team will get back to you within 24 hours.</p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                        <Input placeholder="John Doe" required />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                        <Input type="email" placeholder="john@example.com" required />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                        <Input placeholder="+91-XXXXXXXXXX" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1.5 block">Service Needed</label>
                        <Input placeholder="e.g., SEO, Meta Ads" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                      <Textarea placeholder="Tell us about your project and goals..." rows={5} required />
                    </div>
                    <Button type="submit" variant="secondary" size="lg" className="w-full shadow-button font-heading font-semibold" disabled={loading}>
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </div>
              </FadeIn>
            </div>

            {/* Info */}
            <div className="lg:col-span-2">
              <FadeIn delay={0.1}>
                <div className="space-y-6">
                  {contactInfo.map((c) => (
                    <a key={c.label} href={c.href} className="flex items-start gap-4 p-5 rounded-xl bg-card shadow-card border border-border/50 hover:shadow-card-hover transition-shadow">
                      <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                        <c.icon size={20} className="text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{c.label}</p>
                        <p className="font-medium text-foreground">{c.value}</p>
                      </div>
                    </a>
                  ))}

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-5 rounded-xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors"
                  >
                    <MessageCircle size={24} className="text-green-600" />
                    <div>
                      <p className="font-heading font-semibold text-green-800">Chat on WhatsApp</p>
                      <p className="text-sm text-green-600">Quick response guaranteed</p>
                    </div>
                  </a>
                </div>
              </FadeIn>

              {/* Map */}
              <FadeIn delay={0.2}>
                <div className="mt-6 rounded-xl overflow-hidden border border-border/50 shadow-card">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242117.68079515!2d73.72287839726562!3d18.524600000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1690000000000"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="BrandBandhu Location"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
