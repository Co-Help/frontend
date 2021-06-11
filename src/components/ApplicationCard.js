import {Button, ButtonGroup} from '@chakra-ui/button';
import {Checkbox, CheckboxGroup} from '@chakra-ui/checkbox';
import {useDisclosure} from '@chakra-ui/hooks';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
} from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  Text,
  Wrap,
} from '@chakra-ui/layout';
import {Collapse} from '@chakra-ui/transition';

export const ApplicationCard = ({application}) => {
  const {
    name,
    user,
    status,
    info,
    helpline_no,
    services,
    address: {city, district, pinCode, state},
  } = application;

  const {isOpen, onToggle} = useDisclosure();

  return (
    <Box>
      <Flex
        align='center'
        justify='space-between'
        p={5}
        shadow='sm'
        _hover={{shadow: 'md'}}
        borderWidth='1px'>
        <Box>
          <Heading size='md'>
            {name} <Badge colorScheme='blue'>{status}</Badge>
          </Heading>

          <Text fontSize='sm'>by {user.name}</Text>
        </Box>
        <Button
          onClick={onToggle}
          size='sm'
          rightIcon={!isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}>
          View details
        </Button>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box
          p={5}
          color='black'
          mt='2'
          borderWidth='1px'
          rounded='md'
          shadow='md'>
          <Heading size='sm'>Info</Heading>
          <Divider my={2} />
          <Text fontSize='sm'>{info}</Text>

          <Heading size='sm' mt={2}>
            Other Details
          </Heading>
          <Divider my={2} />
          <Text fontSize='sm'>
            Address: {`${city}, ${district}, ${state}, ${pinCode}`}
          </Text>
          <Text fontSize='sm'>Helpline no: {helpline_no}</Text>

          <Heading size='sm' mt={2}>
            Services
          </Heading>
          <Divider my={2} />
          <CheckboxGroup colorScheme='blue' size='sm'>
            <Wrap spacing={3}>
              <Checkbox isChecked={services.vaccination}>Vaccination</Checkbox>
              <Checkbox isChecked={services.blood_test}>Blood test</Checkbox>
              <Checkbox isChecked={services.blood_provide}>Blood</Checkbox>
              <Checkbox isChecked={services.oxygen_provide}>Oxygen</Checkbox>
              <Checkbox isChecked={services.bed_provide}>Beds</Checkbox>
              <Checkbox isChecked={services.doctor_appointment}>
                Doctors
              </Checkbox>
              <Checkbox isChecked={services.emergency_provide}>
                Emergency Services
              </Checkbox>
            </Wrap>
          </CheckboxGroup>
          <Divider my={2} />
          <ButtonGroup>
            <Button
              size='sm'
              rounded='sm'
              leftIcon={<CheckIcon />}
              colorScheme='blue'>
              Approve
            </Button>
            <Button
              size='sm'
              rounded='sm'
              leftIcon={<CloseIcon />}
              colorScheme='red'>
              Reject
            </Button>
          </ButtonGroup>
        </Box>
      </Collapse>
    </Box>
  );
};