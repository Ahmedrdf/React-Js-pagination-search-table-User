import React, { useState, useEffect } from "react";

 const Pagination = ({postsPerPage, totalPosts}) => {
    const pageNumbers = [];
    for(let i=1; 1<= Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i);

    }
    return (
        <nav>
            <ul className="pagination" >
                {pageNumbers.map(number =>{
                    <li key={number} className="page-item">
                        <a href="!#" className="page-link">
                        {number}
                        </a>
                    </li>
                })}
            
           </ul>
        </nav>
    )
}
export default Pagination  ;