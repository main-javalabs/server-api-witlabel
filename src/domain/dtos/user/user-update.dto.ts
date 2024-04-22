
export class UserUpdateDto {
  name?: string;
  emailValidated?: boolean;
  img?: string;
  role?: string[];

  constructor({ name, emailValidated, img }: { name?: string; emailValidated?: boolean; img?: string; role?: string[]; }) {
    if (name !== undefined) this.name = name;
    if (emailValidated !== undefined) this.emailValidated = emailValidated;
    if (img !== undefined) this.img = img;
    // if (role !== undefined) this.role = role;
  }

  static update(input: any): [string?, UserUpdateDto?] {
  
    return [undefined, new UserUpdateDto(input)];
  }
}
