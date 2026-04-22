import { cn } from "@/lib/cn";

type Props = {
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
  id?: string;
  titleId?: string;
};

export function SectionHeader({ title, lead, align = "left", className, id, titleId }: Props) {
  return (
    <div
      id={id}
      className={cn(align === "center" && "text-center", className)}
    >
      <h2
        id={titleId}
        className="font-heading text-2xl font-bold tracking-[-0.02em] text-ink-900 sm:text-3xl md:text-[2rem] md:leading-tight"
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "mt-3 max-w-3xl text-base leading-relaxed text-slate-600 sm:mt-4 sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
