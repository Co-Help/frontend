import {Badge, Flex, Heading, Text} from '@chakra-ui/layout';
import {Button, useColorModeValue} from '@chakra-ui/react';
import {useSelector} from 'react-redux';
import {Link, useLocation} from 'react-router-dom';
import {NotificationPopup} from '../components/NotificationPopup';
import {DocStatusToggle} from '../pages/doctor/components/DocToggle';
import {DarkModeButton} from './DarkModeButton';
import {LogoutButton} from './LogoutButton';

const NavLink = ({to, title}) => {
  const {pathname} = useLocation();
  const isActiveLink = pathname === to;
  const color = useColorModeValue('blue.600', 'blue.300');

  return (
    <Link to={to}>
      {isActiveLink ? (
        <Text color={color} fontWeight='semibold' letterSpacing='wider'>
          {title}
        </Text>
      ) : (
        <Text>{title}</Text>
      )}
    </Link>
  );
};

const EmergencyButton = () => (
  <Link to='/emergency'>
    <Button
      ml={2}
      size='sm'
      colorScheme='blue'
      rounded='sm'
      fontWeight='semibold'>
      EMERGENCY
    </Button>
  </Link>
);

const adminLinks = [{to: '/admin/dashboard', title: 'Dashboard'}];
const commonLinks = [];
const userLinks = [
  ...commonLinks,
  {to: '/doctors', title: 'Doctors'},
  {to: '/blood', title: 'Blood'},
  {to: '/blood_test', title: 'Blood Test'},
  {to: '/vaccines', title: 'Vaccines'},
  {to: '/oxygen', title: 'Oxygen'},
  {to: '/beds', title: 'Beds'},
  {to: '/user/profile', title: 'Profile'},
];
const orgLinks = [
  {to: '/org/profile', title: 'Profile'},
  {to: '/org/dashboard', title: 'Dashboard'},
];
const doctorLinks = [
  {to: '/doc/profile', title: 'Profile'},
  {to: '/doc/dashboard', title: 'Dashboard'},
];

export const Nav = () => {
  const profile = useSelector(state => state.user.profile);
  const isAdmin = profile && profile?.role === 'admin';
  const isOrg = profile && profile?.role === 'org';
  const isOrgMember = isOrg && profile.org?.members?.includes(profile.email);
  const isUser = profile && profile?.role === 'user';
  const isDoctor = profile && profile?.role === 'doctor';
  const isPublic = !profile;

  const bg = useColorModeValue('whiteAlpha.600', 'blackAlpha.300');

  return (
    <Flex
      bg={bg}
      backdropFilter='blur(10px)'
      zIndex='docked'
      pos='sticky'
      top={0}
      px={10}
      borderBottomWidth='1px'
      shadow='sm'
      align='center'
      h={50}>
      <Link to='/'>
        <Heading fontSize='xl' fontWeight='semibold'>
          Co.Help{' '}
          {(isOrg || isAdmin || isDoctor) && (
            <Badge mb={3} px='1' py='0.5' colorScheme='blue'>
              {profile?.role} {isOrg ? (isOrgMember ? 'MEMBER' : 'ADMIN') : ''}
            </Badge>
          )}
        </Heading>
      </Link>
      <Flex
        align='center'
        ml='auto'
        sx={{
          'a:not(:last-child)': {
            paddingRight: '1rem',
          },
        }}>
        {isPublic && (
          <>
            {commonLinks.map(({title, to}) => (
              <NavLink key={to} to={to} title={title} />
            ))}
            <NavLink to='/login' title='Login' />
          </>
        )}

        {isUser && (
          <>
            {userLinks.map(({title, to}) => (
              <NavLink key={to} to={to} title={title} />
            ))}
            <EmergencyButton />
            <NotificationPopup />
          </>
        )}

        {isDoctor && (
          <>
            {doctorLinks.map(({title, to}) => (
              <NavLink key={to} to={to} title={title} />
            ))}
            <DocStatusToggle />
            <NotificationPopup />
          </>
        )}

        {isOrg && (
          <>
            {orgLinks.map(({title, to}) => (
              <NavLink key={to} to={to} title={title} />
            ))}
            <NotificationPopup />
          </>
        )}

        {isAdmin && (
          <>
            {adminLinks.map(({title, to}) => (
              <NavLink key={to} to={to} title={title} />
            ))}
            <LogoutButton />
          </>
        )}
        <DarkModeButton />
      </Flex>
    </Flex>
  );
};
