
export type PageProps<SLUG extends string | string[] | null = 'slug', SPK extends string | string[] | null = null> = {
  params: SLUG extends string
    ? { [key in SLUG]: string }
    : SLUG extends string[]
    ? { [key in SLUG[number]]: string[] }
    : SLUG extends null
    ? {}
    : {
        [key: string]: string | string[] | undefined;
      };
  searchParams: SPK extends string
    ? { [key in SPK]: string }
    : SPK extends string[]
    ? { [key in SPK[number]]: string[] }
    : SPK extends null
    ? {}
    : {
        [key: string]: string | string[] | undefined;
    };
};
