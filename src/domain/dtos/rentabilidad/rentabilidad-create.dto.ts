
export class RentabilidadDto {
  riesgoPais: number;
  margenNeto: number;
  roce: number;
  empresaId: string;
  fecha: Date;
  rentabilidadBruta: number;
  rentabilidadOperacional: number;
  rentabilidadNeta: number;
  rentabilidadPatrimonio: number;
  rentabilidadActivoTotal: number;
  userId: string;

  constructor({
    riesgoPais,
    margenNeto,
    roce,
    empresaId,
    fecha,
    rentabilidadBruta,
    rentabilidadOperacional,
    rentabilidadNeta,
    rentabilidadPatrimonio,
    rentabilidadActivoTotal,
    userId,
  }: any) {
    this.riesgoPais = riesgoPais;
    this.margenNeto = margenNeto;
    this.roce = roce;
    this.empresaId = empresaId;
    this.fecha = fecha || new Date();
    this.rentabilidadBruta = rentabilidadBruta;
    this.rentabilidadOperacional = rentabilidadOperacional;
    this.rentabilidadNeta = rentabilidadNeta;
    this.rentabilidadPatrimonio = rentabilidadPatrimonio;
    this.rentabilidadActivoTotal = rentabilidadActivoTotal;
    this.userId = userId;
  }

  static create(input: any): [string?, RentabilidadDto?] {
    if (isNaN(input.riesgoPais)) return ['El riesgo país debe ser un número', undefined];
    if (isNaN(input.margenNeto)) return ['El margen neto debe ser un número', undefined];
    if (isNaN(input.roce)) return ['El ROCE debe ser un número', undefined];
    if (!input.empresaId) return ['Falta el ID de la empresa', undefined];
    if (!input.userId) return ['Falta el ID del usuario', undefined];
    if (!input.fecha || !(input.fecha instanceof Date) || isNaN(input.fecha.getTime())) {
      return ['La fecha no es válida', undefined];
    }
    if (isNaN(input.rentabilidadBruta)) return ['La rentabilidad bruta debe ser un número', undefined];
    if (isNaN(input.rentabilidadOperacional)) return ['La rentabilidad operacional debe ser un número', undefined];
    if (isNaN(input.rentabilidadNeta)) return ['La rentabilidad neta debe ser un número', undefined];
    if (isNaN(input.rentabilidadPatrimonio)) return ['La rentabilidad del patrimonio debe ser un número', undefined];
    if (isNaN(input.rentabilidadActivoTotal)) return ['La rentabilidad del activo total debe ser un número', undefined];

    // Otras validaciones pueden ir aquí si es necesario

    const dto = new RentabilidadDto(input);
    return [undefined, dto];
  }
}
