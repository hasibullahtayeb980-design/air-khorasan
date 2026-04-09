export const setObjectValueByPath = (obj: Record<string, any>, path: string, value: any) => {
  let schema = obj;

  const keys = path.split('.');
  const len = keys.length;

  for (let i = 0; i < len - 1; i++) {
    const elem = keys[i];

    if (!schema[elem]) schema[elem] = {};
    schema = schema[elem];
  }

  schema[keys[len - 1]] = value;
}