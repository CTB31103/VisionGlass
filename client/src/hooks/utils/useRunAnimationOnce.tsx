import {
  type AnimationScope,
  animate,
  useAnimate,
  useInView,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { type RefObject, useEffect, useRef, useState } from "react";

// Straight from motion/react index.d.ts
type SupportedEdgeUnit = "px" | "vw" | "vh" | "%";
type EdgeUnit = `${number}${SupportedEdgeUnit}`;
type NamedEdges = "start" | "end" | "center";
type EdgeString = NamedEdges | EdgeUnit | `${number}`;
type Edge = EdgeString | number;
type ProgressIntersection = [number, number];
type Intersection = `${Edge} ${Edge}`;
type ScrollOffset = Array<Edge | Intersection | ProgressIntersection>;

export type AnimationFunction = typeof animate;

type UseRunAnimationOnceProps = {
  container?: RefObject<HTMLElement> | undefined;
  scrollOffset?: ScrollOffset;
  startAnimationAfter?: number;
  runAnimation: (ani: AnimationFunction) => Promise<void> | void;
  resetAnimation: (ani: AnimationFunction) => Promise<void> | void;
};

export const useRunAnimationOnce = ({
  runAnimation,
  resetAnimation,
  container,
  scrollOffset = ["start end", "end end"],
  startAnimationAfter = 0.5,
}: UseRunAnimationOnceProps): [
  AnimationScope<HTMLDivElement>,
  () => void,
  AnimationFunction,
] => {
  const clicked = useRef(0);

  const [scrollRef, animate] = useAnimate();

  const inView = useInView(scrollRef, {
    amount: startAnimationAfter,
  });

  const { scrollYProgress } = useScroll({
    target: container ? container : scrollRef,
    offset: scrollOffset,
  });

  const [allowAnimation, setAllowAnimation] = useState(true);
  const [animationRan, setAnimationRan] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 1) {
      setAllowAnimation(false);
    }

    if (latest <= 0) {
      setAllowAnimation(true);
    }
  });

  useEffect(() => {
    const run = async () => {
      await runAnimation(animate);
      setAnimationRan(true);
    };

    const reset = async () => {
      await resetAnimation(animate);
      setAnimationRan(false);
    };

    const handleEffect = async () => {
      if (!animationRan && !allowAnimation) {
        await run();
      }

      if (!allowAnimation) return;

      if (inView) await run();
      else await reset();
    };

    handleEffect();
  }, [
    inView,
    animate,
    resetAnimation,
    runAnimation,
    allowAnimation,
    animationRan,
  ]);

  const test = () => {
    if (clicked.current % 2 === 0) runAnimation(animate);
    else resetAnimation(animate);
    clicked.current += 1;
  };

  return [scrollRef, test, animate];
};
