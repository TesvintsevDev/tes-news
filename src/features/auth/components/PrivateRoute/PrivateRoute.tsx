import { Redirect, Route, RouteProps } from 'react-router-dom';
import React, { FC } from 'react';
import { useAuthContext } from '../../AuthContextProvider';
import { Box, CircularProgress } from '@mui/material';

type TProps = {
  children: React.ReactNode;
} & RouteProps;

export const PrivateRoute: FC<TProps> = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated === null) {
    // если статус авторизации пока неизвестен
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        // eslint-disable-next-line
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/admin/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
