import './App.css';
import { Button, Form, Pagination, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import URL from './Helper';

const axios = require('axios');
const config = require('./config.json')


// Functional COmpoent

function LoadMore() {
    //1. State/ Hook Variables

    const [student,setStudent] = useState({
                                            data:[],
                                            meta: {
                                                pagination:{
                                                    
                                                }
                                            }
                                          });//Empty Array
    const [isLoading, setLoading] = useState(false);
    const [isDone, setDone] = useState(false);

    useEffect(() => {
        //console.log('current Value of student is ',student);
        if (isLoading) {
            if(student.meta.pagination.page === student.meta.pagination.pageCount){
                setDone(true);
            }
            if(student.meta.pagination.page !== student.meta.pagination.pageCount){
                simulateNetworkRequest().then((data) => {
                    console.log(data.data)
                    setLoading(false);
                }).catch((error) => {
                    console.log('error',error);
                });
            }
        }
        
    }, [isLoading,isDone]);

    //2. Functions defination
    let handleDelete = (e)=>{
        var tr = e.target.closest('tr');
        //function chaining
        //console.log(e.target.closest('tr').remove());  

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then( async (willDelete) => {
            if (willDelete) {
                console.log(e.target.closest('tr').querySelector('td:first-child').innerHTML); //e is a event object
                var delid = parseInt(e.target.closest('tr').querySelector('td:first-child').innerHTML);
                console.log(delid);
                //API Call
                try {
                    let po = await axios.delete(`${URL}/api/friends/${delid}`); 
                    if(po.status === 200){
                        tr.remove();
                        swal("Good job!", "Record Deleted Successfully", "success");
                    }
                } catch (error) {
                        console.log(error)
                }
            } else {
                //swal("Your imaginary file is safe!");
            }
        });
    }

    let getStudents = (pageno=1) =>{// e = event //ES6 Fat arrow functions // default argument
        console.log();
        console.log('good morning')
        //Alway wrap the api calling code inside trycatch block
        try {
            //Call the api
            // Fetch API
            //AXIOS

            //What is the api
            //Fetch API with Promise Chain
            fetch(`${URL}/api/friends?pagination[page]=${pageno}&pagination[pageSize]=10`)
            .then((data)=>{
                //let make data json readable
                return data.json();
            }).then((data)=>{
                //console.log('current Value of student is 1',student);
                setStudent({
                            ...student,
                            data:student.data.concat(data.data),
                            meta:data.meta
                        });
                
            }).catch((err)=>{
                console.log(err);
            });

            //console.log('current Value of student is 3',student);
        } catch (error) {
            console.log(error)
        }
    }

    let simulateNetworkRequest= ()=>{
        return new Promise((resolve,reject) => {
            try {
                getStudents(student.meta.pagination.page + 1);
                resolve('Success');
            } catch (error) {
                reject('Error');
            } 
            
        });
    }
  
    const handleClick = () => setLoading(true);

    //3. Return statement JSX
    return (
        <>
            <div className="text-center">
                <h1>Read Operation Using Load More<br /></h1>
                <Button onClick={(e)=>{ getStudents() }}>Get My Friends</Button>
            </div>
            
            <br />
            <br />
            {
                student.data.length > 0 &&
                <React.Fragment>
                    {console.log('current Value of student is 2',student)}
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
                                    //console.log('currentValue',currentValue)
                                //console.log(arr[index].id);
                                //console.log(arr[index].attributes.name);
                                    return (
                                        <tr key={index}>
                                            <td>{currentValue.id}</td>
                                            <td>{currentValue.attributes.name}</td>
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
                    <div className="d-flex justify-content-center">
                        { 
                            !isDone &&
                            <Button
                                variant="primary"
                                disabled={isLoading}
                                onClick={!isLoading ? handleClick : null}
                                >
                                {isLoading ? 'Loading…' : 'Load More'}
                            </Button>
                        }
                        
                    </div>
                </React.Fragment>
            }
            
        </>
    );
}

export default LoadMore;
