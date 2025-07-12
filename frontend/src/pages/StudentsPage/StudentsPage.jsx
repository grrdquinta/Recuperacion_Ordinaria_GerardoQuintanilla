// pages/StudentsPage.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Users, UserPlus, Edit2, Trash2 } from 'lucide-react';
import useStudents from '../../components/Hooks/useStudents';

const StudentsPage = () => {
  const {
    students,
    loading,
    error,
    createStudent,
    updateStudent,
    deleteStudent,
    generateCarnet
  } = useStudents();

  const [editingStudent, setEditingStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues: {
      carnet: '',
      nombre: '',
      apellido: '',
      grado: '',
      estado: 'activo'
    }
  });

  const onFormSubmit = async (data) => {
    let result;

    if (editingStudent) {
      result = await updateStudent(editingStudent._id, data);
    } else {
      result = await createStudent(data);
    }

    if (result.success) {
      reset();
      setShowForm(false);
      setEditingStudent(null);
    } else {
      alert(result.error);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setValue('carnet', student.carnet);
    setValue('nombre', student.nombre);
    setValue('apellido', student.apellido);
    setValue('grado', student.grado);
    setValue('estado', student.estado);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este estudiante?')) {
      const result = await deleteStudent(id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingStudent(null);
    reset();
  };

  const handleShowForm = () => {
    if (!editingStudent) {
      reset({
        carnet: generateCarnet(),
        nombre: '',
        apellido: '',
        grado: '',
        estado: 'activo'
      });
    }
    setShowForm(true);
  };

  return (
    <div className="students-management">
      <div className="students-header">
        <div>
          <h2 className="dashboard-title">🦸‍♂️ Academia de Héroes</h2>
          <p className="dashboard-subtitle">Centro de entrenamiento y registro heroico</p>
        </div>
        <button className="add-student-btn" onClick={handleShowForm}>
          <UserPlus style={{width: '24px', height: '24px'}} />
          Reclutar Héroe
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h3 className="form-title">
            {editingStudent ? '✏️ Actualizar Héroe' : '🌟 Registrar Nuevo Héroe'}
          </h3>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">🆔 Carnet</label>
                <input
                  type="text"
                  className={`form-input ${errors.carnet ? 'error' : ''}`}
                  placeholder="Ej: 20250001"
                  readOnly={!!editingStudent}
                  {...register('carnet', {
                    required: 'El carnet es obligatorio',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'El carnet solo puede contener números'
                    },
                    minLength: {
                      value: 4,
                      message: 'El carnet debe tener al menos 4 dígitos'
                    },
                    maxLength: {
                      value: 10,
                      message: 'El carnet no puede exceder 10 dígitos'
                    }
                  })}
                />
                {errors.carnet && (
                  <span className="form-error">{errors.carnet.message}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">🏷️ Nombre</label>
                <input
                  type="text"
                  className={`form-input ${errors.nombre ? 'error' : ''}`}
                  placeholder="Ej: Peter"
                  {...register('nombre', {
                    required: 'El nombre es obligatorio',
                    minLength: {
                      value: 2,
                      message: 'El nombre debe tener al menos 2 caracteres'
                    },
                    maxLength: {
                      value: 50,
                      message: 'El nombre no puede exceder 50 caracteres'
                    }
                  })}
                />
                {errors.nombre && (
                  <span className="form-error">{errors.nombre.message}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">👨‍💼 Apellido</label>
                <input
                  type="text"
                  className={`form-input ${errors.apellido ? 'error' : ''}`}
                  placeholder="Ej: Parker"
                  {...register('apellido', {
                    minLength: {
                      value: 2,
                      message: 'El apellido debe tener al menos 2 caracteres'
                    },
                    maxLength: {
                      value: 50,
                      message: 'El apellido no puede exceder 50 caracteres'
                    }
                  })}
                />
                {errors.apellido && (
                  <span className="form-error">{errors.apellido.message}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">📚 Grado</label>
                <select
                  className={`form-input ${errors.grado ? 'error' : ''}`}
                  {...register('grado', {
                    required: 'El grado es obligatorio'
                  })}
                >
                  <option value="">Seleccionar grado</option>
                  <option value="1° Básico">1° Básico</option>
                  <option value="2° Básico">2° Básico</option>
                  <option value="3° Básico">3° Básico</option>
                  <option value="4° Básico">4° Básico</option>
                  <option value="5° Básico">5° Básico</option>
                  <option value="6° Básico">6° Básico</option>
                  <option value="7° Básico">7° Básico</option>
                  <option value="8° Básico">8° Básico</option>
                  <option value="9° Básico">9° Básico</option>
                </select>
                {errors.grado && (
                  <span className="form-error">{errors.grado.message}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">⚡ Estado</label>
                <select
                  className={`form-input ${errors.estado ? 'error' : ''}`}
                  {...register('estado', {
                    required: 'El estado es obligatorio'
                  })}
                >
                  <option value="activo">🟢 Activo</option>
                  <option value="inactivo">🔴 Inactivo</option>
                </select>
                {errors.estado && (
                  <span className="form-error">{errors.estado.message}</span>
                )}
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" onClick={cancelForm} className="btn-cancel">
                ❌ Cancelar
              </button>
              <button type="submit" className="btn-submit">
                {editingStudent ? '✅ Actualizar Héroe' : '🚀 Registrar Héroe'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <div className="table-header">
          <h3>🏆 Registro de Héroes Activos</h3>
        </div>
        <div className="table-wrapper">
          <table className="students-table">
            <thead>
              <tr>
                <th>🆔 Carnet</th>
                <th>👤 Héroe</th>
                <th>📚 Grado</th>
                <th>⚡ Estado</th>
                <th>🔧 Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" style={{textAlign: 'center', padding: '24px'}}>
                    Cargando estudiantes...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" style={{textAlign: 'center', padding: '24px', color: '#dc2626'}}>
                    {error}
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{textAlign: 'center', padding: '24px'}}>
                    No hay estudiantes registrados
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student._id}>
                    <td style={{fontWeight: '600', color: '#2563eb'}}>{student.carnet}</td>
                    <td>
                      <div className="table-student-info">
                        <div className="table-student-avatar">
                          {student.nombre.charAt(0)}
                        </div>
                        <div className="table-student-details">
                          <h4>{student.nombre} {student.apellido}</h4>
                        </div>
                      </div>
                    </td>
                    <td style={{fontWeight: '500'}}>{student.grado}</td>
                    <td>
                      <span className={`status-badge ${student.estado === 'activo' ? 'status-active' : 'status-inactive'}`}>
                        {student.estado === 'activo' ? '🟢 ACTIVO' : '🔴 INACTIVO'}
                      </span>
                    </td>
                    <td>
                      <div className="actions-group">
                        <button
                          onClick={() => handleEdit(student)}
                          className="action-btn edit"
                          title="Editar"
                        >
                          <Edit2 style={{width: '20px', height: '20px'}} />
                        </button>
                        <button
                          onClick={() => handleDelete(student._id)}
                          className="action-btn delete"
                          title="Eliminar"
                        >
                          <Trash2 style={{width: '20px', height: '20px'}} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;