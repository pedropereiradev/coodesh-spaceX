export interface IStats {
  launchesByYear: ILaunchesByYear[];
  launchesByRocket: ILaunchesByRocket[];

  success: number;
  failure: number;
}

export interface ILaunchesByYear {
  year: number;
  rockets: {
    rocket: string;
    count: number;
  }[];
}

export interface ILaunchesByRocket {
  rocket: string;
  count: number;
}
