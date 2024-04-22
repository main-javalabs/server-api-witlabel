import { Response, Request } from "express";
import { UserDto, CustomError, PaginationDto,UserUpdateDto } from "../../../domain";
import { UserService } from "../services/user.service";

export class UserController {
  constructor( private readonly _userService:UserService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  // crear user
  create = async (req: Request, res: Response) => {
    const [error, createUserDto] = UserDto.create(req.body);
    
    if (error) {
      return res.status(400).json({ error });
    }

    
    this._userService.create(createUserDto!, req.body.user)
      .then(empresa => res.status(201).json(empresa))
      .catch(error => this.handleError(error, res)); 
  };

  // actualizar
  update = async (req: Request, res: Response) => {
    const UserId = req.params.id;
    const [error, updateUserDto] = UserUpdateDto.update(req.body);
  
    if (error) {
      return res.status(400).json({ error });
    }
  
    this._userService.update(UserId, updateUserDto!)
      .then(updatedUser => res.status(200).json(updatedUser))
      .catch(error => this.handleError(error, res));
  };
  
  // leer todos
  readAll = async (req: Request, res: Response) => {
    const {page = 1, limit = 10}= req.query
    const [error,paginationDto] = PaginationDto.create(+page,+limit)
    if (error) return res.status(400).json({error})
    // res.json(paginationDto)
    // PaginationDto
    this._userService.readAll(paginationDto!)
    .then(users => res.status(201).json(users))
    .catch(error => this.handleError(error, res)); 
  };

  // leer por id
  readById = async (req: Request, res: Response) => {
    const userId = req.params.id;
  
    this._userService.read(userId)
      .then(user => {
        if (!user) {
          throw CustomError.notFound("User not found");
        }
        res.status(200).json(user);
      })
      .catch(error => this.handleError(error, res));
  };
  
  // eliminar por id
  delete = async (req: Request, res: Response) => {
    const userId = req.params.id;
  
    this._userService.delete(userId)
      .then(() => res.status(204).send())
      .catch(error => this.handleError(error, res));
  };
  
}
