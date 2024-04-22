// calculosLiquidez.ts
export const calculosLiquidez = {
  calcularCapitalDeTrabajo(activoCorriente: number, pasivoCorriente: number): number {
    return activoCorriente - pasivoCorriente;
  },
  calcularRazonCorriente(activoCorriente: number, pasivoCorriente: number): number {
    return activoCorriente / pasivoCorriente;
  },
  calcularPruebaAcida(disponible: number, inversionesTemporales: number, deudores: number, pasivoCorriente: number): number {
    return (disponible + inversionesTemporales + deudores) / pasivoCorriente;
  },
};
