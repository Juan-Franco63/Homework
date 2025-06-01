import { Graph } from "react-d3-graph";
import { graphData } from "../data/graphData";

// Validación en consola
const allNodeIds = new Set(graphData.nodes.map(n => n.id));
const invalidLinks = graphData.links.filter(
  l => !allNodeIds.has(l.source) || !allNodeIds.has(l.target)
);
console.log("📌 NODOS:", graphData.nodes);
console.log("📌 LINKS:", graphData.links);
console.log("🚨 ENLACES INVÁLIDOS:", invalidLinks);

const graphConfig = {
  nodeHighlightBehavior: true,
  staticGraph: false,
  node: {
    color: "lightblue",
    size: 800,
    highlightStrokeColor: "blue",
    fontSize: 16,
    fontColor: "#ffffff", // 👈 Aquí se corrige el color de las letras
    labelProperty: node =>
      node
        ? node.city
          ? `${node.id} (Ciudad)`
          : `${node.id} (${node.age ?? "Edad desconocida"})`
        : "Nodo inválido"
  },
  link: {
    highlightColor: "lightblue"
  },
  d3: {
    gravity: -300,
    linkLength: 150,
    alphaTarget: 0.05
  },
  directed: false
};

export default function FriendCityGraph() {
  return (
    <div>
      <h2>Grafo de ciudades</h2>
      <Graph
        id="graph-id"
        data={graphData}
        config={graphConfig}
        onClickNode={(nodeId) => console.log("Clic en nodo:", nodeId)}
      />
    </div>
  );
}
