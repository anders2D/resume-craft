interface FormattedTextProps {
  text: string;
  className?: string;
}

export const FormattedText = ({ text, className = "" }: FormattedTextProps) => {
  const renderText = (content: string) => {
    if (!content) return '';
    const parts = content.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return <strong key={index} className="font-semibold">{boldText}</strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return <span className={className}>{renderText(text)}</span>;
};
