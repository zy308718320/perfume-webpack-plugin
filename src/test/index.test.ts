import PerfumeWebpackPlugin from "../index";
test("My PerfumeWebpackPlugin", () => {
  const perfumeWebpackPlugin = new PerfumeWebpackPlugin();
  expect(perfumeWebpackPlugin.say("World")).toBe("Hello World");
});
