export type AdapterBag = number[];

export const readJoltages = (file: string): AdapterBag => {
  const raw = Deno.readTextFileSync(file);
  const adapters = raw.split(/\n/)
    .map((line) => parseInt(line))
    .sort((a, b) => a - b);

  /*
   * Add a fake adapter that represents the device,
   * always three joltage higher than the last adapter
   */
  adapters.push(adapters[adapters.length - 1] + 3);
  return adapters;
};

export default readJoltages("./data/joltages.txt");
