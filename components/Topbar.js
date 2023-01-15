import { HamburgerIcon } from "@chakra-ui/icons";
import { Flex, Heading, Avatar, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { getUserPhotoUrlByEmail } from "../firebaseconfig";
import Sidebar from "./Sidebar";

export default function Topbar({ email }) {
  const [display, setDisplay] = useState("none");

  /* 
  const foto = getUserPhotoUrlByEmail(email); */
  return (
    <Flex bg="gray.100" h="81px" w="100%" align="center" p={5}>
      <Avatar src="" marginEnd={3} />
      <Heading size={["md", "lg"]}>{email}</Heading>
    </Flex>
  );
}
