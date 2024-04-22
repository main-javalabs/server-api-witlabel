import mongoose from 'mongoose';

const GestionSchema = new mongoose.Schema({
  rotacionPatrimonioNeto: { type: Number, required: true },
  nombre: { type: String, required: false }, 
  descripcion: { type: String, required: false }, 
  rotacionActivoTotal: { type: Number, required: true },
  rotacionCapitalTrabajo: { type: Number, required: true },
  rotacionCartera: { type: Number, required: true },
  periodoCobro: { type: Number, required: true },
  eficienciaOperativa: { type: Number, required: true },
  empresaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fecha: { type: Date, default: Date.now },
  riesgoPais: { type: Number, required: true }, 
});

const GestionModel = mongoose.model('Gestion', GestionSchema);

export default GestionModel;
