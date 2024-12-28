import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-col gap-2">
      <Input />
      <Button size="lg">Primary</Button>
      <Button variant="destructive" size="lg">Destuctive</Button>
      <Button variant="secondary" size="lg">Secondary</Button>
      <Button variant="ghost" size="lg">Ghost</Button>
      <Button variant="muted" size="lg">Muted</Button>
      <Button variant="outline" size="lg">Outline</Button>
      <Button variant="teritary" size="lg">Teritary</Button>
    </div>
  );
}
