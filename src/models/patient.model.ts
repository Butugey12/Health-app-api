import bcrypt from "bcrypt";
import config from "config";
import mongoose from "mongoose";
import { Patient } from "../core/models";

export interface patientDocument extends Patient, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(patientPassword: string): Promise<Boolean>;
}

const patientSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    idNumber: { type: Number, required: false },
    name: { type: String, required: true },
    password: { type: String, required: false },
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

patientSchema.pre("save", async function (next: any) {
  let patient = this as patientDocument;

  if (!patient.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  const hash = await bcrypt.hashSync(patient.password!, salt);

  patient.password = hash;

  return next();
});

patientSchema.methods.comparePassword = async function (
  inputPassword: string
): Promise<Boolean> {
  let patient = this as patientDocument;

  return bcrypt
    .compare(inputPassword, patient.password!)
    .catch((e: any) => false);
};

export const patientModel = mongoose.model<patientDocument>(
  "patient",
  patientSchema
);
