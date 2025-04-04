import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const basicSchema = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir email giriniz")
    .required("Email girmek zorunludur"),
  age: yup
    .number()
    .positive("Lütfen pozitif bir sayı giriniz")
    .integer("Lütfen yaşınızı tam sayı olarak giriniz")
    .required("Yaş girmek zorunludur"),
  password: yup
    .string()
    .min(5, "Lütfen minumum 5 karakter giriniz")
    .matches(passwordRules, {
      message: "Lütfen en az 1 büyük harf 1 küçük harf ve 1 sayı giriniz",
    })
    .required("Şifre girmek zorunludur"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Şifreler uyuşmuyor")
    .required("Tekrar şifre girmek zorunludur"),
});

export const advencedSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "kullanıcı adı minumum 3 karakter uzunluğunda olmalıdır")
    .required("Kullanıcı adı zorunludur"),
  university: yup
    .string()
    .oneOf(["boğaziçi", "gsu", "odtü", "itü"], "Lütfen üniversitenizi seçiniz")
    .required("Lütfen universitenizi seçiniz"),
  isAccepted: yup
    .boolean()
    .oneOf([true], "Lütfen kullanım koşullarını kabul ediniz."),
});
