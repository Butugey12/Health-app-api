import { Provinces } from '../enums';

export interface Address {
    street: string;
    complexOrBuilding?: string;
    cityOrTown: string;
    suburb: string;
    province: Provinces;
    postalCode: string;
    
};