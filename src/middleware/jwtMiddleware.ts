import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../utils/jwt';

export const jwtMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ')[1];
    const result = await verifyJWT(token);
    if (result.success) {
      req.user = result.data;
      next();
    } else {
      res.status(401).json({ message: '인증에 실패하였습니다.' });
      return;
    }
  } else {
    res.status(401).json({ message: '인증에 실패하였습니다.' });
    return;
  }
};
