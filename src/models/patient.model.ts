import mongoose from 'mongoose';
import { Patient } from '../core/models';

export interface patientDocument extends Patient, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const patientSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    idNumber: { type: Number, required: false },
    name: { type: String, required: true },
    contactDetails: {
      email: { type: String, require: false },
      phoneNumber: { type: String, require: false },
      mobilePhoneNumber: { type: String, require: false },
      whatAppNumber: { type: String, require: false },
    },
    address: {
      street: { type: String, require: true },
      complexOrBuilding: { type: String, require: false },
      suburb: { type: String, require: true },
      cityOrTown: { type: String, require: true },
      province: { type: String, require: true },
      postalCode: { type: String, require: true },
    },
    
  },
  {
    timestamps: true,
  }
);

export const patientModel = mongoose.model<patientDocument>("Patient",patientSchema);
