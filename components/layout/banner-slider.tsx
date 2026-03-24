"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";

const slides = [
  { src: "/banner-sliders/slider1.jpg", alt: "Asia Lighting Banner 1" },
  { src: "/banner-sliders/slider2.jpg", alt: "Asia Lighting Banner 2" },
  { src: "/banner-sliders/slider3.jpg", alt: "Asia Lighting Banner 3" }
];

export function BannerSlider() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning]
  );

  const nextSlide = useCallback(() => {
    goToSlide((current + 1) % slides.length);
  }, [current, goToSlide]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative z-0 pt-2 sm:pt-3">
      <Container className="max-w-[96rem] px-3 sm:px-4 lg:px-5">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-orange-100/70 bg-white shadow-soft">
          <div className="relative aspect-[16/9] w-full sm:aspect-[21/8] md:aspect-[2.8/1] lg:aspect-[2.75/1]">
            {slides.map((slide, index) => (
              <div
                className={`absolute inset-0 transition-all duration-600 ease-in-out ${index === current ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
                  }`}
                key={slide.src}
              >
                <Image
                  alt={slide.alt}
                  className="object-cover object-center"
                  fill
                  priority={index === 0}
                  quality={95}
                  sizes="(min-width: 1536px) 1500px, (min-width: 1280px) 1400px, 100vw"
                  src={slide.src}
                />
              </div>
            ))}

            <button
              aria-label="Slide truoc"
              className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/92 text-slate-800 shadow-lg backdrop-blur transition hover:bg-white sm:flex"
              onClick={() => goToSlide((current - 1 + slides.length) % slides.length)}
              type="button"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              aria-label="Slide tiep"
              className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/92 text-slate-800 shadow-lg backdrop-blur transition hover:bg-white sm:flex"
              onClick={nextSlide}
              type="button"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {slides.map((_, index) => (
                <button
                  aria-label={`Slide ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${index === current ? "w-8 bg-orange-500" : "w-2.5 bg-white/75 hover:bg-white"
                    }`}
                  key={index}
                  onClick={() => goToSlide(index)}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
