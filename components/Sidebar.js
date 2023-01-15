import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/button";
import { Flex, Text } from "@chakra-ui/layout";
import { ArrowLeftIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../firebaseconfig";
import getOtherEmail from "../utils/getOtherEmail";
import { useRouter } from "next/router";
import { useState } from "react";
import { CgLogOut } from "react-icons/cg";
import { Icon } from "@chakra-ui/react";

export default function Sidebar() {
  const [user] = useAuthState(auth);
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const router = useRouter();
  const [show, setShow] = useState("flex");

  const redirect = (id) => {
    router.push(`/chat/${id}`);
  };

  const chatExists = (email) =>
    chats?.find(
      (chat) => chat.users.includes(user.email) && chat.users.includes(email)
    );

  const newChat = async () => {
    const input = prompt("Enter email of chat recipient");
    if (!chatExists(input) && input != user.email) {
      await addDoc(collection(db, "chats"), { users: [user.email, input] });
    }
  };

  const chatList = () => {
    return chats
      ?.filter((chat) => chat.users.includes(user.email))
      .map((chat) => (
        <Flex
          key={Math.random()}
          p={3}
          align="center"
          _hover={{ bg: "gray.100", cursor: "pointer" }}
          onClick={() => redirect(chat.id)}
        >
          <Avatar src="" marginEnd={3} />
          <Text>{getOtherEmail(chat.users, user)}</Text>
        </Flex>
      ));
  };

  console.log(show);

  return (
    <Flex
      //bg={["green.100", "green.100", "blue.100"]}
      h="100%"
      w="300px"
      borderEnd="1px solid"
      borderColor="gray.200"
      direction="column"
    >
      <Flex
        // bg="red.100"
        h="81px"
        w="100%"
        align="center"
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="gray.200"
        p={3}
        display={[show, "flex"]}
      >
        <Flex align="center">
          <Avatar src={user.photoURL} marginEnd={3} />
          <Text>{user.displayName}</Text>
        </Flex>

        <IconButton
          size="md"
          isRound
          icon={<Icon as={CgLogOut} />}
          onClick={() => signOut(auth)}
        />
      </Flex>

      <Flex
        overflowX="scroll"
        direction="column"
        sx={{
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        flex={1}
        display={[show, "flex"]}
      >
        <Button m={5} p={4} onClick={() => newChat()}>
          New Chat
        </Button>
        {chatList()}
      </Flex>
    </Flex>
  );
}
