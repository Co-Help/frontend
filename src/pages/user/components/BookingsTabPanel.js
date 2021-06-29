import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Stack,
  Text,
} from '@chakra-ui/react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CardContainer} from '../../../components/CardContainer';
import {EmptyMessage} from '../../../components/EmptyMessage';
import {Loader} from '../../../components/Loader';
import {getBookedServices} from '../../../redux/actions/user/bookingsAction';
import {formatDate} from '../../../utils';
import {VaccineCard} from '../../org/components/vaccine/VaccineCard';
import {AppointmentCancelBtn} from './AppointmentCancelBtn';
import {BloodTestBookingCancelBtn} from './BloodTestBookingCancelBtn';

const BookingsItem = ({title, children}) => (
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left'>
          {title}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>{children}</AccordionPanel>
  </AccordionItem>
);

export const BookingsTabPanel = () => {
  const dispatch = useDispatch();
  const services = useSelector(state => state.bookings.services);

  useEffect(() => {
    dispatch(getBookedServices());
  }, [dispatch]);

  if (!services) return <Loader />;

  return (
    <Accordion allowMultiple defaultIndex={[0]}>
      <BookingsItem title='Vaccines'>
        <AccordionPanel pb={4}>
          {services?.vaccinations.map(v => (
            <VaccineCard key={v._id} vaccine={v} showCancelBtn />
          ))}
          {!services?.vaccinations.length && (
            <EmptyMessage msg='No vaccine bookings available' />
          )}
        </AccordionPanel>
      </BookingsItem>

      <BookingsItem title='Appointments'>
        <Stack spacing={2}>
          {services?.appointments
            .filter(s => !s.done)
            .map(a => (
              <CardContainer key={a._id}>
                <Box>
                  <Text>{a.info}</Text>
                  <Text>Date: {formatDate(a.appointment_date)}</Text>
                </Box>
                <AppointmentCancelBtn id={a._id} />
              </CardContainer>
            ))}
          {!services?.appointments.filter(s => !s.done).length && (
            <EmptyMessage msg='No appointments are available' />
          )}
        </Stack>
      </BookingsItem>

      <BookingsItem title='Blood tests'>
        <Stack spacing={2}>
          {services?.blood_tests
            .filter(s => !s.done)
            .map(a => (
              <CardContainer key={a._id}>
                <Box>
                  <Text>{a.info}</Text>
                  <Text>Date: {formatDate(a.test_date)}</Text>
                </Box>
                <BloodTestBookingCancelBtn id={a._id} />
              </CardContainer>
            ))}
        </Stack>
        {!services?.blood_tests.length && (
          <Text textAlign='center'>No blood test bookings available</Text>
        )}
      </BookingsItem>
    </Accordion>
  );
};
