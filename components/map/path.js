import { useEffect, useState } from "react";

export default function Path({path, nodes, cellSize}) {
  const [nodesPts, setNodesPts] = useState([]);

  useEffect(() => setNodesPts(nodes.map(node => formatParent(node))), [nodes]);

  const formatParent = (node) => {
    const pts = `${node.pos[0] * cellSize},${node.pos[1] * cellSize} `;
    if (!node.parent) {
      return pts;
    }
    return `${pts}${formatParent(node.parent)}`;
  }

  return (
    <>
    
    {path.map(([x, y], i) => (
      <circle cx={x*cellSize} cy={y*cellSize} r="2" key={i} stroke="#bee3f8"/>
    ))}

    {nodesPts.map((node, i) => (
      <polyline key={i} points={node} stroke="green" fill="none"/>
    ))}

    <polyline points={`${path.map(([x, y]) => `${x*cellSize},${y*cellSize} `)}`} stroke="red" fill="none" strokeWidth="3"/>
    </>
  );
}