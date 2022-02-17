import logo from './logo.svg';
import './App.css';
//  { Named Import }

import { Button, Form, Pagination, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';

const axios = require('axios');
const config = require('./config.json')

// Functional COmpoent

function InfiniteScroll2() {
  //1. State/ Hook Variables

  const [student,setStudent] = useState({
    data:[], //JS Array // [{},{}] = Array of Object
    meta:{
      pagination:{
        page: 1,
        pageCount: '',
        pageSize: '',
        total: ''
      }
    } //JS Object
  });//Empty Array

  const [paginationItem,setPaginationItem] = useState([])// Empty Array

  //useEffect hook which call after the page render

  //useEffect is a function which call after the page reload

  useEffect(()=>{
    getStudents();
    let scrollFunction = (e)=>{
      //console.log(window)
      //console.log('Page Y Offset',window.pageYOffset);
      console.log('Scroll Y ',window.scrollY);

      //window.pageYOffset = window.scrollY


      //console.log(window.innerHeight);
      if(window.scrollY >= 40 ){
        console.log('reached Bottom');
        getStudents(parseInt(student.meta.pagination.page) + 1)
      }
    }
    //console.log(window) 
    //document.addEventListener(event, function, useCapture);
    //1. window.addEventListener('scroll',function(){});
    //2. window.addEventListener('scroll',()=>{});
    window.addEventListener('scroll',scrollFunction);
  },[]);


  //2. Functions defination
  

  let handleDelete = (e)=>{
    //function chaining

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
          let po = await axios(); 
       } catch (error) {
          console.log(error)
       }
      } else {
        //swal("Your imaginary file is safe!");
      }
    });
  }

  let getStudents = (pageno=1)=>{// e = event //ES6 Fat arrow functions // default argument
    //console.log(config.base_url);
    //console.log('good morning')
    //Alway wrap the api calling code inside trycatch block
    try {

        fetch(`${config.base_url}/api/friends?pagination[page]=${pageno}&pagination[pageSize]=15`)
        .then((data)=>{
          //let make data json readable
          return data.json();
        }).then((data)=>{
          //console.log(data);

          //Set karne se pahle
          //console.log('before set',student);
          //not set the student data in student hook variable
          setStudent({
            ...student,
            data: student.data.concat(data.data), //reuse + new value //1. Array student.data  //2. data.data
            meta:data.meta //overwrite
          });
          //Set karne ke baad data kya hai
         
        

          //array.map(function(currentValue, index, arr));


        }).catch((err)=>{
          console.log(err);
        });


    } catch (error) {
      //console.log(error)
    }
  }

  
  //3. Return statement JSX
  return (
    <>
        <div className="d-flex justify-content-center">
          <h1>Read Operation With Infinite Scroll</h1>
        
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
                    //console.log(arr[index].id);
                    //console.log(arr[index].attributes.name);
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
           
           
          </React.Fragment>
        }
        
    </>
  );
}

export default InfiniteScroll2;
