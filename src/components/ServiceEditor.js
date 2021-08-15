import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from '../reducers/SliceServiceList';
import {
  postServiceThunked,
  fetchServiceThunked,
} from '../reducers/fetchServices';
import Loading from './Loading';
import Error from './Error';

export default function ServiceEditor({ match }) {
  let history = useHistory();
  const dispatch = useDispatch();
  const store = useSelector((store) => store.serviceList);
  const [id, setId] = useState(match.params.id);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');
  const status = store.status;


  const onNewServiceSubmitHandler = ({ event, payload }) => {
    event.preventDefault();
    dispatch(postServiceThunked(payload));
    formReset();
    history.push(`/`);
  };

  const formReset = () => {
    setName('');
    setPrice('');
    setId('');
    setContent('');
    dispatch(reset());
  };

  useEffect(() => {
    const editItem = store.editItem;
    if (editItem) {
      setId(store.editItem.id);
      setName(store.editItem.name);
      setPrice(store.editItem.price);
      setContent(store.editItem.content);
    } else {
      setName('');
      setPrice('');
      setId(0);
      setContent('');
    }
  }, [store.editItem]);

  useEffect(() => {
    dispatch(fetchServiceThunked({ id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {status === 'pending' && <Loading />}
      {status === 'error' && <Error />}
      <div className='card'>
        <form
          className={'new-post-input'}
          noValidate
          autoComplete='off'
          onSubmit={(event) => {
            onNewServiceSubmitHandler({
              event,
              payload: { id, name, price, content },
            });
          }}
        >
          <div className='input-holder'>
            <TextField
              value={name}
              onInput={(e) => setName(e.target.value)}
              id='name'
              label='Название'
              variant='outlined'
              className={'inputField'}
            />
            <TextField
              value={price}
              onInput={(e) => setPrice(e.target.value)}
              id='price'
              label='Стоимость'
              variant='outlined'
              className={'inputField'}
            />
            <TextField
              value={content}
              onInput={(e) => setContent(e.target.value)}
              id='content'
              label='Описание'
              variant='outlined'
              className={'inputField'}
            />
          </div>
          <div className='btn-holder'>
            <Link to={(`/`)} style={{ display: 'flex', textDecoration: 'none' }}>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => formReset()}
              >
                Cancel
              </Button>
            </Link>

            <Button variant='contained' color='primary' type='submit'>
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
