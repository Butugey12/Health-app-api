import patientRouters from './patient.route';
import { Express } from 'express';

function routes(app:Express) {
    patientRouters(app);
}

export default routes;