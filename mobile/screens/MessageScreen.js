import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Avatar,
  Box,
  ChevronLeftIcon,
  HStack,
  VStack,
  Icon,
  Spacer,
  IconButton,
  Input,
  InputGroup,
  ScrollView,
  Skeleton,
  StatusBar,
  Text,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { ChatState } from "../providers/ChatProvider";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import MessageItem from "../components/MessageItem";
import { getSender, getSenderInfo } from "../logic/ChatLogic";
import moment from "moment";
import { Entypo, FontAwesome, Octicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import MessageLoading from "../loading/MessageLoading";
let socket, selectedChatCompare;
const link = "http://192.168.1.7:5000";
const MessageScreen = () => {
  const [loadingNewMessage, setLoadingNewMessage] = useState(false);
  const [loadingPic, setLoadingPic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const nav = useNavigation();
  const [messages, setMessages] = useState([]);
  useLayoutEffect(() => {
    nav.setOptions({
      headerShown: false,
    });
  }, []);
  const fetchMessages = async () => {
    if (!selectedChat) return;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        cancelToken: source.token,
      };
      setLoading(true);
      await axios
        .get(`${link}/api/message/${selectedChat._id}`, config)
        .then((data) => setMessages(data.data));
      setLoading(false);

      // if (user) socket.emit("join chat", selectedChat._id);
    } catch (error) {
      if (axios.isCancel(error)) console.log("successfully aborted");
      else console.log(error);
      //   toast({
      //     title: "Error Occured",
      //     description: "Failed to load message",
      //     status: "error",
      //     duration: 2500,
      //     isClosable: true,
      //     position: "bottom",
      //   });
    }
    return () => {
      // cancel the request before component unmounts
      source.cancel();
    };
  };
  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  return (
    <>
      <Box flex="1">
        <StatusBar />
        <LinearGradient
          end={{ x: 0.5, y: 1 }}
          colors={["rgba(238,174,202,1)", "rgba(148,187,233,1)"]}
          style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
        >
          <Box
            display={"flex"}
            flexDirection="row"
            alignItems="center"
            zIndex={2}
            w={"100%"}
            p={2}
            opacity={0.95}
            borderRadius={0}
            textColor={"whiteAlpha.900"}
          >
            <IconButton
              mx={1}
              my={2}
              bg="none"
              w="55px"
              h="55px"
              borderRadius="full"
              display={{ base: "flex", md: "none" }}
              icon={<ChevronLeftIcon fontSize={"lg"} />}
              size="20px"
              colorScheme={"light"}
              onPress={() => {
                // selectedChat
                //   ? socket.emit("outchat", selectedChat._id)
                //   : console.log("out out out");
                setSelectedChat(null);
                nav.goBack();
              }}
            />
            {selectedChat.isGroupChat ? (
              <Avatar.Group
                _avatar={{
                  size: "sm",
                }}
                max={3}
                py={0.5}
                pl={1}
                marginRight={3}
                showBorder={true}
              >
                {selectedChat.users.map((u) => (
                  <Avatar
                    key={u._id}
                    name={u.fullname}
                    source={{ uri: u.pic ? u.pic : "no-links" }}
                  />
                ))}
              </Avatar.Group>
            ) : (
              <Avatar
                showBorder={true}
                size={"md"}
                marginRight={3}
                source={{
                  uri: getSenderInfo(user, selectedChat.users).pic
                    ? getSenderInfo(user, selectedChat.users).pic
                    : "no-links",
                }}
              >
                <Avatar.Badge
                  boxSize={5}
                  bg={
                    getSenderInfo(user, selectedChat.users).statusOnline
                      ? "green.500"
                      : "red.500"
                  }
                  borderColor={"whiteAlpha.900"}
                ></Avatar.Badge>
              </Avatar>
            )}
            <Text fontWeight={"bold"} textColor={"black"} w="full" pr="5">
              {selectedChat.isGroupChat ? (
                <Box display={"flex"} justifyContent={"center"}>
                  {/* <UpdateGroupChatModal
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
                fetchMessages={fetchMessages}
              > */}
                  <Text fontSize={"lg"}>{selectedChat.chatName} </Text>
                  {/* </UpdateGroupChatModal> */}
                  <Text fontWeight={"normal"}>
                    {selectedChat.users.length} members
                  </Text>
                </Box>
              ) : (
                <Box display={"flex"} justifyContent={"center"}>
                  {/* <AddFriendButton
                user={user}
                friend={getSenderInfo(user, selectedChat.users)}
                selectedChat={selectedChat}
              /> */}
                  <Text fontWeight={"bold"} opacity={0.8}>
                    {getSender(user, selectedChat.users)}
                  </Text>
                  <Text fontWeight={"normal"} opacity={0.8}>
                    {getSenderInfo(user, selectedChat.users).statusOnline
                      ? "online"
                      : "Last online " +
                        moment(
                          getSenderInfo(user, selectedChat.users).updatedAt
                        ).calendar()}
                  </Text>
                </Box>
              )}
            </Text>
          </Box>
        </LinearGradient>
        <ScrollView w={"full"} flex={1} py="5" pr="2">
          {!loading ? (
            messages.map((m, i) => (
              <MessageItem key={i} messages={messages} m={m} i={i} />
            ))
          ) : (
            <MessageLoading />
          )}
        </ScrollView>
        <InputGroup w={"full"}>
          <Input
            flex="1"
            variant="filled"
            bg={"white"}
            placeholder="Type something to your friend..."
            fontSize={"lg"}
            InputLeftElement={
              <Pressable>
                <Icon
                  as={<Entypo name="attachment" size={24} color="black" />}
                  size={5}
                  color="blue.400"
                />
              </Pressable>
            }
            InputRightElement={
              <HStack mr="2">
                <Pressable>
                  <Icon
                    as={<Octicons name="smiley" size={24} color="black" />}
                    size={5}
                    mr="2"
                    color="blue.400"
                  />
                </Pressable>
                <Pressable>
                  <Icon
                    as={<FontAwesome name="send" size={24} color="black" />}
                    size={5}
                    mr="2"
                    color="blue.400"
                  />
                </Pressable>
              </HStack>
            }
          />
        </InputGroup>
      </Box>
    </>
  );
};

export default MessageScreen;
