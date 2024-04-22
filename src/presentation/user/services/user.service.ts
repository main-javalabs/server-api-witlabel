import {UserModel} from "../../../data/mongo/models/user.model";
import {
  UserDto,
  CustomError,
  PaginationDto,
  UserEntity,
  UserUpdateDto,
} from "../../../domain";

export class UserService {
  constructor() {}

  async create(createUserDto: UserDto, user: UserEntity) {
    const userExist = await UserModel.findOne({
      name: createUserDto.email,
    });
    if (userExist) throw CustomError.badRequest("User alreadt exists");

    try {
      const newUser = new UserModel({
        ...createUserDto,
        user: user.id,
      });

      await newUser.save();

      return {
        id: newUser.id,
        name: newUser.name,
        img: newUser.img,
        role: newUser.role,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  async update(Id: string, updateUserDto: UserUpdateDto) {
    const newUser = await UserModel.findById(Id);
    if (!newUser) throw CustomError.notFound("newUser not found");

    newUser.set(updateUserDto);

    await newUser.save();

    return {
      id: newUser.id,
      name: newUser.name,
    };
  }
  async read(Id: string) {
    const user = await UserModel.findById(Id);
    if (!user) throw CustomError.notFound("user not found");

    return {
      id: user.id,
      name: user.name,
      img: user.img,
      role: user.role,
    };
  }
  async readAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      const [total, users] = await Promise.all([
        UserModel.countDocuments(),
        UserModel.find()
          .skip((page - 1) * limit)
          .limit(limit),
      ]);
      return {
        page: page,
        limit: limit,
        total:total,
        next: `/api/user/read-all?page=${page+1}&limit=${limit}`,
        prev: (page -1 >0) ? `/api/user/read-all?page=${page-1}&limit=${limit}`:null,
        users: users.map((users) => ({
          id: users.id,
          name: users.name,
          email: users.email,
          emailValidate: users.emailValidated,
          img: users.img,
          role: users.role,
        })),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async delete(Id: string) {
    const user = await UserModel.findByIdAndDelete(Id);
    if (!user) throw CustomError.notFound("Company not found");

    return { message: "Company deleted successfully" };
  }
  
}
