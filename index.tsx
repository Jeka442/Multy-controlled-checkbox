import { FormControlLabel, Checkbox, Typography, Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

const tempList = ['red', 'green', 'blue', 'yellow', 'pink'];

interface IFormData {
  Colors: string[];
}

export const MultipleControllerCheckBox = () => {
  const methods = useForm<IFormData>({
    defaultValues: {
      Colors: [],
    },
  });

  const submitHandler = (data: IFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={methods.handleSubmit(submitHandler)}>
      <Controller
        control={methods.control}
        name={'Colors'}
        render={({ field }) => {
          const { value, onChange, ...rest } = field;
          return (
            <>
              {tempList.map((color: string, index: number) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      defaultChecked={false}
                      onChange={(e) => {
                        if (e.target.checked) {
                          return onChange([...value, color]);
                        }
                        return onChange(
                          value.filter((val: string) => {
                            return val !== color;
                          })
                        );
                      }}
                      {...rest}
                    />
                  }
                  label={<Typography>{color}</Typography>}
                />
              ))}
            </>
          );
        }}
      />
      <Button type='submit' variant='contained' size='large'>
        Submit
      </Button>
    </form>
  );
};
