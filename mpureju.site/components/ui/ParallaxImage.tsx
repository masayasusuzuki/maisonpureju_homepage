"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
}

export function ParallaxImage({ src, alt }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // スクロール進行に合わせて画像を上下に移動（-15% → +15%）
  // ページより遅く動くことで「ねっとり」パララックス感が出る
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className="relative h-[60vh] overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="absolute inset-0 w-full h-[130%] -top-[15%] object-cover object-center"
      />
    </div>
  );
}
