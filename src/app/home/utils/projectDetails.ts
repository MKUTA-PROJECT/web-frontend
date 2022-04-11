import { countRegisterInterface } from "./interfaces";


export const projectDetails  =(a,b,c,d): countRegisterInterface[] =>{
  return  [
    { name: 'projects', count: a },
    { name: 'clubs', count: b },
    { name: 'members', count: c },
    { name: 'staffs', count: d },
  ];
}