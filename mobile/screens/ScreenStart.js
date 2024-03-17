import { View, Text, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { Box } from "native-base";
import { LinearGradient } from "expo-linear-gradient";

const ScreenStart = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View className="flex-1">
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
        <Text className="absolute top-10 left-5 text-2xl font-bold text-white">
          Zola
        </Text>
        <View className="absolute left-5 z-20">
          <Text className="text-[50px] font-bold text-white">
            Welcome to Zola
          </Text>
          <Text className="text-[25px] font-bold text-white">
            "Zo" a room, "la" together
          </Text>
          <View className="top-[80%]">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text className="text-[30px] font-bold text-blue-700">
                Sign In
              </Text>
            </TouchableOpacity>
            <View className="flex-row">
              {/* <Text className="ml-16 bg-gray-500">Already have an account ?</Text> */}
              <TouchableOpacity
                className="flex flex-row"
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
                <Text> already have account, </Text>
                <Text className="text-[15px] font-bold text-blue-700">
                  Sign Up
                </Text>
              </TouchableOpacity>
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
    </View>
  );
};

export default ScreenStart;
