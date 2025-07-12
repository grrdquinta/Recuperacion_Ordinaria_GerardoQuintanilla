import { Schema, model } from "mongoose";

const studentSchema = new Schema({
   carnet: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    grado: {
        type: String,
        required: true,
        enum: ['1° Básico', '2° Básico', '3° Básico', '4° Básico', '5° Básico', 
               '6° Básico', '7° Básico', '8° Básico', '9° Básico']
    },
    estado: {
        type: String,
        required: true,
        enum: ['activo', 'inactivo'],
        default: 'activo'
    }
},
{
    timestamps: true,
    require: true
});

export default model('Student', studentSchema, 'Students');
