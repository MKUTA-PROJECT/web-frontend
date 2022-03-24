
interface countRegisterInterface {
    name: string;
    count: number;
  }
  
  interface countInterface {
    projectCount: number;
    clubCount: number;
    memberCount: number;
    staffCount: number;
    supervisorCount: number;
  }

  export type {countInterface, countRegisterInterface}