import {CheckIcon, CloseIcon, DeleteIcon} from '@chakra-ui/icons';
import {Badge, IconButton, Td, Tooltip, Tr} from '@chakra-ui/react';
import {useDispatch} from 'react-redux';
import {setDoneVaccine} from '../../../../redux/actions/org/OrgAction';
import {formatDate, getLocalTimeFromDate} from '../../../../utils';

export const VaccineBatchCard = ({onDelete, vaccine, slNo}) => {
  const dispatch = useDispatch();
  const {_id, done, booked} = vaccine;
  const patient = vaccine?.patient_details;

  return (
    <Tr>
      <Td>{slNo}</Td>
      <Td>{patient?.name || 'N/A'}</Td>
      <Td>{patient?.age || 'N/A'}</Td>
      <Td>{patient?.mobile_no || 'N/A'}</Td>
      <Td>
        {vaccine?.booking_date
          ? formatDate(vaccine?.booking_date) +
            ' ' +
            getLocalTimeFromDate(vaccine?.booking_date)
          : 'N/A'}
      </Td>
      <Td>
        <Badge colorScheme={booked ? 'green' : 'red'}>
          {booked ? 'Booked' : 'Not booked'}
        </Badge>
      </Td>
      <Td>
        {booked && (
          <Tooltip label='Set done/undone' hasArrow>
            <IconButton
              onClick={() => dispatch(setDoneVaccine({id: _id, done: !done}))}
              icon={!done ? <CheckIcon /> : <CloseIcon />}
            />
          </Tooltip>
        )}
        {!booked && (
          <Tooltip label='Delete Vaccine' hasArrow>
            <IconButton
              onClick={() => onDelete(_id)}
              icon={<DeleteIcon color='red.600' />}
            />
          </Tooltip>
        )}
      </Td>
    </Tr>
  );
};

/**
 <CardContainer>
      <Box>
        <Heading size='md'>
          {patient?.name}{' '}
          <Badge colorScheme={booked ? 'green' : 'red'}>
            {booked ? 'Booked' : 'Not booked'}
          </Badge>
        </Heading>
        {booked && (
          <Text>
            Booked on {formatDate(vaccine?.booking_date)} at{' '}
            {getLocalTimeFromDate(vaccine?.booking_date)}
          </Text>
        )}
      </Box>
      <Box>
        {booked && (
          <IconButton
            onClick={() => dispatch(setDoneVaccine({id: _id, done: !done}))}
            aria-label='Set done/undone'
            title='Set done/undone'
            icon={!done ? <CheckIcon /> : <CloseIcon />}
          />
        )}
        {!booked && (
          <IconButton
            onClick={() => onDelete(_id)}
            aria-label='Delete Vaccine'
            icon={<DeleteIcon color='red.600' />}
          />
        )}
      </Box>
    </CardContainer>
 */
