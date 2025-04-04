import React from "react";
import { Form, Formik } from "formik";
import CustomInput from "./CustomInput";
import { advencedSchema } from "../schemas";
import CustomSelect from "./CustumSelect";
import CustomCheckbox from "./CustomCheckbox";
import { Link } from "react-router-dom";

const onSubmit = async (values, actions) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

function PortalForm() {
  return (
    <>
      <Formik
        initialValues={{ username: "", university: "", isAccepted: false }}
        onSubmit={onSubmit}
        validationSchema={advencedSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomInput
              label="kullanıcı Adı"
              name="username"
              type="text"
              placeholder="kullanıcı adınızı giriniz"
            />
            <CustomSelect
              label="Okulunuz"
              name="university"
              placeholder="Universitenizi Seçiniz"
            >
              <option value="">Lütfen üniversitenizi Seçiniz</option>
              <option value="boğaziçi">Boğaziçi Üniversitesi</option>
              <option value="gsu">Galatasaray Üniversitesi</option>
              <option value="odtü">Odtü Üniversitesi</option>
              <option value="itü">İtü Üniversitesi</option>
            </CustomSelect>
            <CustomCheckbox type="checkbox" name="isAccepted" />
            <button disabled={isSubmitting}>Kaydet</button>
            <Link className="formLink" to="/">
              Ana Forma Git
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default PortalForm;
