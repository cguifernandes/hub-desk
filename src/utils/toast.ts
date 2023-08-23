import toast from 'react-hot-toast'

export const ErrorToast = (message: string) => {
  return toast.error(message, {
    duration: 6000,
    position: 'top-right',
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
    duration: 6000,
    position: 'top-right',
    iconTheme: {
      primary: '#0369a1',
      secondary: '#fff',
    },
    style: {
      padding: '16px',
      maxWidth: '100%',
      border: '1px solid #0369a1',
    },
  })
}
