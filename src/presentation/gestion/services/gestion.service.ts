import GestionModel from "../../../data/mongo/models/gestion.model";
import { CustomError, PaginationDto, UserEntity } from "../../../domain";
import { GestionDto } from "../../../domain/dtos/gestion/gestion-create.dto";
import { UpdateGestionDto } from "../../../domain/dtos/gestion/gestion-update.dto";
import { calculosGestion } from "../../shared";

export class GestionService {
  constructor() {}

  async create(createGestionDto: GestionDto, user: UserEntity) {
    const gestionExist = await GestionModel.findOne({
      nombre: createGestionDto.nombre,
      empresaId: createGestionDto.empresaId
    });

    if (gestionExist) {
      throw CustomError.internalServer(`Ya existe una gestión con el nombre ${createGestionDto.nombre} para la empresa ${createGestionDto.empresaId}`);
    }

    try {
      // Realizar los cálculos utilizando las fórmulas de gestión
      const rotacionPatrimonioNeto = calculosGestion.calcularRotacionPatrimonioLiquido(createGestionDto.ventasNetas, createGestionDto.patrimonioLiquido);
      const rotacionActivoTotal = calculosGestion.calcularRotacionActivoTotal(createGestionDto.ventasNetas, createGestionDto.activoTotal);
      const rotacionCapitalTrabajo = calculosGestion.calcularRotacionCapitalTrabajo(createGestionDto.ventasNetas, createGestionDto.activoCorriente, createGestionDto.pasivoCorriente);
      const rotacionCartera = calculosGestion.calcularRotacionCartera(createGestionDto.ventasNetas, createGestionDto.cuentasPorCobrarClientes);
      const periodoCobro = calculosGestion.calcularPeriodoCobro(rotacionCartera);

      // Crear el documento con los valores calculados y los proporcionados
      const nuevaGestion = new GestionModel({
        ...createGestionDto,
        userId: user.id,
        fecha: new Date(),
        rotacionPatrimonioNeto,
        rotacionActivoTotal,
        rotacionCapitalTrabajo,
        rotacionCartera,
        periodoCobro
      });

      await nuevaGestion.save();

      return nuevaGestion.toObject();
    } catch (error) {
      throw CustomError.badRequest(`${error}`);
    }
  }


  // async readAll(paginationDto: PaginationDto) {
  //   const { page, limit } = paginationDto;
  
  //   try {
  //     const [total, gestiones] = await Promise.all([
  //       GestionModel.countDocuments(),
  //       GestionModel.find()
  //         .skip((page - 1) * limit)
  //         .limit(limit)
  //         .lean() // Usa lean() para mejorar el rendimiento cuando solo se necesitan los objetos JSON
  //     ]);
  
  //     return {
  //       page,
  //       limit,
  //       total,
  //       next: total > page * limit ? `/api/gestion/read-all?page=${page + 1}&limit=${limit}` : null,
  //       prev: page > 1 ? `/api/gestion/read-all?page=${page - 1}&limit=${limit}` : null,
  //       gestiones, // Envía el array de empresas tal como está
  //     };
  //   } catch (error) {
  //     throw CustomError.internalServer(`${error}`);
  //   }
  // }

  async readAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
  
    try {
      const [total, gestiones] = await Promise.all([
        GestionModel.countDocuments(),
        GestionModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate({
            path: 'empresaId',
            select: 'nombre repLegal' // Selecciona solo el nombre y repLegal de Empresa
          })
          .populate({
            path: 'userId',
            select: 'name email' // Cambia 'nombre' por 'name' según tu modelo de User
          })
          .lean()
      ]);
  
      return {
        page,
        limit,
        total,
        next: total > page * limit ? `/api/gestion/read-all?page=${page + 1}&limit=${limit}` : null,
        prev: page > 1 ? `/api/gestion/read-all?page=${page - 1}&limit=${limit}` : null,
        gestiones
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  
  

}
