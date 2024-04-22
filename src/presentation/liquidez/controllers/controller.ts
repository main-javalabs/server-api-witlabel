import { Response, Request } from "express";
import { CompanyDto, CustomError, PaginationDto } from "../../../domain";
import { CompanyService } from "../services/company.service";

export class LiquidezController {
  constructor( private readonly _companyService:CompanyService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  // crear empresa
  create = async (req: Request, res: Response) => {
    const [error, createCompanyDto] = CompanyDto.create(req.body);
    
    if (error) {
      return res.status(400).json({ error });
    }

    
    this._companyService.create(createCompanyDto!, req.body.user)
      .then(empresa => res.status(201).json(empresa))
      .catch(error => this.handleError(error, res)); 
  };

  // actualizar
  update = async (req: Request, res: Response) => {
    const companyId = req.params.id;
    const [error, updateCompanyDto] = CompanyDto.create(req.body);
  
    if (error) {
      return res.status(400).json({ error });
    }
  
    this._companyService.update(companyId, updateCompanyDto!)
      .then(updatedCompany => res.status(200).json(updatedCompany))
      .catch(error => this.handleError(error, res));
  };
  
  // leer todos
  readAll = async (req: Request, res: Response) => {
    const {page = 1, limit = 10}= req.query
    const [error,paginationDto] = PaginationDto.create(+page,+limit)
    if (error) return res.status(400).json({error})
    // res.json(paginationDto)
    // PaginationDto
    this._companyService.readAll(paginationDto!)
    .then(empresas => res.status(201).json(empresas))
    .catch(error => this.handleError(error, res)); 
  };

  // leer por id
  readById = async (req: Request, res: Response) => {
    const companyId = req.params.id;
  
    this._companyService.read(companyId)
      .then(company => {
        if (!company) {
          throw CustomError.notFound("Company not found");
        }
        res.status(200).json(company);
      })
      .catch(error => this.handleError(error, res));
  };
  
  // eliminar por id
  delete = async (req: Request, res: Response) => {
    const companyId = req.params.id;
  
    this._companyService.delete(companyId)
      .then(() => res.status(204).send())
      .catch(error => this.handleError(error, res));
  };
  
}
