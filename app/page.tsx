import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthForm from "./auth-form";
export default function Home() {
  return (
    <div
      className="h-screen w-screen bg-cover bg-[35%]"
      style={{

        backgroundImage:
          "url('https://m.media-amazon.com/images/I/81519B3aGUL.jpg')",
      }}
    >
      <div className="flex items-center justify-center h-[525px] bg-cover">
        <div className="w-[360px]">
          <Card className="opacity-90 bg-blend-overlay">
            <CardHeader>
              <CardTitle className="text-2xl">log in plz</CardTitle>
              <CardDescription className="text-sm">
                maganda to bobo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AuthForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
