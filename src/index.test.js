describe("demo", () => {
  beforeEach(() => {
    vi.resetModules();
    global.sessionStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
    };
  });

  it("mount", async () => {
    document.body.innerHTML = "<div id=root></div>";
    await import("./index");
    expect(document.body.innerHTML).toContain("App");
  });

  it("no mount", async () => {
    document.body.innerHTML = "";
    await import("./index");
    expect(document.body.innerHTML).toBe("");
  });
});
