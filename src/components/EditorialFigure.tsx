import React from 'react';
import { cn } from '@/src/lib/utils';

interface EditorialFigureProps {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  imageClassName?: string;
  aspectRatio?: string;
}

export const EditorialFigure: React.FC<EditorialFigureProps> = ({
  src,
  alt,
  caption,
  className,
  imageClassName,
  aspectRatio = "aspect-[3/2]"
}) => {
  return (
    <figure className={cn("space-y-4", className)}>
      <div className={cn("relative overflow-hidden bg-navy/5", aspectRatio)}>
        <img 
          src={src} 
          alt={alt} 
          className={cn("w-full h-full object-cover transition-transform duration-700 hover:scale-105", imageClassName)}
        />
      </div>
      <figcaption className="font-mono text-[9px] tracking-[2.5px] uppercase text-slate/50">
        {caption}
      </figcaption>
    </figure>
  );
};

export default EditorialFigure;
