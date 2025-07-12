// hooks/useStudents.js
import { useState, useEffect } from 'react';

const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener estudiantes
  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:4000/api/students');
      if (!response.ok) {
        throw new Error('Error al cargar los estudiantes');
      }
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  // Función para crear estudiante
  const createStudent = async (studentData) => {
    try {
      const response = await fetch('http://localhost:4000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData)
      });

      if (!response.ok) {
        throw new Error('Error al crear estudiante');
      }

      const newStudent = await response.json();
      setStudents(prev => [...prev, newStudent]);
      return { success: true, data: newStudent };
    } catch (error) {
      console.error('Error creating student:', error);
      return { success: false, error: error.message };
    }
  };

  // Función para actualizar estudiante
  const updateStudent = async (id, studentData) => {
    try {
      const response = await fetch(`http://localhost:4000/api/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData)
      });

      if (!response.ok) {
        throw new Error('Error al actualizar estudiante');
      }

      const updatedStudent = await response.json();
      setStudents(prev => 
        prev.map(student => 
          student._id === id ? updatedStudent : student
        )
      );
      return { success: true, data: updatedStudent };
    } catch (error) {
      console.error('Error updating student:', error);
      return { success: false, error: error.message };
    }
  };

  // Función para eliminar estudiante
  const deleteStudent = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/students/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar estudiante');
      }

      setStudents(prev => prev.filter(student => student._id !== id));
      return { success: true };
    } catch (error) {
      console.error('Error deleting student:', error);
      return { success: false, error: error.message };
    }
  };

  // Función para generar carnet automático
  const generateCarnet = () => {
    const year = new Date().getFullYear();
    const maxCarnet = students.reduce((max, student) => {
      const studentNumber = parseInt(student.carnet.slice(-4));
      return Math.max(max, studentNumber);
    }, 0);
    const nextNumber = (maxCarnet + 1).toString().padStart(4, '0');
    return `${year}${nextNumber}`;
  };

  // Estadísticas calculadas
  const activeStudents = students.filter(student => student.estado === 'activo').length;
  const inactiveStudents = students.filter(student => student.estado === 'inactivo').length;

  // Cargar estudiantes al montar el hook
  useEffect(() => {
    fetchStudents();
  }, []);

  return {
    students,
    loading,
    error,
    activeStudents,
    inactiveStudents,
    fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    generateCarnet
  };
};

export default useStudents;