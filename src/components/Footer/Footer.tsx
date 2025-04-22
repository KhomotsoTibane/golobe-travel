import { logoWhite, mailbox } from "@/assets/icons";
import { footerLinks, socialLinksDark } from "@/constants";
import { Link } from "@tanstack/react-router";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className="relative mx-auto mt-40 w-full bg-primary-400 px-6 md:px-12 lg:px-20 h-84 lg:h-96">
      <div className="w-full flex items-center justify-center">
        <div className="absolute -top-30 grid w-full max-w-screen-2xl gap-4 rounded-[20px] h-84 bg-primary-100 p-6 md:grid-cols-2 md:p-10">
          <div className="flex flex-col justify-center gap-4 max-w-xl">
            <h2 className="font-trade__normal font-bold hidden md:block">Subscribe Newsletter</h2>
            <h3 className="font-trade__normal font-bold md:hidden">Subscribe Newsletter</h3>
            <h6 className="text-black/70">The Travel</h6>
            <p className="text-black/80">
              Get inspired! Receive travel discounts, tips and behind the scenes stories.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input
                type="email"
                placeholder="Your email address"
                className="w-full rounded-md p-2"
              />
              <Button className="rounded-md px-4 py-2 text-white">Subscribe</Button>
            </div>
          </div>
          <div className="hidden md:flex justify-end items-center">
            <img
              src={mailbox}
              height={305}
              width={400}
              alt="Mailbox"
              className="max-w-full h-auto"
            />
          </div>
        </div>

        <div className="absolute bottom-12 md:bottom-0 grid gap-10 lg:grid-cols-8  w-full max-w-screen-2xl mx-auto  px-4">
          <div className="flex flex-col lg:gap-6 col-span-2">
            <img src={logoWhite} height={40} width={120} alt="logo" />
            <div className="flex gap-3">
              {socialLinksDark.map((icon) => (
                <img key={icon.name} src={icon.imageUrl} height={20} width={18} alt={icon.name} />
              ))}
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-6 sm:grid-cols-5 lg:col-span-6">
            {footerLinks.map((section, index) => (
              <div key={`${index}-${section.title}`} className="flex flex-col gap-3">
                <p className="font-bold">{section.title}</p>
                <div className="flex flex-col gap-1">
                  {section.links.map((link, index) => (
                    <Link
                      key={`${link.url}-${index}`}
                      className="montserrat__medium text-black/70"
                      to={link.url}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
