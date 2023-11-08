import { IThumb } from "src/app/shared/interface/i-thumb";
import { IImage } from "src/app/shared/interface/i-image";
import { IPrice } from "src/app/shared/interface/i-price";
import { ICategory } from "src/app/shared/interface/i-category";
import { ICity } from "src/app/shared/interface/i-city";
import { IComment } from "./i-comment";
import { ISpecifications } from "./i-specifications";
import { IRate } from "./i-rate";
import { IRooms } from "./i-rooms";

export interface IApartment {
    id: number;
    title: string;
    description: string;
    googleMap:string;
    file: IThumb;
    images: IImage[];
    price: IPrice;
    specPrices: any[];
    category: ICategory;
    city: ICity;
    rates: IRate[];
    comments: IComment[];
    room: IRooms;
    apartmentSpecifications: ISpecifications[];
    createdAt: string;
    roomId:number;
    priority: number;
    surface: number;
    floor: number;
    wifi:boolean;
    garage:boolean;
    minPerson: number;
    maxPerson: number;
    pricePerPerson: number;

}  

