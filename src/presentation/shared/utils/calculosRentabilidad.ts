// calculosRentabilidad.ts

export const calculosRentabilidad = {
    calcularRentabilidadBruta(utilidadBruta: number, ventasNetas: number, descuentos: number): number {
      return (utilidadBruta / ventasNetas) - descuentos;
    },
    calcularRentabilidadOperacional(utilidadOperacional: number, ventasNetas: number): number {
      return utilidadOperacional / ventasNetas;
    },
    calcularRentabilidadNeta(utilidadNeta: number, ventasNetas: number): number {
      return utilidadNeta / ventasNetas;
    },
    calcularRentabilidadDelPatrimonio(utilidadNeta: number, patrimonioLiquido: number): number {
      return utilidadNeta / patrimonioLiquido;
    },
    calcularRentabilidadDelActivoTotal(utilidadNeta: number, activoTotal: number): number {
      return utilidadNeta / activoTotal;
    },
  };
  