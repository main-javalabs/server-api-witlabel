import { Response, Request } from "express";
import {
  GestionDto,
  CustomError,
  PaginationDto,
  UpdateGestionDto,
} from "../../../domain";
import { GestionService } from "../services/gestion.service";

export class GestionController {
  constructor(private readonly _gestionService: GestionService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  create = async (req: Request, res: Response) => {
    const [error, createGestionDto] = await GestionDto.create(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    // Es importante verificar si createGestionDto no es undefined antes de continuar
    if (createGestionDto) {
        this._gestionService
          .create(createGestionDto, req.body.user) // Asegúrate de que 'req.body.user' sea el valor esperado para el usuario
          .then((gestion) => res.status(201).json(gestion))
          .catch((error) => this.handleError(error, res));
    } else {
        return res.status(400).json({ error: "Invalid Gestion data" });
    }
};


  // // actualizar
  // update = async (req: Request, res: Response) => {
  //   const gestionId = req.params.id;
  //   const [error, updategestionDto] = GestionDto.create(req.body);

  //   if (error) {
  //     return res.status(400).json({ error });
  //   }

  //   this._gestionService
  //     .update(gestionId, updategestionDto!)
  //     .then((updatedGestion) => res.status(200).json(updatedGestion))
  //     .catch((error) => this.handleError(error, res));
  // };

  // // leer todos
  readAll = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) return res.status(400).json({ error });
    // res.json(paginationDto)
    // PaginationDto
    this._gestionService
      .readAll(paginationDto!)
      .then((gestiones) => res.status(201).json(gestiones))
      .catch((error) => this.handleError(error, res));
  };

  // // leer por id
  // readById = async (req: Request, res: Response) => {
  //   const Id = req.params.id;

  //   this._gestionService
  //     .read(Id)
  //     .then((gestion) => {
  //       if (!gestion) {
  //         throw CustomError.notFound("gestion not found");
  //       }
  //       res.status(200).json(gestion);
  //     })
  //     .catch((error) => this.handleError(error, res));
  // };

  // // eliminar por id
  // delete = async (req: Request, res: Response) => {
  //   const Id = req.params.id;

  //   this._gestionService
  //     .delete(Id)
  //     .then(() => res.status(204).send())
  //     .catch((error) => this.handleError(error, res));
  // };
}
