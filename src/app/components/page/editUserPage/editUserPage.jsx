import React, {useEffect, useState} from "react";
import {validator} from "../../../utils/validator";
import TextField from "../../common/form/textField";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import {useHistory, useParams} from "react-router-dom";

const EditUserPage = () => {
  const history = useHistory()
  const {userId} = useParams();
  const [user, setUser] = useState();
  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: [],
  });

  useEffect(() => {
    api.users.getById(userId).then((data) => {
      setUser(data);

      return setData({
        name: data.name,
        email: data.email,
        profession: data.profession._id,
        sex: data.sex,
        qualities: data.qualities.map((item) => ({
          value: item._id,
          label: item.name,
        })),
      });
    });
  }, []);

  const [qualities, setQualities] = useState();
  const [professions, setProfession] = useState();
  const [errors, setErrors] = useState({});

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return {_id: prof.value, name: prof.label};
      }
    }
  };
  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color,
          });
        }
      }
    }
    return qualitiesArray;
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id,
      }));
      setProfession(professionsList);
    });
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        value: data[optionName]._id,
        label: data[optionName].name,
        color: data[optionName].color,
      }));
      setQualities(qualitiesList);
    });
  }, []);
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const validatorConfig = {
    name: {
      isRequired: {
        message: "Email is required",
      },
    },
    email: {
      isRequired: {
        message: "Email is required",
      },
      isEmail: {
        message: "Email is not correct",
      },
    },
    profession: {
      isRequired: {
        message: "Choose your profession",
      },
    },
  };
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const {profession, qualities} = data;

    const newData = {
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities),
    };
    console.log(newData);

    api.users.update(userId, newData)
    history.replace(`/users/${userId}`)

  };

  return user && professions && qualities ? (
      <form onSubmit={handleSubmit}>
        <TextField
            label="Name"
            name="name"
            value={data.name}
            onChange={handleChange}
            error={errors.name}
        />
        <TextField
            label="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
            error={errors.email}
        />
        <SelectField
            label="Choose your profession"
            defaultOption="Choose..."
            options={professions}
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
            label="Choose your sex"
        />
        <MultiSelectField
            options={qualities}
            onChange={handleChange}
            defaultValue={data.qualities}
            name="qualities"
            label="Choose your qualities"
        />

        <button
            className="btn btn-primary w-100 mx-auto"
            type="submit"
            disabled={!isValid}
        >
          Update
        </button>
      </form>
  ) : (
      <h1>Loading...</h1>
  );
};

export default EditUserPage;
