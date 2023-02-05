import jwt, { JsonWebTokenError } from "jsonwebtoken";
import express, {NextFunction, Request, Response} from "express";

// Middleware function to authenticate requests
export const authenticate = (req:Request, res:Response, next:NextFunction) => {
    // get token from the headers
    const authorization = req.headers.authorization;
    const token = req.body.token || req.query.token || req.params.token || authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({status:401, message:"Access Denied. No Token Provided."});
    }
  
    try {
      jwt.verify(token, process.env.JWT_SECRET as string);
      next();
    } catch (ex) {
      return res.status(400).json({status:400, message:"Invalid Token"});
    }
  };