import logo from './logo.svg';
import './App.css';
//  { Named Import }

import { Button, Form, Pagination, Table } from 'react-bootstrap';
import React, { useState } from 'react';

const config = require('./config.json')

// Functional COmpoent

function App() {
  //1. State/ Hook Variables

  const [student,setStudent] = useState({
    data:[]
  });//Empty Array

  //2. Functions defination
  let first = (e)=>{
    console.log('First');
    getStudents(1); // Actual Arguemtn
    
  }
  let last = (e)=>{
    console.log('Last');

    if(student.meta.pagination.page !== student.meta.pagination.pageCount){
      getStudents(student.meta.pagination.pageCount);
    }

  }
  let prev = (e)=>{
    console.log('Prev');
    getStudents(student.meta.pagination.page - 1 );

  }
  let next = (e)=>{
    console.log('Next');
    getStudents(student.meta.pagination.page + 1);

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
      <h1>Read Operation</h1>
        <Button onClick={(e)=>{ getStudents() }}>Get My Friends</Button>
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

              {/* <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Ellipsis />
            
              <Pagination.Item>{10}</Pagination.Item>
              <Pagination.Item>{11}</Pagination.Item>
              <Pagination.Item active>{12}</Pagination.Item>
              <Pagination.Item>{13}</Pagination.Item>
              <Pagination.Item disabled>{14}</Pagination.Item>
            
              <Pagination.Ellipsis />
              <Pagination.Item>{20}</Pagination.Item> */}

              <Pagination.Next onClick={(e)=>{ next(e); }} />
              <Pagination.Last onClick={(e)=>{ last(e); }} />
            </Pagination>
          </React.Fragment>
        }
        
    </>
  );
}

export default App;
