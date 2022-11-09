import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkToken } from '../services/api';

export default function validateUser(state, toWhere) {
  const Navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    checkToken(token).then((data) => {
      const { policyDocument: { Statement } } = data;
      return Statement[0].Effect === state && Navigate(toWhere);
    });
  }, []);
  return false;
}
