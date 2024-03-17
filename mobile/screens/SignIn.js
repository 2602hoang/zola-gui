import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../providers/ChatProvider";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import "localstorage-polyfill";
import { Box, Icon, Input, KeyboardAvoidingView } from "native-base";
const link = "http://192.168.1.7:5000";
const SignIn = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = ChatState();
  //let navigate = useNavigate;
  const [show, setShow] = useState(false);
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      //  toast({
      //    title: "Please fill all fields",
      //    status: "warning",
      //    duration: 2500,
      //    isClosable: true,
      //    position: "bottom",
      //  });
      console.log("1");
      console.log("11");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log("7");
      const { data } = await axios.post(
        `${link}/api/user/login`,
        { email, password },
        config
      );
      console.log("2");
      localStorage.setItem("userInfo", JSON.stringify(data));
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setLoading(false);
      setUser(userInfo);
      navigation.navigate("ChatNavigator");
    } catch (error) {
      console.log("3");
      setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
      enabled={Platform.OS === "ios"}
      style={{ flex: 1 }}
    >
      <LinearGradient
        end={{ x: 0.5, y: 1 }}
        style={{
          flex: 1,
          maxWidth: "100%",
          justifyContent: "center",
          position: "relative",
        }}
        colors={["#0660AB", "#B000CD"]}
      >
        <TouchableOpacity
          className="absolute top-10 left-5 flex flex-row"
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color="white" />
          <Text className="text-2xl font-bold text-white ml-3">Zola</Text>
        </TouchableOpacity>
        <View className="absolute z-20 top-1/4  w-full">
          <Text className="text-[50px] font-bold text-white w-full text-center">
            Welcome
          </Text>
          <View className="items-center w-[80%] m-auto">
            <Input
              my={5}
              variant="filled"
              className="w-full  "
              h="50px"
              fontSize={"lg"}
              color={"white"}
              placeholder="Email"
              onChangeText={(e) => setEmail(e)}
            />
            <Input
              className="w-full  "
              w="100%"
              h="50px"
              fontSize={"lg"}
              variant="filled"
              onChangeText={(e) => setPassword(e)}
              type={show ? "text" : "password"}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <Feather
                        size={24}
                        color="black"
                        name={show ? "eye-off" : "eye"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
              placeholder="Password"
            />

            <TouchableOpacity className="w-full my-2">
              <Text className="text-[20px] font-bold text-white text-right">
                forgot password, eh?
              </Text>
            </TouchableOpacity>
            <View className="top-[60%] w-full">
              <TouchableOpacity onPress={submitHandler}>
                <Text className="text-[30px] font-bold text-blue-700">
                  Sign In
                </Text>
              </TouchableOpacity>
              <View className="flex-row">
                <Text>don't have an account ?</Text>
                <TouchableOpacity>
                  <Text className="text-[15px] font-bold text-blue-700">
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <Box className="bg-white rounded-full w-[800px] h-[1000px] -bottom-[70%]  absolute -left-2/3 items-center z-0"></Box>
        <Box className="absolute -right-1/2  rounded-lg items-center z-0 -bottom-[20%] ">
          <LinearGradient
            end={{ x: 0.5, y: 1 }}
            style={{
              width: "100%",
              justifyContent: "center",
              borderRadius: 9999,
            }}
            colors={["rgba(238,174,202,1)", "rgba(148,187,233,1)"]}
          >
            <Box className="w-[500px] h-[500px]"></Box>
          </LinearGradient>
        </Box>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
