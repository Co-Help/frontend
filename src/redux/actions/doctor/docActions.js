import axios from 'axios';
import {AUTH_HEADER, parseDateTimeToMilli} from '../../../utils';
import {UPDATE_DOCTOR_INFO} from '../user/types';
import {
  ADD_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT,
  DONE_UNDONE_APPOINTMENT,
  GET_APPOINTMENTS,
  GET_APPOINTMENT_BATCH,
} from './types';

export const addAppointment = form => async dispatch => {
  try {
    const data = {
      ...form,
      appointment_date: parseDateTimeToMilli(
        form.appointment_date,
        form.appointment_time
      ),
      cost: +form.cost,
      quantity: +form.quantity,
    };
    await axios.post('/org/appointment', data, AUTH_HEADER);
    dispatch({type: ADD_APPOINTMENT_SUCCESS, payload: true});
  } catch (err) {
    dispatch({type: ADD_APPOINTMENT_SUCCESS, payload: false});
    console.error(err);
  }
};

export const editAppointment = (form, cb, errorCb) => async dispatch => {
  try {
    const data = {
      ...form,
      appointment_date: parseDateTimeToMilli(
        form.appointment_date,
        form.appointment_time
      ),
      cost: +form.cost,
    };
    await axios.post('/org/appointment/edit', data, AUTH_HEADER);
    cb?.();
  } catch (err) {
    errorCb?.(err);
  }
};

export const getAppointments = () => async dispatch => {
  try {
    const {data} = await axios.get('/org/appointment', AUTH_HEADER);
    dispatch({type: GET_APPOINTMENTS, payload: data?.services});
  } catch (err) {
    console.error(err);
  }
};

export const setAppointmentDone = (data, cb) => async dispatch => {
  try {
    // FIXME: undone not working
    await axios.post('/org/appointment/done', data, AUTH_HEADER);
    dispatch({type: DONE_UNDONE_APPOINTMENT, payload: data.id});
    cb?.();
  } catch (err) {
    console.error(err);
  }
};

export const deleteAppointment = id => async dispatch => {
  try {
    await axios.delete('/org/appointment', {...AUTH_HEADER, data: {id}});
    dispatch({type: DELETE_APPOINTMENT, payload: id});
  } catch (err) {
    console.error(err);
  }
};

export const getAppointmentByBatch = batch_code => async dispatch => {
  try {
    const {data} = await axios.get(
      `/org/appointment/by_batch_code?batch_code=${batch_code}`,
      AUTH_HEADER
    );
    dispatch({type: GET_APPOINTMENT_BATCH, payload: data.services});
  } catch (err) {
    console.error(err);
  }
};

export const updateDoctorInfo = form => async dispatch => {
  try {
    const data = {
      ...(form.specialties
        ? {
            specialties: form.specialties.split(',').filter(s => s.trim()),
          }
        : {}),
      ...(form.qualifications
        ? {
            qualifications: form.qualifications
              .split(',')
              .filter(s => s.trim()),
          }
        : {}),
    };
    await axios.post('/doctor/profile/setup', data, AUTH_HEADER);
    dispatch({type: UPDATE_DOCTOR_INFO, payload: data});
  } catch (err) {
    console.error(err);
  }
};
