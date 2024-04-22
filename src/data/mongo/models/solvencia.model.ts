import mongoose from 'mongoose';

const SolvenciaSchema = new mongoose.Schema({
  deudaTotalActivos: { type: Number, required: false },
  deudaEquity: { type: Number, required: false },
  empresaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: false },
  fecha: { type: Date, default: Date.now },
  nivelEndeudamiento: { type: Number, required: false },
  concentracionEndeudamientoCortoPlazo: { type: Number, required: false },
  endeudamientoVentas: { type: Number, required: false },
  multiplicadorCapital: { type: Number, required: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  riesgoPais: { type: Number, required: true }, 

});

const SolvenciaModel = mongoose.model('Solvencia', SolvenciaSchema);

export default SolvenciaModel;
