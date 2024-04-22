import { regularExps } from '../../../config';

export class SolvenciaDto {
  deudaTotalActivos?: number;
  deudaEquity?: number;
  empresaId?: string;
  fecha: Date;
  nivelEndeudamiento?: number;
  concentracionEndeudamientoCortoPlazo?: number;
  endeudamientoVentas?: number;
  multiplicadorCapital?: number;
  userId?: string;
  riesgoPais: number;

  constructor({
    deudaTotalActivos,
    deudaEquity,
    empresaId,
    fecha,
    nivelEndeudamiento,
    concentracionEndeudamientoCortoPlazo,
    endeudamientoVentas,
    multiplicadorCapital,
    userId,
    riesgoPais,
  }: any) {
    this.deudaTotalActivos = deudaTotalActivos;
    this.deudaEquity = deudaEquity;
    this.empresaId = empresaId;
    this.fecha = fecha || new Date();
    this.nivelEndeudamiento = nivelEndeudamiento;
    this.concentracionEndeudamientoCortoPlazo = concentracionEndeudamientoCortoPlazo;
    this.endeudamientoVentas = endeudamientoVentas;
    this.multiplicadorCapital = multiplicadorCapital;
    this.userId = userId;
    this.riesgoPais = riesgoPais;
  }

  static create(input: any): [string?, SolvenciaDto?] {
    if (isNaN(input.riesgoPais)) return ['El riesgo país debe ser un número', undefined];
    if (input.deudaTotalActivos && isNaN(input.deudaTotalActivos)) return ['La deuda total sobre activos debe ser un número', undefined];
    if (input.deudaEquity && isNaN(input.deudaEquity)) return ['La deuda sobre patrimonio (deuda equity) debe ser un número', undefined];
    if (input.nivelEndeudamiento && isNaN(input.nivelEndeudamiento)) return ['El nivel de endeudamiento debe ser un número', undefined];
    if (input.concentracionEndeudamientoCortoPlazo && isNaN(input.concentracionEndeudamientoCortoPlazo)) return ['La concentración de endeudamiento a corto plazo debe ser un número', undefined];
    if (input.endeudamientoVentas && isNaN(input.endeudamientoVentas)) return ['El endeudamiento sobre ventas debe ser un número', undefined];
    if (input.multiplicadorCapital && isNaN(input.multiplicadorCapital)) return ['El multiplicador de capital debe ser un número', undefined];
    
    // Otras validaciones pueden ir aquí si es necesario

    const dto = new SolvenciaDto(input);
    return [undefined, dto];
  }
}
