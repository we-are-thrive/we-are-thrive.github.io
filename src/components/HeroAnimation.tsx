import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number; // Track number of connections
}

const HeroAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Network parameters
    const nodes: Node[] = [];
    const nodeCount = Math.floor(window.innerWidth / 40); // More nodes
    const connectionDistance = 200; // Increased connection distance
    const nodeSpeed = 0.3; // Slightly slower for smoother movement
    const minConnections = 2; // Minimum connections per node

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * nodeSpeed,
        vy: (Math.random() - 0.5) * nodeSpeed,
        connections: 0
      });
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Reset connection counts
      nodes.forEach(node => {
        node.connections = 0;
      });

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Keep within bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Find and sort potential connections by distance
        const potentialConnections = nodes
          .slice(i + 1)
          .map(otherNode => {
            const dx = otherNode.x - node.x;
            const dy = otherNode.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return { otherNode, distance };
          })
          .filter(({ distance }) => distance < connectionDistance)
          .sort((a, b) => a.distance - b.distance);

        // Draw connections
        potentialConnections.forEach(({ otherNode, distance }) => {
          // Connect if either node needs more connections
          if (node.connections < minConnections || otherNode.connections < minConnections) {
            const opacity = 1 - (distance / connectionDistance);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = `rgba(110, 58, 219, ${opacity * 0.5})`;
            ctx.lineWidth = opacity * 1.5;
            ctx.stroke();

            // Increment connection count for both nodes
            node.connections++;
            otherNode.connections++;
          }
        });

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        // Color nodes based on connection count
        const alpha = 0.4 + (node.connections * 0.2); // More connections = brighter
        ctx.fillStyle = `rgba(110, 58, 219, ${alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.6,
      }}
    />
  );
};

export default HeroAnimation; 