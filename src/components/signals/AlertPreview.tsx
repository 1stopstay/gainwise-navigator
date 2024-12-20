interface AlertPreviewProps {
  symbol: string;
  selectedTrends: string[];
  value?: string;
}

export const AlertPreview = ({ symbol, selectedTrends, value }: AlertPreviewProps) => {
  if (!symbol || selectedTrends.length === 0) return null;
  
  const trendDescriptions = selectedTrends.map(trend => {
    const direction = trend.includes("UP") || trend === "BULLISH" ? "goes up" : "goes down";
    return `${symbol.toUpperCase()} ${direction}${value ? ` past ${value}` : ''}`;
  });
  
  return (
    <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
      <h3 className="font-medium mb-2">Preview</h3>
      <p className="text-sm text-gray-400">{`We'll notify you when ${trendDescriptions.join(" or ")}`}</p>
    </div>
  );
};