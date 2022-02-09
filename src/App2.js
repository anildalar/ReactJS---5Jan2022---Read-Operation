import logo from './logo.svg';
import './App.css';
//  { Named Import }

import { Button, Form, Pagination, Table } from 'react-bootstrap';
import React, { useState } from 'react';

const config = require('./config.json')

// Functional COmpoent

function App2() {
  //1. State/ Hook Variables

  const [student,setStudent] = useState({
    data:[]
  });//Empty Array
  const [paginationItem,setPaginationItem] = useState([]);

  //2. Functions defination
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
      getStudents(student.meta.pagination.page - 1); // Actual Arguemtn
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
  let handleGoTo = (e) => {
    //console.log(e.target.innerHTML);
    console.log(e.target);
    var pageno = e.target.innerHTML;
    console.log(pageno);
    getStudents(parseInt(pageno));

    var li = e.target.closest('ul').querySelectorAll('li');
    li.forEach(element => {
      element.classList.remove('active');
    });
    var x = e.target.closest('li').classList;
    x.add('active');
    //x.add('disabled');
   
    
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
          if(student.meta){
            PaginationItem()
          }
          setStudent(data);
          //Set karne ke baad data kya hai


          //array.map(function(currentValue, index, arr));
          //PaginationItem()
          
          
        }).catch((err)=>{
          console.log(err);
        });


    } catch (error) {
      console.log(error)
    }
  }

  function PaginationItem(){
    var rows = [];
    //console.log(student);
    for (var i = 1; i <= student.meta.pagination.pageCount; i++) {
      if(i === student.meta.pagination.page){
        rows.push(<Pagination.Item active key={i} onClick={(e)=>{ handleGoTo(e) }}>{i}</Pagination.Item>);  
      }else{
        rows.push(<Pagination.Item key={i} onClick={(e)=>{ handleGoTo(e) }}>{i}</Pagination.Item>);  
      }

    }
    console.log('rows',rows)
    setPaginationItem(rows);
    
  }

  //3. Return statement JSX
  return (
    <>
        <h1 className="d-flex justify-content-center">Read Operation with Pagination</h1>
        <div className="d-flex justify-content-center">
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
                            <Button variant="danger" size="sm">Delete</Button>
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
                  return currentValue;
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

export default App2;
