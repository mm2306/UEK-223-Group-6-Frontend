import { useNavigate, useParams } from 'react-router-dom';
import { List } from '../../../types/models/List.model';
import { User } from '../../../types/models/User.model';
import { Importance } from '../../../types/models/List.model';
import ListService from '../../../Services/ListService';
import ListForm from '../../molecules/ListForm/ListForm';
import { useEffect, useState } from 'react';

const ListPage = () => {
  const navigate = useNavigate();
  const { listEntryId } = useParams();
  const [list, setList] = useState<List>({
    id: '',
    title: '',
    text: '',
    importance: Importance.LOW,
    createdAt: new Date(),
    user: localStorage.getItem("user") as unknown as User
  });

  useEffect(() => {
    return () => {
      if (listEntryId) {
        ListService.getList(listEntryId).then((res) => {
          return setList(res);
        });
      }
    };
  }, [listEntryId]);

  const submitActionHandler = (values: List) => {
    if (listEntryId !== undefined && listEntryId !== '') {
      ListService.updateList(values).then(() => {
        navigate('../list');
      });
    } else {
      ListService.addList(values).then(() => {
        navigate('/list');
      });
    }
  };

  return <ListForm list={list} submitActionHandler={submitActionHandler} />;
};
export default ListPage;
