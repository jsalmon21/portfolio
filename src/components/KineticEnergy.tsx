"use client";

import React, { useRef, useEffect } from "react";
import { useMousePosition } from "@/lib/mouse";
import { Circ, gsap } from "gsap";

interface KineticEnergyProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
}

export const KineticEnergy = ({ className = "" }: KineticEnergyProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const points = useRef<any[]>([]);
  const mousePosition = useMousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();
    window.addEventListener("resize", initCanvas);

    return () => {
      window.removeEventListener("resize", initCanvas);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onMouseMove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mousePosition.x, mousePosition.y]);

  const initCanvas = () => {
    resizeCanvas();
    drawPoints();
    for (let i = 0; i < points.current.length; i++) {
      shiftPoint(points.current[i]);
    }
  };

  const onMouseMove = () => {
    if (canvasRef.current) {
      mouse.current.x = mousePosition.x;
      mouse.current.y = mousePosition.y;
    }
  };

  const shiftPoint = (p: any) => {
    gsap.to(p, {
      duration: 1 + 1 * Math.random(),
      x: p.originX - 50 + Math.random() * 100,
      y: p.originY - 50 + Math.random() * 100,
      ease: Circ.easeInOut,
      onComplete: function () {
        shiftPoint(p);
      },
    });
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      points.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  };

  class Circle {
    private pos: { x: number; y: number } | null;
    private radius: number | null;
    private color: string | null;
    private active: boolean;

    constructor(pos?: { x: number; y: number }, rad?: number, color?: string) {
      this.pos = pos || null;
      this.radius = rad || null;
      this.color = color || null;
      this.active = true; // Assuming active is set to true by default
    }

    draw(): void {
      if (!this.active || !context.current) return;
      context.current.beginPath();
      if (this.pos) {
        context.current.arc(
          this.pos.x,
          this.pos.y,
          this.radius || 0,
          0,
          2 * Math.PI,
          false
        );
        context.current.fillStyle = `rgba(156, 217, 249, ${this.active})`;
        context.current.fill();
      }
    }
  }

  const drawPoints = () => {
    const { w, h } = canvasSize.current;

    for (let x = 0; x < w; x = x + w / 20) {
      for (let y = 0; y < h; y = y + h / 20) {
        let px = x + (Math.random() * w) / 20;
        let py = y + (Math.random() * h) / 20;
        let p = { x: px, originX: px, y: py, originY: py };
        points.current.push(p);
      }
    }

    // for each point find the 5 closest points
    for (let i = 0; i < points.current.length; i++) {
      let closest = [];
      let p1 = points.current[i];
      for (let j = 0; j < points.current.length; j++) {
        let p2 = points.current[j];
        if (!(p1 == p2)) {
          let placed = false;
          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (closest[k] == undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }

          for (let k = 0; k < 5; k++) {
            if (!placed) {
              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      }
      p1.closest = closest;
    }

    // assign a circle to each point
    for (let i = 0; i < points.current.length; i++) {
      const circle = new Circle(
        points.current[i],
        2 + Math.random() * 2,
        "rgba(255,255,255,0.3)"
      );
      points.current[i].circle = circle;
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h
      );
    }
  };

  const getDistance = (p1: any, p2: any) => {
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  };

  const drawLines = (p: any) => {
    if (!p.active || !context.current) return;
    for (var i in p.closest) {
      context.current.beginPath();
      context.current.moveTo(p.x, p.y);
      context.current.lineTo(p.closest[i].x, p.closest[i].y);
      context.current.strokeStyle = "rgba(255,255,255," + p.active + ")";
      context.current.stroke();
    }
  };

  const animate = () => {
    if (!context.current) return;
    clearContext();

    points.current.forEach((point, i) => {
      // detect points in range
      if (Math.abs(getDistance(mouse.current, point)) < 4000) {
        points.current[i].active = 0.3;
        points.current[i].circle.active = 0.6;
      } else if (Math.abs(getDistance(mouse.current, point)) < 20000) {
        points.current[i].active = 0.1;
        points.current[i].circle.active = 0.3;
      } else if (Math.abs(getDistance(mouse.current, point)) < 40000) {
        points.current[i].active = 0.02;
        points.current[i].circle.active = 0.1;
      } else {
        points.current[i].active = 0;
        points.current[i].circle.active = 0;
      }

      drawLines(points.current[i]);
      points.current[i].circle.draw();
    });

    window.requestAnimationFrame(animate);
  };

  return (
    <div className={className} ref={canvasContainerRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
};
