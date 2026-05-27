import { useState } from "react"
import Users from '../config/users.json';
import sortingIcon from '../assets/descendant.png'

type DataTableItemType = {
        name: string,
        age: number,
        occupation: string
}
type HeaderType = {
    key: string,
    label: string,
}
type DataTablePropsType = {
    data: DataTableItemType[],
    headers: HeaderType[]
}
type User = (typeof Users)[number]

type SortDirection = 'asc' | 'desc';
type SortField = 'id' | 'name' | 'age' | 'occupation'

function sortUsers(users:Array<User>, field: SortField | null, direction: SortDirection){
    const usersClone = users.slice();
    switch(field){
        case 'id':
        case 'age':{
            return usersClone.sort((a,b) => direction === 'asc' ? a[field] - b[field] : b[field] - a[field]);
        }
        case 'name':
        case 'occupation':{
            return usersClone.sort((a,b) => direction === 'asc' ? a[field].localeCompare(b[field]) : b[field].localeCompare(a[field]));
        }
        default:{
            return usersClone;
        }
    }
}
function paginatedUsers(users: Array<User>, page: number, pageSize: number){
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const pageUsers = users.slice(start, end);
    const totalPages = Math.ceil(users.length/pageSize);


    return {totalPages, pageUsers};
}
function DataTable({data, headers} : DataTablePropsType) {
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(5);

    const [sortField, setSortField] = useState<SortField | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection | null>(null);

   const sortedUsers = sortUsers(data,sortField, sortDirection )

   const {totalPages, pageUsers } = paginatedUsers(sortedUsers, currentPage, itemsPerPage)
 
  return (
    <div className="table-container">
      <table>
        <thead>
            <tr>
                {headers.map(({label, key})=><th 
                    onClick={()=>{
                        if(sortField !== key){
                            setSortField(key);
                            setSortDirection('asc')
                        }
                        else{
                            setSortDirection(sortDirection === 'asc' ? 'desc':'asc')
                        }
                    }}
                >{label} <img src = {sortingIcon}/></th>)}
            </tr>
        </thead>
        <tbody>
            {pageUsers.map(({id, name, age, occupation})=>(
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{age}</td>
                    <td>{occupation}</td>
                </tr>
            ))}
        </tbody>

      </table>
      <div className="pagination">
        <select onChange={(e)=>{
            setItemsPerPage(Number(e.target.value))
            setCurrentPage(1);
        }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
        </select>
        <button onClick={()=>{
            setCurrentPage(page=>page - 1)
        }} disabled = {currentPage <= 1}>Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button  onClick={() =>
            setCurrentPage((page) => page + 1)
          }
          disabled={currentPage >= totalPages}>
            Next
        </button>
      </div>
    </div>
  )
}

export default DataTable
