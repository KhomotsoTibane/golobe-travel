import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  label: string;
  children: React.ReactNode;
}

const FilterCard = ({ label, children }: Props) => {
  return (
    <div className="">
      <Accordion type="single" defaultValue="item-1" collapsible>
        <AccordionItem value="item-1" className="">
          <AccordionTrigger className="small">{label}</AccordionTrigger>
          <AccordionContent className="p-4">{children}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterCard;
