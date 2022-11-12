import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {validator} from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import {useProfessions} from "../../../hooks/useProfession";
import {useQualities} from "../../../hooks/useQualities";
import {useUser} from "../../../hooks/useUsers";
import userService from "../../../services/user.service";

const EditUserPage = () => {
  const {userId} = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const {getUserById} = useUser();
  const [data, setData] = useState(getUserById(userId));

  const {professions} = useProfessions();
  const {qualities, getQuality} = useQualities();

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = {
      ...data,
      qualities: data.qualities.map((item) => item.value),
    };

    userService.update(newData);

    history.replace(`/users/${userId}`)
  };
  const transformData = (data) => {
    return data.map((qual) => ({label: qual.name, value: qual._id}));
  };

  const convertDefaultDataForMultiSelect = (data) => {
    if (typeof data === "string") {
      const quality = getQuality(data);
      const result = convertDataForMultiSelect(quality);
      return result;
    }

    return data;
  };

  const convertDataForMultiSelect = (data) => {
    return {
      value: data._id,
      label: data.name,
      color: data.color,
    };
  };

  useEffect(() => {
    if (data._id && professions.length > 0 && qualities.length > 0)
      setIsLoading(false);
  }, [data, professions, qualities]);

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения",
      },
      isEmail: {
        message: "Email введен некорректно",
      },
    },
    name: {
      isRequired: {
        message: "Введите ваше имя",
      },
    },
  };
  useEffect(() => {
    validate();
  }, [data]);
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;
  return (
      <div className="container mt-5">
        <BackHistoryButton/>
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            {!isLoading && Object.keys(professions).length > 0 ? (
                <form onSubmit={handleSubmit}>
                  <TextField
                      label="Имя"
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                      error={errors.name}
                  />
                  <TextField
                      label="Электронная почта"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      error={errors.email}
                  />
                  <SelectField
                      label="Выбери свою профессию"
                      defaultOption="Choose..."
                      options={transformData(professions)}
                      name="profession"
                      onChange={handleChange}
                      value={data.profession}
                      error={errors.profession}
                  />
                  <RadioField
                      options={[
                        {name: "Male", value: "male"},
                        {name: "Female", value: "female"},
                        {name: "Other", value: "other"},
                      ]}
                      value={data.sex}
                      name="sex"
                      onChange={handleChange}
                      label="Выберите ваш пол"
                  />
                  <MultiSelectField
                      defaultValue={data.qualities.map((item) =>
                          convertDefaultDataForMultiSelect(item)
                      )}
                      options={qualities.map((item) =>
                          convertDataForMultiSelect(item)
                      )}
                      onChange={handleChange}
                      name="qualities"
                      label="Выберите ваши качества"
                  />
                  <button
                      type="submit"
                      disabled={!isValid}
                      className="btn btn-primary w-100 mx-auto"
                  >
                    Обновить
                  </button>
                </form>
            ) : (
                "Loading..."
            )}
          </div>
        </div>
      </div>
  );
};

export default EditUserPage;
