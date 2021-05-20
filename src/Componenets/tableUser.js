import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import { Link } from "react-router-dom";
import  Pagination from './pagination';
import { useHistory } from "react-router-dom";
import './table.css'
function UsersList()  {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchuserName, setSearchuserName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [baseImage, setBaseImage] = useState("");

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
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
const history = useHistory();
const updateUser = (id) => {
  console.log(id)
  history.push("/user/"+id)
  // UserService.update(currentUser.id,currentUser)
  //   .then(response => {
  //     console.log(response.data);
  //  //   setMessage("The tutorial was updated successfully!");
  //   })
  //   .catch(e => {
  //     console.log(e);
  //   });
};
const setActiveTutorial = (user, index) => {
  setCurrentUser(user);
  console.log(user);
  setCurrentIndex(index);
};
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



  const deleteUser= (id, e ) => {
    if(window.confirm('Are you sure ? ')){
      console.log("After   : " +users);
        UserService.remove(id)
        .then(responce => {
         const tes = users.filter(item => item.id !== id)
         setUsers(tes);
         console.log("before    : " +tes);
        })
      //   .then(responce => {
      //       console.log(responce.data);
      //       // bech tjiib les parks li9a3dou 
      //      const tableData= this.state.tableData.filter(item => item.id !== id);
      //      console.log(tableData);
      //     //  this.props.history.push("/tablerole");
      //  this.setState({ users });
      
      //   })
    }
  }
  



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
// const uploadImage = async (e) => {
//  // console.log(e.target);
//  var x = e.target;
//  var file = e.target.files[0];
//  const base64 = await convertBase64(file);
//  console.log(base64);
// };

// const convertBase64 = (file) => {
//   return new Promise((resolve, reject)=> {
//     const fileReader = new FileReader();
//     FileReader.readAsDataUrl(file);
//     fileReader.onload = () => {
//       resolve(FileReader.result);
//     }
//     fileReader.onerror((error)=>{
//       reject(error);
//     })
//   } );

// }


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

        <div className="card-body">
              {/*begin: Datatable*/}
              <table className="table"  cellPadding={(0)} cellSpacing={0}>
                <thead>
                  <tr>
                  <th>Nom </th>
                  <th>Id</th>
                   
                 
                    <th>email</th>
                    <th>Image</th>
                    <th>Action</th>
             
                  </tr>
                </thead>
                <tbody>
               {search(users) && search(users).map((row,index) => (
                  
                  <tr        className={
                     (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveTutorial(row, index)}       key={index}>
                
                    <td   key={index} >{row.userName}</td>
                    <td  key={index}>{row.id}</td>
                    <td >{row.email}</td>
                    <td >    <img src={row.image} height="200px" /></td>
                   
               
                   
             
                    <td>
                   
                
                   
                    {/* <Link to="editrole" className="menu-link" > */}
            <a   title="Edit details"  onClick={() => updateUser(row.id) } >
            
           
              <i class="glyphicon glyphicon-refresh"></i>
            </a>
                    {/* </Link> */}
            <a  className="ba" onClick={(e) => deleteUser(row.id, e )}    title="Delete">
            <i   class="glyphicon glyphicon-trash"></i>
            </a>
 
            
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
        < select
      onChange={e => handleAddrTypeChange(e)}
  className="browser-default custom-select" >
          <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
         {/* {
        Add.map((per, key) => <option defalut= "5" value={key}>{per}</option>)
      } */}
    </select >
    
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
                <strong>Email:</strong>
              </label>{" "}
              {currentUser.email}
            </div>
            <div>
              <label>
                <strong>Id:</strong>
              </label>{" "}
              {currentUser.id}
            </div>
            <div>
              <label>
                <strong>Image:</strong>
              </label>{" "}
              <img src={currentUser.image} height="200px" />
            </div>

            <Link
              to={"/user/" + currentUser.id}
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
        <div>
  
    </div>
    {/* <i class="glyphicon glyphicon-home"></i>
<i class="glyphicon glyphicon-search"></i>
<i class="glyphicon glyphicon-cloud"></i>
<i class="glyphicon glyphicon-trash"></i> */}
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
  <input
        type="file"
        onChange={(e) => {
          uploadImage(e);
        }}
      />
      <br></br>
      <img src={baseImage} height="200px" />


    </div>
  );
};

export default UsersList;