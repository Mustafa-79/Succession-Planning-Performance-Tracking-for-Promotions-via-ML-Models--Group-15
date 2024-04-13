
const User = require('../models/users')
const Employee = require('../models/employee')
const Position = require('../models/positions')
const Course = require('../models/course')
const Workshop = require('../models/workshop')
const HR_Admin = require('../models/hr_admin')
const Weights = require('../models/weights')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')

// Get all employees for admin dashboard
const dashboardEmployees = async (reqs, resp) => {
    try {
        const employees = await Employee.find()
        return resp.json(employees)
    } catch (error) {
        console.log(error)
    }
}



// Return all data about positions
const positionIDtoName = async (reqs, resp) => {
    try {
        const positions = await Position.find()
        return resp.json(positions)
    }
    catch (error) {
        console.log(error)
    }
}

// ENdpoint to allow HR Admin to add new employee to database
const addEmployeeFromAdminDashboard = async (reqs, resp) => {
    try {
        // got employeeID, name, positionID, and registered_status from the request
        const { employeeID, name, positionID, registered_status, email } = reqs.body
        // Make a new object
        const newEmployee = new Employee({
            employeeID,
            name,
            positionID,
            registered_status,
            email
        })
        // Save to DB
        await newEmployee.save()

        // Now update the position's employee list
        const positionData = await Position.findOne({ positionID: positionID });
        const employeeList = positionData.held_by;
        employeeList.push(employeeID);
        // If the position was vacant, set vacancy flag to false
        if (employeeList.length == 1) {
            await Position.findOneAndUpdate({ positionID: positionID }, { held_by: employeeList, vacancy: false });
        }
        else {
            await Position.findOneAndUpdate({ positionID: positionID }, { held_by: employeeList });
        }
        
        // return success message
        return resp.json({ message: "Employee added successfully" })
    }
    catch (error) {
        console.log(error)
    }
}

// Endpoint for HR Admin to fire an emplyee 
const deleteEmployeefromAdminDashboard = async (reqs, resp) => {
    try {
        console.log(reqs)
        // Get the employee's ID
        const employeeID = reqs.params.id;
        // Delete from the DB
        const deletedEmployee = await Employee.findOneAndDelete({ employeeID: employeeID });

        // If no employee was deleted, i.e. wrong emplyee ID, return error
        if (!deletedEmployee) {
            return resp.status(400).json({ message: "Employee not found" })
        }

        // Now check the position of the employee
        const position = deletedEmployee.positionID;

        // For the position, delete the employee from the position's employee list and check vacancy flag
        const positionData = await Position.findOne({ positionID: position });
        const employeeList = positionData.held_by;
        const index = employeeList.indexOf(employeeID);
        employeeList.splice(index, 1);
        // If the employee was the only one in the position, set vacancy flag to true
        if (employeeList.length == 0) {
            await Position.findOneAndUpdate({ positionID: position }, { held_by: employeeList, vacancy: true });
        }
        else {
            await Position.findOneAndUpdate({ positionID: position }, { held_by: employeeList });
        }

        // Now if the employee was a mentor, delete the mentorship. Check every employee's mentorship field
        const allEmployees = await Employee.find();
        for (let i = 0; i < allEmployees.length; i++) {
            const employeesMentor = allEmployees[i].mentor_ID;
            if (employeesMentor == employeeID) {
                // If the employee was a mentor, delete the mentorship
                allEmployees[i].mentor_ID = "";
                await allEmployees[i].save();
            }
        }

        // return success message
        return resp.json({ message: "Employee deleted successfully" })
    }
    catch (error) {
        console.log(error)
    }
}

const fetchCourses = async (reqs,resp) => {
    try {
        const courses = await Course.find()
        return resp.json(courses)
    }

    catch(error){
        console.log(error)
    }
}

const fetchWorkshops = async (reqs,resp) => {
    try {
        const workshops = await Workshop.find()
        return resp.json(workshops)
    }

    catch(error){
        console.log(error)
    }
}


const returnAdminProfile = async (reqs, resp) => {
    try {
        const {name} = reqs.body;

        const exists = await HR_Admin.findOne({name: name})

        if (!exists) {
            return resp.json({
                error: 'No such employee record exists'
            }) 
        } else {
            resp.json(exists)
        }
    } catch (err) {
        console.log(err)
    }
}

const getWeights = async (reqs, resp) => {
    try {
        // Get all weights
        const weights = await Weights.find()
        return resp.json(weights)
    } catch (error) {
        console.log(error)
    }
}

const saveWeights = async (reqs, resp) => {
    try {
        // Request contains admin weights
        //         axios.post('/updateWeights', weights.admin)

        // Get the weights from the request
        console.log(reqs.body)

        newAdminWeights = {
            weightsID: 2,
            // type casting to Number
            task_completion_rate: Number(reqs.body.task_completion_rate),
            attendance_rate : Number(reqs.body.attendance_rate),
            punctuality : Number(reqs.body.punctuality),
            efficiency : Number(reqs.body.efficiency),
            professionalism : Number(reqs.body.professionalism),
            collaboration : Number(reqs.body.collaboration),
            leadership : Number(reqs.body.leadership)
        }

        // Update the weights in db. Admin weights have weightsID = 2
        await Weights.findOneAndUpdate({ weightsID: 2 }, newAdminWeights)



        return resp.json({ message: "Weights updated successfully" })

    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    dashboardEmployees,
    positionIDtoName,
    addEmployeeFromAdminDashboard,
    deleteEmployeefromAdminDashboard,
    fetchCourses,
    fetchWorkshops,
    returnAdminProfile,
    getWeights,
    saveWeights,
}


