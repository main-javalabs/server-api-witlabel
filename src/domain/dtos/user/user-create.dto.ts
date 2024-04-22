import { regularExps } from '../../../config'; // Asumiendo que tienes configuraciones de expresiones regulares para validaciones.

export class UserDto {
  name: string;
  email: string;
  emailValidated?: boolean; // Este campo es opcional en el DTO ya que tiene un valor predeterminado en el esquema.
  password: string;
  img?: string;
  role: string[];

  private constructor({ name, email, emailValidated, password, img, role }: { name: string; email: string; emailValidated?: boolean; password: string; img?: string; role: string[]; }) {
    this.name = name;
    this.email = email;
    this.emailValidated = emailValidated;
    this.password = password;
    this.img = img;
    this.role = role;
  }

  static create(input: any): [string?, UserDto?] {
    if (!input.name) return ['Falta el nombre', undefined];
    if (!input.email) return ['Falta el correo electrónico', undefined];
    if (!regularExps.email.test(input.email)) return ['El correo electrónico no es válido', undefined];
    if (!input.password) return ['Falta la contraseña', undefined];
    // La validación de roles depende de tus reglas de negocio. Aquí, asegúrate de que al menos existe un rol USER_ROLE o ADMIN_ROLE.
    if (!input.role || !input.role.length) return ['Faltan los roles', undefined];
    if (!input.role.includes('USER_ROLE') && !input.role.includes('ADMIN_ROLE')) return ['Roles no válidos', undefined];

    return [undefined, new UserDto({
      name: input.name,
      email: input.email,
      emailValidated: input.emailValidated,
      password: input.password,
      img: input.img,
      role: input.role,
    })];
  }
}
