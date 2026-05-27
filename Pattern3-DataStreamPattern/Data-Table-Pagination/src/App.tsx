import './App.css'
import DataTable from './components/DataTable'
import users from './config/users.json';

const headers = [
  {  key: "id", label: "ID",},
  {  key: "name", label: "Name", },
  { key: "age", label: "Age" },
  {  key: "occupation", label: "Occupation"}
];
function App() {

  return (
    <div className='data-table'>
    <h2>Data Table</h2>
      <DataTable data = {users} headers={headers}/>
    </div>
  )
}

export default App
