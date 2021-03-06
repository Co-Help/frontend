import {AddIcon, EditIcon} from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FloatingLabel} from '../../../components/FloatingLabel';
import {
  addAppointment,
  editAppointment,
  getAppointments,
} from '../../../redux/actions/doctor/docActions';
import {getInputTimeFromDate, TODAY} from '../../../utils';

export const AddAppointmentModal = ({editModal, data}) => {
  const addAppointmentSuccess = useSelector(
    state => state.docAppointment.addAppointmentSuccess
  );
  const dispatch = useDispatch();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [form, setForm] = useState({
    appointment_date: data?.appointment_date.split('T')[0] ?? TODAY,
    appointment_time: getInputTimeFromDate(data?.appointment_date) ?? '10:00',
    quantity: data?.quantity ?? '',
    cost: data?.cost ?? '',
    info: data?.info ?? '',
  });

  const onChange = e => setForm({...form, [e.target.name]: e.target.value});
  const onSubmit = () =>
    !editModal
      ? dispatch(addAppointment(form))
      : dispatch(
          editAppointment({batch_code: data?.batch_code, ...form}, () => {
            dispatch(getAppointments());
            onClose();
          })
        );

  useEffect(() => {
    if (addAppointmentSuccess) onClose();
  }, [addAppointmentSuccess, onClose]);

  return (
    <>
      {!editModal ? (
        <Button
          onClick={onOpen}
          pos='absolute'
          bottom='0'
          right='0'
          rounded='full'
          colorScheme='blue'
          leftIcon={<AddIcon />}
          variant='solid'>
          Add appointment
        </Button>
      ) : (
        <FloatingLabel label='Edit appointment'>
          <IconButton
            mr='2'
            onClick={onOpen}
            aria-label='Edit appointment'
            title='Edit appointment'
            icon={<EditIcon />}
          />
        </FloatingLabel>
      )}
      <Modal
        size='lg'
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editModal ? 'Edit' : 'Add'} appointment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack mt='3'>
              <FormControl id='appointment_date'>
                <FormLabel>Appointment Date</FormLabel>
                <InputGroup>
                  <Input
                    value={form.appointment_date}
                    onChange={onChange}
                    name='appointment_date'
                    type='date'
                    min={TODAY}
                  />
                </InputGroup>
              </FormControl>
              <FormControl id='appointment_time'>
                <FormLabel>Appointment time</FormLabel>
                <Input
                  value={form.appointment_time}
                  onChange={onChange}
                  name='appointment_time'
                  type='time'
                />
              </FormControl>
            </HStack>

            <HStack mt={3}>
              <FormControl id='cost'>
                <FormLabel>Cost</FormLabel>
                <Input
                  value={form.cost}
                  onChange={onChange}
                  name='cost'
                  type='number'
                />
              </FormControl>
              {!editModal && (
                <FormControl id='quantity'>
                  <FormLabel>Quantity</FormLabel>
                  <Input
                    value={form.quantity}
                    onChange={onChange}
                    name='quantity'
                    type='number'
                  />
                </FormControl>
              )}
            </HStack>
            <FormControl id='info' mt={3}>
              <FormLabel>Info</FormLabel>
              <Textarea
                value={form.info}
                onChange={onChange}
                name='info'
                resize='none'
                placeholder='Short info'
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onSubmit}>
              {editModal ? 'Done' : 'Add'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
