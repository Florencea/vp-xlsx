import { describe, expect, it } from "vite-plus/test";
import { importXlsx, InputRowSchema, type InputRowT, OutputRowSchema, parse } from "./main.ts";

describe("template-xlsx-parser", () => {
  it("imports data from example xlsx correctly", () => {
    const rows = importXlsx("data/data.example.xlsx");
    expect(rows).toBeInstanceOf(Array);
    expect(rows.length).toBeGreaterThan(0);
    expect(rows[0]).toEqual({
      col1: "value1",
      col2: "value2",
      col3: "value3",
    });
  });

  it("parses rows through transform function", () => {
    const mockInput: InputRowT[] = [{ col1: "a", col2: "b", col3: "c" }];
    const result = parse(mockInput);
    expect(result).toEqual(mockInput);
  });

  describe("Zod runtime validation schemas", () => {
    it("validates valid input rows with InputRowSchema", () => {
      const valid = { col1: "foo", col2: "bar", col3: "baz" };
      const parsed = InputRowSchema.safeParse(valid);
      expect(parsed.success).toBe(true);
      if (parsed.success) {
        expect(parsed.data).toEqual(valid);
      }
    });

    it("rejects invalid input rows missing required fields", () => {
      const invalid = { col1: "foo" };
      const parsed = InputRowSchema.safeParse(invalid);
      expect(parsed.success).toBe(false);
    });

    it("validates valid output rows with OutputRowSchema", () => {
      const valid = { col1: "res1", col2: "res2", col3: "res3" };
      const parsed = OutputRowSchema.safeParse(valid);
      expect(parsed.success).toBe(true);
    });
  });
});
