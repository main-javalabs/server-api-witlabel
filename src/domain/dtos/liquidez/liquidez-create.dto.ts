// LiquidezDto.ts
export class LiquidezDto {
  ratioCorriente: number;
  pruebaAcida: number;
  empresaId: string;
  userId: string;
  fecha: Date;

  constructor({ ratioCorriente, pruebaAcida, empresaId, userId, fecha }: any) {
    this.ratioCorriente = ratioCorriente;
    this.pruebaAcida = pruebaAcida;
    this.empresaId = empresaId;
    this.userId = userId;
    this.fecha = fecha || new Date();
  }

  static create(input: any): [string?, LiquidezDto?] {
    if (!input.ratioCorriente) return ['Falta el ratio corriente', undefined];
    if (!input.pruebaAcida) return ['Falta la prueba ácida', undefined];
    if (!input.empresaId) return ['Falta el ID de la empresa', undefined];
    if (!input.userId) return ['Falta el ID del usuario', undefined];
    if (!input.fecha || !(input.fecha instanceof Date) || isNaN(input.fecha.getTime())) {
      return ['La fecha no es válida', undefined];
    }

    const dto = new LiquidezDto(input);
    return [undefined, dto];
  }
}
