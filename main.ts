import pkg from "xlsx";
import { z } from "zod";

const { readFile, utils, writeFile } = pkg;

export const InputRowSchema = z.object({
  col1: z.string(),
  col2: z.string(),
  col3: z.string(),
});

export type InputRowT = z.infer<typeof InputRowSchema>;

export const OutputRowSchema = z.object({
  col1: z.string(),
  col2: z.string(),
  col3: z.string(),
});

export type OutputRowT = z.infer<typeof OutputRowSchema>;

export const importXlsx = (file: string): InputRowT[] => {
  const { Sheets, SheetNames } = readFile(file);
  const firstSheetName = SheetNames[0];
  if (firstSheetName === undefined) {
    throw new Error("No sheet found in workbook");
  }
  const sheet = Sheets[firstSheetName];
  if (sheet === undefined) {
    throw new Error(`Sheet ${firstSheetName} not found`);
  }
  const rawData: unknown = utils.sheet_to_json(sheet);
  const parsed = z.array(InputRowSchema).safeParse(rawData);
  if (!parsed.success) {
    console.error("XLSX parsing validation error:\n", z.treeifyError(parsed.error));
    throw new Error(`Invalid row format in ${file}`);
  }
  return parsed.data;
};

export const parse = (data: InputRowT[]): OutputRowT[] =>
  data.map((row) => {
    /**
     * do something here
     */
    return row;
  });

export const exportXlsx = (result: OutputRowT[], outputFile = "data/result.xlsx") => {
  const sheet = utils.json_to_sheet(result);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, sheet, "result");
  writeFile(workbook, outputFile);
};

export const main = () => {
  const data = importXlsx("data/data.example.xlsx");
  const result = parse(data);
  exportXlsx(result);
};

if (process.env.NODE_ENV !== "test") {
  main();
}
