import { currentUser } from "@clerk/nextjs/server";
import { Container } from "../../components/layout/Container";
import { syncUser } from "@/actions/user.action";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  
  const user = await currentUser();
  if(user){
    await syncUser();
  }

  return (
    <Container>
      {children}
    </Container>
  );
}
