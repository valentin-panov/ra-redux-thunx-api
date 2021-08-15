import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ServiceFilter from './ServiceFilter';
import { useSelector, useDispatch } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import Loading from './Loading';
import Error from './Error';
import {
  fetchServicesThunked,
  deleteServiceThunked,
} from '../reducers/fetchServices';

export default function ServiceListViewer() {
  const dispatch = useDispatch();
  let { items, status, filter } = useSelector((store) => store.serviceList);

  useEffect(() => {
    dispatch(fetchServicesThunked());
  }, [dispatch]);

  if (filter) {
    items = items
      .filter((item) => {
        return item.name.toLowerCase().includes(filter.name.toLowerCase());
      })
      .filter((item) => {
        return item.price.toString().startsWith(filter.price);
      });
  }

  const onDeleteHandler = (id) => {
    dispatch(deleteServiceThunked({ id }));
  };

  return (
    <>
      <ServiceFilter />
      {status === 'pending' && <Loading />}
      {status === 'error' && <Error />}

      {status === 'success' && items.length > 0 && (
        <ul className='card'>
          {items.map((item) => (
            <li className='card_item' key={item.id} data-id={item.id}>
              <span className='card_item-name'>{item.name}</span>
              <span className='card_item-price'>{item.price}</span>

              <Link to={`/services/${item.id}`} style={{ display: 'flex' }}>
                <EditIcon className='icon' />
              </Link>
              <CloseIcon
                className='icon'
                onClick={() => onDeleteHandler(item.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
