import React, { ReactNode, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface AccordionStage {
  title: string;
  content: ReactNode;
}

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

interface AccordionProps {
  stages: AccordionStage[];
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen,
  onClick,
}) => {
  return (
    <div className="border border-gray-200 rounded-md mb-2 overflow-hidden">
      <button
        className={`w-full p-4 text-left flex text-black justify-between items-center ${
          isOpen ? "bg-blue-50" : "bg-white"
        }`}
        onClick={onClick}
      >
        <span className="font-medium">{title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="p-4 bg-white border-t border-gray-200">{children}</div>
      )}
    </div>
  );
};

const Accordion: React.FC<AccordionProps> = ({ stages }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-md mx-auto text-black">
      {stages.map((stage, index) => (
        <AccordionItem
          key={index}
          title={stage.title}
          isOpen={openIndex === index}
          onClick={() => toggleAccordion(index)}
        >
          {stage.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
