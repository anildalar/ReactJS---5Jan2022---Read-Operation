import logo from './logo.svg';
import './App.css';
//  { Named Import }

import { Button, Form, Pagination, Table } from 'react-bootstrap';
import React, { useState } from 'react';
import swal from 'sweetalert';
import URL from './Helper';

const axios = require('axios');
const config = require('./config.json')

// Functional COmpoent

function App() {
  //1. State/ Hook Variables

  const [student,setStudent] = useState({
    data:[]
  });//Empty Array

  const [paginationItem,setPaginationItem] = useState([])// Empty Array

  //2. Functions defination
  let handleDelete = (e)=>{
    //function chaining
    //var keywork has a global scope
    var tr = e.target.closest('tr');
    console.log(e.target.closest('tr').querySelector('td:first-child').innerHTML); //e is a event object
    var delid = parseInt(e.target.closest('tr').querySelector('td:first-child').innerHTML);
    console.log(delid);

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then( async (willDelete) => {
      if (willDelete) {

       //API Call
       try {
          let po = await axios.delete(`${URL}/api/friends/${delid}`); 
          tr.remove();
          swal("Good job!", "You friend is deleted successfully!", "success");
       } catch (error) {
          console.log(error)
       }
      } else {
        //swal("Your imaginary file is safe!");
      }
    });
  }

  let goToPage = (e)=>{
    console.log(e.target.innerHTML);
    var pageno = parseInt(e.target.innerHTML);
    getStudents(pageno);
  }

  let first = (e)=>{
    console.log('First');
    if(student.meta.pagination.page !== 1){
      getStudents(1); // Actual Arguemtn
    }
    
    
  }

  let last = (e)=>{
    console.log('Last');

    if(student.meta.pagination.page !== student.meta.pagination.pageCount){
      getStudents(student.meta.pagination.pageCount);
    }

  }

  let prev = (e)=>{
    console.log('Prev');
    if(student.meta.pagination.page !== 1){
      getStudents(student.meta.pagination.page - 1 );
    }
    

  }

  let next = (e)=>{
    console.log('Next');
    if(student.meta.pagination.page !== student.meta.pagination.pageCount){
      getStudents(student.meta.pagination.page + 1);
    }
    

  }

  let getStudents2 = (e)=>{
    console.log(student);

  }

  let getStudents = (pageno=1)=>{// e = event //ES6 Fat arrow functions // default argument
    console.log(config.base_url);
    console.log('good morning')
    //Alway wrap the api calling code inside trycatch block
    try {
        //Call the api
        // Fetch API
        //AXIOS

        //What is the api
        //Fetch API with Promise Chain
        fetch(`${config.base_url}/api/friends?pagination[page]=${pageno}&pagination[pageSize]=10`)
        .then((data)=>{
          //let make data json readable
          return data.json();
        }).then((data)=>{
          console.log(data);

          //Set karne se pahle
          //console.log('before set',student);
          //not set the student data in student hook variable
          setStudent(data);
          //Set karne ke baad data kya hai

          var start = data.meta.pagination.page
          var arr = []; //empty array;
          for (let i = 1; i <= data.meta.pagination.pageCount; i++) {
            if(i == start){
              arr.push(<Pagination.Item active onClick={(e)=>{ goToPage(e) }}>{i}</Pagination.Item>); 
            }else{
              arr.push(<Pagination.Item onClick={(e)=>{ goToPage(e) }}>{i}</Pagination.Item>);
            }
            
          }

          setPaginationItem(arr)

          //array.map(function(currentValue, index, arr));


        }).catch((err)=>{
          console.log(err);
        });


    } catch (error) {
      console.log(error)
    }
  }

  //3. Return statement JSX
  return (
    <>
        <div className="d-flex justify-content-center">
          <h1>Read Operation</h1>
          <Button onClick={(e)=>{ getStudents() }}>Get My Friends</Button>
        </div>
        
        <br />
        <br />
        {
          student.data.length > 0 &&
          <React.Fragment>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Friend Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  student.data.map(function(currentValue, index, arr){
                    console.log(arr[index].id);
                    console.log(arr[index].attributes.name);
                    return (
                        <tr key={index}>
                          <td>{arr[index].id}</td>
                          <td>{arr[index].attributes.name}</td>
                          <td>
                            <Button variant="success" size="sm">View</Button>&nbsp;
                            <Button variant="primary" size="sm">Edit</Button>&nbsp;
                            <Button variant="danger" onClick={(e)=>{ handleDelete(e) }} size="sm">Delete</Button>
                          </td>
                        </tr>
                    )//JSX
                  })
                }
                

              </tbody>
            </Table>
            <Pagination className="d-flex justify-content-center">
              <Pagination.First onClick={(e)=>{ first(e); }} />
              <Pagination.Prev onClick={(e)=>{ prev(e); }} />

              {
              
                paginationItem.map(function(currentValue, index, arr){
                    return currentValue//JSX
                })
              }
              

              <Pagination.Next onClick={(e)=>{ next(e); }} />
              <Pagination.Last onClick={(e)=>{ last(e); }} />
            </Pagination>
          </React.Fragment>
        }
        
    </>
  );
}

export default App;
