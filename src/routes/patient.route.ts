import {
    createPatientHandler,
    deletePatientsHandler,
    getPatientsHandler,
    updatePatientsHandler
    } from '../controllers';
import {
    createPatientSchema,
    deletePatientsSchema,
    getPatientsSchema,
    updatePatientsSchema
    } from '../schemas';
import { Express } from 'express';
import { validateResource } from '../middlewares';



function patientRouters(app:Express){
    app.post("/api/patients" , validateResource(createPatientSchema),createPatientHandler);
    app.get("/api/patients" , validateResource(getPatientsSchema), getPatientsHandler);
    app.patch("/api/patients" , validateResource(updatePatientsSchema), updatePatientsHandler);
    app.delete("/api/patients" , validateResource(deletePatientsSchema),deletePatientsHandler);
}


export default patientRouters;