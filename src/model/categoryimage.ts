const categoryImages = import.meta.glob("../assets/category/*.svg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const imageMap: { [key: string]: string } = {};

Object.entries(categoryImages).forEach(([path, module]) => {
  const filename = path.split("/").pop()?.replace(".svg", "");
  if (filename) imageMap[filename] = module;
});

export default imageMap;
