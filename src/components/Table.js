import React,{ useMemo } from 'react'

import { useTable } from 'react-table'

import MOCK_DATA from './MOCK_DATA.json';

import { COLUMNS } from './columns';

export default function Table() {
    //1. State/ Hook Variables
    const columns = useMemo(()=>{ COLUMNS  },[]);
    const data = useMemo(()=>{ MOCK_DATA  },[]);

    const tableInstance = useTable({
        columns,
        data
    });


    //destructuring function
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    }=tableInstance
    //2. Function defination


    //3. Return Statement JSX
    return (
        <table {...getTableProps()}>
            <thead>
                {
                    headerGroups.map((headerGroups,index,arr)=>{
                        return (
                            <tr {...headerGroups.getHeaderGroupsProps()}>
                                {
                                    headers.header
                                }
                                <th></th>
                            </tr>
                        )
                    })
                }
                
            </thead>
            <tbody {...getTableBodyProps()}>
                <tr>
                    <td></td>
                </tr>
            </tbody>
        </table>
    )
}
