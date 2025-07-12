import Student from '../models/Students.js';

const studentController = {};

// Obtener todos los estudiantes
studentController.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener estudiantes', error });
    }
};

// Obtener un estudiante por ID
studentController.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener estudiante', error });
    }
};

// Crear nuevo estudiante
studentController.createStudent = async (req, res) => {
    try {
        const { carnet, nombre, apellido, grado, estado } = req.body;
        
        if (!carnet || !nombre || !apellido || !grado || !estado) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

        const newStudent = new Student({ carnet, nombre, apellido, grado, estado });
        const savedStudent = await newStudent.save();
        
        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear estudiante', error });
    }
};

// Actualizar estudiante
studentController.updateStudent = async (req, res) => {
    try {
        const { carnet, nombre, apellido, grado, estado } = req.body;
        
        if (!carnet || !nombre || !apellido || !grado || !estado) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id, 
            { carnet, nombre, apellido, grado, estado }, 
            { new: true, runValidators: true }
        );
        
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar estudiante', error });
    }
};

// Eliminar estudiante
studentController.deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.status(200).json({ message: 'Estudiante eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar estudiante', error });
    }
};

export default studentController;