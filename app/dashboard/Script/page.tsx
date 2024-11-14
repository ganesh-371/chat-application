"use client"
import { useState } from "react";
import ScriptGeneration from "@/components/script/script";

export default function Page() {
  const [generatedScript, setGeneratedScript] = useState<string>(''); // State to hold the generated script

  const handleScriptGeneration = (script: string) => {
    console.log("Script generated:", script); // Debugging line
    setGeneratedScript(script); // Update the state with the generated script
  };

  return (
    <div>
      <ScriptGeneration script={generatedScript} /> {/* Pass the generated script to ScriptGeneration */}
    </div>
  );
}