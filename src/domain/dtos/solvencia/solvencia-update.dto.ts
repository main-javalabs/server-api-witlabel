export class UpdateSolvenciaDto {
  deudaTotalActivos?: number;
  deudaEquity?: number;
  fecha?: Date;
  nivelEndeudamiento?: number;
  concentracionEndeudamientoCortoPlazo?: number;
  endeudamientoVentas?: number;
  multiplicadorCapital?: number;
  riesgoPais?: number;

  constructor({
    deudaTotalActivos,
    deudaEquity,
    fecha,
    nivelEndeudamiento,
    concentracionEndeudamientoCortoPlazo,
    endeudamientoVentas,
    multiplicadorCapital,
    riesgoPais,
  }: any) {
    this.deudaTotalActivos = deudaTotalActivos;
    this.deudaEquity = deudaEquity;
    this.fecha = fecha;
    this.nivelEndeudamiento = nivelEndeudamiento;
    this.concentracionEndeudamientoCortoPlazo = concentracionEndeudamientoCortoPlazo;
    this.endeudamientoVentas = endeudamientoVentas;
    this.multiplicadorCapital = multiplicadorCapital;
    this.riesgoPais = riesgoPais;
  }

  static validate(input: any): [string?, UpdateSolvenciaDto?] {
    const updateDto = new UpdateSolvenciaDto(input);

    // Validaciones de campos opcionales pueden ir aquí si es necesario

    return [undefined, updateDto];
  }
}
