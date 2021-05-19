import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import { Link } from "react-router-dom";
import  Pagination from './pagination'
import './table.css'
function UsersList()  {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchuserName, setSearchuserName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  // const Add = postsPerPage.map(Add => Add
  //   )
   // const handleAddrTypeChange = (e) => console.log((postsPerPage[e.target.value]))
  const  handleAddrTypeChange = (event) => {
    setPostsPerPage(Number(event.target.value));

   }

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxpageNumberLimit, setmaxpageNumberLimit] = useState(5);
  const [minpageNumberLimit, setminpageNumberLimit] = useState(0);



  const [q, setQ] = useState("");
  const handilClick = (event) => {
    setCurrentPage(Number(event.target.id));
  }
  useEffect(() => {
    retrieveUsers();
  }, []);

  const onChangeSearchuserName = e => {
    const searchuserName = e.target.value;
    setSearchuserName(searchuserName);
  };

  const retrieveUsers = () => {
    UserService .getAll()
      .then(response => {
        setUsers(response.data);
        console.log(response.data);
       
   
        console.log(users);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const pageNumbers = [];
  for(let i=1; i<= Math.ceil(users.length / postsPerPage); i++){
    pageNumbers.push(i);

}
const renderPagesNumbers = pageNumbers.map((number) => {

if(number < maxpageNumberLimit + 1 && number >  minpageNumberLimit  )
{
  return(
<li key = {number} id={number} onClick={handilClick}

className ={currentPage == number ? "active" : null}
>


  {number}
</li>
  );
}

else {
  return null;
}

}
)


  const refreshList = () => {
    retrieveUsers();
    setCurrentUser(null);
    setCurrentIndex(-1);
  };

  const setActiveUser = (user, index) => {
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  const removeAllUsers = () => {
    UserService .removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByuserName = () => {
    UserService .findByuserName(searchuserName)
      .then(response => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
// Get Index Posts 
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

const handleNextbtn = () => {
setCurrentPage(currentPage + 1)
if( currentPage + 1 > maxpageNumberLimit){
  setmaxpageNumberLimit(maxpageNumberLimit + pageNumberLimit);
  setminpageNumberLimit(minpageNumberLimit + pageNumberLimit);
}
};
const handlePrevtbtn = () => {
  setCurrentPage(currentPage - 1 )
  if( (currentPage - 1 ) %  pageNumberLimit == 0){
    setmaxpageNumberLimit(maxpageNumberLimit - pageNumberLimit);
    setminpageNumberLimit(minpageNumberLimit - pageNumberLimit);
  }
  }
let pageIncrementBtn = null ; 
if(users.length > maxpageNumberLimit){
  pageIncrementBtn = <li onClick = {handleNextbtn}>&hellip;</li>
}
let pageDecrementBtn = null ; 
if(users.length > maxpageNumberLimit){
  pageDecrementBtn = <li onClick = {handleNextbtn}>&hellip;</li>
}

  function search(rows){
  //  const columns = rows[0] && Object.keys(rows[0]);
     // return rows.filter((row)=>
      // columns.some(
         
    //    (column) => row[column].toString().toLowerCase().indexOf(q) > -1)
        
         
     /******** it work very well but it exit an other way (by ke) */
     return currentPosts.filter(
       row => row.userName.toLowerCase().indexOf(q) > -1  ||
        row.email.toLowerCase().indexOf(q) > -1 
        );
  }
  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
         <input type="text" value={q} onChange={(e) => setQ(e.target.value)} /> 
        </div>
      </div>
      <div className="col-md-6">
        <h4>Users List</h4>
{/* 
        <ul className="list-group">
          { search(users)&&
            search(users).map((user, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveUser(user, index)}
                key={index}
              >
                {user.userName}
            
              </li>
              
            ))}
        </ul> */}
        <div className="card-body">
              {/*begin: Datatable*/}
              <table className="table"  cellPadding={(0)} cellSpacing={0}>
                <thead>
                  <tr>
                  <th>Nom </th>
                  <th>Id</th>
                   
                 
                    <th>email</th>
             
                  </tr>
                </thead>
                <tbody>
               { search(users).map((row) => (
                  
                  <tr key={row}>
                  {search(users).map} 
                    <td>{row.userName}</td>
                    <td>{row.id}</td>
                    <td>{row.email}</td>
                   
               
                   
             
                    <td>
                   
                    <div>
                   
                    {/* <Link to="editrole" className="menu-link" > */}
            <a  className="btn btn-sm btn-clean btn-icon "title="Edit details">
              <i className="la la-edit"  onClick={() => this.Update(row.id) } />
            </a>
                    {/* </Link> */}
            <a href="javascript:;" className="btn btn-sm btn-clean btn-icon  "  onClick={(e) => this.delete(row.id, e )}    title="Delete">
              <i className="la la-trash text-danger" />
            </a>
          </div>
      
      </td>
                  
                  </tr>
                    )) }
                  {/* X */}
               
                </tbody>
                
  <ul className="pagesNumbers">
    <li>
    <button onClick={handlePrevtbtn}> Prev</button>

    </li>
    {pageIncrementBtn}
  {renderPagesNumbers }
  {pageDecrementBtn}
    
    
  <li>  <button onClick={handleNextbtn}>Next</button></li>
  </ul> 
   </table>   
                    
    </div>
    
                   
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllUsers}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentUser ? (
          <div>
            <h4>User</h4>
            <div>
              <label>
                <strong>userName:</strong>
              </label>{" "}
              {currentUser.userName}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentUser.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentUser.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/users/" + currentUser.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a User...</p>
          </div>
        )}
      </div>
      {/* { renderPagesNumbers} */}
      {/* <nav>
            <ul className="pagination" >
                {pageNumbers.map(number =>{
                    <li key={number} className="page-item">
                        <a href="!#" className="page-link">
                        {number}
                        </a>
                    </li>
                })}
            
           </ul>
        </nav> */}
           {/* <select>
     
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
    </select> */}
    < select
      onChange={e => handleAddrTypeChange(e)}
  className="browser-default custom-select" >
          <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
         {/* {
        Add.map((per, key) => <option defalut= "5" value={key}>{per}</option>)
      } */}
    </select >)


    </div>
  );
};

export default UsersList;