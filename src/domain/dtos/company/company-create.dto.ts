import { regularExps } from '../../../config';

export class CompanyDto {
  nombre: string;
  nit: string;
  repLegal?: string;
  disponible: boolean;
  direccion: {
    calle?: string,
    ciudad?: string,
    estado?: string,
    codigoPostal?: string,
    pais?: string
  };
  liquidezIds?: string[];
  solvenciaIds?: string[];
  rentabilidadIds?: string[];
  gestionIds?: string[];
  telefono: string;
  email: string;
  website?: string;
  sector: string;
  reportesFinancieros: string[];
  creadoPor: string;
  gestionFinanciera?: Array<{
    tipoInforme: 'balance general' | 'estado de resultados' | 'flujo de efectivo';
    documento: string;
    fecha: Date;
  }>;
  documentosAdjuntos?: Array<{
    tipo: 'pdf' | 'excel' | 'doc';
    url: string;
    descripcion?: string;
  }>;

  constructor({
    nombre,
    nit,
    repLegal = '',
    disponible = true,
    direccion = { calle: '', ciudad: '', estado: '', codigoPostal: '', pais: '' },
    telefono,
    email,
    website = '',
    sector,
    reportesFinancieros = [],
    creadoPor,
    gestionFinanciera = [],
    documentosAdjuntos = [],
  }: Partial<CompanyDto>) {
    if (!nombre) throw new Error("El nombre de la empresa es obligatorio.");
    if (!nit) throw new Error("El NIT de la empresa es obligatorio.");
    if (!telefono) throw new Error("El teléfono de la empresa es obligatorio.");
    if (!email) throw new Error("El email de la empresa es obligatorio.");
    if (!sector) throw new Error("El sector de la empresa es obligatorio.");
    if (!creadoPor) throw new Error("El creador de la empresa es obligatorio.");
  
    this.nombre = nombre;
    this.nit = nit;
    this.repLegal = repLegal;
    this.disponible = disponible;
    this.direccion = direccion;
    this.telefono = telefono;
    this.email = email;
    this.website = website;
    this.sector = sector;
    this.reportesFinancieros = reportesFinancieros;
    this.creadoPor = creadoPor;
    this.gestionFinanciera = gestionFinanciera;
    this.documentosAdjuntos = documentosAdjuntos;
  }
  
  static create(input: any): [string?, CompanyDto?] {
    if (!input.nombre) return ['Falta el nombre de la empresa', undefined];
    if (!input.nit) return ['Falta el NIT de la empresa', undefined];
    if (!input.telefono) return ['Falta el teléfono de la empresa', undefined];
    if (!input.email) return ['Falta el email de la empresa', undefined];
    if (!regularExps.email.test(input.email)) return ['El email no es válido', undefined];
    if (!input.sector) return ['Falta el sector de la empresa', undefined];
    if (!input.creadoPor) return ['Falta el ID del usuario creador', undefined];

    if (input.documentosAdjuntos) {
      if (!Array.isArray(input.documentosAdjuntos)) {
        return ['Los documentos adjuntos deben ser un array', undefined];
      }
      const tiposPermitidos = ['pdf', 'excel', 'doc'];
      for (const documento of input.documentosAdjuntos) {
        if (!tiposPermitidos.includes(documento.tipo)) {
          return [`Tipo de documento no permitido: ${documento.tipo}`, undefined];
        }
        if (!documento.url || typeof documento.url !== 'string') {
          return ['Cada documento adjunto debe tener una URL válida', undefined];
        }
      }
    }

    // Validación para gestión financiera
    if (input.gestionFinanciera) {
      if (!Array.isArray(input.gestionFinanciera)) {
        return ['La gestión financiera debe ser un array', undefined];
      }
      for (const gestion of input.gestionFinanciera) {
        if (!(gestion.tipoInforme && typeof gestion.tipoInforme === 'string')) {
          return ['Cada gestión financiera debe tener un tipoInforme válido', undefined];
        }
        if (!gestion.documento || typeof gestion.documento !== 'string') {
          return ['Cada gestión financiera debe tener un documento válido', undefined];
        }
        if (!gestion.fecha || !(gestion.fecha instanceof Date) || isNaN(gestion.fecha.getTime())) {
          return ['Cada gestión financiera debe tener una fecha válida', undefined];
        }
      }
    }

    const dto = new CompanyDto(input);
    return [undefined, dto];
  }
}
