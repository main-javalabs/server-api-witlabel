
export class UpdateLiquidezDto {
  ratioCorriente?: number;
  pruebaAcida?: number;
  fecha?: Date;

  constructor({ ratioCorriente, pruebaAcida, fecha }: any) {
    this.ratioCorriente = ratioCorriente;
    this.pruebaAcida = pruebaAcida;
    this.fecha = fecha;
  }

  static validate(input: any): [string?, UpdateLiquidezDto?] {
    const updateDto = new UpdateLiquidezDto(input);

    // Validación de ratioCorriente
    if (updateDto.ratioCorriente && isNaN(updateDto.ratioCorriente)) {
      return ['El ratio corriente debe ser un número', undefined];
    }

    // Validación de pruebaAcida
    if (updateDto.pruebaAcida && isNaN(updateDto.pruebaAcida)) {
      return ['La prueba ácida debe ser un número', undefined];
    }

    return [undefined, updateDto];
  }
}
