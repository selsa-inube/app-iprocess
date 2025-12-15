import { INav } from "@components/layout/AppPage/types";
import { ICardData } from "@pages/home/types";
import { MdLogout, MdOutlineStart } from "react-icons/md";

const createNavLink = (
  option: ICardData | undefined,
  defaultIcon: JSX.Element,
  location?: Location
) => {
  const pathnamePart = location?.pathname.split("/")[1];

   return {
    id: option?.id || "",
    label: option?.label || "",
    icon: option?.icon || defaultIcon,
    path: option?.url || "",
    isActive: location && option?.url
    ? option.url.startsWith(`/${pathnamePart}`)
    : false,
  };
};

const navConfig = (optionsCards: ICardData[], location?: Location): INav => {
  const linkNav = optionsCards.reduce<
    Record<string, ReturnType<typeof createNavLink>>
  >((acc, option) => {
    const navLink = createNavLink(option, <MdOutlineStart />, location);
    acc[navLink.id] = navLink;
    return acc;
  }, {});

  return {
    items: {
      title: "MENU",
      sections: {
        administrate: {
          name: "",
          links: linkNav,
        },
      },
    },
    breakpoint: "848px",
  };
};

const userMenu = [
  {
    id: "section",
    title: "",
    links: [
      {
        id: "logout",
        title: "Cerrar sesión",
        path: "/logout",
        iconBefore: <MdLogout />,
      },
    ],
    divider: true,
  },
];

export { userMenu, navConfig };
