import {
  createPatientData,
  deletePatientsQuery,
  getPatientsQuery,
  updatePatientsData
  } from '../schemas/patient.schema';
import { HttpStatusCode } from './../core/enums/http-status-codes.enum';
import { log } from '../utils';
import { Request, Response } from 'express';
import {
  createPatient,
  deletePatients,
  getPatients,
  updatePatients,
  } from '../services';

export async function createPatientHandler(
  req: Request<{}, {}, createPatientData["body"]>,
  res: Response
) {
  try {
    const patient = await createPatient(req.body);
    return res.status(HttpStatusCode.OK).send(patient);
  } catch (error: any) {
    log.error(error);
    return res.status(HttpStatusCode.CONFLICT).send(error.message);
  }
}

export async function getPatientsHandler(
  req: Request<{}, {}, getPatientsQuery["query"]>,
  res: Response
) {
  try {
    const patients = await getPatients(req.query);
    return res.status(HttpStatusCode.OK).send(patients);
  } catch (error: any) {
    log.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
}



export async function updatePatientsHandler(  req: Request<{}, {}, updatePatientsData["body"], updatePatientsData["query"]>,
res: Response) {
  try{
    const patients = await updatePatients(req.query,req.body);
    return res.status(HttpStatusCode.OK).send(patients);
  }
  catch(error:any) {
    (error.message as string).includes("MongoServerError")
    ? res.status(HttpStatusCode.CONFLICT).send(error.message)
    : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message)
    
  }
}

export async function deletePatientsHandler(
  req: Request<{}, {}, deletePatientsQuery["query"]>,
  res: Response
) {
  try{
    const response = await deletePatients(req.query);
    return res.status(HttpStatusCode.OK).send(response);
  }
  catch(error:any) {
    log.error(error);
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error)
  }
}
























// export async function getPatientHandler(req: Request<getPatientQuery["params"]>,
// res: Response) {
//   try{
//     const patient = await getPatient(req.params);
//     return res.status(HttpStatusCode.OK).send(patient)
//   }
//   catch(error:any) {
//     log.error(error);
//     res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error);
//   }
// }

// export async function updatePatientHandler(req: Request<updatePatientData["params"], {}, updatePatientData["body"], {}>,
// res: Response) {
//   try{
 
//     const patients = await updatePatient(req.query, req.body);
//     return res.status(HttpStatusCode.OK).send(patients);
//   }
//   catch(error:any) {
//     (error.message as string).includes("MongoServerError")
//     ? res.status(HttpStatusCode.CONFLICT).send(error.message)
//     : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(error.message);   
//   }
// }