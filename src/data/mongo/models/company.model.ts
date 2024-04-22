import mongoose from 'mongoose';

const { Schema } = mongoose;

const companySchema = new Schema({
  nombre: {
    type: String,
    unique: true,
    required: [true, 'El nombre de la empresa es obligatorio'],
  },
  nit: {
    type: String,
    required: [true, 'El nit de la empresa es obligatorio'],
  },
  repLegal: String,
  disponible: { type: Boolean, default: true },
  direccion: {
    calle: String,
    ciudad: String,
    estado: String,
    codigoPostal: String,
    pais: String
  },
  telefono: {
    type: String,
    required: [true, 'El número de teléfono es obligatorio'],
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
  },
  website: String,
  sector: {
    type: String,
    required: [true, 'El sector de la empresa es obligatorio'],
  },
  
  reportesHistoricos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ReporteGeneral' }],
  liquidez: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Liquidez' }],
  solvencia: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Solvencia' }],
  rentabilidad: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rentabilidad' }],
  gestion: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gestion' }],
  creadoPor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  logo: String,
  descripcion: String,
  tamano: String,
  anoFundacion: Number,
  numEmpleados: Number,
  redesSociales: {
    facebook: String,
    twitter: String,
    linkedIn: String
  },
  certificaciones: [{
    nombre: String,
    fechaObtencion: Date,
    vigencia: Date,
    institucion: String
  }],
  informacionFinanciera: {
    ingresosAnuales: Number,
    capital: Number
  },
  
  contactoEmergencia: {
    nombre: String,
    telefono: String,
    relacion: String
  },
  documentosAdjuntos: [{
    tipo: {
      type: String,
      enum: ['pdf', 'excel', 'doc'],
    },
    url: {
      type: String,
      required: [false, 'La URL del documento es obligatoria']
    },
    descripcion: String,
  }],
  gestionFinanciera: [{
    tipoInforme: {
      type: String,
      enum: ['balance general', 'estado de resultados', 'flujo de efectivo'],
      required: [true, 'El tipo de informe es obligatorio'],
    },
    documento: {
      type: Schema.Types.ObjectId,
      ref: 'Documento',
      required: [true, 'El documento asociado es obligatorio'],
    },
    fecha: {
      type: Date,
      required: [true, 'La fecha del informe es obligatoria']
    }
  }],

  
}, { timestamps: true });

const CompanyModel = mongoose.model('Empresa', companySchema);

export default CompanyModel;
