/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
import { NextApiRequest } from 'next';

// Interface to defining our object of response functions
export interface ResponseFuncs {
  GET?: Function;
  POST?: Function;
  PUT?: Function;
  DELETE?: Function;
}

export interface ResquestBasic {
  id?: number;
}

export interface ReqIdExtendedNextApi<T = any> extends NextApiRequest {
  query: {
    id: string;
  };
  body: T;
  method: keyof ResponseFuncs;
}
