import React from 'react';
import {getRequest} from '../data/services';
import {REFERENCE_DATA} from '../data/servicesUrls';

export const waitContainer = (Component, list = []) => {
  return class Container extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: false,
        loading: true,
        data: [],
      };
    }

    componentDidMount() {
      const promises = [];
      for (let i of list) {
        promises.push(getRequest(REFERENCE_DATA + '/' + i));
      }
      Promise.all(promises)
        .then(res => {
          this.setState({
            data: res.map(({data}) => data),
            error: false,
            loading: false,
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            data: [],
            error: true,
            loading: false,
          });
        });
    }

    render() {
      const {state, props} = this,
        {error, loading, data = []} = state;
      if (error || loading) {
        return null;
      }
      return <Component {...props} referenceData={data} />;
    }
  };
};
