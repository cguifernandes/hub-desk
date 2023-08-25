import toast from 'react-hot-toast'

export const ErrorToast = (message: string) => {
  return toast.error(message, {
    duration: 2500,
    position: 'top-left',
    iconTheme: {
      primary: 'red',
      secondary: '#fff',
    },
    style: {
      padding: '16px',
      maxWidth: '100%',
      border: '1px solid red',
    },
  })
}

export const SuccessToast = (message: string) => {
  return toast.success(message, {
    duration: 2500,
    position: 'top-left',
    iconTheme: {
      primary: 'green',
      secondary: '#fff',
    },
    style: {
      padding: '16px',
      maxWidth: '100%',
      border: '1px solid green',
    },
  })
}
