import mongoose from "mongoose";
import { object, string, TypeOf, z } from "zod";
import { ObjectBody } from "../core/helpers";
import { Provinces } from "../core/enums";

const ProvinceEnum = z.nativeEnum(Provinces);
export const createPatientSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }).min(1, {
      message: "Can't be empty",
    }),
    email: string({ required_error: "Email is Required" }).email(
      "Not a valid email"
    ),
    ContactDetails: object({
      phoneNumber: string().optional(),
      mobilePhoneNumber: string().optional(),
      whatsAppNumber: string().optional(),
    })
      .strict()
      .optional(),

    address: object({
      cityOrTown: string({ required_error: "City or Town is required" }).min(
        1,
        { message: "Can't be empty" }
      ),
      complexOrBuilding: string().optional(),
      postalCode: string({ required_error: "Postal Code is required" }).min(1, {
        message: "Can't be empty",
      }),
      province: ProvinceEnum,
      street: string({ required_error: "Street is required" }).min(1, {
        message: "Can't be empty",
      }),
      suburb: string({ required_error: "Suburb is required" }).min(1, {
        message: "Can't be empty",
      }),
    }).optional(),
  }).strict(),
});

export const updatePatientsSchema = object({
  query: object({
    _id: string()
      .optional()
      .refine(
        (_id) => _id === undefined || mongoose.Types.ObjectId.isValid(_id),
        { message: "Not a valid id" }
      ),
    name: string().optional(),
  })
    .strict()
    .refine((data) => !ObjectBody.isEmpty(data._id, data.name), {
      message: "Query cannot be empty.",
    }),
  body: object({
    name: string({ required_error: "Name is required" })
      .min(1, { message: "Can't be empty" })
      .optional(),
    email: string({ required_error: "Email is Required" })
      .email("Not a valid email")
      .optional(),
    contactDetails: object({
      email: string().email("Not a valid email.").optional(),
      phoneNumber: string().optional(),
      mobilePhoneNumber: string().optional(),
      whatsAppNumber: string().optional(),
    })
      .strict()
      .optional(),

    address: object({
      cityOrTown: string().optional(),
      complexOrBuilding: string().optional(),
      postalCode: string().optional(),
      province: ProvinceEnum.optional(),
      street: string().optional(),
      suburb: string().optional(),
    }).optional(),
  })
    .strict()
    .refine(
      (data) =>
        !ObjectBody.isEmpty(
          data.email,
          data.name,
          data.address,
          data.contactDetails
        ),
      {
        message: "Update body cannot be empty.",
      }
    ),
});

// export const updatePatientSchema = object({
//     params: object({
//         _id: string({required_error:" Patient id is required"}).refine((_id)=>mongoose.Types.ObjectId.isValid(_id),{message:"Not a valid id"}),

//     }).strict(),

//     body: object({
//         name: string({required_error:"Name is required"}).min(1 , {message: "Can't be empty"}).optional(),
//         email: string({required_error:"Email is Required" }).email("Not a valid email").optional(),
//         contactDetails: object({
//             email: string().email("Not a valid email.").optional(),
//             phoneNumber:string().optional(),
//             mobilePhoneNumber:string().optional(),
//             whatsAppNumber: string().optional(),
//         }).strict().optional(),
//         address: object({
//             cityOrTown:string().optional(),
//             complexOrBuilding: string().optional(),
//             postalCode: string().optional(),
//             province: ProvinceEnum.optional(),
//             street: string().optional(),
//             suburb: string().optional(),
//         }).optional(),
//     }).strict().refine((data)=> !ObjectBody.isEmpty(
//         data.email,
//         data.name,
//         data.address,
//         data.contactDetails,
//     ),
//     {
//         message: "Update body can not be empty.",
//     }
//     ),
// })
export const getPatientsSchema = object({
  query: object({
    _id: string()
      .optional()
      .refine(
        (_id) => _id === undefined || mongoose.Types.ObjectId.isValid(_id),
        { message: "Not a valid id" }
      ),
    name: string().optional(),
  }).strict(), // no refine here? why? maybe there should be
});

// export const getPatientSchema = object({
//     params: object({
//         _id: string({required_error:"Patient id is required"}).refine((_id)=>mongoose.Types.ObjectId.isValid(_id), {message: "Not a valid id."})
//     }).strict()
// })

export const deletePatientsSchema = object({
  query: object({
    _id: string()
      .optional()
      .refine(
        (_id) => _id == undefined || mongoose.Types.ObjectId.isValid(_id),
        { message: "Not a valid id" }
      ),
    name: string().optional(),
  })
    .strict()
    .refine((data) => !ObjectBody.isEmpty(data._id, data.name), {
      message: "Query cannot be empty",
    }),
});

export type createPatientData = TypeOf<typeof createPatientSchema>;
export type updatePatientsData = TypeOf<typeof updatePatientsSchema>;
//export type updatePatientData = TypeOf<typeof updatePatientSchema>;
export type getPatientsQuery = TypeOf<typeof getPatientsSchema>;
//export type getPatientQuery = TypeOf<typeof getPatientSchema>;
export type deletePatientsQuery = TypeOf<typeof deletePatientsSchema>;
