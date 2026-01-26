export type FilterTypes = {
  result: string[] | null;
  loading: boolean;
  error: string;
};

export type ResultFilterTypes = {
  schema: {
    attributes: {
      brand: {
        enum: any;
      };
    };
  };
};