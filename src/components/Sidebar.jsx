import {
  CreditCardIcon,
  DocumentIcon,
  UserCircleIcon,
  UserGroupIcon,
  ArrowCircleUpIcon,
  ArrowCircleLeftIcon,
} from "@heroicons/react/outline";
import { useAuth } from "../base/hooks/useAuth";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Sidebar(props) {
  const { login, logout } = useAuth();
  const navigation = [
    {
      name: "Uploaded Images",
      href: "/images",
      icon: DocumentIcon,
      current: false,
    },
    {
      name: "Upload Image",
      href: "/upload-image",
      icon: ArrowCircleUpIcon,
      current: false,
    },
    { name: "Account", href: "/account", icon: UserCircleIcon, current: true },
    {
      name: "Log out",
      href: "/",
      icon: ArrowCircleLeftIcon,
      current: false,
      onClick: logout,
    },
  ];
  return (
    <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-2 ">
      <nav className="space-y-1">
        {navigation.map((item, index) => (
          <a
            key={item.name}
            href={item.href}
            onClick={item.onClick ? item.onClick : () => {}}
            className={classNames(
              index == props.active
                ? "bg-gray-50 text-indigo-700 hover:text-indigo-700 hover:bg-white"
                : "text-gray-900 hover:text-gray-900 hover:bg-gray-50",
              "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
            )}
            aria-current={item.current ? "page" : undefined}
          >
            <item.icon
              className={classNames(
                index == props.active
                  ? "text-indigo-500 group-hover:text-indigo-500"
                  : "text-gray-400 group-hover:text-gray-500",
                "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
              )}
              aria-hidden="true"
            />
            <span className="truncate">{item.name}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
