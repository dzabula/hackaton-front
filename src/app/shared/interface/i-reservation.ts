export interface IReservation {
    id:number,
    apartmentId: number,
    title: string,
    userId: number,
    from: Date,
    to:Date,
    fullName: string,
    phone: string,
    createdAt:string,
    amount: number,
    isPaid: boolean,
    cancelled: boolean
}
