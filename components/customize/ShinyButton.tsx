import React from "react";

import { cn } from "@/lib/utils";

import { ArrowRight } from "lucide-react";



interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {

  children: React.ReactNode;

  variant?: "primary" | "outline" | "ghost";

}



export const ShinyButton: React.FC<ShinyButtonProps> = ({ 

  children, 

  className, 

  variant = "primary", 

  ...props 

}) => {

  if (variant === "primary") {

    return (

      <button

        className={cn(

          "group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-800 bg-neutral-950 px-6 font-medium text-neutral-300 transition-all duration-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-900",

          className

        )}

        {...props}

      >

        <span className="absolute inset-0 -z-10 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[100%]" />

        <span className="relative flex items-center gap-2">

          {children} 

          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

        </span>

        <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      </button>

    );

  }



  if (variant === "outline") {

    return (

      <button

        className={cn(

          "group relative inline-flex h-12 items-center justify-center rounded-md border border-neutral-700 bg-transparent px-6 font-medium text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white",

          className

        )}

        {...props}

      >

         <span className="flex items-center gap-2">

          {children}

        </span>

      </button>

    );

  }



  return (

    <button

      className={cn(

        "group inline-flex h-12 items-center justify-center rounded-md px-6 font-medium text-neutral-400 transition-colors hover:text-white",

        className

      )}

      {...props}

    >

      {children}

    </button>

  );

};


