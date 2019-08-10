import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import api from './api';

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    _isMounted = false;
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
      this._isMounted = true;
      let tokenValue = window.sessionStorage.getItem('token');
      const obj = {
        token: tokenValue
      };
      api.post('/checarToken', obj)
        .then(res => {
          //console.log(res);
          if (res.status === 200) {
            if (this._isMounted) {
              this.setState({ loading: false });
            }
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          //console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }

    componentWillUnmount() {
      this._isMounted = false;
    }


    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/entrar" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  }
}