import { useId, useState } from "react";

interface AccordionProps {
  accordionData: AccordionDataType[];
}
type AccordionDataType = {
  value: string;
  title: string;
  contents: string;
};

function getAccordionPanelId(accordionId: string | number, value: string) {
  return accordionId + "-panel-" + value;
}
function getAccordionHeaderId(accordionId: string | number, value: string) {
  return accordionId + "-header-" + value;
}
const Accordion: React.FC<AccordionProps> = ({ accordionData }) => {
  const [isExpanded, setIsExpanded] = useState<boolean | undefined>(false);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const handleAccordionTitleClick = (value: string) => {
    const newOpenSections = new Set(openSections);
    newOpenSections.has(value)
      ? newOpenSections.delete(value)
      : newOpenSections.add(value);
    setOpenSections(newOpenSections);
  };

  const accordionId = useId();
  function focusOnSection(index:number){
    document.getElementById(getAccordionHeaderId(accordionId, accordionData[index].value))?.focus()
  }

  const handleKeyEvents = (event: React.KeyboardEvent<HTMLDivElement>)=>{

    const activeItemValue = (
        document.activeElement as HTMLElement
      )?.getAttribute("data-accordion-value");
    
    if(activeItemValue === null){
        return;
    } 
    switch(event.code){
        case "ArrowUp":{
            const index = accordionData.findIndex((item)=> item.value === activeItemValue)
            focusOnSection((index - 1 + accordionData.length) % accordionData.length); 
            break;
        }
        case "ArrowDown":{
            const index = accordionData.findIndex((item)=> item.value === activeItemValue)
            focusOnSection((index + 1) % accordionData.length); 
            break;
        }
        case "Home":{
            focusOnSection(0); 
            break;
        }
        case "End":{
            focusOnSection(accordionData.length - 1); 
            break;
        }
        default:
            break;
    }
  }
  return (
    <div className="accordion">
      {accordionData.map((accordion, idx) => {
        const isExpanded = openSections.has(accordion.value)
        const panelId = getAccordionPanelId(accordionId, accordion.value);
        const headerId = getAccordionHeaderId(accordionId, accordion.value);
        return (
          <div className="accordion-section" key={accordion.value} onKeyDown={(e)=>handleKeyEvents(e)}>
            <button
              aria-controls={panelId}
              aria-expanded={isExpanded}
              id={headerId}
              type="button"
              data-accordion-value={accordion.value}
              className="accordion-title"
              onClick={() => handleAccordionTitleClick(accordion.value)}
            >
              {accordion.title}{" "}
              <span
                aria-hidden={true}
                className={[
                  "accordion-icon",
                  isExpanded && "accordion-icon--rotated",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            </button>
              <div
                className="accordion-desc"
                aria-labelledby={headerId}
                id={panelId}
                role="region"
                hidden={!isExpanded}
              >
                {accordion.contents}
              </div>
            
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
