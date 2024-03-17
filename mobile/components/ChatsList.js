import React, { memo, useEffect, useState } from "react";

import moment from "moment";
import { ChatState } from "../providers/ChatProvider";
import axios from "axios";
import { getSender, getSenderInfo, isExistInArray } from "../logic/ChatLogic";

import {
  Avatar,
  Badge,
  Box,
  ChevronDownIcon,
  DeleteIcon,
  Divider,
  HamburgerIcon,
  HStack,
  Menu,
  Pressable,
  ScrollView,
  Skeleton,
  Text,
  useColorMode,
  VStack,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
const link = "http://192.168.1.7:5000";

function ChatList({ fetchAgain, setFetchAgain }) {
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const { colorMode } = useColorMode();
  const [friends, setFriends] = useState([]);
  const nav = useNavigation();
  useEffect(() => {
    fetchChats();
    fetchFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAgain]);
  const fetchChats = async () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
        cancelToken: source.token,
      };
      const { data } = await axios.get(`${link}/api/chat`, config);
      if (user) setChats(data);
    } catch (error) {
      if (axios.isCancel(error)) console.log("successfully aborted");
      else {
        console.log(error);
      }
    }
    return () => {
      // cancel the request before component unmounts
      source.cancel();
    };
  };

  const fetchFriends = async () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userInfo")).token
          }`,
        },
        cancelToken: source.token,
      };
      const { data } = await axios.get(`${link}/api/friends`, config);
      if (user) setFriends(data);
    } catch (error) {
      if (axios.isCancel(error)) console.log("successfully aborted");
      else {
        console.log(error);
      }
    }
    return () => {
      // cancel the request before component unmounts
      source.cancel();
    };
  };

  console.log("chatList is rendered");
  return (
    <ScrollView width={"full"} h="full">
      {chats ? (
        <VStack zIndex={1} mb={5} spacing="0" pb="20">
          {user &&
            chats.map((chat, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  //   selectedChat
                  //     ? io("http://localhost:5000").emit(
                  //         "outchat",
                  //         selectedChat._id
                  //       )
                  //     : console.log("out out out");
                  setSelectedChat(chat);
                  nav.navigate("MessageScreen");
                }}
              >
                <Box
                  display={"flex"}
                  bg="amber.200"
                  flexDirection="row"
                  width="full"
                  justifyItems={"center"}
                  alignItems="center"
                  // className="transition-colors "
                  bgColor={
                    selectedChat?._id !== chat?._id
                      ? ""
                      : colorMode === "light"
                      ? "white"
                      : "brown"
                  }
                  mx={3}
                >
                  <Box
                    key={index}
                    position="relative"
                    display="flex"
                    flexDir={"row"}
                    alignItems={"center"}
                    justifyContent="space-between"
                    flex={1}
                    py="7px"
                    px="15px"
                  >
                    {chat.isGroupChat ? (
                      <Avatar.Group
                        _avatar={{
                          size: "sm",
                        }}
                        max={3}
                        spacing={0}
                        flexWrap={"wrap"}
                        flexDirection="row-reverse"
                        width="50px"
                        py={0.5}
                        pl={1}
                      >
                        {chat.users.map((u) => (
                          <Avatar
                            p={0}
                            key={u._id}
                            name={chat.chatName}
                            source={{
                              uri: u.pic ? u.pic : "no-links",
                            }}
                          />
                        ))}
                      </Avatar.Group>
                    ) : (
                      <Avatar
                        showBorder={true}
                        width="50px"
                        height="50px"
                        size={"md"}
                        source={{
                          uri: getSenderInfo(user, chat.users).pic
                            ? getSenderInfo(user, chat.users).pic
                            : "no-links",
                        }}
                        justifyContent="center"
                        alignItems={"center"}
                      >
                        <Text className="font-bold text-4xl text-white">
                          {user?._id && getSender(user, chat.users).charAt(0)}
                        </Text>
                      </Avatar>
                    )}
                    <Box flex="1" px="2" w="0.5">
                      <HStack>
                        <Text
                          fontWeight={"bold"}
                          textColor={
                            selectedChat?._id === chat._id
                              ? "black"
                              : "white.500"
                          }
                          maxW={"250px"}
                          className="truncate"
                          fontSize={"md"}
                        >
                          {chat.isGroupChat
                            ? chat.chatName
                            : getSender(user, chat.users)}
                        </Text>
                        {!chat.isGroupChat &&
                          isExistInArray(
                            getSenderInfo(user, chat.users),
                            friends
                          ) === false && (
                            <Badge
                              colorScheme={"info"}
                              fontSize="xs"
                              fontWeight={"bold"}
                              mx="2"
                            >
                              Stranger
                            </Badge>
                          )}
                      </HStack>
                      <Text
                        textColor={
                          selectedChat?._id === chat._id ? "black" : "white.500"
                        }
                        w={{ base: "100%", md: "200px" }}
                        fontSize={{ base: "sm", md: "md" }}
                        textOverflow={"ellipsis"}
                        overflow="hidden"
                        whiteSpace={"nowrap"}
                      >
                        {chat.latestMessage?.content === undefined ? (
                          <Text color={"gray.500"}>{"Chat something 🥺"}</Text>
                        ) : chat.isGroupChat ? (
                          chat.latestMessage &&
                          `@${chat.latestMessage?.sender.username}: ${chat.latestMessage?.content} `
                        ) : (
                          `${
                            chat.latestMessage?.sender._id === user._id
                              ? "You: " + chat.latestMessage?.content
                              : chat.latestMessage?.content
                          }`
                        )}{" "}
                      </Text>
                    </Box>
                    <Text
                      fontSize="12"
                      textAlign={"right"}
                      w={"100px"}
                      p={{ base: "5", md: "1" }}
                    >
                      {chat.latestMessage?.content === undefined
                        ? ""
                        : moment(chat.latestMessage?.createdAt).fromNow()}
                    </Text>
                  </Box>
                </Box>
              </TouchableOpacity>
            ))}
        </VStack>
      ) : (
        <>
          <HStack my="2">
            <Skeleton rounded="full" h="10"></Skeleton>
            <Skeleton
              px="4"
              my="4"
              rounded="md"
              flex="1"
              startColor="gray.800"
            />
          </HStack>
          <HStack my="2">
            <Skeleton rounded="full" h="10"></Skeleton>
            <Skeleton
              px="4"
              my="4"
              rounded="md"
              flex="1"
              startColor="gray.400"
            />
          </HStack>

          <HStack my="2">
            <Skeleton rounded="full" h="10"></Skeleton>
            <Skeleton
              px="4"
              my="4"
              rounded="md"
              flex="1"
              startColor="gray.200"
            />
          </HStack>

          <HStack my="2">
            <Skeleton rounded="full" h="10"></Skeleton>
            <Skeleton
              px="4"
              my="4"
              rounded="md"
              flex="1"
              startColor="gray.100"
            />
          </HStack>
          <HStack my="2">
            <Skeleton rounded="full" h="10"></Skeleton>
            <Skeleton
              px="4"
              my="4"
              rounded="md"
              flex="1"
              startColor="gray.50"
            />
          </HStack>
        </>
      )}
    </ScrollView>
  );
}

export default memo(ChatList);
