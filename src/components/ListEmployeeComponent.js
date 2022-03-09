import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService'
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])

    useEffect(() => {

        getAllEmployees();
    }, [])

    const getAllEmployees = () => {
        EmployeeService.getAllEmployees().then((response) => {
            setEmployees(response.data.employees)
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteEmployee = (employeeId) => {
        EmployeeService.deleteEmployee(employeeId).then((response) => {
            getAllEmployees();

        }).catch(error => {
            console.log(error);
        })

    }

    return (
        <div className="container">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Employee DOB</TableCell>
                            <TableCell align="left">Employee Name</TableCell>
                            <TableCell align="left">Employee Designation</TableCell>
                            <TableCell align="left">Employee Salary</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            employees.map(
                                employee => (
                                    <TableRow
                                        key={employee.employeeName + employee.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell  align="left"component="th" scope="row">
                                            {employee.employeeName}
                                        </TableCell>
                                        <TableCell align="left">{employee.employeeDOB}</TableCell>
                                        <TableCell align="left">{employee.employeeDesignation}</TableCell>
                                        <TableCell align="left">{employee.employeeSalary}</TableCell>
                                        <TableCell align="center">
                                            <Link to={`/edit-employee/${employee.id}`} >
                                                <BsPencilSquare></BsPencilSquare>
                                            </Link>

                                            <BsFillTrashFill onClick={() => deleteEmployee(employee.id)} > </BsFillTrashFill>
                                        </TableCell>
                                    </TableRow>
                                ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ListEmployeeComponent
