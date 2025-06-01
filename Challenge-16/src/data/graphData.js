const rawNodes = [
  { id: "Bogotá", city: true },
  { id: "Medellín", city: true },
  { id: "Juan", age: 25, city: "Bogotá" },
  { id: "Ana", age: 30, city: "Bogotá" },
  { id: "Carlos", age: 27, city: "Medellín" },
];

// Verificación: solo incluir enlaces válidos
const validNodeIds = new Set(rawNodes.map(n => n.id));

const rawLinks = [
  { source: "Juan", target: "Bogotá" },
  { source: "Ana", target: "Bogotá" },
  { source: "Carlos", target: "Medellín" },
  // { source: "Inexistente", target: "CiudadX" }, ← esto causaría error
];

const links = rawLinks.filter(
  l => validNodeIds.has(l.source) && validNodeIds.has(l.target)
);

export const graphData = {
  nodes: rawNodes,
  links,
};
