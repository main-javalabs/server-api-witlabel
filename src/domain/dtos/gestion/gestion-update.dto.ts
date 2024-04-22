export class UpdateGestionDto {
  rotacionPatrimonioNeto?: number;
  rotacionActivoTotal?: number;
  rotacionCapitalTrabajo?: number;
  rotacionCartera?: number;
  periodoCobro?: number;
  eficienciaOperativa?: number;
  fecha?: Date;
  riesgoPais?: number;

  constructor({
    rotacionPatrimonioNeto,
    rotacionActivoTotal,
    rotacionCapitalTrabajo,
    rotacionCartera,
    periodoCobro,
    eficienciaOperativa,
    fecha,
    riesgoPais,
  }: any) {
    this.rotacionPatrimonioNeto = rotacionPatrimonioNeto;
    this.rotacionActivoTotal = rotacionActivoTotal;
    this.rotacionCapitalTrabajo = rotacionCapitalTrabajo;
    this.rotacionCartera = rotacionCartera;
    this.periodoCobro = periodoCobro;
    this.eficienciaOperativa = eficienciaOperativa;
    this.fecha = fecha;
    this.riesgoPais = riesgoPais;
  }

  static validate(input: any): [string?, UpdateGestionDto?] {
    const updateDto = new UpdateGestionDto(input);


    return [undefined, updateDto];
  }
}
