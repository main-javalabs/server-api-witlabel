import mongoose, { Schema } from "mongoose";

const reporteGeneralSchema = new Schema({
    fechaCreación: { type: Date, default: Date.now },
    riesgoPais: { type: Number, required: false }, 

    empresa: {
      type: Schema.Types.ObjectId,
      ref: 'Empresa',
      required: true
    },
    gestion: {
      type: Schema.Types.ObjectId,
      ref: 'Gestion',
      required: false
    },
    liquidez: {
      type: Schema.Types.ObjectId,
      ref: 'Liquidez',
      required: false
    },
    rentabilidad: {
      type: Schema.Types.ObjectId,
      ref: 'Rentabilidad',
      required: false
    },
    solvencia: {
      type: Schema.Types.ObjectId,
      ref: 'Solvencia',
      required: false
    },
    creadoPor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  });
  
  const ReporteGeneral = mongoose.model('ReporteGeneral', reporteGeneralSchema);
  export default ReporteGeneral;
