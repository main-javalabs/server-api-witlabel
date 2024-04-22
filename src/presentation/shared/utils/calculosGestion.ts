// calculosGestion.ts

export const calculosGestion = {
    calcularRotacionPatrimonioLiquido(ventasNetas: number, patrimonioLiquido: number): number {
      return ventasNetas / patrimonioLiquido;
    },
    calcularRotacionActivoTotal(ventasNetas: number, activoTotal: number): number {
      return ventasNetas / activoTotal;
    },
    calcularRotacionCapitalTrabajo(ventasNetas: number, activoCorriente: number, pasivoCorriente: number): number {
      return ventasNetas / (activoCorriente - pasivoCorriente);
    },
    calcularRotacionCartera(ventasNetas: number, cuentasPorCobrarClientes: number): number {
      return ventasNetas / cuentasPorCobrarClientes;
    },
    calcularPeriodoCobro(rotacionCartera: number): number {
      return 365 / rotacionCartera;
    },
  };
  