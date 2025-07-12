import { Text, Flex, VStack,  Link, Box } from '@chakra-ui/react'
import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from './SuggestedUser'
import UseGetSuggestedUsers from '../../hooks/UseGetSuggestedUsers'



const SuggestedUsers = () => {
  const {isLoading, suggestedUsers} = UseGetSuggestedUsers()
  if(isLoading) return null;

  return (
    <VStack py={8} px={6} gap={4}>
        <SuggestedHeader/>
       {suggestedUsers.length !== 0 && (
         <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
         <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
             Suggested for you
         </Text>
         <Text fontSize={12} fontWeight={"bold"} _hover={{color:"gray.400"}} cursor={"pointer"}>
             See all
         </Text>
         </Flex>
       )}
        {suggestedUsers.map((user) => (
          <SuggestedUser user={user} key={user.id}/>
        ))}

        <Box fontSize={12} color={"gray.500"} mt={5} alignSelf={"start"}>
        © 2025 Build By{" "}
        <Link href='' target='_blank' color='blue.500' fontSize={14}> 
        Kristina
        </Link>

        </Box>

    </VStack>
  )
}

export default SuggestedUsers
