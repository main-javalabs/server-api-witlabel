import mongoose from 'mongoose';

const LiquidezSchema = new mongoose.Schema({
  ratioCorriente: { type: Number, required: true },
  pruebaAcida: { type: Number, required: true },
  empresaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fecha: { type: Date, default: Date.now },
  capitalTrabajo: { type: Number, required: true },
  razonCorriente: { type: Number, required: true },
  riesgoPais: { type: Number, required: true }, 


});

const LiquidezModel = mongoose.model('Liquidez', LiquidezSchema);

export default LiquidezModel;
