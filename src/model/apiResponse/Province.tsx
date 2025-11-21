import type { WardsCommune } from "./WardsCommune";

export interface Province {
    id: number, 
    name: string,
    wardsDto: WardsCommune[]
}
