import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const AddEmployeeComponent = (props) => {

    const [employeeName, setEmployeeName] = useState('');
    const [employeeDOB, setEmployeeDOB] = useState('');
    const [employeeDesignation, setEmployeeDesignation] = useState('');
    const [employeeSalary, setEmployeeSalary] = useState('');
    const history = useHistory();
    const { id } = useParams();

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        const employee = { employeeName, employeeDOB, employeeDesignation, employeeSalary }

        if (id) {
            EmployeeService.updateEmployee(id, employee).then((response) => {
                history.push('/employees')
            }).catch(error => {
                console.log(error)
            })

        } else {
            EmployeeService.createEmployee(employee).then((response) => {
                history.push('/employees');
            }).catch(error => {
                console.log(error)
            })
        }

    }
    const handleCancel = () => {
        history.push('/employees');
    }

    useEffect(() => {
        if (id) {
            EmployeeService.getEmployeeById(id).then((response) => {
                setEmployeeName(response.data.employeeName)
                setEmployeeDOB(response.data.employeeDOB)
                setEmployeeDesignation(response.data.employeeDesignation)
                setEmployeeSalary(response.data.employeeSalary)
            }).catch(error => {
                console.log(error)
            })
        }
    }, [])

    const title = () => {

        if (id) {
            return <h2 className="text-center">Update Employee</h2>
        } else {
            return <h2 className="text-center">Add Employee</h2>
        }
    }

    return (
        <div>
                {
                    title()
                }
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >         <form>
                        <TextField name="employeeName" id="employeeName" label="Employee Name"
                            value={employeeName}
                            onChange={(e) => setEmployeeName(e.target.value)}
                            variant="standard" /><br />
                        <TextField name="employeeDOB" id="employeeDOB" label="Date Of Birth"
                            value={employeeDOB}
                            onChange={(e) => setEmployeeDOB(e.target.value)}
                            variant="standard" /><br />
                        <TextField name="employeeDesignation" id="employeeDesignation" label="Employee Designation"
                            value={employeeDesignation}
                            onChange={(e) => setEmployeeDesignation(e.target.value)}
                            variant="standard" /><br />
                        <TextField name="employeeSalary" id="employeeSalary" label="Employee Salary"
                            value={employeeSalary}
                            onChange={(e) => setEmployeeSalary(e.target.value)}
                            variant="standard" /><br />
                    </form>
                </Box>
                <br />  
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={(e) => saveOrUpdateEmployee(e)}>Submit</Button>
                    <Button variant="contained" color="error"
                        onClick={(e) => handleCancel(e)} >cancel</Button>
                </Stack>
        </div>
    )
}

export default AddEmployeeComponent
