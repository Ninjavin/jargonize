import { FormEvent, useState } from "react";
import { Info } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const models = [
  { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B" },
  { id: "llama3-70b-8192", name: "LLaMA3 70b" },
  { id: "llama3-8b-8192", name: "LLaMA3 8b" },
  { id: "gemma-7b-it", name: "Gemma 7b" },
];

const Jargonize = () => {
  const [input, setInput] = useState<string>("");
  const [outputs, setOutputs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [model, setModel] = useState<string>(models[0].id);
  const [responseCount, setResponseCount] = useState<number>(1);
  const [creativity, setCreativity] = useState(0.5);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setOutputs([]);
    try {

      const responses = await Promise.all(
        Array(responseCount)
          .fill(0)
          .map(() =>
            axios.post<{ result: string }>("/api/jargonize", {
              text: input,
              model,
              temperature: creativity,
              isJargonize: true
            })
          )
      );
      setOutputs(responses.map((res) => res.data.result));
    } catch (error) {
      console.error("Error : ", error);
      setOutputs(["An error occurred. Please try again."]);
    }
    setIsLoading(false);
  };

  return (
    <>
      {" "}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-foreground mb-2">
          Jargonize
        </h1>
        <p className="text-xl text-muted-foreground">
          Turning Slang into Suits!
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Enter your text</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your slang or casual text here..."
              rows={6}
              required
            />

            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <label
                  htmlFor="model"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Choose Model
                </label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="responseCount"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Number of Responses
                </label>
                <Input
                  id="responseCount"
                  type="number"
                  min="1"
                  max="3"
                  value={responseCount}
                  onChange={(e) => setResponseCount(parseInt(e.target.value))}
                  className="w-20"
                />
              </div>
            </div>

            {/* <div className="flex justify-between items-center"> */}
            <div className="space-y-3">
              <label
                htmlFor="creativity"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Creativity
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 ml-1 cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent
                      sideOffset={25}
                      collisionPadding={20}
                      className="max-w-sm"
                    >
                      <p>
                        A higher setting produces more creative and surprising
                        responses, while a lower setting sticks to more
                        predictable and conventional styles.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </label>
              <Slider
                id="creativity"
                defaultValue={[creativity]}
                min={0}
                max={1}
                step={0.1}
                onValueChange={(e) => {
                  setCreativity(e[0]);
                }}
                className="w-full"
              />
            </div>
            {/* </div> */}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full space-y-3"
            >
              {isLoading ? "Jargonizing..." : "Jargonize!"}
            </Button>
          </form>
        </CardContent>
      </Card>
      {outputs.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Corporate Versions</CardTitle>
          </CardHeader>
          <CardContent>
            {outputs.map((output, index) => (
              <div key={index} className="mb-4 p-4 bg-muted rounded-md">
                <p className="text-foreground">{output}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Jargonize;
