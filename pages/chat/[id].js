import {
  Avatar,
  FormControl,
  Heading,
  Input,
  Button,
  Text,
  IconButton,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../firebaseconfig";
import getOtherEmail from "../../utils/getOtherEmail";
import { useState } from "react";
import { useRef } from "react";
import Topbar from "../../components/Topbar"; /* 
import Bottombar from "../../components/Bottombar"; */
import getOtherPhoto from "../../utils/getOtherPhoto";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
/* const Topbar = ({ email }) => {
  return (
    <Flex bg="gray.100" h="81px" w="100%" align="center" p={5}>
      <Avatar src="" marginEnd={3} />
      <Heading size="lg">{email}</Heading>
    </Flex>
  );
}; */
export default function Chat() {
  const router = useRouter();
  const { id } = router.query;
  const [chat] = useDocumentData(doc(db, "chats", id));
  const [user] = useAuthState(auth);
  const [show, setShow] = useState("flex");
  const q = query(
    collection(db, "chats", id, "messages"),
    orderBy("timestamp")
  );
  const [messages] = useCollectionData(q);
  const bottomOfChat = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getMessages = () =>
    messages?.map((msg) => {
      const sender = msg.sender === user.email;
      return (
        <Flex
          key={Math.random()}
          alignSelf={sender ? "flex-end" : "flex-start"}
          bg={sender ? "blue.100" : "green.100"}
          w="fit-content"
          minWidth="100px"
          borderRadius="lg"
          p={3}
          m={1}
        >
          <Text maxW={"400px"}>{msg.text}</Text>
        </Flex>
      );
    });

  const Bottombar = ({ id, user }) => {
    const [input, setInput] = useState("");

    const sendMessage = async (e) => {
      e.preventDefault();
      await addDoc(collection(db, `chats/${id}/messages`), {
        text: input,
        sender: user.email,
        timestamp: serverTimestamp(),
      });
      setInput("");
      bottomOfChat.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    return (
      <FormControl p={3} onSubmit={sendMessage} as="form">
        <Input
          placeholder="Type a message..."
          autoComplete="off"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <Button type="submit" hidden>
          Submit
        </Button>
      </FormControl>
    );
  };

  return (
    <Flex h="100vh">
      <Head>
        <title>ChatApp</title>
      </Head>
      <Flex display={["none", "flex"]}>
        <Sidebar />
      </Flex>
      <Flex flex={1} direction="column">
        <Flex align="center" justifyContent="space-between">
          <IconButton
            size="sm"
            isRound
            icon={<HamburgerIcon />}
            display={["table-column", "none", "none"]}
            onClick={onOpen}
          />

          <Modal size={"xs"} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay w={"100%"} />
            <ModalContent>
              <ModalHeader>Chats</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Sidebar />
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Topbar email={getOtherEmail(chat?.users, user)} />
        </Flex>

        <Flex
          flex={1}
          direction="column"
          pt={4}
          mx={5}
          overflowX="scroll"
          sx={{
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {getMessages()}
          <div ref={bottomOfChat}></div>
        </Flex>
        <Bottombar id={id} user={user} />
      </Flex>
    </Flex>
  );
}
