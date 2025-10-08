import { Card } from "@/components/ui/card";

interface QuickCardProps {
  title: string;
  value: string | number;
}

export const QuickCard = ({ title, value }: QuickCardProps) => {
  return (
    <Card className="flex flex-col p-4 animate-in animate-delay-200">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <div className="mt-1">
        <span className="text-2xl font-display font-semibold">
          {typeof value === "number" ? value.toLocaleString("id-ID") : value}
        </span>
      </div>
    </Card>
  );
};