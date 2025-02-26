export const filterValues = <T extends Record<string, any>>(
  obj: any,
): Partial<T> => {
  const keys = Object.keys(obj).filter(key => key in obj) as (keyof T)[];

  return Object.fromEntries(
    Object.entries(obj).filter(
      ([key, value]) =>
        value !== null && value !== '' && keys.includes(key as keyof T),
    ),
  ) as Partial<T>;
};
