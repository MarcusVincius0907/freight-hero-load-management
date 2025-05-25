
/* 
    Note: Using type instead of enum because of Lightweight code, no need mapping for JSON and Zod Frendly
*/
export type LoadStatus = "in route" | "pick up" | "delivered";

export interface Load {
  id: number;
  status: LoadStatus;
  origin: string;
  destination: string;
  client_name: string;
  carrier_name: string;
}

export interface ColumnFilters {
    status: string[]
    origin: string[]
    destination: string[]
    client_name: string[]
    carrier_name: string[]
}

export type SortOrder = 'asc' | 'desc' | '';