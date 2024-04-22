import mongoose from 'mongoose';

const { Schema } = mongoose;

const ingresoSchema = new Schema({
  descripcion: { type: String, required: true },
  monto: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});

const gastoSchema = new Schema({
  descripcion: { type: String, required: true },
  monto: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});

const reporteFinancieroSchema = new Schema({
  año: { type: Number, required: true },
  mes: { type: String, required: true },
  ingresos: [ingresoSchema],
  gastos: [gastoSchema],
  balanceInicial: { type: Number, default: 0 },
  balanceFinal: { type: Number, default: 0 },
  creadoPor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notas: { type: String },
  riesgoPais: { type: Number, required: false }, 

}, { timestamps: true });

const ReporteFinanciero = mongoose.model('ReporteFinanciero', reporteFinancieroSchema);

export default ReporteFinanciero;
