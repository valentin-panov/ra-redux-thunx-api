import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { reset, setFilter } from '../reducers/SliceServiceList';
import { postServiceThunked } from '../reducers/fetchServices';

export default function ServiceFilter() {
  let history = useHistory();
  const dispatch = useDispatch();
  const store = useSelector((store) => store.serviceList);
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const onNewServiceSubmitHandler = ({ event, payload }) => {
    event.preventDefault();
    dispatch(postServiceThunked(payload));
    formReset();
    history.push(`/`);
  };

  const formReset = () => {
    setName('');
    setPrice('');
    setId(0);
    dispatch(reset());
    history.push(`/`);
  };

  useEffect(() => {
    const editItem = store.editItem;
    if (editItem) {
      setName(store.editItem.name);
      setPrice(store.editItem.price);
      setId(store.editItem.id);
    } else {
      setName('');
      setPrice('');
      setId(0);
    }
  }, [store.editItem]);

  useEffect(() => {
    dispatch(setFilter({ name, price }));
  }, [dispatch, name, price]);

  return (
    <div className='card'>
      <form
        className={'filter-input'}
        noValidate
        autoComplete='off'
        onSubmit={(event) => {
          onNewServiceSubmitHandler({
            event,
            payload: { id, name, price, content: 'Заполните описание' },
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
            style={{ width: '50%' }}
          />
          <TextField
            value={price}
            onInput={(e) => setPrice(e.target.value)}
            id='price'
            label='Стоимость'
            variant='outlined'
            style={{ width: '50%' }}
          />
        </div>
        <div className='btn-holder'>
          <Button variant='contained' color='primary' type='submit'>
            Save
          </Button>
          {(name || price) && (
            <Button
              variant='contained'
              color='secondary'
              onClick={() => formReset()}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
