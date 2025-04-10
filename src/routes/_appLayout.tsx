import { createFileRoute, Outlet } from "@tanstack/react-router";
import Footer from "@/components/Footer/Footer";

export const Route = createFileRoute("/_appLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <main className="relative">
        <div className="">
          <Outlet />
        </div>
        <Footer />
      </main>
    </>
  );
}
