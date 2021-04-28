import React, { Fragment } from "react";
import {
  List,
  Flex,
  Center,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router"; 
const MainNavLink = ({ href, icon, children }) => {
  const { pathname } = useRouter();
  const [, group] = href.split("/");
  const active = pathname.includes(group);
  const linkColor = useColorModeValue("gray.900", "whiteAlpha.900");

  return (
    <NextLink href={href} passHref>
      <Flex
        as="a"
        align="center"
        fontSize="sm"
        fontWeight="semibold"
        transitionProperty="colors"
        transitionDuration="200ms"
        color={active ? linkColor : "gray.500"}
        _hover={{ color: linkColor }}
      >
        <Center w="6" h="6" bg="teal.400" rounded="base" mr="3">
          {icon}
        </Center>
        {children}
      </Flex>
    </NextLink>
  );
};

const Menus = (props) => {
  const { routes } = props;

  return (
    <Fragment>
      <List spacing="4" styleType="none">
        {routes.map((item, index) => (
          <Fragment key={index}>
            <ListItem pl="1rem">
              <MainNavLink icon={item.icon} href={item.href}>
                {item.label}
              </MainNavLink>
            </ListItem>
          </Fragment>
        ))}
      </List>
    </Fragment>
  );
};

export default Menus;
