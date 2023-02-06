import { nanoid } from "nanoid";

import {
  AiFillYoutube,
  AiOutlineGithub,
  AiOutlineTwitter,
} from "react-icons/ai";

export const Features = [
  {
    text: "Pricing",
    to: "/pricing",
    id: nanoid(),
  },
];

export const Resources = [
  {
    text: "Blog",
    to: "/blog",
    id: nanoid(),
  },
];

export const Company = [
  {
    text: "About Us",
    to: "/about",
    id: nanoid(),
  },
];

export const FooterIcons = [
  {
    id: nanoid(),
    Icon: AiOutlineTwitter,
    to: "/",
  },
  {
    id: nanoid(),
    Icon: AiFillYoutube,
    to: "/",
  },
  {
    id: nanoid(),
    Icon: AiOutlineGithub,
    to: "/",
  },
];
