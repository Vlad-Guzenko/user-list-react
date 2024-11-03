import React, { useEffect, useState } from 'react';
import { Button, TextField, MenuItem, Typography, Snackbar, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { addUser, deleteUser, updateUser } from '../../redux/actions';
import { User } from '../../models/User';
import './userForm.css';

interface UserFormProps {
  selectedUserId: number | null;
  users: User[];
  onFormReset: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ selectedUserId, users, onFormReset }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [gender, setGender] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    surname: false,
    birthdate: false,
    gender: false,
  });

  useEffect(() => {
    if (selectedUserId === null) {
      resetForm();
    } else {
      const selectedUser = users.find((user) => user.id === selectedUserId);
      if (selectedUser) {
        setName(selectedUser.name);
        setSurname(selectedUser.surname);
        setBirthdate(new Date(selectedUser.birthdate));
        setGender(selectedUser.gender);
        setErrors({ name: false, surname: false, birthdate: false, gender: false });
      }
    }
  }, [selectedUserId, users]);

  const resetForm = () => {
    setName('');
    setSurname('');
    setBirthdate(null);
    setGender('');
    onFormReset();
    setErrors({ name: false, surname: false, birthdate: false, gender: false });
  };

  const handleSave = () => {
    setErrors({
      name: !name,
      surname: !surname,
      birthdate: !birthdate,
      gender: !gender,
    });

    if (!name || !surname || !birthdate || !gender) {
      setShowSnackbar(true);
      return;
    }

    const user: User = {
      id: selectedUserId,
      name,
      surname,
      birthdate: birthdate ? birthdate : new Date(),
      gender,
    };

    if (selectedUserId) {
      dispatch(updateUser(user));
    } else {
      dispatch(addUser(user));
    }
    resetForm();
  };

  const handleDelete = () => {
    if (selectedUserId) {
      dispatch(deleteUser(selectedUserId));
      resetForm();
    }
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  const isAnyFieldFilled = Boolean(name || surname || birthdate || gender);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<any>>, fieldName: string) => {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(event.target.value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: !event.target.value,
      }));
    };
  };

  return (
    <div className="user-form">
      <Typography variant="h5">{selectedUserId ? 'Edit User' : 'Add New User'}</Typography>
      <TextField
        label="Name"
        value={name}
        onChange={handleInputChange(setName, 'name')}
        fullWidth
        error={errors.name}
      />
      <TextField
        label="Surname"
        value={surname}
        onChange={handleInputChange(setSurname, 'surname')}
        fullWidth
        error={errors.surname}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* used mobile for better*/}
          <MobileDatePicker 
            label="Birthdate"
            slotProps={{
              textField:{
                error:errors.birthdate,
              }
            }}
            value={birthdate ? dayjs(birthdate) : null}
            onChange={(newValue) => {
            newValue && setBirthdate(newValue.toDate());
            setErrors((prevErrors) => ({...prevErrors, birthdate: false}))
            }}
          />
        </LocalizationProvider>
      <TextField
        select
        label="Gender"
        value={gender}
        onChange={handleInputChange(setGender, 'gender')}
        fullWidth
        error={errors.gender}
      >
        <MenuItem value="">Select Gender</MenuItem>
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
      </TextField>
      <div className="button-group">
        <Button
          variant="contained"
          color="success"
          onClick={handleSave}
          disabled={!isAnyFieldFilled}
          style={{ marginTop: '16px' }}
        >
          Save
        </Button>
        {isAnyFieldFilled && (
          <Button
            variant="outlined"
            color="warning"
            onClick={resetForm}
            style={{ marginTop: '16px', marginLeft: '8px' }}
          >
            Cancel
          </Button>
        )}
        {selectedUserId && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleDelete}
            style={{ marginTop: '16px', marginLeft: '8px' }}
          >
            Delete
          </Button>
        )}
      </div>
      <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          Missing data
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserForm;
