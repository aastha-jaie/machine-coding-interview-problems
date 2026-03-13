import "./App.css";
import Tabs from "./component/Tabs";

const config = [
  {
    id: 1,
    name: "Home",
    content: "Home Panel",
  },
  {
    id: 2,
    name: "Profile",
    content: "Profile Panel",
  },
  {
    id: 3,
    name: "Settings",
    content: "Settings Panel",
  },
];
function App() {
  return (
    <>
      <h2>Tabs Component</h2>
      <Tabs tabs={config} />
    </>
  );
}

export default App;
