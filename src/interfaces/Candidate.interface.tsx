// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    readonly id: number | null;
    readonly login: string | null;
    readonly name?: string | null;
    readonly location?: string | null;
    readonly avatar_url: string | null;
    readonly email?: string | null;
    readonly html_url: string | null;
    readonly company?: string | null;
    
    
    
//     login: string;
//     name?: string;
//     location?: string;
//     avatar_url: string;
//     email?: string;
//     html_url: string;
//     company?: string;
  }
  
  