import {
  ADD_VACCINE,
  DEL_ALL_VACCINES,
  DEL_VACCINE_FROM_BATCH,
  FILTER_VACCINE_BATCH,
  GET_ALL_VACCINES,
  GET_VACCINE_BY_BATCH,
  GET_VACCINE_BY_BATCH_FAIL,
  ORG_ADD_EMERGENCY,
  ORG_DELETE_EMERGENCY_SERVICE,
  ORG_EDIT_EMERGENCY,
  ORG_GET_EMERGENCY_SERVICES,
} from '../../actions/org/types';

export const orgVaccineReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_VACCINE: {
      return {addVaccineSuccess: action.payload};
    }
    case GET_ALL_VACCINES: {
      return {vaccines: action.payload};
    }
    case DEL_ALL_VACCINES: {
      return {vaccines: []}; // FIXME: don't remove all items
    }
    case GET_VACCINE_BY_BATCH: {
      return {vaccineBatch: action.payload};
    }
    case GET_VACCINE_BY_BATCH_FAIL: {
      return {vaccineBatchError: action.payload};
    }
    case DEL_VACCINE_FROM_BATCH: {
      return {
        ...state,
        vaccineBatch: state.vaccineBatch.filter(v => v._id !== action.payload),
      };
    }
    case FILTER_VACCINE_BATCH: {
      return {...state, filteredBatch: action.payload};
    }
    default:
      return state;
  }
};

export const orgEmergencyReducer = (state = {}, action) => {
  switch (action.type) {
    case ORG_ADD_EMERGENCY: {
      return {addEmergencySuccess: action.payload};
    }
    case ORG_EDIT_EMERGENCY: {
      return {editEmergencySuccess: action.payload};
    }
    case ORG_GET_EMERGENCY_SERVICES: {
      return {services: action.payload};
    }
    case ORG_DELETE_EMERGENCY_SERVICE: {
      return {services: state.services.filter(s => s._id !== action.payload)};
    }
    default:
      return state;
  }
};
