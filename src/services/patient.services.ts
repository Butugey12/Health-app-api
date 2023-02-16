import { FilterQuery, UpdateQuery } from "mongoose";
import { Patient } from "../core/models";
import { patientDocument, patientModel } from "../models";

export async function createPatient(patientArg: Patient) {
  try {
    const patient = await patientModel.create(patientArg);
    return patient.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
}

// export  async function getPatient(query:FilterQuery<patientDocument>) {
//     const patient = await patientModel.findOne(query).exec();
//     return patient;
// }

export async function getPatients(query: FilterQuery<patientDocument>) {
  return patientModel.find(query).lean();
}

// export async function updatePatient(query:FilterQuery<patientDocument>, update:UpdateQuery<patientDocument>){
//     try {
//         return await patientModel.updateOne(query, update);
//       } catch (error: any) {
//         throw new Error(error);
//       }
// }

export async function updatePatients(
  query: FilterQuery<patientDocument>,
  update: UpdateQuery<patientDocument>
) {
  try {
    return await patientModel.updateMany(query, update);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deletePatients(query: FilterQuery<patientDocument>) {
  return await patientModel.deleteMany(query);
}
