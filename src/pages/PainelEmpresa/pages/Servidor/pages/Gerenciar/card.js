import React, { Component } from 'react';

import api from './../../../../../services/api';

const submitEmpresa = () =>  {
    api.get(`/empresa/${window.localStorage.getItem('segredo')}/servidores`)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    })
};

export default class ServidorGerenciar extends Component {
    render(){
<div class="my-3 my-md-5">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">
          Cards
        </h1>
      </div>
      <div class="row">
        <div class="col-md-6 col-xl-4">
          <div class="card">
            <div class="card-status bg-green"></div>
            <div class="card-header">
              <h3 class="card-title">Card green</h3>
              <div class="card-options">
                <a href="#" class="card-options-collapse" data-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a>
                <a href="#" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
              </div>
            </div>
            <div class="card-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti fugit incidunt, iste, itaque minima neque pariatur perferendis sed suscipit velit vitae voluptatem. A consequuntur, deserunt eaque error nulla temporibus!
            </div>
          </div>
        </div>
        <div class="col-md-6 col-xl-4">
          <div class="card">
            <div class="card-status bg-green"></div>
            <div class="card-header">
              <h3 class="card-title">Card green</h3>
              <div class="card-options">
                <a href="#" class="card-options-collapse" data-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a>
                <a href="#" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
              </div>
            </div>
            <div class="card-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti fugit incidunt, iste, itaque minima neque pariatur perferendis sed suscipit velit vitae voluptatem. A consequuntur, deserunt eaque error nulla temporibus!
            </div>
          </div>
        </div>
        <div class="col-md-6 col-xl-4">
          <div class="card">
            <div class="card-status bg-red"></div>
            <div class="card-header">
              <h3 class="card-title">Card red</h3>
              <div class="card-options">
                <a href="#" class="card-options-collapse" data-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a>
                <a href="#" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
              </div>
            </div>
            <div class="card-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam deleniti fugit incidunt, iste, itaque minima neque pariatur perferendis sed suscipit velit vitae voluptatem. A consequuntur, deserunt eaque error nulla temporibus!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    }
    
}
