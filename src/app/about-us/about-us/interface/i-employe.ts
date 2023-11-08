import { IImage } from "src/app/shared/interface/i-image";

export interface IEmploye {
    fullName: string;
    position: string;
    description: string;
    image: IImage;
}