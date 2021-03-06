import {
  ADD_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT,
  DONE_UNDONE_APPOINTMENT,
  GET_APPOINTMENTS,
  GET_APPOINTMENT_BATCH,
} from '../../actions/doctor/types';

export const docAppointmentReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_APPOINTMENT_SUCCESS: {
      return {addAppointmentSuccess: action.payload};
    }
    case GET_APPOINTMENTS: {
      return {appointments: action.payload};
    }
    case DONE_UNDONE_APPOINTMENT: {
      return {
        ...state,
        appointmentBatch: state.appointmentBatch.map(v =>
          v._id === action.payload ? {...v, done: !v.done} : v
        ),
      };
    }
    case DELETE_APPOINTMENT: {
      return {
        ...state,
        appointmentBatch: state.appointmentBatch.filter(
          a => a._id !== action.payload
        ),
      };
    }
    case GET_APPOINTMENT_BATCH: {
      return {...state, appointmentBatch: action.payload};
    }
    default:
      return state;
  }
};
