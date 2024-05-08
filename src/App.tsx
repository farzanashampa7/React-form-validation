import './App.css';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { ObjectSchema } from "yup";

type IFormInput = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

function App() {
  const formValidationSchema: ObjectSchema<IFormInput> = yup
    .object()
    .shape({
      firstName: yup
      .string()
      .required("First name is required"),
      lastName: yup
      .string()
      .required("Last name is required"),
      email: yup
      .string()
      .required("Email is required")
      .matches(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4}$/,
        "Invalid email",
      ),
      phoneNumber: yup
      .string()
      .required("Phone number is required")
      .min(10, 'Phone number must have 10 digits'),
      password: yup
      .string()
      .required("Password is required")
      .matches(/^[A-Za-z\d$*.()[\]{}?"!@#%&/\\,><':;|_~`=+-]{8,}$/, "Pawword must contain 1 uppercase leeter, 1 lowercase letter, 1 digit and 1 special character")
    })

  const methods = useForm({
    defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(formValidationSchema)
  })

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    watch,
    reset
   } = methods

  const isDisabled = Object.entries(errors).length > 0 || Object.values(watch()).some(value => !value);

  const onFormSubmit = (data: IFormInput) => {
    console.log(data);
    reset();

  }


  return (
    <div className="App">
      <h1 className='font-semibold text-3xl pt-8'>React Form</h1>
      <div className='w-5/6 md:w-1/2 lg:w-1/3 mx-auto py-6 mt-10 gap-y-8'>


      <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onFormSubmit)} className='flex flex-col px-3 items-start'>
          <label htmlFor='firstName'>First Name:</label>
          <input 
            className={`w-full my-2 p-3 rounded border-2 ${errors.firstName ? 'border-red-500' : 'border-black-500'}`}
            {...register('firstName', {required: true})}
            aria-invalid={errors.firstName ? "true" : "false"}
            placeholder='First Name' 
            type='text' 
            />
          {errors?.firstName?.message &&
            <span role='alert' className='text-red-500 mb-2'>First name is required</span>
          }

          <label htmlFor='lastName'>Last Name:</label>
          <input 
            className={`w-full my-2 p-3 rounded border-2 ${errors.lastName ? 'border-red-500' : 'border-black-500'}`}
            {...register('lastName', {required: true})}
            aria-invalid={errors.lastName ? "true" : "false"}
            placeholder='Last Name' 
            type='text' 
            />
          {errors?.lastName?.message &&
            <span role='alert' className='text-red-500 mb-2'>Last name is required</span>
          }

          <label htmlFor='email'>Email:</label>
          <input 
            className={`w-full my-2 p-3 rounded border-2 ${errors.email ? 'border-red-500' : 'border-black-500'}`} 
            {...register('email', {required: true})} 
            aria-invalid={errors.email? "true" : "false"}
            placeholder='Email' 
            type='text' 
            />
          {errors?.email?.message &&
            <span role='alert' className='text-red-500 mb-2'>Email is required</span>
          }

          <label htmlFor='phoneNumber'>Phone number:</label>
          <input 
            className={`w-full my-2 p-3 rounded border-2 ${errors.phoneNumber ? 'border-red-500' : 'border-black-500'}`}
            {...register('phoneNumber', {required: true})} 
            aria-invalid={errors.phoneNumber ? "true" : "false"}
            placeholder='Phone Number' 
            type='text' 
            />
          {errors?.phoneNumber?.message &&
            <span role='alert' className='text-red-500 mb-2'>Phone number is required</span>
          }

          <label htmlFor='password'>Password:</label>
          <input 
            className={`w-full my-2 p-3 rounded border-2 ${errors.password ? 'border-red-500' : 'border-black-500'}`} 
            {...register('password', {required: true})}
            aria-invalid={errors.password ? "true" : "false"} 
            placeholder='Password' 
            type='text' 
            />
          {errors?.password?.message &&
            <span role='alert' className='text-red-500 mb-2'>Password is required</span>
          }
          <button 
            className={`mt-3 rounded-md self-center py-3 px-8 bg-blue-900 text-white ${isDisabled ? 'opacity-40' : 'opacity-100'}`} 
            type='submit'
            disabled={isDisabled}
          >
            Submit
          </button>
        </form>
      </FormProvider>
      </div>
    </div>
  );
}

export default App;
