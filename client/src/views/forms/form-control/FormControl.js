import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CFormSelect,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import axios from 'axios'

const FormControl = () => {
  const initialProductData = {
    code: '',
    name: '',
    description: '',
    uom: '',
    price: 0,
  }

  const [product, setProduct] = useState(initialProductData)

  const handleChange = (e) => {
    const price = e.target.name === 'price' ? parseInt(e.target.value) : product.price
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
      price,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios
      .post('http://localhost:8080/products', product)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <DocsExample href="forms/form-control">
              <CForm onSubmit={handleSubmit}>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">CODE</CFormLabel>
                  <CFormInput
                    type="text"
                    id="code"
                    placeholder="code"
                    name="code"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">NAME</CFormLabel>
                  <CFormInput
                    type="text"
                    id="name"
                    placeholder="Name"
                    name="name"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlTextarea1">DESCRIPTION</CFormLabel>
                  <CFormTextarea
                    id="desc"
                    rows="3"
                    name="description"
                    onChange={handleChange}
                  ></CFormTextarea>
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="price">PRICE</CFormLabel>
                  <CFormInput
                    type="text"
                    id="price"
                    placeholder="Price"
                    name="price"
                    onKeyPress={(event) => {
                      if (isNaN(Number(event.key))) {
                        event.preventDefault()
                      }
                    }}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="price">TYPE</CFormLabel>
                  <CFormSelect
                    aria-label="Default select example"
                    name="uom"
                    onChange={handleChange}
                  >
                    <option value="ROLL">ROLL</option>
                    <option value="PCS">PCS</option>
                    <option value="SHEET">SHEET</option>
                  </CFormSelect>
                </div>
                <div className="mb-3">
                  <CButton color="primary" type="submit" className="text-white">
                    Submit
                  </CButton>
                </div>
              </CForm>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FormControl
