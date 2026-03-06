import { ReactNode } from "react";

interface Props {
  label: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  center?: boolean;
}

const SectionHeading = ({ label, title, description, children, className = "", center = true }: Props) => (
  <div className={`mb-12 md:mb-16 ${center ? "text-center max-w-3xl mx-auto" : ""} ${className}`}>
    <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs font-heading font-semibold uppercase tracking-wider mb-4 shadow-sm">
      {label}
    </span>
    <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-4">
      {title}
    </h2>
    {description && (
      <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
    )}
    {children}
  </div>
);

export default SectionHeading;
