export type User ={
    id:string;
    name:string;
    email:string;
    imageUrl?:string;
}

export type UserSignUp = {
    name:string;
    email:string;
    password:string;
    checkout?: boolean;
    dialogId?: string;
}

export type UserSignIn = Omit<UserSignUp, 'name'>;