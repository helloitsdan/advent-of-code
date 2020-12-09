export function* readNumberStream(file: string) {
  const lineRegex = /(.*)\n/gm;
  const raw = Deno.readTextFileSync(file);
  let line;

  while ((line = lineRegex.exec(raw))) {
    yield parseInt(line[0]);
  }

  return null;
}

export type NumberStream = ReturnType<typeof readNumberStream>;
export default () => readNumberStream("./data/numberstream.txt");
