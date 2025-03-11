<template>
    <div class="col-4 mx-auto mt-3">
      <div class="card card-body shadow-sm border-0 rounded-0">
        <form @submit.prevent="">
          <h2>Feel-out the foam approtetlhy.</h2>
  
          <p>ACCOUNT INFORMATION</p>
  
          <div class="row">
            <div class="col-md-4">
              <div class="form-group mb-3">
                <label for="" class="form-label"><strong>ID NUMBER:</strong></label>
                <input type="text" name="" id="" class="form-control form-control-sm rounded-0" placeholder="ex. 12345678">
              </div>
            </div>
            <div class="col-md-8">
              <div class="form-group mb-3">
                <label for="" class="form-label"><strong>FULL NAME:</strong></label>
                <input type="text" name="" id="" class="form-control form-control-sm rounded-0" placeholder="ex. Juan Dela Cruz">
              </div>
            </div>
          </div>
  
          <div class="form-group mb-3">
            <label for="" class="form-label"><strong>OFFCICE NAME:</strong></label>
            <select name="" id="" class="form-select form-select-sm rounded-0">
              <option value="0" disabled selected>--Select Department--</option>
            </select>
          </div>
  
          <div class="col-md-16">
            <div class="form-group mb-3">
              <label for="" class="form-label"><strong>OFFICE ADDRESS:</strong></label>
              <input type="text" name="" id="" class="form-control form-control-sm rounded-0" placeholder="SBMA">
            </div>
          </div>
  
          <hr>
  
          <p>EQUIPMENT INFORMATION</p>
  
          <div class="row">
            <div class="col-md-4">
              <div class="form-group mb-3">
                <label for="" class="form-label"><strong>CATEGORY:</strong></label>
                <input type="text" name="" id="" class="form-control form-control-sm rounded-0" placeholder="ex. DELL">
              </div>
            </div>
            <div class="col-md-8">
              <div class="form-group mb-3">
                <label for="" class="form-label"><strong>EQUIPMENT:</strong></label>
                <input type="text" name="" id="" class="form-control form-control-sm rounded-0" placeholder="ASUS">
              </div>
            </div>
          </div>
  
          <div class="form-group mb-3">
            <label for="" class="form-label"><strong>CONDITION:</strong></label>
            <select name="" id="" class="form-select form-select-sm rounded-0">
              <option value="0" disabled selected>--Select Condition--</option>
            </select>
          </div>
  
        </form>
      </div>
    </div>
  </template>
  