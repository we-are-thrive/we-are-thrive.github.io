import { useEffect, useRef } from 'react';

export default function IndustryGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);

  useEffect(() => {
    // Dynamic import of globe.gl to avoid SSR issues
    const initGlobe = async () => {
      if (!containerRef.current) return;
      
      const Globe = (await import('globe.gl')).default;
      
      const points = [
        {
          lat: 40.7128,
          lng: -74.0060,
          name: "Healthcare",
          description: "60% faster diagnostics",
          value: 60
        },
        {
          lat: 51.5074,
          lng: -0.1278,
          name: "Finance",
          description: "99.9% fraud detection",
          value: 80
        },
        {
          lat: 35.6762,
          lng: 139.6503,
          name: "Manufacturing",
          description: "45% less downtime",
          value: 45
        },
        {
          lat: 1.3521,
          lng: 103.8198,
          name: "Research",
          description: "50% faster research cycles",
          value: 50
        }
      ];

      const arcs = points.map((point, i) => {
        const target = points[(i + 1) % points.length];
        return {
          startLat: point.lat,
          startLng: point.lng,
          endLat: target.lat,
          endLng: target.lng,
          color: [110, 58, 219]
        };
      });

      const globe = Globe()
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
        .backgroundColor('rgba(0,0,0,0)')
        .pointsData(points)
        .pointColor(() => '#6E3ADB')
        .pointAltitude(0.1)
        .pointRadius(2)
        .pointLabel(d => `
          <div class="globe-tooltip">
            <h3>${d.name}</h3>
            <p>${d.description}</p>
          </div>
        `)
        .arcsData(arcs)
        .arcColor('color')
        .arcStroke(0.5)
        .arcDashLength(0.4)
        .arcDashGap(0.2)
        .arcDashAnimateTime(2000)
        .width(containerRef.current.clientWidth)
        .height(containerRef.current.clientHeight);

      globe(containerRef.current);
      globeRef.current = globe;

      // Auto-rotate
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.5;

      // Handle resize
      const handleResize = () => {
        if (containerRef.current) {
          globe
            .width(containerRef.current.clientWidth)
            .height(containerRef.current.clientHeight);
        }
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    };

    initGlobe();
  }, []);

  return (
    <>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      <style>{`
        .globe-tooltip {
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: white;
          padding: 1rem;
          font-family: var(--font-primary);
        }
        .globe-tooltip h3 {
          margin: 0 0 0.5rem;
          font-size: 1rem;
          color: var(--color-accent);
        }
        .globe-tooltip p {
          margin: 0;
          font-size: 0.875rem;
          opacity: 0.8;
        }
      `}</style>
    </>
  );
} 