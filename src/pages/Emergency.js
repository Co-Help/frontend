import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Container,
  Text,
} from '@chakra-ui/react';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Loader} from '../components/Loader';
import {getEmergencyServices} from '../redux/actions/user/emergencyActions';
import {EmergencyCard} from './user/components/EmergencyCard';

export const Emergency = () => {
  const {is_profile_completed, address} = useSelector(
    state => state.user.profile
  );
  const emergencyServices = useSelector(state => state.emergency.services);

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!is_profile_completed) setIsOpen(true);
    else dispatch(getEmergencyServices(address?.city)); // FIXME: handle when profile is incomplete
  }, [is_profile_completed, dispatch, address]);

  if (!emergencyServices) return <Loader />;

  return (
    <Container>
      <AlertDialog
        blockScrollOnMount
        closeOnEsc={false}
        isCentered
        closeOnOverlayClick={false}
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Info
            </AlertDialogHeader>

            <AlertDialogBody>
              Please complete your profile, so that we can show services near
              you.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Later</Button>
              <Button
                ref={cancelRef}
                colorScheme='blue'
                onClick={() => history.push('/user/complete-profile')}
                ml={3}>
                Proceed
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Text fontSize='md' my={2}>
        List of emergency services in <strong>{address?.city}</strong>
      </Text>
      {emergencyServices?.map(s => (
        <EmergencyCard key={s._id} data={s} />
      ))}
    </Container>
  );
};
