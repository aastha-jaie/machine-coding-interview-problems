import React, { useState } from "react";
import './accordion.css';

const config = [
    {
        header:'Accordion 1',
        content: 'Non quia officia. Optio ipsa deserunt. Expedita dolor tenetur. Maiores nemo sapiente. Deserunt non explicabo. Eum quia et. Velit architecto earum. Provident non consectetur. Harum sit consectetur. Est veritatis dolorum. Ipsa blanditiis et. Eum cum eligendi. Qui voluptas consequatur. Officia impedit odio. Provident qui eaque. Consequatur sunt ipsam. Vero modi temporibus. Voluptatum id neque. Saepe optio quia. Ab hic optio.'
    },
    {
        header:'Accordion 2',
        content: 'Non quia officia. Optio ipsa deserunt. Expedita dolor tenetur. Maiores nemo sapiente. Deserunt non explicabo. Eum quia et. Velit architecto earum. Provident non consectetur. Harum sit consectetur. Est veritatis dolorum. Ipsa blanditiis et. Eum cum eligendi. Qui voluptas consequatur. Officia impedit odio. Provident qui eaque. Consequatur sunt ipsam. Vero modi temporibus. Voluptatum id neque. Saepe optio quia. Ab hic optio.'
    },
    {
        header:'Accordion 3',
        content: 'Non quia officia. Optio ipsa deserunt. Expedita dolor tenetur. Maiores nemo sapiente. Deserunt non explicabo. Eum quia et. Velit architecto earum. Provident non consectetur. Harum sit consectetur. Est veritatis dolorum. Ipsa blanditiis et. Eum cum eligendi. Qui voluptas consequatur. Officia impedit odio. Provident qui eaque. Consequatur sunt ipsam. Vero modi temporibus. Voluptatum id neque. Saepe optio quia. Ab hic optio.'
    },
    {
        header:'Accordion 4',
        content: 'Non quia officia. Optio ipsa deserunt. Expedita dolor tenetur. Maiores nemo sapiente. Deserunt non explicabo. Eum quia et. Velit architecto earum. Provident non consectetur. Harum sit consectetur. Est veritatis dolorum. Ipsa blanditiis et. Eum cum eligendi. Qui voluptas consequatur. Officia impedit odio. Provident qui eaque. Consequatur sunt ipsam. Vero modi temporibus. Voluptatum id neque. Saepe optio quia. Ab hic optio.'
    }
]
const AccordionComponent = ()=>{
    const [clickedAccordion, setClickedAccordion] = useState(null)
    
    const handleHeaderClick = (index)=>{
        setClickedAccordion(clickedAccordion === index ? null : index)
    }
    return <div className="component-wrapper">
        {config.map((item,index)=>(
            <div key={index} className="accordionContainer">
                <div className="accordionHeader" onClick={()=>handleHeaderClick(index)}>
                    <div className="headerTitle">{item.header}</div>

                </div>
                {clickedAccordion === index && <div className="accordionContent">{item.content}</div>}
            </div>
        ))}
    </div>
}
export default AccordionComponent;