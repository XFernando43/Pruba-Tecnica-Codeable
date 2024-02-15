import { Response } from "express";

export class ApiError extends Error{
    status:number;
    details?: Record<string,any>;

    constructor(message:string, status:number, details?:Record<string,any>){
        super(message);
        this.status=status;
        this.details=details;
    }

    static response(res:Response,message:string, stauts:number){
        res.status(stauts).json({
            ok:false,
            message:message
        })
    }
}

