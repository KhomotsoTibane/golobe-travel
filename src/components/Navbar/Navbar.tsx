import { NavbarLinks } from "@/constants";
import Logo from "@/assets/images/logo.png";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";

interface NavProps {
  textWhite: boolean;
}

const Navbar = ({ textWhite }: NavProps) => {
  return (
    <nav
      className={` absolute inset-0  max-w-screen-2xl  ${textWhite ? "bg-transparent text-white" : "bg-white"} flex-between z-50 h-20 w-full gap-5 px-8  py-6 mx-auto`}
    >
      <div className="grid grid-cols-3 lg:gap-72">
        <div className="col-span-1 flex  items-center justify-center lg:gap-8">
          {NavbarLinks.map((item) => {
            const isActive = false;

            return (
              <div key={item.link} className="relative">
                <Button asChild variant={"link"}>
                  <Link to={item.link} className={`flex w-full items-center justify-center gap-1`}>
                    <img src={item.imageUrl} width={24} height={24} alt={`${item.label}-icon`} />
                    <p>{item.label}</p>
                  </Link>
                </Button>

                <span
                  className={` absolute -bottom-3 ${isActive ? "h-1 w-full  bg-primary-400" : ""}`}
                ></span>
              </div>
            );
          })}
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <img src={Logo} width={100} height={100} alt="logo" className="col-span-1" />
        </div>

        <div className="flex items-center justify-center gap-1 max-sm:hidden">
          <Button asChild variant={"link"}>
            <Link to="/" search={{}}>
              Login
            </Link>
          </Button>
          <Button asChild variant={"link"} className="bg-white text-black">
            <Link to="/" search={{}}>
              Sign up
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
