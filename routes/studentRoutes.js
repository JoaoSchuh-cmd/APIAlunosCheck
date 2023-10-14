const router = require('express').Router()

const Student = require('../models/Student')

//POST
router.post('/', async (req, res) => { createStudent(req, res) })

// GETters
router.get('/', async (req, res) => { getAllStudents(req, res) }) 
router.get('/id=:id', async (req, res) => { getStudent(req, res) })

// UPDATE
router.patch('/id=:id', async (req, res) => { updateStudent(req, res) })

// DELETE 
router.delete('/id=:id', async (req, res) => { deleteStudent(req, res) })

async function createStudent(req, res) {
    const {name, cellphoneNumber, active} = req.body
    var errorMessage = ""
    var hasErrors = false

    if (!name) {
        errorMessage = "Name is necessary! \n"
        hasErrors = true
    }
    if (!cellphoneNumber) {
        errorMessage = "CellphoneNumber is necessary!"
        hasErrors = true
    }

    if (hasErrors) {
        res.status(422).json({
            error: errorMessage
        })
    }   

    const student = {
        name,
        cellphoneNumber,
        active
    }

    try {
       await Student.create(student)

        res.status(201).json({
            message: 'Student created successfully!',
            student: student
        })
    } catch (error) {
       res.status(500).json({error: error}) 
    }
}

async function getAllStudents(req, res) {
    try {
        const students = await Student.find()

        res.status(200).json(students)
    } catch (error) {
        res.status(500).json({error: error}) 
    }
}

async function getStudent(req, res) {
    const id = req.params.id

    try {
        const student = await Student.findOne({_id: id})

        if (student) {
            res.status(200).json(student)
        } else {
            res.status(404).json({message: 'Student not found!'})
        }

    } catch (error) {
        res.status(500).json({error: error})
    }
}


async function deleteStudent(req, res) {
    const id = req.params.id

    try {
        const student = await Student.findOne({_id: id})

        if (student) {
            await Student.deleteOne({_id: id})
            res.status(200).json({message: 'Student removed succesfully!'})
        } else {
            res.status(404).json({message: 'Student not found!'})
        }
    } catch (error) {
        res.status(500).json({error: error}) 
    }
}

async function updateStudent(req, res) {
    const id = req.params.id

    try {
        const { name, cellphoneNumber, active } = req.body

        const newStudent = {
            name,
            cellphoneNumber,
            active
        }

        const oldStudent = await Student.findOne({_id: id})

        if (oldStudent.matchedCount > 0) {
            if (oldStudent === newStudent) {
                res.status(200).json({message: 'New Student is identical the old Student!'})
                return
            }
        }

        const updatedStudent = await Student.updateOne({_id: id}, newStudent)

        if (updatedStudent.matchedCount > 0) {
            res.status(200).json({
                message: 'Student updated successfully!',
                updatedStudent: newStudent
            })
        } else {
            res.status(404).json({message: 'Student not found!'})
        }
 
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error})  
    }
}

module.exports = router