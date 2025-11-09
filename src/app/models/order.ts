import { Cart } from "./cart";


export type Order ={
    id:string;
    userId:string;
    total:number;
    items: Cart[];
    paymentStatus: 'success' | 'failure';
}