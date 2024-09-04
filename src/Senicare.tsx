import React, { useEffect } from 'react';
import './Senicare.css';
import Auth from 'src/views/Auth';
import { Route, Routes } from 'react-router';

function Index() {

  useEffect(() => {
    // TODO: /auth로 경로 이동
  }, []);

  return (
    <></>
  );
}

export default function Senicare() {
  return (
    <Routes>
      <Route index element={<></>} />
      <Route path='/auth' element={<Auth />} />
    </Routes>
  );
}
