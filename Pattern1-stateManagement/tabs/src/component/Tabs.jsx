import React, { useState } from "react";

const Tabs = (props) => {
  const { tabs } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index) => {
    setActiveIndex(index);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      setActiveIndex((prev) => (prev + 1) % tabs.length);
    }
    if (e.key === "ArrowLeft") {
      setActiveIndex((prev) => (prev - 1 + tabs.length) % tabs.length);
    }
  };
  return (
    <div className="tabs_component">
      <div className="tab_headers">
        {tabs.map((tab, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              role="tab"
              aria-selected={activeIndex === index}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              className={`tab_btn ${isActive ? "active" : ""}`}
              onClick={() => handleTabClick(index)}
              onKeyDown={() => handleKeyDown()}
            >
              {tab.name}
            </button>
          );
        })}
      </div>

      <div
        className="tabs-panel"
        id={`panel-${tabs[activeIndex].id}`}
        role="tabPanel"
        aria-labelledby={`tab-${tabs[activeIndex].id}`}
      >
        {tabs[activeIndex].content}
      </div>
    </div>
  );
};

export default Tabs;
