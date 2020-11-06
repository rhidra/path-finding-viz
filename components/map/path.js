export default function Path({points, cellSize}) {
  return (
    <>
    <polyline points={`${points.map(([x, y]) => `${x*cellSize},${y*cellSize} `)}`} stroke="red" fill="none"/>
    
    {points.map(([x, y], i) => (
      <circle cx={x*cellSize} cy={y*cellSize} r="2" key={i}
              fill={i === 0 ? '#2b6cb0' : '#4299e1'} stroke="#bee3f8" 
              className={i === 0 ? 'pointer' : ''}/>
    ))}
    
    </>
  );
}