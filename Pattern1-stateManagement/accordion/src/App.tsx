import "./App.css";
import Accordion from "./components/Accordion";
import { accordionData } from "./config/sections";

function App() {
  return (
    <>
      <div className="container">
        <h2>Accordion</h2>
        <Accordion accordionData={accordionData} />
      </div>
    </>
  );
}

export default App;
