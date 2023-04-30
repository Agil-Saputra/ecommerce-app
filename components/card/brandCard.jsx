import { Avatar, Stack, Typography } from '@mui/material';

export default function BrandCard () {
  return (
    <div className='flex cursor-pointer justify-between shadow-lg p-6 items-center border-2 my-6 gap-4 hover:scale-105 active:scale-100 smooth-transition rounded-lg'>
      <Avatar className='w-[60px] h-[60px] hover:scale-105'>A</Avatar>
   <Stack width='15ch'>
   <Typography className='text-xl font-bold'>
        Apple
      </Typography>
   <Typography>
        Apple is favorite brand in the world 
      </Typography>
   </Stack>

    </div>
  );
}
