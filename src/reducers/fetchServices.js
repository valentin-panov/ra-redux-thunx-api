import {
  put,
  edit,
  fetchStart,
  fetchSuccess,
  fetchError,
} from './SliceServiceList';
import { serverURL } from '../App';

export const fetchServicesThunked = () => async (dispatch, getState) => {
  const method = 'GET';
  const requestURL = serverURL;

  dispatch(fetchStart());
  try {
    const request = await fetch(requestURL, {
      method: method,
      headers: new Headers({ 'content-type': 'application/json' }),
    });
    if (!request.ok || !request.status.toString().startsWith('2')) {
      throw new Error(request.statusText);
    }
    const response = request.status === 200 ? await request.json() : null;

    dispatch(put(response));
    dispatch(fetchSuccess());
  } catch (e) {
    dispatch(fetchError(e));
  }
};

export const postServiceThunked = (params) => async (dispatch, getState) => {
  if (!params || !params.name || !params.price || !params.content) {
    return;
  }
  const method = 'POST';
  const requestURL = serverURL;

  dispatch(fetchStart());
  try {
    const request = await fetch(requestURL, {
      method: method,
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(params),
    });
    if (!request.ok || !request.status.toString().startsWith('2')) {
      throw new Error(request.statusText);
    }

    dispatch(fetchSuccess());
    dispatch(fetchServicesThunked());
  } catch (e) {
    dispatch(fetchError(e));
  }
};

export const deleteServiceThunked = (params) => async (dispatch, getState) => {
  if (!params) {
    return;
  }
  const method = 'DELETE';
  const requestURL = serverURL + `/${params.id}`;

  dispatch(fetchStart());
  try {
    const request = await fetch(requestURL, {
      method: method,
      headers: new Headers({ 'content-type': 'application/json' }),
    });
    if (!request.ok || !request.status.toString().startsWith('2')) {
      throw new Error(request.statusText);
    }

    dispatch(fetchSuccess());
    dispatch(fetchServicesThunked());
  } catch (e) {
    dispatch(fetchError(e));
  }
};

export const fetchServiceThunked = (params) => async (dispatch, getState) => {
  if (!params.id) {
    return;
  }
  const method = 'GET';
  const requestURL = serverURL + `/${params.id}`;

  dispatch(fetchStart());
  try {
    const request = await fetch(requestURL, {
      method: method,
      headers: new Headers({ 'content-type': 'application/json' }),
    });
    if (!request.ok || !request.status.toString().startsWith('2')) {
      throw new Error(request.statusText);
    }
    const response = request.status === 200 ? await request.json() : null;

    dispatch(edit(response));
    dispatch(fetchSuccess());
  } catch (e) {
    dispatch(fetchError(e));
  }
};
