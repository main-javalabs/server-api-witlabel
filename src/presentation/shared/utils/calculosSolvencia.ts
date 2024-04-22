// calculosSolvencia.ts

export const calculosSolvencia = {
    calcularNivelDeEndeudamiento(totalPasivo: number, totalActivo: number): number {
      return totalPasivo / totalActivo;
    },
    calcularConcentracionEndeudamientoCortoPlazo(pasivoCorriente: number, pasivoTotal: number): number {
      return pasivoCorriente / pasivoTotal;
    },
    calcularEndeudamientoVentas(pasivoTotal: number, ventasNetas: number): number {
      return pasivoTotal / ventasNetas;
    },
    calcularMultiplicadorDeCapital(activosTotales: number, patrimonio: number): number {
      return activosTotales / patrimonio;
    },
  };
  