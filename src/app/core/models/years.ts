export enum Years {
    CurrentYear = new Date().getFullYear(),
    PREVIOUS_YEAR = CurrentYear - 1,
    PREVIOUS_2_YEARS = CurrentYear - 2,
    NEXT_YEAR = CurrentYear + 1,
    NEXT_2_YEARS = CurrentYear + 2,
    NEXT_3_YEARS = CurrentYear + 3,
    NEXT_4_YEARS = CurrentYear + 4,
    NEXT_5_YEARS = CurrentYear + 5,
  }