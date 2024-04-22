import mongoose from 'mongoose';

const RentabilidadSchema = new mongoose.Schema({
  riesgoPais: { type: Number, required: true }, 
  margenNeto: { type: Number, required: true },
  roce: { type: Number, required: true },
  empresaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: true },
  fecha: { type: Date, default: Date.now },
  rentabilidadBruta: { type: Number, required: true },
  rentabilidadOperacional: { type: Number, required: true },
  rentabilidadNeta: { type: Number, required: true },
  rentabilidadPatrimonio: { type: Number, required: true },
  rentabilidadActivoTotal: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const RentabilidadModel = mongoose.model('Rentabilidad', RentabilidadSchema);

export default RentabilidadModel;
