/**
 * This is interface of charcter Data object
 */
export interface CharacterDataModal {
  created: string;
  gender: string;
  id: number;
  image: string;
  location?: InnerDataObject;
  name?: string;
  episode?: any[];
  species: string;
  status: string;
  type: string;
  url: string;
  origin: InnerDataObject;
}

export interface InnerDataObject {
  name: string;
  url: string;
}
export interface OriginDataObject {
  created: string;
  dimension: string;
  id: number;
  name: string;
  residents: string[];
  type: string;
  url: string;
}

export interface LocationDataObject {
  created: string;
  dimension: string;
  id: number;
  name: string;
  residents: string[];
  type: string;
  url: string;
}
