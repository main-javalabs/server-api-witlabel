import { UserModel } from "../../../data";
import CompanyModel from "../../../data/mongo/models/company.model";

export class GestionDto {
  ventasNetas: number;
  patrimonioLiquido: number; // Propiedad añadida
  activoTotal: number; // Propiedad añadida
  activoCorriente: number; // Propiedad añadida
  pasivoCorriente: number; // Propiedad añadida
  cuentasPorCobrarClientes: number; // Propiedad añadida

  rotacionPatrimonioNeto: number;
  nombre!: string;
  descripcion!: string;
  rotacionActivoTotal: number;
  rotacionCapitalTrabajo: number;
  rotacionCartera: number;
  periodoCobro: number;
  eficienciaOperativa: number;
  empresaId: string;
  userId: string;
  fecha: Date;
  riesgoPais: number;

  constructor({
    ventasNetas,
    patrimonioLiquido,
    activoTotal,
    activoCorriente,
    pasivoCorriente,
    cuentasPorCobrarClientes,
    rotacionPatrimonioNeto,
    rotacionActivoTotal,
    rotacionCapitalTrabajo,
    rotacionCartera,
    periodoCobro,
    eficienciaOperativa,
    empresaId,
    userId,
    fecha,
    riesgoPais,
  }: any) {
    this.ventasNetas = ventasNetas;
    this.patrimonioLiquido = patrimonioLiquido; // Asignación añadida
    this.activoTotal = activoTotal; // Asignación añadida
    this.activoCorriente = activoCorriente; // Asignación añadida
    this.pasivoCorriente = pasivoCorriente; // Asignación añadida
    this.cuentasPorCobrarClientes = cuentasPorCobrarClientes; // Asignación añadida

    this.rotacionPatrimonioNeto = rotacionPatrimonioNeto;
    this.rotacionActivoTotal = rotacionActivoTotal;
    this.rotacionCapitalTrabajo = rotacionCapitalTrabajo;
    this.rotacionCartera = rotacionCartera;
    this.periodoCobro = periodoCobro;
    this.eficienciaOperativa = eficienciaOperativa;
    this.empresaId = empresaId;
    this.userId = userId;
    this.fecha = fecha || new Date();
    this.riesgoPais = riesgoPais;
  }

  static async create(input: any): Promise<[string?, GestionDto?]> {
    if (!input.ventasNetas) return ['Falta las ventas netas', undefined];
    if (!input.patrimonioLiquido) return ['Falta el patrimonio líquido', undefined]; // Validación añadida
    if (!input.activoTotal) return ['Falta el activo total', undefined]; // Validación añadida
    if (!input.activoCorriente) return ['Falta el activo corriente', undefined]; // Validación añadida
    if (!input.pasivoCorriente) return ['Falta el pasivo corriente', undefined]; // Validación añadida
    if (!input.cuentasPorCobrarClientes) return ['Falta las cuentas por cobrar clientes', undefined]; // Validación añadida
    if (!input.rotacionPatrimonioNeto) return ['Falta la rotación del patrimonio neto', undefined];
    if (!input.rotacionActivoTotal) return ['Falta la rotación del activo total', undefined];
    if (!input.rotacionCapitalTrabajo) return ['Falta la rotación del capital de trabajo', undefined];
    if (!input.rotacionCartera) return ['Falta la rotación de cartera', undefined];
    if (!input.periodoCobro) return ['Falta el periodo de cobro', undefined];
    if (!input.eficienciaOperativa) return ['Falta la eficiencia operativa', undefined];
    if (!input.empresaId) return ['Falta el ID de la empresa', undefined];
    if (!input.userId) return ['Falta el ID del usuario', undefined];
    if (isNaN(input.riesgoPais)) return ['El riesgo país debe ser un número', undefined];
    
    
    const empresaExists = await CompanyModel.findById(input.empresaId);
    if (!empresaExists) {
        throw new Error(`La empresa con ID ${input.empresaId} no existe.`);
    }
    
    // const userExists = await UserModel.findById(input.userId);
    // if (!userExists) {
    //     throw new Error(`El usuario con ID ${input.userId} no existe.`);
    // }
    
    const dto = new GestionDto(input);
    return [undefined, dto];
  }
}
