import React, { createContext, useContext, useState } from 'react';
import { cn } from "@/lib/utils";

export const Card = ({ className, ...props }) => (
  <div className={cn("rounded-[2rem] border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow", className)} {...props} />
);

export const CardHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 p-8", className)} {...props} />
);

export const CardTitle = ({ className, ...props }) => (
  <h3 className={cn("text-xl font-bold leading-tight tracking-tight text-foreground", className)} {...props} />
);

export const CardContent = ({ className, ...props }) => (
  <div className={cn("p-8 pt-0", className)} {...props} />
);

export const Badge = ({ className, variant = "default", ...props }) => {
  const variants = {
    default: "bg-primary text-primary-foreground border-transparent",
    secondary: "bg-secondary text-secondary-foreground border-transparent",
    outline: "text-foreground border-border",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
  };
  return (
    <div className={cn("inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors", variants[variant], className)} {...props} />
  );
};

export const Separator = ({ className, orientation = "horizontal", ...props }) => (
  <div
    role="separator"
    className={cn(
      "shrink-0 bg-border/50",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    {...props}
  />
);

export const Table = ({ className, ...props }) => (
  <div className="relative w-full overflow-auto px-4">
    <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
  </div>
);

export const TableHeader = ({ className, ...props }) => (
  <thead className={cn("[&_tr]:border-b-0", className)} {...props} />
);

export const TableBody = ({ className, ...props }) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
);

export const TableRow = ({ className, ...props }) => (
  <tr className={cn("border-b border-border/30 transition-colors hover:bg-muted/30 data-[state=selected]:bg-muted/50", className)} {...props} />
);

export const TableHead = ({ className, ...props }) => (
  <th className={cn("h-14 px-4 text-left align-middle font-bold text-muted-foreground uppercase tracking-widest text-[10px] [&:has([role=checkbox])]:pr-0", className)} {...props} />
);

export const TableCell = ({ className, ...props }) => (
  <td className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props} />
);

const TabsContext = createContext();

export const Tabs = ({ className, defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("w-full", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ className, children }) => (
  <div className={cn("inline-flex h-12 items-center justify-center rounded-full bg-muted p-1 text-muted-foreground", className)}>
    {children}
  </div>
);

export const TabsTrigger = ({ className, value, children }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-widest",
        activeTab === value ? "bg-background text-primary shadow-sm" : "hover:text-foreground/70",
        className
      )}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ className, value, children }) => {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== value) return null;
  return (
    <div className={cn("mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 animate-in fade-in slide-in-from-bottom-2", className)}>
      {children}
    </div>
  );
};

export const Progress = ({ value, className, ...props }) => (
  <div className={cn("relative h-2 w-full overflow-hidden rounded-full bg-muted", className)} {...props}>
    <div
      className="h-full w-full flex-1 bg-primary transition-all duration-500 ease-in-out"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </div>
);
