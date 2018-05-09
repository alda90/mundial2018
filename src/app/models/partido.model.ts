export class Partido {

    constructor(
        public partido: string,
        public local: string,
        public visitante: string,
        public goleslocal: string,
        public golesvisitante: string,
        public estatus: string,
        public fase: string,
        public fecha: string,
        public hora: string,
        public ganador?: string,
        public conclusion?: string,
        public goleslocalp?: string,
        public golesvisitantep?: string,
        public grupo?: string,
        public estadio?: string,
        public _id?: string
    ) {}
}