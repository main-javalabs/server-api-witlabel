import { Attachment } from "nodemailer/lib/mailer";
import CompanyModel from "../../../data/mongo/models/company.model";
import {
  CompanyDto,
  CustomError,
  PaginationDto,
  UpdateCompanyDto,
  UserEntity,
} from "../../../domain";

export class CompanyService {
  constructor( ) {}

  async create(createCompanyDto: CompanyDto, user: UserEntity) {
    const companyExist = await CompanyModel.findOne({
      nombre: createCompanyDto.nombre,
    });
    if (companyExist) throw CustomError.badRequest("Company alreadt exists");

    try {
      const empresa = new CompanyModel({
        ...createCompanyDto,
        user: user.id,
      });

      await empresa.save();

      return {
        ...empresa.toObject(), 

      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  // async update(companyId: string, updateCompanyDto: UpdateCompanyDto) {
  //   const company = await CompanyModel.findById(companyId);
  //   if (!company) throw CustomError.notFound("Company not found");

  //   company.set(updateCompanyDto);

  //   await company.save();

  //   return {
  //     ...company.toObject(), // Incluye toda la información de la empresa actualizada


  //   };
  // }

  // async sendDocumentsByEmail(companyId: string, documents: Attachment[]): Promise<boolean> {
  //   try {
  //     const company = await CompanyModel.findById(companyId);
  //     if (!company) {
  //       throw CustomError.notFound("Empresa no encontrada");
  //     }

  //     if (!company.email) {
  //       throw CustomError.badRequest("La empresa no tiene un correo electrónico registrado");
  //     }

  //     // Filtrar documentos para asegurar que filename sea un string válido
  //     const validAttachments = documents.filter(doc => typeof doc.filename === 'string' && doc.filename);

  //     if (validAttachments.length === 0) {
  //       console.log("No hay documentos válidos para enviar.");
  //       return false; // O manejar de otra manera según tu lógica de aplicación
  //     }

  //     const emailOptions = {
  //       to: company.email, // El correo electrónico de la empresa
  //       subject: 'Documentos Importantes de la Empresa',
  //       htmlBody: `<h1>Documentos Importantes</h1><p>Por favor, encuentra adjuntos los documentos importantes de tu empresa.</p>`,
  //       attachments: validAttachments, // Los documentos filtrados a adjuntar
  //     };
      
  //     // Llama al método de EmailServiceDoc pasando las opciones de correo
  //     const emailSent = await this.emailServiceDoc.sendFinancialDocuments(emailOptions.to, emailOptions.attachments);
  //     if (!emailSent) {
  //       throw new Error('El correo no pudo ser enviado');
  //     }

  //     return true;
  //   } catch (error) {
  //     console.error("Error al enviar documentos por correo electrónico:", error);
  //     return false;
  //   }
  // }

  async update(companyId: string, updateCompanyDto: UpdateCompanyDto) {
    const company = await CompanyModel.findById(companyId);
    if (!company) throw CustomError.notFound("Empresa no encontrada");
  
    try {
      Object.assign(company, updateCompanyDto);
      await company.save();
  
      return {
        ...company.toObject(), // Incluye toda la información de la empresa actualizada
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  

  // async read(companyId: string) {
  //   const company = await CompanyModel.findById(companyId);
  //   if (!company) throw CustomError.notFound("Company not found");

  //   return {
  //     id: company.id,
  //     nombre: company.nombre,
  //     disponible: company.disponible,
  //   };
  // }

  async read(companyId: string) {
    const company = await CompanyModel.findById(companyId);
    if (!company) throw CustomError.notFound("Empresa no encontrada");
  
    return {
      ...company.toObject(), // Envía todos los datos de la empresa
    };
  }

  


  // async readAll(paginationDto: PaginationDto) {
  //   const { page, limit } = paginationDto;

  //   try {
  //     const [total, empresas] = await Promise.all([
  //       CompanyModel.countDocuments(),
  //       CompanyModel.find()
  //         .skip((page - 1) * limit)
  //         .limit(limit),
  //     ]);
  //     return {
  //       page: page,
  //       limit: limit,
  //       total:total,
  //       next: `/api/company/read-all?page=${page+1}&limit=${limit}`,
  //       prev: (page -1 >0) ? `/api/company/read-all?page=${page-1}&limit=${limit}`:null,
  //       empresas: empresas.map((empresa) => ({
  //         id: empresa.id,
  //         nombre: empresa.nombre,
  //         disponible: empresa.disponible,
  //       })),
  //     };
  //   } catch (error) {
  //     throw CustomError.internalServer(`${error}`);
  //   }
  // }
  async readAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
  
    try {
      const [total, empresas] = await Promise.all([
        CompanyModel.countDocuments(),
        CompanyModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .lean() // Usa lean() para mejorar el rendimiento cuando solo se necesitan los objetos JSON
      ]);
  
      return {
        page,
        limit,
        total,
        next: total > page * limit ? `/api/company/read-all?page=${page + 1}&limit=${limit}` : null,
        prev: page > 1 ? `/api/company/read-all?page=${page - 1}&limit=${limit}` : null,
        empresas, // Envía el array de empresas tal como está
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
  

  // async delete(companyId: string) {
  //   const company = await CompanyModel.findByIdAndDelete(companyId);
  //   if (!company) throw CustomError.notFound("Company not found");

  //   return { message: "Company deleted successfully" };
  // }

  async delete(companyId: string) {
    const company = await CompanyModel.findByIdAndDelete(companyId);
    if (!company) throw CustomError.notFound("Empresa no encontrada");
  
    return {
      message: "Empresa eliminada con éxito",
      companyId: company.id, // Proporciona el ID de la empresa eliminada para confirmación
    };
  }
  
}
