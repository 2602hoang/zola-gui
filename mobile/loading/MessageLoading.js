import React from "react";
import { HStack, Skeleton, Spacer, VStack } from "native-base";

export default function MessageLoading() {
  return (
    <VStack space={2}>
      <Skeleton
        size="5"
        ml="20"
        w="20%"
        marginBottom={1}
        h="50px"
        rounded="xl"
      ></Skeleton>
      <Skeleton
        size="5"
        ml="20"
        w="45%"
        marginBottom={1}
        h="50px"
        rounded="xl"
      ></Skeleton>
      <Skeleton
        size="5"
        ml="20"
        w="25%"
        marginBottom={1}
        h="50px"
        rounded="xl"
      ></Skeleton>
      <HStack mr="5" space="2" alignItems="center">
        <Skeleton size="6" w="50px" h="50px" mx="3" rounded="full"></Skeleton>
        <Skeleton
          size="5"
          w="50%"
          marginBottom={1}
          h="50px"
          rounded="xl"
        ></Skeleton>
      </HStack>

      <HStack mr="5" space="2" alignItems="center">
        <Spacer></Spacer>
        <Skeleton
          size="5"
          w="50%"
          marginBottom={1}
          h="50px"
          rounded="xl"
        ></Skeleton>
      </HStack>
      <HStack mr="5" space="2" alignItems="center">
        <Skeleton size="6" w="50px" h="50px" mx="3" rounded="full"></Skeleton>
        <Skeleton
          size="5"
          w="50%"
          marginBottom={1}
          h="50px"
          rounded="xl"
        ></Skeleton>
      </HStack>
      <HStack mr="5" space="2" alignItems="center">
        <Spacer></Spacer>
        <Skeleton
          size="5"
          w="15%"
          marginBottom={1}
          h="50px"
          rounded="xl"
        ></Skeleton>
      </HStack>
      <HStack mr="5" space="2" alignItems="center">
        <Skeleton size="6" w="50px" h="50px" mx="3" rounded="full"></Skeleton>
        <Skeleton
          size="5"
          w="15%"
          marginBottom={1}
          h="50px"
          rounded="xl"
        ></Skeleton>
      </HStack>
      <HStack mr="5" space="2" alignItems="center">
        <Spacer></Spacer>
        <Skeleton
          size="5"
          w="30%"
          marginBottom={1}
          h="50px"
          rounded="xl"
        ></Skeleton>
      </HStack>
      <HStack mr="5" space="2" alignItems="center">
        <Spacer></Spacer>
        <Skeleton
          size="5"
          w="50%"
          marginBottom={1}
          h="50px"
          rounded="xl"
        ></Skeleton>
      </HStack>
      <HStack mr="5" space="2" alignItems="center">
        <Spacer></Spacer>
        <Skeleton
          size="5"
          w="45%"
          marginBottom={1}
          h="50px"
          rounded="xl"
        ></Skeleton>
      </HStack>
    </VStack>
  );
}
