import * as React from 'react';
import { Redirect } from 'react-router-dom';

export default function Students () {
  return (
    <Redirect to="/students/list" />
  );
}
