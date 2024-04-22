export class UpdateRentabilidadDto {
  riesgoPais?: number;
  margenNeto?: number;
  roce?: number;
  fecha?: Date;
  rentabilidadBruta?: number;
  rentabilidadOperacional?: number;
  rentabilidadNeta?: number;
  rentabilidadPatrimonio?: number;
  rentabilidadActivoTotal?: number;

  constructor({
    riesgoPais,
    margenNeto,
    roce,
    fecha,
    rentabilidadBruta,
    rentabilidadOperacional,
    rentabilidadNeta,
    rentabilidadPatrimonio,
    rentabilidadActivoTotal,
  }: any) {
    this.riesgoPais = riesgoPais;
    this.margenNeto = margenNeto;
    this.roce = roce;
    this.fecha = fecha;
    this.rentabilidadBruta = rentabilidadBruta;
    this.rentabilidadOperacional = rentabilidadOperacional;
    this.rentabilidadNeta = rentabilidadNeta;
    this.rentabilidadPatrimonio = rentabilidadPatrimonio;
    this.rentabilidadActivoTotal = rentabilidadActivoTotal;
  }

  static validate(input: any): [string?, UpdateRentabilidadDto?] {
    const updateDto = new UpdateRentabilidadDto(input);

    // Validaciones de campos opcionales pueden ir aquí si es necesario

    return [undefined, updateDto];
  }
}
