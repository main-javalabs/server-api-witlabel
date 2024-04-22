import { regularExps } from "../../../config";

export class UpdateCompanyDto {
  nombre?: string;
  nit?: string;
  repLegal?: string;
  disponible?: boolean;
  direccion?: {
    calle?: string,
    ciudad?: string,
    estado?: string,
    codigoPostal?: string,
    pais?: string
  };
  telefono?: string;
  email?: string;
  website?: string;
  sector?: string;
  reportesFinancieros?: string[];
  creadoPor?: string;
  gestionFinanciera?: Array<{
    tipoInforme: 'balance general' | 'estado de resultados' | 'flujo de efectivo';
    documento: string; // Suponiendo que el documento es referenciado por su ID
    fecha: Date;
  }>;
  documentosAdjuntos?: Array<{
    tipo: 'pdf' | 'excel' | 'doc';
    url: string;
    descripcion?: string;
  }>;

  constructor(input: any) {
    if (input.nombre) this.nombre = input.nombre;
    if (input.nit) this.nit = input.nit;
    if (input.repLegal) this.repLegal = input.repLegal;
    if (input.hasOwnProperty('disponible')) this.disponible = input.disponible;
    if (input.direccion) this.direccion = input.direccion;
    if (input.telefono) this.telefono = input.telefono;
    if (input.email) {
      if (!regularExps.email.test(input.email)) throw new Error('El email no es válido');
      this.email = input.email;
    }
    if (input.website) this.website = input.website;
    if (input.sector) this.sector = input.sector;
    if (input.reportesFinancieros) this.reportesFinancieros = input.reportesFinancieros;
    if (input.creadoPor) this.creadoPor = input.creadoPor;
    if (input.gestionFinanciera) this.gestionFinanciera = input.gestionFinanciera;
    if (input.documentosAdjuntos) this.documentosAdjuntos = input.documentosAdjuntos;
  }

  static validate(input: any): [string?, UpdateCompanyDto?] {
    // Validación de email si es que se proporciona
    if (input.email && !regularExps.email.test(input.email)) {
      return ['El email no es válido', undefined];
    }
  
    // Validación de teléfono si se proporciona
    if (input.telefono && !regularExps.telefono.test(input.telefono)) {
      return ['El teléfono no es válido', undefined];
    }
  
    // Validación de NIT si se proporciona
    if (input.nit && !regularExps.nit.test(input.nit)) {
      return ['El NIT no es válido', undefined];
    }
  
    // Validación de URL del sitio web si se proporciona
    if (input.website && !regularExps.url.test(input.website)) {
      return ['La URL del sitio web no es válida', undefined];
    }
  
    // Validación de los documentos adjuntos si se proporcionan
    if (input.documentosAdjuntos && !Array.isArray(input.documentosAdjuntos)) {
      return ['Los documentos adjuntos deben ser un arreglo', undefined];
    } else if (input.documentosAdjuntos) {
      for (const documento of input.documentosAdjuntos) {
        if (!['pdf', 'excel', 'doc'].includes(documento.tipo)) {
          return [`El tipo de documento '${documento.tipo}' no es válido`, undefined];
        }
        if (!documento.url || typeof documento.url !== 'string') {
          return ['La URL del documento adjunto no es válida', undefined];
        }
      }
    }
    try {
      const dto = new UpdateCompanyDto(input);
      return [undefined, dto];
    } catch (error) {
      return [undefined, new UpdateCompanyDto(input)];

    }
  }
}
