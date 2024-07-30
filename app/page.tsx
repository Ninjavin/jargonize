"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import ProductHuntEmbed from "@/components/ProductHuntEmbed";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import Jargonize from "@/components/Jargonize";
import { Switch } from "@/components/ui/switch";
import Genzify from "@/components/Genzify";

export default function Home() {
  const [jargonize, setJargonize] = useState(true);

  const handleSwitchToggle = () => {
    setJargonize((prev) => !prev);
  };

  useEffect(() => {
    console.log("VJ : jargonize : ", jargonize);
  }, [jargonize]);

  return (
    <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <Switch checked={jargonize} onCheckedChange={handleSwitchToggle} />
      <div className="max-w-3xl mx-auto">
        {jargonize ? <Jargonize /> : <Genzify />}

        <Link
          href="https://github.com/Ninjavin/jargonize"
          target="_blank"
          className="mt-2"
        >
          <AnimatedGradientText className="px-6 py-2 rounded-full mt-8">
            <Star className="w-6 h-6 fill-yellow-300 text-yellow-400" />
            <hr className="mx-2 h-4 w-[1px] bg-gray-300" />
            Star on Github
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
        </Link>
      </div>
      <ProductHuntEmbed />
    </main>
  );
}
